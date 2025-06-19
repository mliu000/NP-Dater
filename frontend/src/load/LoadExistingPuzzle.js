import { getSpecificPuzzle } from "../api/Persistence";
/* 
Mu Ye Liu - June 2025

This function loads an existing puzzle by its name.
*/

// Loads the existing puzzle with the given name
export async function loadExistingPuzzle(puzzleName, {
    setMode,
    setDisplaySetCoordPopup,
    setDisplayTilePopup,
    setDisplayLargeInstancePopup,
    setDisplayUnableToSolvePopup,
    setDisplayDateNotInPuzzlePopup,
    setNotSavedPopup,
    setDisplayedPopup
}, {
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
}
) {
    resetContextToDefault({ 
    setMode,
        setDisplaySetCoordPopup,
        setDisplayTilePopup,
        setDisplayLargeInstancePopup,
        setDisplayUnableToSolvePopup,
        setDisplayDateNotInPuzzlePopup,
        setNotSavedPopup
    }, {
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
        // Close the popup first
        // Remove the displayCxt and puzzleCxt parameters
        setDisplayedPopup('');

        const puzzleData = await getSpecificPuzzle(puzzleName);
        if (!puzzleData) {
            throw new Error("Puzzle not found");
        }

        console.log("ran");

        // Initialize the display contexts
        setMode('edit');
        setNotSavedPopup(false);
        setDisplaySetCoordPopup(false);
        setDisplayTilePopup(false);
        setDisplayLargeInstancePopup(false);
        setDisplayUnableToSolvePopup(false);
        setDisplayDateNotInPuzzlePopup(false);

        // Set the puzzle data useStates
        setSaved(false);

        setDayOfMonth('Day of Month');
        setMonth('Month');
        setDayOfWeek('Day of Week');

    } catch (err) {
        console.error("Error loading existing puzzle:", err);
        return;
    }
}

// Remove unused context parameters
export function resetContextToDefault({
    setMode,
    setDisplaySetCoordPopup,
    setDisplayTilePopup,
    setDisplayLargeInstancePopup,
    setDisplayUnableToSolvePopup,
    setDisplayDateNotInPuzzlePopup,
    setNotSavedPopup
}, {
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
    // Update to use paramters instead of context
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