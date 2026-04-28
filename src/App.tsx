import React, { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import BuyDataFlow from './pages/BuyDataFlow';
import TransactionsPage from './pages/TransactionsPage';
import WalletPage from './pages/WalletPage';
import TenantAdminPage from './pages/TenantAdminPage';

function ProtectedRoute({ children, role }: { children: ReactNode, role?: 'USER' | 'TENANT_ADMIN' | 'SUPER_ADMIN' }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role && user.role !== 'SUPER_ADMIN') return <Navigate to="/app" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          
          <Route path="/app" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="buy-data" element={<BuyDataFlow />} />
            <Route path="buy-airtime" element={<BuyDataFlow />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="settings" element={<div className="p-8">Settings Page (Coming Soon)</div>} />
            <Route path="tenant-admin" element={
              <ProtectedRoute role="TENANT_ADMIN">
                 <TenantAdminPage />
              </ProtectedRoute>
            } />
            <Route path="super-admin" element={
               <ProtectedRoute role="SUPER_ADMIN">
                  <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                     <h1 className="text-4xl font-black text-gray-900 mb-4">Super Admin Core</h1>
                     <p className="text-gray-500">Root-level management for all 148 tenants on the VTU-Max network.</p>
                     <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                           <p className="text-3xl font-black text-blue-600">₦2.4M</p>
                           <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">Platform Revenue (24h)</p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                           <p className="text-3xl font-black text-green-600">148</p>
                           <p className="text-xs font-bold text-green-400 uppercase tracking-widest mt-1">Active Tenants</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                           <p className="text-3xl font-black text-purple-600">0.05%</p>
                           <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mt-1">Failed Transaction Rate</p>
                        </div>
                     </div>
                  </div>
               </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
