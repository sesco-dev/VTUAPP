import { useState } from 'react';
import { Smartphone, CheckCircle2, ChevronRight, Loader2, ArrowLeft, ShieldCheck, Database, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const STEPS = ['Select Network', 'Plan & Phone', 'Confirmation'];

const NETWORKS = [
  { id: 'mtn', name: 'MTN Nigeria', icon: 'M', color: 'bg-yellow-400', textColor: 'text-gray-900', plans: [
    { id: '1', name: '500MB SME', price: 150, duration: '30 Days' },
    { id: '2', name: '1GB SME', price: 280, duration: '30 Days' },
    { id: '3', name: '2GB SME', price: 560, duration: '30 Days' },
    { id: '4', name: '5GB SME', price: 1400, duration: '30 Days' },
    { id: '5', name: '10GB SME', price: 2800, duration: '30 Days' },
  ]},
  { id: 'airtel', name: 'Airtel Nigeria', icon: 'A', color: 'bg-red-600', textColor: 'text-white', plans: [
    { id: 'a1', name: '1GB CG', price: 280, duration: '30 Days' },
    { id: 'a2', name: '2GB CG', price: 560, duration: '30 Days' },
    { id: 'a3', name: '5GB CG', price: 1400, duration: '30 Days' },
  ]},
  { id: 'glo', name: 'Glo World', icon: 'G', color: 'bg-green-600', textColor: 'text-white', plans: [
    { id: 'g1', name: '1.25GB', price: 420, duration: '30 Days' },
    { id: 'g2', name: '2.5GB', price: 800, duration: '30 Days' },
  ]},
  { id: 'mobile', name: '9Mobile', icon: '9', color: 'bg-green-900', textColor: 'text-white', plans: [
    { id: 'm1', name: '1GB', price: 500, duration: '30 Days' },
  ]},
];

export default function BuyDataFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedNetwork, setSelectedNetwork] = useState<typeof NETWORKS[0] | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNetworkSelect = (network: typeof NETWORKS[0]) => {
    setSelectedNetwork(network);
    setCurrentStep(1);
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCurrentStep(3);
    }, 2000);
  };

  const reset = () => {
    setCurrentStep(0);
    setSelectedNetwork(null);
    setSelectedPlan(null);
    setPhoneNumber('');
    setIsSuccess(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center gap-4">
        <Link to="/app" className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-100">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Buy Mobile Data</h1>
          <p className="text-gray-500 text-sm">Cheap data plans for all networks.</p>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 px-4">
         {STEPS.map((step, idx) => (
           <div key={step} className="flex flex-col items-center relative flex-1">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all relative z-10",
                idx < currentStep ? "bg-green-600 text-white" :
                idx === currentStep ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                "bg-gray-200 text-gray-500"
              )}>
                {idx < currentStep ? <CheckCircle2 size={20} /> : idx + 1}
              </div>
              <span className={cn(
                "mt-2 text-[10px] font-bold uppercase tracking-widest",
                idx === currentStep ? "text-blue-600" : "text-gray-400"
              )}>{step}</span>
              {idx < STEPS.length - 1 && (
                <div className={cn(
                  "absolute top-5 left-1/2 w-full h-[2px] -z-0",
                  idx < currentStep ? "bg-green-600" : "bg-gray-200"
                )} />
              )}
           </div>
         ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div 
               key="step0"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                 <Info size={16} className="text-blue-600" />
                 <p className="text-sm font-bold text-gray-700">Select a Network Provider</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {NETWORKS.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => handleNetworkSelect(network)}
                    className="flex flex-col items-center p-6 border border-gray-100 rounded-2xl hover:border-blue-300 hover:bg-blue-50/50 transition-all group active:scale-95"
                  >
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-4 shadow-lg group-hover:rotate-6 transition-transform", network.color, network.textColor)}>
                      {network.icon}
                    </div>
                    <span className="font-bold text-gray-900 text-sm whitespace-nowrap">{network.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 1 && selectedNetwork && (
            <motion.div 
               key="step1"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="space-y-8"
            >
               <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center font-black", selectedNetwork.color, selectedNetwork.textColor)}>
                    {selectedNetwork.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black text-gray-400 tracking-widest">Selected Network</p>
                    <p className="font-bold text-gray-900">{selectedNetwork.name}</p>
                  </div>
                  <button onClick={() => setCurrentStep(0)} className="ml-auto text-xs font-bold text-blue-600 hover:underline">Change</button>
               </div>

               <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 block">Select Data Plan</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedNetwork.plans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
                          selectedPlan?.id === plan.id 
                            ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100" 
                            : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <div>
                          <p className="font-bold text-gray-900">{plan.name}</p>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">{plan.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-lg text-blue-600">₦{plan.price}</p>
                          <div className={cn(
                             "w-4 h-4 rounded-full border flex items-center justify-center",
                             selectedPlan?.id === plan.id ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
                          )}>
                             {selectedPlan?.id === plan.id && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
               </div>

               <div className="space-y-4">
                 <label className="text-sm font-bold text-gray-700 block text-left">Phone Number</label>
                 <div className="relative">
                   <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                   <input 
                    type="tel"
                    placeholder="080 1234 5678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-lg font-bold tracking-widest placeholder:tracking-normal placeholder:font-medium"
                   />
                 </div>
               </div>

               <button 
                onClick={() => setCurrentStep(2)}
                disabled={!selectedPlan || phoneNumber.length < 10}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100"
               >
                 Continue to Payment <ChevronRight size={20} />
               </button>
            </motion.div>
          )}

          {currentStep === 2 && selectedNetwork && selectedPlan && (
            <motion.div 
               key="step2"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="space-y-8"
            >
              <div className="text-center">
                 <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} />
                 </div>
                 <h2 className="text-2xl font-extrabold text-gray-900">Confirm Order</h2>
                 <p className="text-gray-500">Please review your transaction details.</p>
              </div>

              <div className="space-y-3 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Recipient</span>
                    <span className="font-bold text-gray-900 tracking-widest">{phoneNumber}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Network</span>
                    <span className="font-bold text-gray-900">{selectedNetwork.name}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Package</span>
                    <span className="font-bold text-gray-900">{selectedPlan.name}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Validity</span>
                    <span className="font-bold text-gray-900">{selectedPlan.duration}</span>
                 </div>
                 <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-gray-900 font-black text-lg">Total Payable</span>
                    <span className="text-blue-600 font-black text-2xl">₦{selectedPlan.price}</span>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={() => setCurrentStep(1)} className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-colors">
                    Back
                 </button>
                 <button 
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100"
                 >
                    {isProcessing ? <Loader2 className="animate-spin" size={24} /> : 'Pay Now'}
                 </button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && isSuccess && (
            <motion.div 
               key="success"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-center py-10"
            >
               <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle2 size={56} className="animate-in zoom-in duration-500 ease-out" />
               </div>
               <h2 className="text-3xl font-black text-gray-900 mb-2">Transaction Successful!</h2>
               <p className="text-gray-500 max-w-sm mx-auto mb-10 font-medium">Your data purchase of <span className="text-gray-900 font-bold">{selectedPlan?.name}</span> for <span className="text-gray-900 font-bold">{phoneNumber}</span> has been processed successfully.</p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    Print Receipt
                  </button>
                  <button 
                    onClick={reset}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                  >
                    Done
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating background blur */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-green-100/30 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Info Card */}
      <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl flex items-start gap-4">
         <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
            <AlertCircle size={20} />
         </div>
         <div className="space-y-1">
            <h4 className="font-bold text-orange-900">Information Desk</h4>
            <p className="text-sm text-orange-800 leading-relaxed">
              If data does not deliver within 5 minutes, please reach out to support with your transaction reference. MTN SME delivery remains one of the fastest in the industry.
            </p>
         </div>
      </div>
    </div>
  );
}
