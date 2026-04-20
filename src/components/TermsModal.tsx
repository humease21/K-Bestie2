import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { PrivacyPolicyContent, TermsOfServiceContent } from './PolicyContent';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export default function TermsModal({ isOpen, onClose, type }: TermsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-pure-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-warm-white">
              <h3 className="text-xl font-bold text-charcoal">
                {type === 'privacy' ? '개인정보처리방침' : '서비스 이용약관'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors text-medium-gray"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
              {type === 'privacy' ? <PrivacyPolicyContent /> : <TermsOfServiceContent />}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-black/5 flex justify-end bg-warm-white">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-primary-deep text-white font-bold rounded-lg hover:bg-primary-deep/90 transition-colors"
              >
                확인
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
