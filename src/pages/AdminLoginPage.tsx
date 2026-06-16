import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "관리자 | 내친구 케이";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  useEffect(() => {
    if (location.state?.accessDenied) {
      setError("접근 권한이 없는 계정입니다. 관리자 계정으로 로그인해주세요.");
    }
  }, [location.state]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/admin/dashboard` },
    });
    if (error) {
      setError("구글 로그인에 실패했습니다. 다시 시도해주세요.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-white p-10 rounded-[1.5rem] shadow-xl border border-black/5"
      >
        <div className="text-center mb-8">
          <img 
            src="/images/logo2.png" 
            alt="K-Bestie Logo" 
            className="h-9 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-charcoal mb-1">관리자 로그인</h1>
          <p className="text-[14px] font-medium text-medium-gray italic">K-Bestie Admin Console</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-[#EF4444]/5 text-[#EF4444] rounded-lg flex items-center gap-3 text-sm font-bold border border-[#EF4444]/10"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </motion.div>
        )}

        <div className="space-y-5">
          <motion.button 
            type="button"
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.01, backgroundColor: "#145348" }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading}
            className={`w-full py-4 bg-primary-deep text-white rounded-lg text-[16px] font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Google로 로그인
              </>
            )}
          </motion.button>
        </div>
        
        <div className="mt-8 text-center text-[12px] text-medium-gray font-medium">
          <p>© 2026 K-Bestie Corp. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}
