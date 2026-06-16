import { motion } from "motion/react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function Toast({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void, key?: any }) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className={`fixed top-24 right-8 z-[2000] flex items-center gap-4 bg-pure-white p-4 rounded-lg shadow-lg border-l-4 ${type === 'success' ? 'border-[#22C55E]' : 'border-[#EF4444]'} min-w-[320px] pointer-events-auto`}
    >
      {type === 'success' ? <CheckCircle className="w-5 h-5 text-[#22C55E]" /> : <AlertCircle className="w-5 h-5 text-[#EF4444]" />}
      <p className="text-[14px] font-medium text-charcoal flex-1">{message}</p>
      <button onClick={onClose} className="text-medium-gray hover:text-charcoal"><X className="w-4 h-4" /></button>
    </motion.div>
  );
}
