# REIGN — E-Commerce Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Modern full-stack e-commerce platform built with React, Node.js, Express, PostgreSQL, and Stripe. The application provides a complete online shopping experience with authentication, product management, shopping cart functionality, secure payments, order tracking, reviews, and an administrative dashboard.

## Screenshots

### Homepage
![Homepage Hero](screenshots/homepage-hero-guest.png)
![Homepage Featured](screenshots/homepage-featured-guest.png)

### Products
![Products Page](screenshots/products-page.png)
![Product Detail](screenshots/product-detail-guest.png)
![Product Reviews](screenshots/product-reviews.png)

### Authentication
![Register](screenshots/register-page.png)
![Login](screenshots/login-page.png)

### Shopping
![Cart](screenshots/cart-page.png)
![Checkout](screenshots/checkout-page.png)
![Stripe Payment](screenshots/stripe-payment.png)
![Order Success](screenshots/order-success.png)

### Orders
![Orders History](screenshots/orders-history.png)
![Order Detail](screenshots/order-detail.png)

### Admin
![Admin Dashboard](screenshots/admin-dashboard.png)
![Admin Products](screenshots/admin-products.png)
![Admin Add Product](screenshots/admin-add-product.png)
![Admin Orders](screenshots/admin-orders.png)
![Admin Users](screenshots/admin-users.png)

## Features

### Authentication & Authorization
- User registration and login with password validation
- JWT authentication with HTTP-only cookie-based sessions
- Role-based access control (admin/customer)
- Protected and admin-only routes
- Persistent authentication state

### Product Management
- Product catalog with search and category filtering
- Product detail pages with stock display
- Product image uploads via Multer
- Admin product CRUD operations

### Shopping Cart
- Add, update, and remove items
- Real-time total calculation
- In-cart state indicator on product cards
- Clear cart functionality

### Orders & Payments
- Stripe Checkout integration
- Webhook-based order confirmation
- Order creation and tracking
- Order history and detail view
- Admin order status management

### Reviews
- Product star ratings and comments
- One review per user per product
- Admin review moderation

### Admin Dashboard
- Revenue, orders, users, and products stats
- Product, order, and user management

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- Context API

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- Multer
- Stripe

## Architecture

### Frontend
Feature-Driven Architecture — each feature contains its own pages, components, hooks, services, and API layer.

- Authentication
- Products
- Cart
- Orders
- Reviews
- Admin

### Backend
Layered Architecture

- Routes
- Controllers
- Middleware
- Models
- Database Migrations
- Configuration

## Database

PostgreSQL relational database managed through migration-based schema versioning to ensure consistent and maintainable database changes across environments.

### Core Entities
- Users
- Products
- Cart
- Orders & Order Items
- Reviews

## Setup

### Prerequisites
- Node.js
- PostgreSQL
- Stripe account

### Backend
```bash
cd Backend
npm install
npm run migrate
npm run dev
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

### Stripe Webhook (local development)
```bash
./stripe listen --forward-to localhost:5000/api/orders/webhook
```






