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

async function getAllPuzzleInfo() {
    const connection = await mysql.getConnection();

    try {
        const query = `
            SELECT puzzle_name, puzzle_type, DATE_FORMAT(date_created, '%Y-%m-%d') AS date_created

            FROM Puzzles 
            ORDER BY date_created DESC`;
            
        const [rows] = await connection.execute(query);
        return rows.map(row => ({
            puzzleName: row.puzzle_name,
            puzzleType: row.puzzle_type,
            dateCreated: row.date_created
        }));

    } catch (error) {
        console.error("Error fetching all puzzle info:", error);
        throw error;
    } finally {
        connection.release();
    }
}

async function getSpecificPuzzle(puzzleName) {
    const connection = await mysql.getConnection();

    try {
        const query = `
            SELECT puzzle_name, puzzle_data
            FROM Puzzles 
            WHERE puzzle_name = ?`;

        const [rows] = await connection.execute(query, [puzzleName]);

        if (rows.length === 0) {
            throw new Error(`Puzzle with name ${puzzleName} not found`);
        }

        return {
            puzzleName: rows[0].puzzle_name,
            puzzleData: JSON.parse(rows[0].puzzle_data)
        };
    } catch (error) {
        console.error("Error fetching specific puzzle:", error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { savePuzzle, getAllPuzzleInfo, getSpecificPuzzle };