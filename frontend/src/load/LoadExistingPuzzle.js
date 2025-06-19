import { getSpecificPuzzle } from "../api/Persistence";
import GridBoard from "../model/GridBoard";
import HexBoard from "../model/HexBoard";
import Tile from "../model/Tile";

/* 
Mu Ye Liu - June 2025

This function loads an existing puzzle by its name.
*/

// Loads the existing puzzle with the given name
export async function loadExistingPuzzle(pName, displayCxt, puzzleCxt) {
    resetContextToDefault(displayCxt, puzzleCxt);

    try {
        displayCxt.setDisplayedPopup('');

        const response = await getSpecificPuzzle(pName);
        if (!response) throw new Error("Puzzle not found");

        const puzzleData = response.puzzleData;
        displayCxt.setMode('edit');

        // Initialize board
        if (puzzleData.board.type === 0) {
            puzzleCxt.board.current = new GridBoard(puzzleData.board.width, puzzleData.board.height);
            puzzleData.board.gridCoords.forEach(c => {
                puzzleCxt.board.current.setSpecialAttribute(c.coord.x, c.coord.y, c.specialAttribute);
            });
            const specialAttributeUseState = puzzleCxt.board.current.gridCoords.map(coord => ({
                Coord: coord.Coord,
                specialAttribute: coord.specialAttribute
            }));
            puzzleCxt.setCoordSpecialAttributes(specialAttributeUseState);
        } else {
            puzzleCxt.board.current = new HexBoard(puzzleData.board.radius);
            puzzleData.board.hexCoords.forEach(c => {
                puzzleCxt.board.current.setSpecialAttribute(c.coord.x, c.coord.y, c.specialAttribute);
            });
            const specialAttributes = puzzleCxt.board.current.hexCoords.map(coord => ({
                Coord: coord.Coord,
                specialAttribute: coord.specialAttribute
            }));
            puzzleCxt.setCoordSpecialAttributes(specialAttributes);
        }

        // Setup tile list
        const newTileList = puzzleData.tiles.map(tile => {
            return new Tile(tile.id, tile.coords.map(coord => [coord.x, coord.y]), [], tile.color);
        });
        puzzleCxt.tiles.current.push(...newTileList);

        const tileListForState = newTileList.map(tile => ({
            id: tile.id,
            coords: tile.coords,
            color: tile.color
        }));
        puzzleCxt.setTileCoordList(tileListForState);

        puzzleCxt.setNoTiles(newTileList.length);
        puzzleCxt.totalNoTileCreatedHistory.current = puzzleData.board.totalNoTileCreatedHistory;
        puzzleCxt.setSaved(false);
        puzzleCxt.setPuzzleName(pName);

        if (puzzleData.board.type === 0) {
            puzzleCxt.setPuzzleType('grid');
            puzzleCxt.setGridWidth(puzzleData.board.width);
            puzzleCxt.setGridHeight(puzzleData.board.height);
            puzzleCxt.setHexRadius(0);
        } else {
            puzzleCxt.setPuzzleType('hex');
            puzzleCxt.setGridWidth(0);
            puzzleCxt.setGridHeight(0);
            puzzleCxt.setHexRadius(puzzleData.board.radius);
            puzzleCxt.setHexagonOrientation(puzzleData.board.hexagonOrientation);
        }

        const freshDateFormat = [...puzzleData.board.dateFormat];
        puzzleCxt.setDateFormat(freshDateFormat);
        puzzleCxt.setTotalCoordCount(
            (puzzleCxt.board.current.gridCoords ? puzzleCxt.board.current.gridCoords.length : puzzleCxt.board.current.hexCoords.length)
            - freshDateFormat.filter(format => format).length
        );
        puzzleCxt.setTileCoordsCoverageCount(
            tileListForState.reduce((acc, tile) => acc + tile.coords.length, 0)
        );

        puzzleCxt.setDayOfMonth('Day of Month');
        puzzleCxt.setMonth('Month');
        puzzleCxt.setDayOfWeek('Day of Week');

        // Setup attributes
        if (freshDateFormat[0]) {
            puzzleCxt.attributeOptionsRemaining.current.push(...['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
        }
        if (freshDateFormat[2]) {
            puzzleCxt.attributeOptionsRemaining.current.push(...[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December']);
        }
        if (freshDateFormat[1]) {
            puzzleCxt.attributeOptionsRemaining.current.push(...Array.from({ length: 31 }, (_, i) => (i + 1).toString()));
        }

        const filteredAttributedOptions = puzzleCxt.attributeOptionsRemaining.current.filter(attr =>
            !(puzzleData.board.type === 0 ? puzzleCxt.board.current.gridCoords : puzzleCxt.board.current.hexCoords).some(c => c.specialAttribute === attr)
        );
        puzzleCxt.attributeOptionsRemaining.current = filteredAttributedOptions;

        // Render board after everything is set up
        puzzleCxt.setRenderBoard(true);

    } catch (err) {
        console.error("Error loading existing puzzle:", err);
    }
}


export function resetContextToDefault(displayCxt, puzzleCxt) {
    // Reset the display context to default


    displayCxt.setDisplayedPopup('startup');
    displayCxt.setMode('');
    displayCxt.setDisplaySetCoordPopup(false);
    displayCxt.setDisplayTilePopup(false);
    displayCxt.setDisplayLargeInstancePopup(false);
    displayCxt.setDisplayUnableToSolvePopup(false);
    displayCxt.setDisplayDateNotInPuzzlePopup(false);
    displayCxt.setNotSavedPopup(false);

    // Reset the puzzle context to default
    puzzleCxt.board.current = null;
    puzzleCxt.tiles.current = [];
    puzzleCxt.attributeOptionsRemaining.current = [];
    puzzleCxt.totalNoTileCreatedHistory.current = 0;
    puzzleCxt.solveTime.current = 0;

    puzzleCxt.setNoTiles(0);
    puzzleCxt.setSaved(false);
    puzzleCxt.setPuzzleName('');
    puzzleCxt.setGridWidth('Select Width');
    puzzleCxt.setGridHeight('Select Height');
    puzzleCxt.setHexRadius('Select Radius');
    puzzleCxt.setPuzzleType('');
    puzzleCxt.setHexagonOrientation('');
    puzzleCxt.setDateFormat(new Array(3).fill(false));
    puzzleCxt.setRenderBoard(false);
    puzzleCxt.setTotalCoordCount(0);
    puzzleCxt.setTileCoordsCoverageCount(0);
    puzzleCxt.setCurrX(null);
    puzzleCxt.setCurrY(null);
    puzzleCxt.setCurrTileSelected(null); // id, coords, and colour
    puzzleCxt.setCoordSpecialAttributes([]);
    puzzleCxt.setTileCoordList([]);
    puzzleCxt.setDayOfMonth('Day of Month');
    puzzleCxt.setMonth('Month');
    puzzleCxt.setDayOfWeek('Day of Week');
}