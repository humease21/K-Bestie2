import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, EyeOff, UserCheck, Database, FileCheck } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="pt-24 md:pt-40 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-deep/10 text-primary-deep text-[13px] font-bold rounded-full mb-6">
            TRUST & SAFETY
          </span>
          <h1 className="text-4xl md:text-7xl font-bold text-charcoal mb-8 leading-tight break-keep">
            아이의 소중한 데이터,<br />
            가장 안전하게 보호합니다
          </h1>
          <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto font-medium leading-relaxed">
            내친구 케이는 부모님의 신뢰를 최우선으로 생각하며, 엄격한 보안 기준과 윤리적인 AI 운영 원칙을 준수합니다.
          </p>
        </motion.div>

        {/* 3 Core Principles */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Lock, color: "text-secondary-coral", bg: "bg-secondary-coral/5", title: "철저한 데이터 암호화", desc: "아이와 부모님의 모든 데이터는 전송 및 저장 시 최고 수준의 암호화 기술로 보호됩니다." },
              { icon: EyeOff, color: "text-primary-deep", bg: "bg-primary-deep/5", title: "개인정보 비식별화", desc: "분석 과정에서 개인 식별 정보는 철저히 비식별화 처리되어 안전하게 관리됩니다." },
              { icon: UserCheck, color: "text-secondary-coral", bg: "bg-secondary-coral/5", title: "엄격한 접근 제어", desc: "허가된 관리자 외에는 데이터에 접근할 수 없으며, 모든 기록은 실시간 모니터링됩니다." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4 }}
                className="p-10 bg-pure-white rounded-lg shadow-md border border-black/5 text-center flex flex-col transition-premium"
              >
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-8 mx-auto`}>
                  <item.icon className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-4 break-keep">{item.title}</h3>
                <p className="text-dark-gray text-[15px] leading-relaxed font-medium break-keep">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Ethics & Guidelines */}
        <section className="mb-24 py-16 md:py-24 bg-pure-white rounded-lg shadow-xl px-6 md:px-16 border border-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-12 break-keep">안전한 AI를 위한<br />우리의 약속</h2>
              <div className="space-y-10">
                {[
                  { icon: ShieldCheck, color: "text-primary-deep", title: "유해 콘텐츠 차단", desc: "아이에게 부적절한 언어나 주제가 노출되지 않도록 실시간 필터링 시스템을 운영합니다." },
                  { icon: Database, color: "text-secondary-coral", title: "데이터 투명성", desc: "데이터 분석 과정을 투명하게 공개하며, 언제든 삭제를 요청하실 수 있습니다." },
                  { icon: FileCheck, color: "text-primary-deep", title: "정기적인 보안 감사", desc: "외부 전문 기관을 통해 정기적으로 취약점을 점검하고 시스템을 고도화합니다." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 bg-light-gray/50 rounded-xl flex items-center justify-center text-charcoal">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-charcoal mb-2">{item.title}</h4>
                      <p className="text-[15px] text-dark-gray leading-relaxed font-medium break-keep">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-light-gray/30 p-10 rounded-lg border border-black/5">
              <h3 className="text-2xl font-bold text-charcoal mb-8">개인정보 처리 방침 요약</h3>
              <div className="space-y-6">
                {[
                  { label: "수집 항목", val: "대화 텍스트, 감정 체크 결과, 연락처 및 기본 정보" },
                  { label: "이용 목적", val: "정서 분석 리포트 생성, 서비스 품질 개선 전용" },
                  { label: "보유 기간", val: "서비스 이용 기간 동안 보유, 탈퇴 시 즉시 파기" }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-pure-white rounded-md shadow-sm">
                    <h4 className="font-bold text-primary-deep mb-2 text-sm uppercase tracking-wider">{item.label}</h4>
                    <p className="text-[15px] text-dark-gray font-medium">{item.val}</p>
                  </div>
                ))}
                <p className="text-xs text-medium-gray mt-4">
                  * 상세 내용은 홈페이지 하단 전문을 확인해주세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety FAQ */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-4">보안 관련 자주 묻는 질문</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "아이의 대화 내용이 다른 곳에 유출되지는 않나요?", a: "절대 유출되지 않습니다. 모든 대화 데이터는 암호화되어 저장되며, 분석 목적 외에는 사용되지 않습니다. 또한, 부모님께 제공되는 리포트도 원문 전체가 아닌 요약된 인사이트 중심으로 제공됩니다." },
              { q: "AI가 아이에게 나쁜 말을 가르치지는 않을까요?", a: "내친구 케이의 AI는 아동용 데이터셋으로 학습되었으며, 다단계 필터링 시스템을 통해 욕설, 비속어, 혐오 표현 등을 완벽하게 차단합니다. 아이에게는 항상 다정하고 긍정적인 대화 상대가 되어줍니다." },
              { q: "데이터를 삭제하고 싶으면 어떻게 하나요?", a: "회원 탈퇴 시 모든 데이터는 즉시 파기됩니다. 또한, 서비스 이용 중에도 특정 기간의 대화 기록 삭제를 요청하실 수 있으며, 요청 즉시 시스템에서 영구 삭제 처리됩니다." }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-pure-white rounded-lg shadow-md border border-black/5">
                <h4 className="text-xl font-bold text-charcoal mb-4 flex gap-4">
                  <span className="text-primary-deep">Q.</span>
                  {item.q}
                </h4>
                <p className="text-[16px] text-dark-gray leading-relaxed pl-9 font-medium">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="hero-gradient py-20 md:py-24 px-6 text-center relative overflow-hidden rounded-lg shadow-2xl">
          <div className="absolute -left-[5%] -top-[10%] w-[400px] h-[400px] bg-pure-white/10 rounded-full blur-[100px]"></div>
          <div className="absolute -right-[5%] -bottom-[10%] w-[400px] h-[400px] bg-primary-light/20 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-pure-white leading-tight mb-8 break-keep">
              안심하고 사용하세요,<br />우리가 지켜드릴게요
            </h2>
            <div className="flex justify-center">
              <Link to="/pricing">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#F3F4F6", color: "#1A6B5A" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pure-white text-primary-deep px-12 py-5 rounded-full text-xl font-bold shadow-2xl transition-all"
                >
                  무료 베타 신청하기
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
