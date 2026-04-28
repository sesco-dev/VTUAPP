import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Wallet, Smartphone, ShieldCheck, Database, Rocket, LayoutDashboard, Zap, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">V</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">VTU-Max</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#developers" className="hover:text-blue-600 transition-colors">Developers</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          <Link to="/login" className="px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors">Login</Link>
          <Link to="/signup" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm">Get Started</Link>
        </div>

        <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden flex flex-col p-6 animate-in slide-in-from-right duration-200">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">V</span>
              </div>
              <span className="text-2xl font-bold">VTU-Max</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)}><X size={28} /></button>
          </div>
          <nav className="flex flex-col gap-6 text-xl font-medium text-gray-800">
            <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#developers" onClick={() => setIsMenuOpen(false)}>Developers</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <hr className="border-gray-100" />
            <Link to="/login" className="text-blue-600">Login</Link>
            <Link to="/signup" className="w-full py-4 bg-blue-600 text-white rounded-xl text-center shadow-lg active:scale-95 transition-transform">Get Started</Link>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100"
        >
          <Zap size={16} />
          <span>New: Enterprise Multi-Tenant Platform</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900 mb-6 max-w-4xl"
        >
          The Operating System for <span className="text-blue-600">VTU Businesses</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed"
        >
          An all-in-one platform to buy data, airtime, and pay bills at reseller rates. Scale your business with our white-label SaaS multi-tenant solution.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700 shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-2">
            Get Started Free <ArrowRight size={20} />
          </Link>
          <Link to="/login" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl text-lg font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            View Live Demo
          </Link>
        </motion.div>

        {/* Hero Visual Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 w-full max-w-5xl bg-gray-900 rounded-3xl p-4 md:p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="aspect-[16/9] bg-gray-800 rounded-2xl border border-gray-700 flex flex-col md:flex-row shadow-inner">
             {/* Sidebar Mockup */}
             <div className="hidden md:block w-48 border-r border-gray-700 p-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg mb-8" />
                <div className="space-y-4">
                   <div className="h-3 w-full bg-gray-700 rounded" />
                   <div className="h-3 w-3/4 bg-gray-700 rounded opacity-60" />
                   <div className="h-3 w-full bg-gray-700 rounded" />
                   <div className="h-3 w-1/2 bg-gray-700 rounded opacity-60" />
                </div>
             </div>
             {/* Main Mockup */}
             <div className="flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                   <div className="h-8 w-48 bg-white/10 rounded-lg" />
                   <div className="h-10 w-10 bg-white/5 rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="h-32 bg-blue-600/20 rounded-2xl border border-blue-500/30 p-6 flex flex-col justify-end">
                      <div className="h-6 w-32 bg-blue-400/40 rounded mb-2" />
                      <div className="h-8 w-16 bg-white/90 rounded" />
                   </div>
                   <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
                </div>
                <div className="mt-8 space-y-4">
                   <div className="h-4 w-full bg-white/5 rounded" />
                   <div className="h-4 w-full bg-white/5 rounded" />
                   <div className="h-4 w-3/4 bg-white/5 rounded" />
                </div>
             </div>
          </div>
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 blur-[120px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 blur-[120px] -ml-32 -mb-32" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Built for Scale and Speed</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Everything you need to run a modern VTU platform, right from your browser.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Wallet size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Wallet Funding</h3>
              <p className="text-gray-600">Integrated with Paystack and Monnify for seamless automated funding 24/7.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Multinetwork VTU</h3>
              <p className="text-gray-600">Support for all major networks. Data, Airtime, Cable TV, and Utility bills in one place.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Robust Developer API</h3>
              <p className="text-gray-600">Connect your website or app to our lightning-fast endpoints. Well-documented and reliable.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secured Platform</h3>
              <p className="text-gray-600">Enterprise-grade security, 2FA, and transaction pin protection for every account.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <LayoutDashboard size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Tenant SaaS</h3>
              <p className="text-gray-600">Launch your own branded platform. Control pricing, users, and margins from your admin dashboard.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Optimized routing ensures transactions are delivered in milliseconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">V</span>
                </div>
                <span className="text-2xl font-bold tracking-tight text-gray-900">VTU-Max</span>
              </div>
              <p className="text-gray-500 max-w-sm">The leading white-label VTU solution for growing businesses.</p>
            </div>
            <div className="flex gap-10 text-sm font-medium text-gray-600">
               <div className="flex flex-col gap-3">
                  <span className="text-gray-900 font-bold mb-2">Platform</span>
                  <a href="#">Solutions</a>
                  <a href="#">Resellers</a>
                  <a href="#">Developers</a>
               </div>
               <div className="flex flex-col gap-3">
                  <span className="text-gray-900 font-bold mb-2">Company</span>
                  <a href="#">About Us</a>
                  <a href="#">Contact</a>
                  <a href="#">Terms</a>
               </div>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
            © 2026 VTU-Max SaaS. All rights reserved. Built with precision.
         </div>
      </footer>
    </div>
  );
}
