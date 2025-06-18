const mysql = require('../mysql/MySQL.js');

async function testConnection() {
    try {
        // Attempt to get a connection from the pool
        const connection = await mysql.getConnection();
        
        // If successful, release the connection back to the pool
        await connection.release();
        
        console.log("MySQL connection is working.");
        return true;
    } catch (error) {
        console.error("MySQL connection failed:", error);
        return false;
    }
}

testConnection();