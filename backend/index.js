const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise'); 

const app = express();
const PORT = 3001;

const solverRoute = require("./api/SolverController");
const mysqlRoute = require("./api/MySQLController");

app.use(cors());
app.use(express.json());
app.use("/solver", solverRoute);
app.use("/mysql", mysqlRoute);

async function initializeDatabase() {
	try {
		const initSQL = fs.readFileSync(path.join(__dirname, '..', 'backend/mysql', 'Init.sql'), 'utf-8');

		const connection = await mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'sqlparty000', 
			multipleStatements: true
		});

		await connection.query(initSQL);
		await connection.end();

		console.log('MySQL initialized, running at http://localhost:3306/np_dater.');
	} catch (err) {
		console.error('Failed to initialize database:', err.message);
		throw err; 
	}
}

async function startServer() {
	try {
		await initializeDatabase();

		app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error('Server startup failed.');
		process.exit(1);
	}
}

startServer();
