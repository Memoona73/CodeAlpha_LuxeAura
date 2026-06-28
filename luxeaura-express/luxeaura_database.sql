-- ============================================
-- LUXEAURA DATABASE - phpMyAdmin me paste karo
-- Ye schema PHP files (save_checkout.php, save_contact.php,
-- admin/index.php) ke columns se match karta hai.
-- ============================================

CREATE DATABASE IF NOT EXISTS luxeaura_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE luxeaura_db;

-- ============================================
-- TABLE 1: orders
-- checkout.php se placeOrder() ye sari fields
-- php/save_checkout.php ko POST karta hai
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    order_number   VARCHAR(20)  NOT NULL,
    full_name      VARCHAR(255) NOT NULL,
    email          VARCHAR(255) NOT NULL,
    phone          VARCHAR(20),
    address        VARCHAR(255),
    city           VARCHAR(100),
    country        VARCHAR(100),
    product_name   VARCHAR(255) NOT NULL,
    quantity       INT DEFAULT 1,
    unit_price     DECIMAL(10,2) DEFAULT 0,
    gift_box       TINYINT(1) DEFAULT 0,
    total          DECIMAL(10,2) NOT NULL,

    -- Card info (sirf last 4 digits store hoti hain)
    card_type      VARCHAR(50) DEFAULT 'Visa',
    card_last4     CHAR(4),
    card_expiry    VARCHAR(10),

    payment_status ENUM('pending','paid','failed') DEFAULT 'paid',
    status         ENUM('pending','processing','confirmed','shipped','delivered','cancelled') DEFAULT 'pending',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Demo order insert (admin panel test karne ke liye)
INSERT INTO orders
    (order_number, full_name, email, phone, address, city, country,
     product_name, quantity, unit_price, gift_box, total,
     card_type, card_last4, card_expiry, payment_status, status)
VALUES
    ('LA-10001', 'Ayesha Khan', 'ayesha@example.com', '+92 300 1234567',
     'House 12, Street 5, Block A', 'Lahore', 'Pakistan',
     'Diamond Bridal Set', 1, 150000.00, 1, 150250.00,
     'Visa', '4242', '12/27', 'paid', 'pending');

-- ============================================
-- TABLE 2: contact_messages
-- contact.php form -> php/save_contact.php
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    full_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    phone      VARCHAR(20),
    subject    VARCHAR(255),
    message    TEXT NOT NULL,
    status     ENUM('new','read') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES for faster queries
-- ============================================
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_order_email  ON orders(email);
CREATE INDEX idx_msg_status   ON contact_messages(status);
