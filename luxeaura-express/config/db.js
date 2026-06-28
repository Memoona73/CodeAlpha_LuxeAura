// ============================================
// LuxeAura - Database Config
// File: config/db.js
// (PHP config.php ki jagah yeh file hai)
// ============================================

const mysql = require('mysql2');

// MySQL connection (XAMPP same settings)
const db = mysql.createConnection({
    host:     'localhost',
    user:     'root',       // XAMPP default
    password: '',           // XAMPP mein password khali hota hai
    database: 'luxeaura_db'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        return;
    }
    console.log('✅ MySQL connected successfully!');
});

module.exports = db;
