// ============================================
// LuxeAura - Contact Route
// File: routes/contact.js
// (PHP: php/save_contact.php ki jagah)
// ============================================

const express = require('express');
const router  = express.Router();
const db      = require('../config/db');

// POST /api/contact  — contact message save karo
router.post('/', (req, res) => {
    const { full_name, email, phone, subject, message } = req.body;

    if (!full_name || !email || !message) {
        return res.json({ success: false, message: 'Required fields missing.' });
    }

    const sql = `
        INSERT INTO contact_messages (full_name, email, phone, subject, message)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [full_name, email, phone || '', subject || '', message], (err) => {
        if (err) {
            console.error('Contact save error:', err);
            return res.json({ success: false, message: 'Save failed: ' + err.message });
        }
        res.json({ success: true, message: 'Message saved!' });
    });
});

module.exports = router;
