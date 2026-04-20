import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E1E2D] text-white/60 py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-8 text-center md:text-left">
          {/* Left Section (60%) */}
          <div className="md:w-[60%] space-y-8 flex flex-col items-center md:items-start">
            <Link to="/" className="inline-block">
              <img 
                src="/images/logo2.png" 
                alt="내친구 케이" 
                className="h-10 w-auto" 
              />
            </Link>
            <div className="space-y-2">
              <p className="text-[15px] leading-relaxed text-white/80 max-w-[400px]">
                아이 마음을 이해하는 부모 맞춤형 AI 육아 서비스입니다.<br className="hidden md:block" />
                아이의 짧은 대답 뒤에 숨겨진 진심을 읽어내는 여정에 함께 합니다.
              </p>
            </div>
          </div>

          {/* Right Section (40%) */}
          <div className="md:w-[40%] flex flex-col items-center md:items-end">
            <div className="w-full md:w-auto">
              <h4 className="text-white font-bold mb-6 text-[16px]">서비스</h4>
              <ul className="space-y-4 text-[14px]">
                <li><Link to="/pricing" className="hover:text-white transition-colors">베타 신청</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">자주 묻는 질문</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">서비스 이용약관</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px]">
          <p>© 2026 내친구 케이. All rights reserved.</p>
          <Link to="/admin/login" className="text-white/5 hover:text-white/20 transition-colors">
            <Lock className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
