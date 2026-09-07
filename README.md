# 🛒 eCart - AI-Powered Full-Stack MERN E-Commerce Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Anthropic Claude AI](https://img.shields.io/badge/AI_Assistant-Claude_3.5_Sonnet-orange.svg)](https://www.anthropic.com/)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-blue.svg)](https://cloudinary.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment-0C2340.svg)](https://razorpay.com/)

An end-to-end, full-stack E-Commerce platform built with modern web technologies, featuring a luxury customer storefront, an intelligent **Claude 3.5 AI Shopping Stylist** (multimodal Voice & Chat Assistant), an executive **Admin Analytics Dashboard**, secure JWT & Google OAuth authentication, Cloudinary media storage, and Razorpay payment gateway integration.

**Author:** **[Siddharth Saurabh](https://github.com/Siddharth-Saurabh)**

---

## 📑 Table of Contents

- [Key Highlights & Upgrades](#-key-highlights--upgrades)
- [Features](#-features)
  - [🤖 Claude AI Shopping Stylist (New)](#-claude-ai-shopping-stylist-new)
  - [🛍️ Customer Storefront](#-customer-storefront)
  - [🛡️ Executive Admin Management Portal](#-executive-admin-management-portal)
  - [🔒 Backend & Security Architecture](#-backend--security-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup (Storefront)](#2-frontend-setup-storefront)
  - [3. Admin Setup (Portal)](#3-admin-setup-portal)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [License](#-license)

---

## 🌟 Key Highlights & Upgrades

- 🤖 **Intelligent Claude 3.5 AI Assistant**: Real-time conversational fashion stylist with full catalog context injection, voice command recognition, and natural speech synthesis.
- 🎨 **Luxury Glassmorphism UI**: Completely reimagined dark aesthetic with fluid animations, glowing accents, and responsive layouts across mobile, tablet, and desktop.
- 📊 **Executive Admin KPI Analytics**: Dynamic calculation of Total Revenue, Total Processed Orders, Active Inventory, and Fulfilled Deliveries.
- 💳 **Seamless Razorpay & COD Checkout**: End-to-end payment gateway with signature verification and order tracking.

---

## ✨ Features

### 🤖 Claude AI Shopping Stylist (New)
- **Live Catalog Awareness**: Injects live product inventory into Claude's context to recommend real items, sizes, and matching outfits.
- **Multimodal Voice & Chat UI**: Floating glowing orb with SpeechRecognition for hands-free voice search/navigation, and interactive conversational drawer.
- **Natural Voice Synthesis**: Speaks answers and styling suggestions aloud with mute toggle.
- **Instant Shortcuts**: One-click prompt chips for trending bestsellers, men's/women's fashion, return policies, and instant cart/order navigation.

### 🛍️ Customer Storefront
- **Dynamic Catalog & Collections**: Real-time search, category filters (Men, Women, Kids), subcategory filters (Topwear, Bottomwear, Winterwear), and price sorting.
- **Product Details & Gallery**: Multi-angle image zoom galleries, size selectors, live stock badges, and related product recommendations.
- **Interactive Cart**: Synchronized cart state across sessions, quantity steppers, item deletion, and live totals.
- **Order Tracking**: Order lifecycle updates (*Order Placed*, *Packing*, *Shipped*, *Out for Delivery*, *Delivered*).
- **Authentication**: JWT token-based authentication with secure `httpOnly` cookies and Google OAuth 2.0.

### 🛡️ Executive Admin Management Portal
- **Dashboard Overview**: Metric cards showing real-time gross revenue, order volume, catalog count, and fulfillment stats.
- **Product Management**: Upload new products with multi-image previews, size variation chips, category selectors, and bestseller flags.
- **Catalog Management**: Real-time product inventory list with instant deletion and editing.
- **Order Pipeline**: Track customer shipping addresses, payment methods, and update order fulfillment statuses.

---

## 📂 Project Structure

```text
eCart/
├── backend/                  # Express REST API Server
│   ├── config/               # DB, Token, Cloudinary configurations
│   ├── controller/           # AI (Claude), Auth, User, Product, Cart, Order controllers
│   ├── middleware/           # isAuth, adminAuth, multer upload middleware
│   ├── model/                # Mongoose Models (User, Product, Order)
│   ├── routes/               # API route definitions (/api/ai, /api/auth, /api/product, etc.)
│   ├── .env.example          # Environment variable template
│   ├── index.js              # Server entry point
│   └── package.json
│
├── frontend/                 # Client Storefront (React 19 + Vite)
│   ├── src/
│   │   ├── assets/           # Logos, banners, audio, icons
│   │   ├── component/        # Claude AI Widget, Nav, Footer, Hero, Card, Policies...
│   │   ├── context/          # ShopContext, AuthContext, UserContext
│   │   ├── pages/            # Home, Collections, Cart, PlaceOrder, Order, Login...
│   │   ├── App.jsx           # Main Router and Layout
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── admin/                    # Admin Dashboard (React 19 + Vite)
│   ├── src/
│   │   ├── component/        # Navbar, Sidebar, Layout components
│   │   ├── context/          # AdminContext, AuthContext
│   │   ├── pages/            # KPI Dashboard, Add Product, Catalog Lists, Orders, Login
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── LICENSE                   # MIT License
├── .gitignore                # Global Git Ignore rules
└── README.md                 # Project Documentation
```

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Configure your `.env` variables with your MongoDB URI, JWT Secret, Admin credentials, Cloudinary keys, Razorpay keys, and Anthropic API key.

Start the backend development server:
```bash
npm run dev
```
> Server runs on `http://localhost:8000`.

---

### 2. Frontend Setup (Storefront)

```bash
cd frontend
npm install
npm run dev
```
> Client runs on `http://localhost:5173`.

---

### 3. Admin Setup (Portal)

```bash
cd admin
npm install
npm run dev
```
> Admin dashboard runs on `http://localhost:5174`.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Backend server port (Default: `8000`) |
| `MONGODB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT generation |
| `ADMIN_EMAIL` | Admin login email address |
| `ADMIN_PASSWORD` | Admin login password |
| `CLOUDINARY_NAME` | Cloudinary Cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret |
| `RAZORPAY_KEY_ID` | Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret |
| `ANTHROPIC_API_KEY` | Anthropic Claude AI API Key |

---

## 📡 API Endpoints

### 🤖 Claude AI (`/api/ai`)
- `POST /api/ai/chat` - Conversational shopping assistant with catalog context injection

### 🔑 Authentication & Users (`/api/auth`, `/api/user`)
- `POST /api/auth/registration` - Register a new customer
- `POST /api/auth/login` - Authenticate customer & issue token cookie
- `POST /api/auth/logout` - Clear auth session cookie
- `POST /api/auth/googlelogin` - Google OAuth authentication
- `POST /api/auth/adminlogin` - Admin authentication
- `GET  /api/user/getuser` - Fetch authenticated customer profile
- `GET  /api/user/getadmin` - Validate authenticated admin status

### 📦 Products (`/api/product`)
- `POST /api/product/addproduct` - Add new product with image uploads (*Admin*)
- `GET  /api/product/list` - Fetch all active products
- `POST /api/product/remove/:id` - Delete product by ID (*Admin*)

### 🛒 Cart (`/api/cart`)
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart item quantity
- `POST /api/cart/get` - Retrieve authenticated user's cart

### 💳 Orders & Payments (`/api/order`)
- `POST /api/order/placeorder` - Create Cash on Delivery order
- `POST /api/order/razorpay` - Initiate Razorpay order transaction
- `POST /api/order/verifyrazorpay` - Verify Razorpay payment signature
- `POST /api/order/userorder` - Fetch user order history
- `POST /api/order/list` - Fetch all platform orders (*Admin*)
- `POST /api/order/status` - Update order tracking status (*Admin*)

---

## 👨‍💻 Author

**Siddharth Saurabh**
- GitHub: [@Siddharth-Saurabh](https://github.com/Siddharth-Saurabh)
- Project: [ECART Repository](https://github.com/Siddharth-Saurabh/ECART.git)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
