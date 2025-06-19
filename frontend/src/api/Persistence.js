import { postRequest, getRequest } from './Requests';
/*
Mu Ye Liu - June 2025

Represents the Persistence API for handling puzzle persistence operations
*/

// Saves the puzzle. Returns true if successful, false if not.
export async function savePuzzle(listOfTiles, board, puzzleType, puzzleName, hexagonOrientation,
    totalNoTileCreatedHistory, dateFormat) {
    // Start by converting the objects to a json string

    const tilesJson = listOfTiles.current.map(tile => ({
        id: tile.id,
        coords: tile.coords.map(coord => ({
            x: coord[0],
            y: coord[1]
        })),
        color: tile.color,
    }));

    const boardJson = puzzleType === 'grid' ? {
        type: 0,
        width: board.current.width,
        height: board.current.height,
        dateFormat: dateFormat,
        totalNoTileCreatedHistory: totalNoTileCreatedHistory,
        gridCoords: board.current.gridCoords.map(c => ({
            coord: {
                x: c.Coord[0],
                y: c.Coord[1]
            },
            specialAttribute: c.specialAttribute
        }))
    } : {
        type: 1,
        radius: board.current.radius,
        hexagonOrientation: hexagonOrientation,
        dateFormat: dateFormat,
        totalNoTileCreatedHistory: totalNoTileCreatedHistory.current,
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

    const jsonInput = {
        pname: puzzleName,
        ptype: puzzleType === 'grid' ? 0 : 1,
        pjson: puzzleJson
    };

    // Make the API request

    try {
        await postRequest('http://localhost:3001/mysql/save', jsonInput);
        return true;
    } catch (err) {
        console.error("Error saving puzzle:", err);
        return false;
    }

}

// Gets all the puzzle info
export async function getAllPuzzleInfo() {
    try {
        const data = await getRequest('http://localhost:3001/mysql/getAllPuzzleInfo');
        return data;
    } catch (err) {
        console.error("Error fetching puzzle info:", err);
        return [];
    }
}

// Gets the specific puzzle by name
export async function getSpecificPuzzle(puzzleName) {
    try {
        const data = await getRequest(`http://localhost:3001/mysql/getSpecificPuzzle/${puzzleName}`);
        return data;
    } catch (err) {
        console.error("Error fetching specific puzzle:", err);
        return null;
    }
}
