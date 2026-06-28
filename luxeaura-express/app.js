// ============================================
// LuxeAura - Express.js Backend
// Main Server File
// ============================================

const express = require('express');
const path    = require('path');
const cors    = require('cors');

const orderRoutes   = require('./routes/orders');
const contactRoutes = require('./routes/contact');
const cartRoutes    = require('./routes/cart');

const app  = express();
const PORT = 3000;

// ── Middleware ──────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ──────────────────────────────────
// API Routes (ye PHP files ki jagah hain)
app.use('/api/orders',  orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/cart',    cartRoutes);

// ── HTML Pages ──────────────────────────────
// PHP files ki jagah ab yahan se HTML serve hoga
app.get('/',            (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/collections', (req, res) => res.sendFile(path.join(__dirname, 'views', 'collections.html')));
app.get('/products',    (req, res) => res.sendFile(path.join(__dirname, 'views', 'products.html')));
app.get('/about',       (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/contact',     (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));
app.get('/checkout',    (req, res) => res.sendFile(path.join(__dirname, 'views', 'checkout.html')));
app.get('/admin',       (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin.html')));

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ LuxeAura server is running: http://localhost:${PORT}`);
});
