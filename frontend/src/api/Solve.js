/*
Mu Ye Liu - June 2025

Represents the API for to call the c++ solver
*/

// Helper: Checks to make sure chosen date in on the puzzle
export function isDateOnPuzzle(date, board, type) {
    // Check if the date is within the bounds of the puzzle
    const allAttributes = type === 'grid' ? board.gridCoords.map(coord => coord.specialAttribute) :
        board.hexCoords.map(coord => coord.specialAttribute);

    for (const dateAttribute of date) {
        if (!allAttributes.includes(dateAttribute)) return false;
    }

    return true;
}

// Sets up the json string
function setupJsonString(listOfTiles, board, type, date) {
    // Start by setting up the json components
    const jsonInputType = type === 'grid' ? 0 : 1; // 0 for grid, 1 for hex
    const jsonBlocked = (type === 'grid' ? board.gridCoords : board.hexCoords)
        .filter(coord => coord.specialAttribute === 'blocked' ||
            date.includes(coord.specialAttribute))
        .map(coord => ({
            x: coord.Coord[0],
            y: coord.Coord[1]
        }));
    const jsonTiles = listOfTiles.
        map(tile => ({
            id: tile.id,
            coords: tile.coords.
                map(coord => ({
                    x: coord[0],
                    y: coord[1]
                }))
        }));

    let width;
    let height;
    let radius;

    if (type === 'grid') {
        width = board.width;
        height = board.height;
        radius = 0;
    } else {
        width = 0;
        height = 0;
        radius = board.radius;
    }

    const jsonInput = {
        inputType: jsonInputType,
        width: width,
        height: height,
        radius: radius,
        blocked: jsonBlocked,
        tiles: jsonTiles
    }

    return jsonInput;
}

/* Calls the c++ solver, then popuplates the all tiles solution array with the solution
REQUIRES: listOfTiles: [Tile, Tile, ...]
          board: GridBoard or HexBoard object
          type: 'grid' | 'hex'
          date: [dayOfMonth, month, dayOfWeek]
          solveTime: integer, time in seconds to solve the puzzle
RETURNS: 0 if solved, 1 if solver error/no solution found, 2 if date not on puzzle
*/
export async function solvePuzzle(listOfTiles, board, type, date, solveTime) {

    const jsonInput = setupJsonString(listOfTiles, board, type, date);

    try {
        const response = await fetch('/api/solve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonInput)
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        if (data.error) throw new Error(data.error);

        // Populate the solve time and and solution tiles
        solveTime.current = data.timeToSolve;
        listOfTiles.forEach(tile => {
            const solutionTile = data.tiles.find(t => t.id === tile.id);
            if (solutionTile) {
                tile.soln = solutionTile.soln.map(coord => [coord.x, coord.y]);
            }
        });

        return 0;
    } catch (err) {
        console.error('Error:', err);
        return 1;
    }
}