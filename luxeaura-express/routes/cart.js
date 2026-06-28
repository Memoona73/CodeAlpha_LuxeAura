// ============================================
// LuxeAura - Cart Route
// File: routes/cart.js
// (PHP: php/cart.php ki jagah)
// ============================================

const express = require('express');
const router  = express.Router();

// In-memory cart (session ki jagah)
// Production mein localStorage ya database use karein
let cart = [];

// POST /api/cart  — item add karo
router.post('/', (req, res) => {
    const { name, quantity, subtotal, giftBox, variant, color } = req.body;

    if (!name) {
        return res.json({ success: false, message: 'Product name missing.' });
    }

    cart.push({ name, quantity: quantity || 1, subtotal, giftBox, variant, color });

    res.json({ success: true, message: 'Added to cart!', cart });
});

// GET /api/cart  — cart dekho
router.get('/', (req, res) => {
    res.json({ success: true, cart });
});

// DELETE /api/cart  — cart clear karo
router.delete('/', (req, res) => {
    cart = [];
    res.json({ success: true, message: 'Cart cleared.' });
});

module.exports = router;
