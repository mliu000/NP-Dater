const mysql = require('../mysql/MySQL');

/*
Mu Ye Liu - June 2025

Represents the MySQLService for handling MySQL database operations
*/

// Saves the puzzle to the MySQL database
async function savePuzzle(puzzleName, puzzleType, puzzleData) {

    const connection = await mysql.getConnection();
    
    try {
        const query = `
            INSERT INTO Puzzles (puzzle_name, puzzle_type, puzzle_data)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE
                puzzle_type = VALUES(puzzle_type),
                puzzle_data = VALUES(puzzle_data)`;

        const values = [puzzleName, puzzleType, JSON.stringify(puzzleData)];

        await connection.execute(query, values);
    } catch (error) {
        console.error("Error saving puzzle:", error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { savePuzzle };