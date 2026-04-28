import { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, ShoppingCart, Smartphone, Tv, Zap, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const TRANSACTION_DATA = [
  { id: 'TX-100234', type: 'Data Purchase', amount: -2500, status: 'Success', date: '2026-04-28 10:45:00', network: 'MTN 5GB SME', recipient: '08012345678' },
  { id: 'TX-100235', type: 'Wallet Funding', amount: 15000, status: 'Success', date: '2026-04-27 16:20:12', method: 'Paystack', recipient: 'Wallet' },
  { id: 'TX-100236', type: 'Airtime Purchase', amount: -500, status: 'Failed', date: '2026-04-24 09:12:45', network: 'Airtel', recipient: '09012345678' },
  { id: 'TX-100237', type: 'Data Purchase', amount: -1000, status: 'Pending', date: '2026-04-23 11:05:30', network: 'Glo 2.5GB', recipient: '07012345678' },
  { id: 'TX-100238', type: 'TV Subscription', amount: -4500, status: 'Success', date: '2026-04-22 18:30:00', network: 'DSTV Padi', recipient: '412398402' },
  { id: 'TX-100239', type: 'Electricity', amount: -2000, status: 'Success', date: '2026-04-21 14:15:22', network: 'IKEDC Prepaid', recipient: '04239480234' },
  { id: 'TX-100240', type: 'Data Purchase', amount: -150, status: 'Success', date: '2026-04-20 08:00:11', network: 'MTN 500MB SME', recipient: '08123456789' },
  { id: 'TX-100241', type: 'Data Purchase', amount: -280, status: 'Success', date: '2026-04-19 12:45:00', network: 'Airtel 1GB CG', recipient: '08098765432' },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'SUCCESS' | 'FAILED' | 'PENDING'>('ALL');

  const filteredTransactions = TRANSACTION_DATA.filter(tx => {
    const matchesSearch = tx.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.recipient.includes(searchTerm) ||
                          tx.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'ALL') return matchesSearch;
    if (filter === 'SUCCESS') return matchesSearch && tx.status === 'Success';
    if (filter === 'FAILED') return matchesSearch && tx.status === 'Failed';
    if (filter === 'PENDING') return matchesSearch && tx.status === 'Pending';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Transaction History</h1>
          <p className="text-gray-500 text-sm">Review your past activities and receipts.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          <Download size={18} /> Export List
        </button>
      </header>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, recipient, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100 overflow-x-auto whitespace-nowrap">
          {['ALL', 'SUCCESS', 'PENDING', 'FAILED'].map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f as any)}
               className={cn(
                 "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                 filter === f ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
               )}
             >
               {f}
             </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                     <th className="px-6 py-4">Transaction ID</th>
                     <th className="px-6 py-4">Description</th>
                     <th className="px-6 py-4">Recipient</th>
                     <th className="px-6 py-4">Amount</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Date & Time</th>
                  </tr>
               </thead>
               <tbody className="text-sm">
                  {filteredTransactions.map((tx, idx) => (
                     <motion.tr 
                        key={tx.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-blue-50/30 transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                     >
                        <td className="px-6 py-5 font-mono text-[10px] text-gray-400 font-bold">{tx.id}</td>
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                                tx.amount > 0 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                              )}>
                                 {tx.type === 'Data Purchase' && <ShoppingCart size={16} />}
                                 {tx.type === 'Wallet Funding' && <ArrowDownLeft size={16} />}
                                 {tx.type === 'Airtime Purchase' && <Smartphone size={16} />}
                                 {tx.type === 'TV Subscription' && <Tv size={16} />}
                                 {tx.type === 'Electricity' && <Zap size={16} />}
                              </div>
                              <span className="font-bold text-gray-900">{tx.type}</span>
                           </div>
                        </td>
                        <td className="px-6 py-5 font-medium text-gray-600">{tx.recipient}</td>
                        <td className="px-6 py-5">
                           <span className={cn("font-black", tx.amount > 0 ? "text-green-600" : "text-gray-900")}>
                             {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                           </span>
                        </td>
                        <td className="px-6 py-5">
                           <div className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter",
                              tx.status === 'Success' ? "bg-green-100 text-green-700" : 
                              tx.status === 'Pending' ? "bg-orange-100 text-orange-700" : 
                              "bg-red-100 text-red-700"
                           )}>
                              {tx.status}
                           </div>
                        </td>
                        <td className="px-6 py-5 text-right text-xs text-gray-400 font-medium">{tx.date}</td>
                     </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
         {filteredTransactions.length === 0 && (
            <div className="p-20 flex flex-col items-center justify-center text-center">
               <div className="p-6 bg-gray-50 rounded-full mb-4">
                  <Filter size={40} className="text-gray-300" />
               </div>
               <h3 className="font-bold text-gray-900">No matching transactions</h3>
               <p className="text-gray-500 text-sm">Try adjusting your filters or search term.</p>
            </div>
         )}

         {/* Pagination Mockup */}
         <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Showing {filteredTransactions.length} of 42 results</span>
            <div className="flex gap-2">
               <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white transition-colors" disabled>
                  <ChevronLeft size={16} />
               </button>
               <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">1</button>
               <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-xs font-bold transition-colors">2</button>
               <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-xs font-bold transition-colors">3</button>
               <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <ChevronRight size={16} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
