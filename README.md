# Agri Shop — Farmer to Buyer Marketplace (MERN Stack)

A full-stack MERN application connecting farmers directly to buyers, cutting
out middlemen. Farmers list produce; buyers browse, add to cart, and place
orders paid through an in-app wallet.

## Stack
- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcrypt
- **File uploads:** Multer (product images)

## Folder Structure
```
agri-shop/
├── server/          Express API
│   ├── models/       User, Product, Cart, Order
│   ├── controllers/  business logic
│   ├── routes/       API routes
│   ├── middleware/   auth (JWT), upload (Multer)
│   └── server.js     entry point
└── client/          React app
    ├── src/pages/         Home, Login, Register, Cart, Checkout, Orders, Wallet
    ├── src/pages/farmer/  Farmer dashboard, add/edit product, farmer orders
    ├── src/components/    Navbar, ProductCard, PrivateRoute
    ├── src/context/       AuthContext (JWT + user state)
    └── src/api/           Axios instance
```

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI (local Mongo or MongoDB Atlas) and a real JWT_SECRET
npm run dev      # requires nodemon (npm install -D nodemon), or: npm start
```
Server runs on `http://localhost:5000`.

### 2. Frontend
```bash
cd client
npm install
cp .env.example .env
npm start
```
App runs on `http://localhost:3000`.

### 3. MongoDB
- Local: install MongoDB Community Server and run `mongod`, or
- Cloud: create a free cluster on MongoDB Atlas and paste the connection
  string into `server/.env` as `MONGO_URI`.

## How the modules map to the original spec

| Spec module (Farmer)      | Implementation |
|----------------------------|----------------|
| Register / Login / OTP     | JWT-based register/login (OTP swapped for email/password — simpler for a mini-project; can add Twilio/Firebase OTP later) |
| Add / Update / Delete Product, Upload Images | `POST/PUT/DELETE /api/products`, Multer image upload |
| Manage Orders / Update Order Status | `GET /api/orders/farmer`, `PUT /api/orders/:id/status` |
| My Sales | Farmer's own product + order lists in dashboard |

| Spec module (Buyer/Public) | Implementation |
|------------------------------|----------------|
| Register / Login / OTP       | Same JWT auth, role = buyer |
| Manage Wallet Balance         | `POST /api/users/wallet/add`, deducted on order placement |
| Search / View Product         | `GET /api/products?q=&category=&locality=` |
| Add/Edit/Delete Cart           | `/api/cart` endpoints |
| Add/Edit Shipping Address      | `/api/users/address` endpoints |
| Place Order / View Order Status | `POST /api/orders`, `GET /api/orders/mine` |

## Key API Endpoints
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/products                (search/browse, public)
GET    /api/products/:id            (public)
POST   /api/products                (farmer, multipart with images)
PUT    /api/products/:id            (farmer)
DELETE /api/products/:id            (farmer)
GET    /api/products/farmer/mine    (farmer)

GET    /api/cart                    (buyer)
POST   /api/cart                    (buyer)
PUT    /api/cart                    (buyer)
DELETE /api/cart/:productId         (buyer)

POST   /api/orders                  (buyer — places order, pays via wallet)
GET    /api/orders/mine             (buyer)
GET    /api/orders/farmer           (farmer)
PUT    /api/orders/:id/status       (farmer)

POST   /api/users/wallet/add
POST   /api/users/address
PUT    /api/users/address/:addressId
DELETE /api/users/address/:addressId
```

## Notes / Next Steps
- OTP verification was replaced with standard email/password JWT auth to keep
  the mini-project scope manageable — Twilio or Firebase Auth can be added
  later if the OTP requirement is graded specifically.
- Wallet is a simple internal ledger (no real payment gateway) — good enough
  for a mini-project demo. Razorpay/Stripe test mode can be swapped in.
- Deploy: frontend → Vercel/Netlify, backend → Render/Railway, DB → MongoDB
  Atlas free tier.
