import { motion, AnimatePresence } from "motion/react";
import { AlertCircle } from "lucide-react";

interface ConfirmDialogProps {
  confirmDialog: { id: string, show: boolean } | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ confirmDialog, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {confirmDialog && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-pure-white rounded-[1.5rem] p-8 max-w-sm w-full shadow-2xl text-center"
          >
            <div className="w-16 h-16 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-[#F59E0B]" />
            </div>
            <h3 className="text-[20px] font-bold text-charcoal mb-2">해결 완료 처리하시겠습니까?</h3>
            <p className="text-[14px] text-medium-gray mb-8">해결됨 탭으로 이동하며 부모님께 안내됩니다.</p>
            <div className="flex gap-3">
              <button onClick={onCancel} className="flex-1 py-3 bg-light-gray rounded-xl font-bold text-dark-gray hover:bg-light-gray/80 transition-all">취소</button>
              <button onClick={onConfirm} className="flex-1 py-3 bg-primary-deep text-white rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg">확인</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
