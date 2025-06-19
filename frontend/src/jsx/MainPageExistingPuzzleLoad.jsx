/*
Mu Ye Liu - June 2025

Represents the non-render component for loading existing puzzles
*/

export function LoadExistingPuzzle({ puzzleName }) {
    const handleLoadPuzzle = async (e) => {
        e.preventDefault();
        const puzzleId = e.target.puzzleId.value.trim();

        if (!puzzleId) {
            alert("Please enter a valid puzzle ID.");
            return;
        }

        try {
            const response = await fetch(`/api/puzzles/${puzzleId}`);
            if (!response.ok) throw new Error('Puzzle not found');

            const puzzleData = await response.json();
            setPuzzle(puzzleData);
            setMode('edit');
            setDisplayedPopup('puzzleLoaded');
        } catch (error) {
            console.error("Error loading puzzle:", error);
            alert("Failed to load puzzle. Please check the ID and try again.");
        }
    };

    return (
        <form onSubmit={handleLoadPuzzle}>
            <label htmlFor="puzzleId">Enter Puzzle ID:</label>
            <input type="text" id="puzzleId" name="puzzleId" required />
            <button type="submit">Load Puzzle</button>
        </form>
    );
}