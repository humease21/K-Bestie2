import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { School, Building2, Users, BarChart3, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function InstitutionalPage() {
  return (
    <div className="pt-40 pb-20 px-8 max-w-screen-xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="inline-block px-8 py-3 rounded-full bg-kblue/10 text-kblue text-xl font-black mb-6 uppercase tracking-widest">
          ✨ 7월 베타 런칭 | 테스터 사전 모집
        </div>
        <h1 className="font-hand text-5xl md:text-7xl text-text-main mb-8 leading-tight">
          아이들의 마음을 보살피는<br />
          기관을 위한 통합 솔루션
        </h1>
        <p className="text-xl text-text-soft max-w-3xl mx-auto font-medium leading-relaxed">
          학교, 교육청, 아동복지센터 등 아이들의 성장을 돕는 모든 기관을 위한 맞춤형 데이터 인사이트를 제공합니다.
        </p>
      </motion.div>

      {/* 주요 도입 대상 */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-orange/20 hover:border-orange/40 transition-all group">
            <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8 group-hover:scale-110 transition-transform">
              <School className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black mb-4">초등학교 및 교육청</h3>
            <p className="text-text-soft text-sm leading-relaxed mb-6">
              학급 전체의 정서 상태를 파악하고, 위기 학생을 조기에 발견하여 맞춤형 생활 지도를 지원합니다.
            </p>
          </div>
          <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-orange/20 hover:border-kblue/40 transition-all group">
            <div className="w-16 h-16 bg-kblue/10 rounded-2xl flex items-center justify-center text-kblue mb-8 group-hover:scale-110 transition-transform">
              <Building2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black mb-4">아동 및 가족 지원 센터</h3>
            <p className="text-text-soft text-sm leading-relaxed mb-6">
              상담 전후 아이의 일상 데이터를 확보하여 상담의 질을 높이고, 부모 교육의 근거 자료로 활용합니다.
            </p>
          </div>
          <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-orange/20 hover:border-yellow/60 transition-all group">
            <div className="w-16 h-16 bg-yellow/20 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform">
              <Users className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black mb-4">복지 및 공공 기관</h3>
            <p className="text-text-soft text-sm leading-relaxed mb-6">
              지역 내 아동들의 정서 건강 실태를 파악하고, 데이터 기반의 복지 정책 수립 및 예산 집행을 돕습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 기관용 주요 기능 */}
      <section className="mb-32 py-24 bg-kbg rounded-[4rem] px-12 border border-orange/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-hand text-4xl md:text-6xl text-text-main mb-8">기관을 위한<br />통합 관리 대시보드</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">그룹 통계 및 트렌드 분석</h4>
                  <p className="text-text-soft leading-relaxed">
                    학급, 학교, 지역 단위의 정서 트렌드를 분석하여 집단적 문제나 긍정적 변화를 한눈에 파악합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-kblue">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">위기 신호 조기 경보 시스템</h4>
                  <p className="text-text-soft leading-relaxed">
                    집단 따돌림, 학교 폭력 징후, 심각한 우울감 등 위기 신호가 감지될 때 관리자에게 즉시 알림을 발송합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-yellow-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">부모-교사 소통 지원</h4>
                  <p className="text-text-soft leading-relaxed">
                    객관적인 데이터를 바탕으로 부모님과 교사가 아이의 상태를 공유하고 협력할 수 있는 소통 창구를 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-orange/20">
            <h3 className="text-2xl font-black mb-8">기관 도입 프로세스</h3>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 bg-orange text-white rounded-full flex items-center justify-center font-black shrink-0">1</div>
                <div>
                  <h4 className="font-bold mb-1">도입 문의 및 상담</h4>
                  <p className="text-sm text-text-soft">기관의 규모와 목적에 맞는 맞춤형 솔루션을 제안합니다.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 bg-kblue text-white rounded-full flex items-center justify-center font-black shrink-0">2</div>
                <div>
                  <h4 className="font-bold mb-1">시스템 구축 및 교육</h4>
                  <p className="text-sm text-text-soft">관리자 페이지 구축과 함께 교사 및 상담사를 위한 교육을 진행합니다.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 bg-yellow text-orange-600 rounded-full flex items-center justify-center font-black shrink-0">3</div>
                <div>
                  <h4 className="font-bold mb-1">서비스 운영 및 지원</h4>
                  <p className="text-sm text-text-soft">실시간 모니터링과 정기적인 리포트 분석을 통해 운영을 지원합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 도입 문의 폼 */}
      <section className="mb-32 max-w-screen-md mx-auto">
        <div className="p-12 bg-white rounded-[4rem] shadow-2xl border border-orange/20">
          <div className="text-center mb-12">
            <h2 className="font-hand text-4xl md:text-6xl text-text-main mb-4">기관 도입 문의하기</h2>
            <p className="text-text-soft font-medium">담당자가 확인 후 24시간 이내에 연락드리겠습니다.</p>
          </div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="기관명"
                className="w-full px-6 py-4 rounded-2xl border border-orange/10 focus:border-orange outline-none transition-all font-bold"
              />
              <input 
                type="text" 
                placeholder="담당자 성함"
                className="w-full px-6 py-4 rounded-2xl border border-orange/10 focus:border-orange outline-none transition-all font-bold"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="email" 
                placeholder="이메일 주소"
                className="w-full px-6 py-4 rounded-2xl border border-orange/10 focus:border-orange outline-none transition-all font-bold"
              />
              <input 
                type="tel" 
                placeholder="연락처"
                className="w-full px-6 py-4 rounded-2xl border border-orange/10 focus:border-orange outline-none transition-all font-bold"
              />
            </div>
            <textarea 
              placeholder="도입 규모 및 궁금하신 점을 입력해주세요"
              rows={4}
              className="w-full px-6 py-4 rounded-2xl border border-orange/10 focus:border-orange outline-none transition-all font-bold resize-none"
            ></textarea>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 bg-kblue text-white rounded-3xl text-xl font-black shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
            >
              문의 보내기
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </form>
        </div>
      </section>
    </div>
  );
}
