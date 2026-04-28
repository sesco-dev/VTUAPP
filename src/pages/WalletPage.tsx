import { useState } from 'react';
import { CreditCard, Wallet, ArrowDownLeft, ShieldCheck, CheckCircle2, ChevronRight, Loader2, Info, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export default function WalletPage() {
  const { user } = useAuth();
  const [fundingAmount, setFundingAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fundingStep, setFundingStep] = useState(0); // 0: Input, 1: Process, 2: Success

  const handleFund = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setFundingStep(2);
    }, 2500);
  };

  const reset = () => {
    setFundingStep(0);
    setFundingAmount('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Wallet & funding</h1>
        <p className="text-gray-500 text-sm">Manage your money and automate funding.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Current Balance Card */}
         <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
            <p className="text-gray-400 text-sm font-black uppercase tracking-widest mb-2">Total Balance</p>
            <div className="flex items-baseline gap-2 mb-8">
               <span className="text-4xl font-extrabold text-gray-900 tracking-tight">₦{user?.walletBalance.toLocaleString()}</span>
               <span className="text-gray-400 font-bold">.00</span>
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs font-bold text-gray-500">Cashback Earned</span>
                  <span className="text-sm font-black text-green-600">₦240.50</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs font-bold text-gray-500">Referral Bonus</span>
                  <span className="text-sm font-black text-blue-600">₦1,200.00</span>
               </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl transition-all group-hover:scale-150" />
         </div>

         {/* Funding Options */}
         <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl group cursor-pointer hover:bg-indigo-100 transition-colors relative overflow-hidden">
               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
                     <Building size={24} />
                  </div>
                  <div>
                     <h3 className="font-bold text-indigo-900">Virtual Bank Account</h3>
                     <p className="text-xs text-indigo-700 font-medium">Auto-funding via Wema/Monnify.</p>
                  </div>
                  <ChevronRight size={20} className="ml-auto text-indigo-400" />
               </div>
               <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full scale-150" />
            </div>

            <div className="bg-pink-50 border border-pink-100 p-6 rounded-3xl group cursor-pointer hover:bg-pink-100 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-pink-200">
                     <ShieldCheck size={24} />
                  </div>
                  <div>
                     <h3 className="font-bold text-pink-900">Online Payment</h3>
                     <p className="text-xs text-pink-700 font-medium">Instant funding via Paystack/Card.</p>
                  </div>
                  <ChevronRight size={20} className="ml-auto text-pink-400" />
               </div>
            </div>
         </div>
      </div>

      {/* Main Funding UI */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
         <AnimatePresence mode="wait">
            {fundingStep === 0 && (
               <motion.div 
                 key="input"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="flex flex-col items-center max-w-md mx-auto text-center"
               >
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                     <ArrowDownLeft size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Fund your Wallet</h2>
                  <p className="text-gray-500 mb-10 font-medium">Enter amount to fund. Funding is instant and automated.</p>
                  
                  <div className="w-full space-y-6">
                     <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">₦</span>
                        <input 
                           type="number"
                           placeholder="0.00"
                           value={fundingAmount}
                           onChange={(e) => setFundingAmount(e.target.value)}
                           className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-3xl font-black outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-gray-200"
                        />
                     </div>

                     <div className="grid grid-cols-4 gap-2">
                        {['1000', '2000', '5000', '10000'].map(amt => (
                           <button 
                              key={amt}
                              onClick={() => setFundingAmount(amt)}
                              className="py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-bold text-gray-600 transition-colors"
                           >
                              ₦{parseInt(amt).toLocaleString()}
                           </button>
                        ))}
                     </div>

                     <button 
                        onClick={() => setFundingStep(1)}
                        disabled={!fundingAmount || parseInt(fundingAmount) < 100}
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100 disabled:opacity-50"
                     >
                        Proceed to Pay <ChevronRight size={20} />
                     </button>
                     <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Transaction fee: 1.5% applies</p>
                  </div>
               </motion.div>
            )}

            {fundingStep === 1 && (
               <motion.div 
                 key="processing"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="flex flex-col items-center py-20"
               >
                  <div className="relative w-24 h-24 mb-8">
                     <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
                     <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <CreditCard size={32} className="text-blue-600" />
                     </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Initiating Secure Payment</h3>
                  <p className="text-gray-500 font-medium mb-10">Connecting to our secure payment gateway...</p>
                  
                  {/* Mock Payment Gateway Modal Overlay thing */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full max-w-xs bg-gray-900 rounded-2xl p-6 text-white text-center shadow-2xl"
                  >
                     <div className="flex justify-between items-center mb-6">
                        <p className="text-xs font-black tracking-widest">PAYSTACK</p>
                        <ShieldCheck size={16} className="text-green-400" />
                     </div>
                     <p className="text-sm text-gray-400 mb-2">Pay olasesco1420@gmail.com</p>
                     <p className="text-2xl font-black mb-8">₦{parseInt(fundingAmount).toLocaleString()}</p>
                     <button 
                        onClick={handleFund}
                        disabled={isProcessing}
                        className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                     >
                        {isProcessing ? <Loader2 className="animate-spin" size={20} /> : 'Success Demo'}
                     </button>
                  </motion.div>
               </motion.div>
            )}

            {fundingStep === 2 && (
               <motion.div 
                 key="success"
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="text-center py-10"
               >
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-200">
                     <CheckCircle2 size={56} className="animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Wallet Funded!</h2>
                  <p className="text-gray-500 max-w-sm mx-auto mb-10 font-medium">Your wallet has been successfully credited with <span className="text-gray-900 font-bold">₦{parseInt(fundingAmount).toLocaleString()}</span>.</p>
                  
                  <button 
                    onClick={reset}
                    className="px-12 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
                  >
                    Back to Home
                  </button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Security Tip */}
      <div className="bg-gray-50 border border-gray-100 p-6 rounded-3xl flex items-start gap-4">
         <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
         </div>
         <div>
            <h4 className="font-bold text-gray-900">Security Awareness</h4>
            <p className="text-sm text-gray-600 leading-relaxed mt-1">
              For your safety, VTU-Max will never ask for your card PIN or OTP via call, SMS, or email. Only provide these details on our secure payment gateways.
            </p>
         </div>
      </div>
    </div>
  );
}
