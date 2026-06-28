// ============================================
// LuxeAura - Orders Route
// File: routes/orders.js
// (PHP: php/save_checkout.php ki jagah)
// ============================================

const express = require('express');
const router  = express.Router();
const db      = require('../config/db');

// POST /api/orders  — order save karo
router.post('/', (req, res) => {
    const {
        first_name, last_name, email, phone,
        address, city, country,
        card_type, card_last4, card_expiry,
        product_name, quantity, unit_price,
        gift_box, total_price
    } = req.body;

    const full_name = `${first_name || ''} ${last_name || ''}`.trim();

    // Basic validation
    if (!full_name || !email || !product_name) {
        return res.json({ success: false, message: 'Required fields missing.' });
    }

    const order_number = 'LA-' + Math.floor(10000 + Math.random() * 90000);
    const giftBoxVal   = gift_box === 'true' || gift_box === true ? 1 : 0;

    const sql = `
        INSERT INTO orders
        (order_number, full_name, email, phone, address, city, country,
         product_name, quantity, unit_price, gift_box, total,
         card_type, card_last4, card_expiry, payment_status, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'paid', 'pending')
    `;

    const values = [
        order_number, full_name, email, phone,
        address, city, country,
        product_name, quantity || 1, unit_price || 0,
        giftBoxVal, total_price || 0,
        card_type || 'Visa', card_last4 || '', card_expiry || ''
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Order save error:', err);
            return res.json({ success: false, message: 'Order save failed: ' + err.message });
        }
        res.json({ success: true, message: 'Order placed!', order_number });
    });
});

// GET /api/orders  — admin panel ke liye saare orders
router.get('/', (req, res) => {
    db.query('SELECT * FROM orders ORDER BY created_at DESC', (err, rows) => {
        if (err) return res.json({ success: false, message: err.message });
        res.json({ success: true, orders: rows });
    });
});

// POST /api/orders/update-status  — order status change karo
router.post('/update-status', (req, res) => {
    const { order_id, status } = req.body;
    db.query('UPDATE orders SET status = ? WHERE id = ?', [status, order_id], (err) => {
        if (err) return res.json({ success: false, message: err.message });
        res.json({ success: true, message: 'Status updated!' });
    });
});

module.exports = router;
