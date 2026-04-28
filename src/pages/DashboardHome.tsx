import { Wallet, Smartphone, Tv, Zap, ArrowUpRight, ArrowDownLeft, Clock, ShoppingCart, ChevronRight, AlertCircle, LayoutDashboard, ReceiptText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
  const { user } = useAuth();

  const quickActions = [
    { title: 'Buy Data', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100', to: '/app/buy-data' },
    { title: 'Buy Airtime', icon: Smartphone, color: 'text-green-600', bg: 'bg-green-100', to: '/app/buy-airtime' },
    { title: 'TV Subscription', icon: Tv, color: 'text-purple-600', bg: 'bg-purple-100', to: '/app/tv' },
    { title: 'Electricity', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-100', to: '/app/electricity' },
  ];

  const transactions = [
    { id: 1, type: 'Data Purchase', amount: -2500, status: 'Success', date: 'Today, 10:45 AM', network: 'MTN 5GB' },
    { id: 2, type: 'Wallet Funding', amount: 15000, status: 'Success', date: 'Yesterday, 4:20 PM', method: 'Paystack' },
    { id: 3, type: 'Airtime Purchase', amount: -500, status: 'Failed', date: 'Apr 24, 2026', network: 'Airtel' },
    { id: 4, type: 'Data Purchase', amount: -1000, status: 'Pending', date: 'Apr 23, 2026', network: 'Glo 2.5GB' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Good morning, {user?.name.split(' ')[0]}!</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome to your {user?.tenantName ? `${user.tenantName} ` : ''}dashboard.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/app/wallet" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
             <Wallet size={16} /> Fund Wallet
          </Link>
        </div>
      </header>

      {/* Main Stats and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
           <div className="relative z-10">
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-2">Available Balance</p>
              <div className="flex items-baseline gap-2 mb-8">
                 <span className="text-4xl md:text-5xl font-extrabold tracking-tight">₦{user?.walletBalance.toLocaleString()}</span>
                 <span className="text-blue-200 text-sm">.00</span>
              </div>
              <div className="flex gap-4">
                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <ArrowDownLeft className="text-green-400 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Income</span>
                    </div>
                    <p className="text-xl font-bold">₦45,000</p>
                 </div>
                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                       <ArrowUpRight className="text-red-400 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Spent</span>
                    </div>
                    <p className="text-xl font-bold">₦12,450</p>
                 </div>
              </div>
           </div>
           {/* Decor */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
           <div className="absolute bottom-10 right-10 flex gap-1 transform rotate-6 scale-150 opacity-20 pointer-events-none">
              <div className="w-8 h-8 rounded-lg bg-white" />
              <div className="w-8 h-8 rounded-lg bg-white" />
              <div className="w-8 h-8 rounded-lg bg-white" />
           </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
           <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
             <LayoutDashboard size={18} className="text-blue-600" />
             Quick Service
           </h3>
           <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link 
                  key={action.title} 
                  to={action.to}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100"
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform", action.bg, action.color)}>
                    <action.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-gray-700 text-center">{action.title}</span>
                </Link>
              ))}
           </div>
        </div>
      </div>

      {/* Grid Content: Transactions & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 pb-0 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Clock size={18} className="text-blue-600" />
              Recent Activities
            </h3>
            <Link to="/app/transactions" className="text-xs font-bold text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="mt-4 p-2 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 hidden md:table-cell text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors group cursor-pointer border-b border-gray-50 last:border-0">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0",
                          tx.amount > 0 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                        )}>
                          {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ShoppingCart size={18} />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{tx.type}</p>
                          <p className="text-xs text-gray-500 font-medium">{tx.network || tx.method}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn("font-bold", tx.amount > 0 ? "text-green-600" : "text-gray-900")}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                        tx.status === 'Success' ? "bg-green-100 text-green-700" : 
                        tx.status === 'Pending' ? "bg-orange-100 text-orange-700" : 
                        "bg-red-100 text-red-700"
                      )}>
                        {tx.status}
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-right text-xs text-gray-400 font-medium whitespace-nowrap">
                      {tx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {transactions.length === 0 && (
            <div className="p-12 flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <ReceiptText size={32} />
               </div>
               <p className="text-gray-500 font-medium">No transactions found.</p>
            </div>
          )}
        </div>

        {/* Sidebar Info/Promos */}
        <div className="space-y-6">
           {/* Network Status Card */}
           <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
               <AlertCircle size={18} className="text-orange-500" />
               Network Status
             </h3>
             <div className="space-y-4">
                {[
                  { name: 'MTN SME', status: 'Online', color: 'bg-green-500' },
                  { name: 'MTN Gifting', status: 'Slight Delay', color: 'bg-orange-500' },
                  { name: 'Airtel CG', status: 'Online', color: 'bg-green-500' },
                  { name: '9Mobile', status: 'Offline', color: 'bg-red-500' },
                ].map((n) => (
                  <div key={n.name} className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">{n.name}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-gray-500">{n.status}</span>
                       <div className={cn("w-2 h-2 rounded-full", n.color)} />
                    </div>
                  </div>
                ))}
             </div>
           </div>

           {/* Refer Card */}
           <div className="bg-blue-600 rounded-3xl p-6 text-white relative overflow-hidden group cursor-pointer">
              <h4 className="text-xl font-bold mb-2">Refer & Earn</h4>
              <p className="text-blue-100 text-sm mb-4">Get 2% of every first funding from your referrals.</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                Copy Referral Code <ArrowUpRight size={14} />
              </button>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
           </div>
        </div>
      </div>
    </div>
  );
}
