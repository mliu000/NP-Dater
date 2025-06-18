import { getSpecificPuzzle } from "../api/Persistence";
/* 
Mu Ye Liu - June 2025

This function loads an existing puzzle by its name.
*/

// Loads the existing puzzle with the given name
export async function loadExistingPuzzle(puzzleName, displayCxt, puzzleCxt) {
    resetContextToDefault(displayCxt, puzzleCxt);

    try {
        // Close the popup first
        displayCxt.setDisplayedPopup('');

        const puzzleData = await getSpecificPuzzle(puzzleName);
        if (!puzzleData) {
            throw new Error("Puzzle not found");
        }
        
        // Initialize the display contexts
        displayCxt.setMode('edit'); 
        displayCxt.setNotSavedPopup(false);
        displayCxt.setDisplaySetCoordPopup(false);
        displayCxt.setDisplayTilePopup(false);
        displayCxt.setDisplayLargeInstancePopup(false);
        displayCxt.setDisplayUnableToSolvePopup(false);
        displayCxt.setDisplayDateNotInPuzzlePopup(false);

        // Set the puzzle data useStates
        puzzleCxt.setSaved(false);

        puzzleCxt.setDayOfMonth('Day of Month');
        puzzleCxt.setMonth('Month');
        puzzleCxt.setDayOfWeek('Day of Week');

    } catch (err) {
        console.error("Error loading existing puzzle:", err);
        return;
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