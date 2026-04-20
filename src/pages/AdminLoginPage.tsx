import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError("로그인 정보가 올바르지 않습니다. 다시 확인해주세요.");
    } finally {
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

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-medium-gray uppercase tracking-wider ml-1">Admin ID</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-gray" />
              <input 
                required
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="아이디를 입력하세요"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-black/10 focus:border-primary-deep outline-none transition-all font-medium text-[15px]"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-medium-gray uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-gray" />
              <input 
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 rounded-lg border border-black/10 focus:border-primary-deep outline-none transition-all font-medium text-[15px]"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-medium-gray hover:text-charcoal"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <motion.button 
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
                관리자 접속하기 <LogIn className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
        
        <div className="mt-8 text-center text-[12px] text-medium-gray font-medium">
          <p>© 2026 K-Bestie Corp. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}
