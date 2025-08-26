// Sets up the MySQL connection pool for the backend
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',               // or your MySQL user
    password: 'Sqlparty@000', // replace with your actual password
    database: 'np_dater', // create this database if not yet done
});

module.exports = pool;
