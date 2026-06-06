import { Routes, Route } from 'react-router-dom';
import AuthProvider from './features/auth/context/AuthContext.jsx';
import LoginPage from './features/auth/pages/LoginPage.jsx';
import RegisterPage from './features/auth/pages/RegisterPage.jsx';
import HomePage from './features/products/pages/HomePage.jsx';
import ProductsPage from './features/products/pages/ProductsPage.jsx';
import ProductDetailPage from './features/products/pages/ProductDetailPage.jsx';
import CartPage from './features/cart/pages/CartPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
