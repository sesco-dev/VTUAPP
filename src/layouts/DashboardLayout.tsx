import { LayoutDashboard, Wallet, ReceiptText, User, ShoppingCart, Settings, Users, ShieldCheck, LogOut, Menu, X } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const commonLinks = [
    { name: 'Dashboard', to: '/app', icon: LayoutDashboard },
    { name: 'Wallet', to: '/app/wallet', icon: Wallet },
    { name: 'Transactions', to: '/app/transactions', icon: ReceiptText },
    { name: 'Buy Data', to: '/app/buy-data', icon: ShoppingCart },
    { name: 'Settings', to: '/app/settings', icon: Settings },
  ];

  const tenantLinks = [
    { name: 'Admin Overview', to: '/app/tenant-admin', icon: LayoutDashboard },
    { name: 'Users', to: '/app/tenant-admin/users', icon: Users },
  ];

  const superAdminLinks = [
    { name: 'Super Dashboard', to: '/app/super-admin', icon: ShieldCheck },
    { name: 'Tenants', to: '/app/super-admin/tenants', icon: Users },
  ];

  let links = [...commonLinks];
  if (user?.role === 'TENANT_ADMIN') links = [...tenantLinks, ...commonLinks];
  if (user?.role === 'SUPER_ADMIN') links = [...superAdminLinks, ...commonLinks];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-30">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
               <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">VTU-Max</span>
          </div>
          
          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                <link.icon size={18} />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="font-bold text-lg tracking-tight">VTU-Max</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-white z-50 p-6 md:hidden flex flex-col"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <span className="font-bold text-lg tracking-tight">VTU-Max</span>
              </div>
              <nav className="space-y-1">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        isActive 
                          ? "bg-blue-50 text-blue-700" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )
                    }
                  >
                    <link.icon size={18} />
                    {link.name}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto pt-4 border-t border-gray-200">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-6 md:pt-8 min-w-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (Alternative to Sidebar for quick actions) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-30">
        <NavLink to="/app" className={({ isActive }) => cn("flex flex-col items-center p-2 text-xs", isActive ? "text-blue-600" : "text-gray-500")}>
          <LayoutDashboard size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/app/buy-data" className={({ isActive }) => cn("flex flex-col items-center p-2 text-xs", isActive ? "text-blue-600" : "text-gray-500")}>
          <ShoppingCart size={20} />
          <span>Buy</span>
        </NavLink>
        <NavLink to="/app/wallet" className={({ isActive }) => cn("flex flex-col items-center p-2 text-xs", isActive ? "text-blue-600" : "text-gray-500")}>
          <Wallet size={20} />
          <span>Wallet</span>
        </NavLink>
        <NavLink to="/app/transactions" className={({ isActive }) => cn("flex flex-col items-center p-2 text-xs", isActive ? "text-blue-600" : "text-gray-500")}>
          <ReceiptText size={20} />
          <span>Logs</span>
        </NavLink>
        <NavLink to="/app/settings" className={({ isActive }) => cn("flex flex-col items-center p-2 text-xs", isActive ? "text-blue-600" : "text-gray-500")}>
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}
