# LuxeAura - Express.js E-Commerce Website
**CodeAlpha Full Stack Development Internship — Task 1**

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express.js
- **Database:** MySQL (via mysql2 package)

## Project Structure
```
luxeaura-express/
├── app.js              ← Main server (Express)
├── package.json
├── config/
│   └── db.js           ← MySQL connection
├── routes/
│   ├── orders.js       ← POST /api/orders (checkout)
│   ├── contact.js      ← POST /api/contact
│   └── cart.js         ← POST /api/cart
├── views/              ← HTML pages
│   ├── index.html
│   ├── collections.html
│   ├── products.html
│   ├── about.html
│   ├── contact.html
│   ├── checkout.html
│   └── admin.html
├── public/
│   ├── css/style.css
│   ├── js/script.js
│   └── images/
└── luxeaura_database.sql
```

## How to Run

### Step 1 — Database Setup
1. Open XAMPP → Start **MySQL only** (Apache band karo)
2. Open phpMyAdmin → New Database → `luxeaura_db`
3. Import `luxeaura_database.sql`

### Step 2 — Install Dependencies
```bash
cd luxeaura-express
npm install
```

### Step 3 — Start Server
```bash
node app.js
```

### Step 4 — Open Website
Open browser → http://localhost:3000

## Pages
| URL | Page |
|-----|------|
| http://localhost:3000 | Home |
| http://localhost:3000/collections | Collections |
| http://localhost:3000/products | Products |
| http://localhost:3000/checkout | Checkout |
| http://localhost:3000/contact | Contact |
| http://localhost:3000/about | About |
| http://localhost:3000/admin | Admin Panel |

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Place order |
| GET | /api/orders | Get all orders (admin) |
| POST | /api/orders/update-status | Update order status |
| POST | /api/contact | Save contact message |
| POST | /api/cart | Add to cart |
| GET | /api/cart | View cart |
