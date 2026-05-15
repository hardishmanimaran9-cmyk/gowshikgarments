import { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './store/cartStore';
import ToastProvider from './components/shared/Toast';

// Customer
import CustomerNav from './components/customer/CustomerNav';
import BottomTabBar from './components/customer/BottomTabBar';
import Catalog from './pages/customer/Catalog';
import Order from './pages/customer/Order';
import OrderSuccess from './pages/customer/OrderSuccess';
import CustomerLogin from './pages/customer/Login';
import CustomerProtectedRoute from './components/customer/CustomerProtectedRoute';

// Owner
import ProtectedRoute from './components/owner/ProtectedRoute';
import Sidebar from './components/owner/Sidebar';
import Drawer from './components/owner/Drawer';
import Login from './pages/owner/Login';
import Dashboard from './pages/owner/Dashboard';
import Upload from './pages/owner/Upload';
import Orders from './pages/owner/Orders';
import Settings from './pages/owner/Settings';

import { IconMenu2 } from '@tabler/icons-react';

function CustomerLayout() {
  return (
    <>
      <CustomerNav />
      <Outlet />
      <BottomTabBar />
    </>
  );
}

function OwnerLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="owner-layout">
      <Sidebar />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="owner-mobile-header mobile-only">
        <button className="hamburger" onClick={() => setDrawerOpen(true)}>
          <IconMenu2 size={24} />
        </button>
        <span className="mobile-title">Gowshik Garments</span>
      </div>
      <main className="owner-main">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<CustomerLogin />} />
          
          {/* Protected Customer routes */}
          <Route element={<CustomerProtectedRoute><CustomerLayout /></CustomerProtectedRoute>}>
            <Route path="/" element={<Catalog />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/success" element={<OrderSuccess />} />
          </Route>

          {/* Owner routes */}
          <Route element={<ProtectedRoute><OwnerLayout /></ProtectedRoute>}>
            <Route path="/owner/dashboard" element={<Dashboard />} />
            <Route path="/owner/upload" element={<Upload />} />
            <Route path="/owner/orders" element={<Orders />} />
            <Route path="/owner/settings" element={<Settings />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

