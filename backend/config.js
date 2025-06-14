// config.js
require('dotenv').config();
const mysql = require('mysql2');

// Create a MySQL connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',   // Database host
    user: process.env.DB_USER || 'root',        // Database username
    password: process.env.DB_PASSWORD || 'welcome123', // Database password
    database: process.env.DB_NAME || 'dcdslproject', // Database name
    waitForConnections: true,
    connectionLimit: 10,    // Maximum number of connections in the pool
    queueLimit: 0           // No limit on queued connection requests
});

// Test the database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
        connection.release(); // Release the connection back to the pool
    }
});

module.exports = db.promise(); // Export the pool with promises
