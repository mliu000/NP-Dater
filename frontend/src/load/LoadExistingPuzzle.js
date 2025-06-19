import { getSpecificPuzzle } from "../api/Persistence";
import GridBoard from "../model/GridBoard";
import HexBoard from "../model/HexBoard";
import Tile from "../model/Tile";

/* 
Mu Ye Liu - June 2025

This function loads an existing puzzle by its name.
*/

// Loads the existing puzzle with the given name
export async function loadExistingPuzzle(pName,
    {
        setMode,
        setDisplaySetCoordPopup,
        setDisplayTilePopup,
        setDisplayLargeInstancePopup,
        setDisplayUnableToSolvePopup,
        setDisplayDateNotInPuzzlePopup,
        setNotSavedPopup,
        setDisplayedPopup
    },
    {
        board, tiles,
        attributeOptionsRemaining, totalNoTileCreatedHistory, solveTime,
        setSaved,
        setNoTiles,
        setPuzzleName,
        setGridWidth,
        setGridHeight,
        setHexRadius,
        setPuzzleType,
        setHexagonOrientation,
        dateFormat, setDateFormat,
        setRenderBoard,
        setDayOfMonth,
        setMonth,
        setDayOfWeek,
        coordSpecialAttributes, setCoordSpecialAttributes,
        tileCoordList, setTileCoordList,
        setTotalCoordCount,
        setTileCoordsCoverageCount,
        setCurrX,
        setCurrY,
        setCurrTileSelected
    }) {

    resetContextToDefault({
        setMode,
        setDisplaySetCoordPopup,
        setDisplayTilePopup,
        setDisplayLargeInstancePopup,
        setDisplayUnableToSolvePopup,
        setDisplayDateNotInPuzzlePopup,
        setNotSavedPopup,
        setDisplayedPopup
    },
        {
            board, tiles,
            attributeOptionsRemaining, totalNoTileCreatedHistory, solveTime,
            setSaved,
            setNoTiles,
            setPuzzleName,
            setGridWidth,
            setGridHeight,
            setHexRadius,
            setPuzzleType,
            setHexagonOrientation,
            setDateFormat,
            setRenderBoard,
            setDayOfMonth,
            setMonth,
            setDayOfWeek,
            setCoordSpecialAttributes,
            setTileCoordList,
            setTotalCoordCount,
            setTileCoordsCoverageCount,
            setCurrX,
            setCurrY,
            setCurrTileSelected
        });

    try {
        setDisplayedPopup('');

        const response = await getSpecificPuzzle(pName);
        if (!response) throw new Error("Puzzle not found");

        const puzzleData = response.puzzleData;
        setMode('edit');

        // Initialize board
        if (puzzleData.board.type === 0) {
            board.current = new GridBoard(puzzleData.board.width, puzzleData.board.height);
            puzzleData.board.gridCoords.forEach(c => {
                board.current.setSpecialAttribute(c.coord.x, c.coord.y, c.specialAttribute);
            });
            const specialAttributeUseState = board.current.gridCoords.map(coord => ({
                Coord: coord.Coord,
                specialAttribute: coord.specialAttribute
            }));
            setCoordSpecialAttributes(specialAttributeUseState);
        } else {
            board.current = new HexBoard(puzzleData.board.radius);
            puzzleData.board.hexCoords.forEach(c => {
                board.current.setSpecialAttribute(c.coord.x, c.coord.y, c.specialAttribute);
            });
            const specialAttributes = board.current.hexCoords.map(coord => ({
                Coord: coord.Coord,
                specialAttribute: coord.specialAttribute
            }));
            setCoordSpecialAttributes(specialAttributes);
        }

        // Setup tile list
        const newTileList = puzzleData.tiles.map(tile => {
            return new Tile(tile.id, tile.coords.map(coord => [coord.x, coord.y]), [], tile.color);
        });
        tiles.current.push(...newTileList);

        const tileListForState = newTileList.map(tile => ({
            id: tile.id,
            coords: tile.coords,
            color: tile.color
        }));
        setTileCoordList(tileListForState);
        console.log(tileCoordList);

        setNoTiles(newTileList.length);
        totalNoTileCreatedHistory.current = puzzleData.board.totalNoTileCreatedHistory;
        setSaved(false);
        setPuzzleName(pName);

        if (puzzleData.board.type === 0) {
            setPuzzleType('grid');
            setGridWidth(puzzleData.board.width);
            setGridHeight(puzzleData.board.height);
            setHexRadius(0);
        } else {
            setPuzzleType('hex');
            setGridWidth(0);
            setGridHeight(0);
            setHexRadius(puzzleData.board.radius);
            setHexagonOrientation(puzzleData.board.hexagonOrientation);
        }

        const freshDateFormat = [...puzzleData.board.dateFormat];
        setDateFormat(freshDateFormat);
        setTotalCoordCount(
            (board.current.gridCoords ? board.current.gridCoords.length : board.current.hexCoords.length)
            - freshDateFormat.filter(format => format).length
        );
        setTileCoordsCoverageCount(
            tileListForState.reduce((acc, tile) => acc + tile.coords.length, 0)
        );

        setDayOfMonth('Day of Month');
        setMonth('Month');
        setDayOfWeek('Day of Week');

        // Setup attributes
        if (freshDateFormat[0]) {
            attributeOptionsRemaining.current.push(...['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
        }
        if (freshDateFormat[2]) {
            attributeOptionsRemaining.current.push(...[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December']);
        }
        if (freshDateFormat[1]) {
            attributeOptionsRemaining.current.push(...Array.from({ length: 31 }, (_, i) => (i + 1).toString()));
        }

        const filteredAttributedOptions = attributeOptionsRemaining.current.filter(attr =>
            !(puzzleData.board.type === 0 ? board.current.gridCoords : board.current.hexCoords).some(c => c.specialAttribute === attr)
        );
        attributeOptionsRemaining.current = filteredAttributedOptions;

        // Render board after everything is set up
        setRenderBoard(true);

    } catch (err) {
        console.error("Error loading existing puzzle:", err);
    }
}


export function resetContextToDefault({
    setMode,
    setDisplaySetCoordPopup,
    setDisplayTilePopup,
    setDisplayLargeInstancePopup,
    setDisplayUnableToSolvePopup,
    setDisplayDateNotInPuzzlePopup,
    setNotSavedPopup,
    setDisplayedPopup
},
    {
        board, tiles,
        attributeOptionsRemaining, totalNoTileCreatedHistory, solveTime,
        setSaved,
        setNoTiles,
        setPuzzleName,
        setGridWidth,
        setGridHeight,
        setHexRadius,
        setPuzzleType,
        setHexagonOrientation,
        setDateFormat,
        setRenderBoard,
        setDayOfMonth,
        setMonth,
        setDayOfWeek,
        setCoordSpecialAttributes,
        setTileCoordList,
        setTotalCoordCount,
        setTileCoordsCoverageCount,
        setCurrX,
        setCurrY,
        setCurrTileSelected
    }) {
    // Reset the display context to default


    setDisplayedPopup('startup');
    setMode('');
    setDisplaySetCoordPopup(false);
    setDisplayTilePopup(false);
    setDisplayLargeInstancePopup(false);
    setDisplayUnableToSolvePopup(false);
    setDisplayDateNotInPuzzlePopup(false);
    setNotSavedPopup(false);

    // Reset the puzzle context to default
    board.current = null;
    tiles.current = [];
    attributeOptionsRemaining.current = [];
    totalNoTileCreatedHistory.current = 0;
    solveTime.current = 0;

    setNoTiles(0);
    setSaved(false);
    setPuzzleName('');
    setGridWidth('Select Width');
    setGridHeight('Select Height');
    setHexRadius('Select Radius');
    setPuzzleType('');
    setHexagonOrientation('');
    setDateFormat(new Array(3).fill(false));
    setRenderBoard(false);
    setTotalCoordCount(0);
    setTileCoordsCoverageCount(0);
    setCurrX(null);
    setCurrY(null);
    setCurrTileSelected(null); // id, coords, and colour
    setCoordSpecialAttributes([]);
    setTileCoordList([]);
    setDayOfMonth('Day of Month');
    setMonth('Month');
    setDayOfWeek('Day of Week');
}