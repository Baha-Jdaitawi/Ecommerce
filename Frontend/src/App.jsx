import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AuthProvider from './features/auth/context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import LoginPage from './features/auth/pages/LoginPage.jsx';
import RegisterPage from './features/auth/pages/RegisterPage.jsx';

import HomePage from './features/products/pages/HomePage.jsx';
import ProductsPage from './features/products/pages/ProductsPage.jsx';
import ProductDetailPage from './features/products/pages/ProductDetailPage.jsx';

import CartPage from './features/cart/pages/CartPage.jsx';

import OrdersPage from './features/orders/pages/OrdersPage.jsx';
import CheckoutPage from './features/orders/pages/CheckoutPage.jsx';
import OrderDetailPage from './features/orders/pages/OrderDetailPage.jsx';
import OrderSuccessPage from './features/orders/pages/OrderSuccessPage.jsx';

import AdminDashboard from './features/admin/pages/AdminDashboard.jsx';
import AdminProducts from './features/admin/pages/AdminProducts.jsx';
import AdminOrders from './features/admin/pages/AdminOrders.jsx';
import AdminUsers from './features/admin/pages/AdminUsers.jsx';
import AdminAddProduct from './features/admin/pages/AdminAddProduct.jsx';
import AdminEditProduct from './features/admin/pages/AdminEditProduct.jsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />

        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/order-success" element={<ProtectedRoute><OrderSuccessPage /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/products/new" element={<AdminRoute><AdminAddProduct /></AdminRoute>} />
        <Route path="/admin/products/:id/edit" element={<AdminRoute><AdminEditProduct /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
