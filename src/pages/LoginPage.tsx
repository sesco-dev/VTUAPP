import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { ArrowLeft, Loader2, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent, role: 'USER' | 'TENANT_ADMIN' | 'SUPER_ADMIN' = 'USER') => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(role);
      setIsLoading(false);
      navigate('/app');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left Pane - Branding & Design */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="z-10">
          <Link to="/" className="flex items-center gap-2 mb-20 inline-flex">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-blue-600 font-bold text-2xl">V</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">VTU-Max</span>
          </Link>
          <h2 className="text-5xl font-extrabold leading-tight mb-6">Empowering the next generation of VTU entrepreneurs.</h2>
          <p className="text-xl text-blue-100 max-w-md">Join thousands of businesses who trust VTU-Max for their daily data and airtime needs.</p>
        </div>
        
        <div className="z-10 bg-blue-700/50 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 max-w-sm">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-400" />
              <div>
                 <p className="font-bold">Adebayo Samuel</p>
                 <p className="text-xs text-blue-200">Platinum Reseller</p>
              </div>
           </div>
           <p className="italic text-blue-50">"Managing my data reselling business has never been this easy. The multi-tenant feature changed everything for us."</p>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />
      </div>

      {/* Right Pane - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-8 md:hidden">
            <ArrowLeft size={18} />
            Back to home
          </Link>
          
          <div className="mb-10 lg:text-left text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-xs text-blue-600 font-bold hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
            </button>
          </form>

          {/* Role selection for demo purposes */}
          <div className="mt-8 pt-8 border-t border-gray-100">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-4">Quick Login (Demo)</p>
             <div className="grid grid-cols-3 gap-2">
                <button onClick={(e) => handleLogin(e, 'USER')} className="text-[10px] bg-gray-100 hover:bg-gray-200 py-2 rounded-lg font-bold transition-colors">User</button>
                <button onClick={(e) => handleLogin(e, 'TENANT_ADMIN')} className="text-[10px] bg-gray-100 hover:bg-gray-200 py-2 rounded-lg font-bold transition-colors">Tenant Admin</button>
                <button onClick={(e) => handleLogin(e, 'SUPER_ADMIN')} className="text-[10px] bg-gray-100 hover:bg-gray-200 py-2 rounded-lg font-bold transition-colors">Super Admin</button>
             </div>
          </div>

          <p className="mt-8 text-center text-gray-600 text-sm">
            Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Start free trial</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
