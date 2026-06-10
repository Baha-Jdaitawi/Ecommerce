

Modern full-stack e-commerce platform built with React, Node.js, Express, PostgreSQL, and Stripe. The application provides a complete online shopping experience with authentication, product management, shopping cart functionality, secure payments, order tracking, reviews, and an administrative dashboard.

## Features

### Authentication & Authorization
- User registration and login
- JWT authentication
- HTTP-only cookie-based sessions
- Protected routes
- Role-based access control
- Persistent authentication state

### Product Management
- Product catalog
- Product details page
- Search functionality
- Category filtering
- Product image uploads
- Stock management
- Admin product CRUD operations

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Clear cart
- Real-time total calculation

### Orders & Payments
- Stripe Checkout integration
- Secure payment processing
- Order creation and tracking
- Order history
- Order details view
- Order status management

### Reviews
- Product ratings
- Customer reviews
- Review moderation

### Admin Dashboard
- Revenue analytics
- Product management
- Order management
- User management

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
Feature-Driven Architecture

- Authentication
- Products
- Cart
- Orders
- Reviews
- Admin

Each feature contains its own pages, components, hooks, services, and API layer.

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
- Orders
- Order Items
- Reviews

### Users
- Authentication and authorization data

### Products
- Product catalog and inventory

### Cart
- User shopping cart items

### Orders
- Purchase and payment records

### Order Items
- Products associated with each order

### Reviews
- Product ratings and customer feedback






