/*
Mu Ye Liu - June 2025

Represents the Persistence API for handling puzzle persistence operations
*/

// Saves the puzzle. Returns true if successful, false if not.
export async function savePuzzle(listOfTiles, board, puzzleType, puzzleName) {
    // Start by converting the objects to a json string

    const tilesJson = listOfTiles.current.map(tile => ({
        id: tile.id,
        coords: tile.coords.map(coord => ({
            x: coord[0],
            y: coord[1]
        }))
    }));

    const boardJson = puzzleType === 'grid' ? {
        type: 0,
        width: board.current.width,
        height: board.current.height,
        radius: 0,
        gridCoords: board.current.gridCoords.map(c => ({
            coord: {
                x: c.Coord[0],
                y: c.Coord[1]
            },
            specialAttribute: c.specialAttribute
        }))
    } : {
        type: 1,
        width: 0,
        height: 0,
        radius: board.current.radius,
        hexCoords: board.current.hexCoords.map(c => ({
            coord: {
                x: c.Coord[0],
                y: c.Coord[1]
            },
            specialAttribute: c.specialAttribute
        }))
    };

    const puzzleJson = {
        tiles: tilesJson,
        board: boardJson
    };

    const jsonString = {
        pname: puzzleName,
        ptype: puzzleType === 'grid' ? 0 : 1,
        pjson: puzzleJson
    };

    // Make the API request

    try {
        await apiRequest('/persistence/save', 'POST', jsonString);
        return true;
    } catch (err) {
        console.error("Error saving puzzle:", err);
        return false;
    }

}
