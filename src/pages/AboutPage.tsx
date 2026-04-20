import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Heart, Users, Sparkles, ShieldCheck, Target, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-40 pb-20 px-6 md:px-8 max-w-screen-xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="inline-block px-4 md:px-8 py-2 md:py-3 rounded-full bg-orange/10 text-orange text-sm sm:text-base md:text-xl font-black mb-6 uppercase tracking-widest border border-orange/20 whitespace-nowrap">
          ✨ 7월 베타 런칭 | 테스터 사전 모집
        </div>
        <h1 className="font-hand text-3xl sm:text-5xl md:text-7xl text-text-main mb-8 leading-tight break-keep">
          아이 마음을 더 잘 이해하도록<br />
          돕는 부모 맞춤형 양육 인사이트
        </h1>
        <p className="text-base md:text-xl text-text-soft max-w-3xl mx-auto font-medium leading-relaxed px-4 md:px-0">
          내친구 케이는 부모가 아이의 작은 변화를 더 일찍 이해하고,<br className="hidden md:block" />
          다음 성장 구간을 차분히 준비하도록 돕습니다.
        </p>
      </motion.div>

      {/* 서비스 개요 */}
      <section className="mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-xl border border-orange/20">
            <h2 className="font-hand text-3xl md:text-6xl text-text-main mb-6 md:mb-8 break-keep">서비스의 본질</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-xl bg-orange/10 flex items-center justify-center text-orange">
                  <Heart className="w-5 h-5" />
                </div>
                <p className="text-text-soft leading-relaxed">
                  상담이나 진단을 대체하는 서비스가 아닙니다. 부모가 아이를 더 잘 이해하고 방치와 과잉개입을 줄이도록 돕는 <span className="text-text-main font-bold">“사전 이해 및 판단 지원 도구”</span>입니다.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-xl bg-kblue/10 flex items-center justify-center text-kblue">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-text-soft leading-relaxed">
                  아이의 짧은 대답 뒤에 숨겨진 감정의 맥락을 읽어내어, 부모와 아이 사이의 건강한 소통을 지원합니다.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-xl bg-yellow/50 flex items-center justify-center text-orange-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="text-text-soft leading-relaxed">
                  장기적으로 누적되는 흐름을 통해 아이를 ‘점’이 아니라 <span className="text-text-main font-bold">‘변화의 선’</span>으로 보게 해줍니다.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-hand text-3xl md:text-5xl text-text-main mb-6 md:mb-8 break-keep">누구를 위한 서비스인가요?</h2>
            <ul className="space-y-4 md:space-y-6">
              {[
                "최근 1~3개월 내 말수가 줄어든 아이",
                "감정 기복이나 친구 갈등 신호가 보일 때",
                "학교 이야기를 회피하는 아이의 속마음",
                "바쁜 일상으로 아이를 세밀히 챙기기 힘들 때",
                "아이와 더 깊은 대화를 나누고 싶은 부모님"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-base md:text-lg font-bold text-text-main break-keep">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-orange shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 어떤 문제를 해결하는가 */}
      <section className="py-20 md:py-32 bg-white rounded-[2.5rem] md:rounded-[4rem] px-6 md:px-12 mb-20 md:mb-32 border border-orange/20 transition-all">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-hand text-3xl md:text-6xl text-text-main mb-6 break-keep">어떤 문제를 해결하나요?</h2>
          <p className="text-text-soft font-medium text-sm md:text-base px-4 break-keep">부모님의 막연한 불안감을 확신 있는 양육으로 바꿉니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="p-6 md:p-10 bg-cream rounded-[2.5rem] md:rounded-[3rem] border border-orange/10">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-text-main">
              <Target className="w-8 h-8 text-orange" />
              판단의 근거 부족
            </h3>
            <p className="text-text-soft leading-relaxed font-medium">
              검색이나 맘카페 정보만으로는 우리 아이의 특수한 상황을 판단하기 어렵습니다. 내친구 케이는 아이의 실제 대화 데이터를 기반으로 객관적인 인사이트를 제공합니다.
            </p>
          </div>
          <div className="p-10 bg-cream rounded-[3rem] border border-kblue/10">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-text-main">
              <Lightbulb className="w-8 h-8 text-kblue" />
              개입 시점의 불확실성
            </h3>
            <p className="text-text-soft leading-relaxed font-medium">
              지금 도와줘야 할지, 아니면 스스로 해결하게 지켜봐야 할지 판단하기 어렵습니다. 감정 흐름과 학교생활 신호를 분석하여 적절한 개입 시점을 제안합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 사용 흐름 */}
      <section className="mb-20 md:mb-32">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-hand text-3xl md:text-6xl text-text-main mb-6 break-keep">사용 흐름 한눈에 보기</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-orange border-b-2 border-orange/20 pb-4 uppercase tracking-tight">아이의 사용 경험</h3>
            <div className="space-y-6">
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-orange/10">
                <h4 className="font-black text-lg mb-2">AI 친구 케이와 대화</h4>
                <p className="text-sm text-text-soft font-medium">모바일 앱을 통해 AI 친구 케이와 편안하게 일상을 나눕니다.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-orange/10">
                <h4 className="font-black text-lg mb-2">일일 미션 2개 수행</h4>
                <p className="text-sm text-text-soft font-medium">감정 확인, 학교생활, 친구관계 등 특정 주제의 미션을 즐겁게 수행합니다.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-orange/10">
                <h4 className="font-black text-lg mb-2">자연스러운 자기표현</h4>
                <p className="text-sm text-text-soft font-medium">대답을 강요하지 않는 환경에서 아이는 자신의 속마음을 자연스럽게 표현합니다.</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-kblue border-b-2 border-kblue/20 pb-4 uppercase tracking-tight">부모의 사용 경험</h3>
            <div className="space-y-6">
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-kblue/10">
                <h4 className="font-black text-lg mb-2">일일/주간 리포트 확인</h4>
                <p className="text-sm text-text-soft font-medium">아이의 감정 흐름과 주요 키워드가 정리된 리포트를 확인합니다.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-kblue/10">
                <h4 className="font-black text-lg mb-2">대시보드 인사이트 분석</h4>
                <p className="text-sm text-text-soft font-medium">특정 기간의 변화 추이를 통해 아이의 상태를 체계적으로 파악합니다.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-kblue/10">
                <h4 className="font-black text-lg mb-2">맞춤형 양육 가이드 활용</h4>
                <p className="text-sm text-text-soft font-medium">리포트에서 제안하는 대화 팁과 개입 가이드를 참고하여 아이와 소통합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 어디까지 해주고, 어디까지는 하지 않는가 */}
      <section className="py-20 md:py-32 bg-cream rounded-[2.5rem] md:rounded-[4rem] px-6 md:px-12 mb-20 md:mb-32 overflow-hidden relative border border-orange/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 blob-shape -mr-32 -mt-32"></div>
        <div className="max-w-screen-md mx-auto relative z-10">
          <h2 className="font-hand text-3xl md:text-6xl text-text-main mb-8 md:mb-12 text-center break-keep">서비스의 약속</h2>
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-orange/20">
              <h4 className="text-lg md:text-xl font-black text-orange mb-4 md:mb-6">우리가 제공하는 가치</h4>
              <ul className="space-y-4">
                <li className="text-base text-text-soft flex items-start gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  아이의 감정 및 일상 데이터의 구조적 시각화
                </li>
                <li className="text-base text-text-soft flex items-start gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  부모의 판단을 돕는 객관적인 인사이트 리포트
                </li>
                <li className="text-base text-text-soft flex items-start gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  적절한 개입 시점과 대화 방법 제안
                </li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h4 className="text-xl font-black text-text-soft mb-6 opacity-60">우리가 하지 않는 것</h4>
              <ul className="space-y-4">
                <li className="text-base text-text-soft flex items-start gap-3 opacity-60 font-medium">
                  <div className="w-5 h-5 rounded-full border-2 border-text-soft shrink-0 mt-0.5"></div>
                  의료적 진단이나 정신건강 장애 판별
                </li>
                <li className="text-base text-text-soft flex items-start gap-3 opacity-60 font-medium">
                  <div className="w-5 h-5 rounded-full border-2 border-text-soft shrink-0 mt-0.5"></div>
                  전문적인 심리치료나 교정 행위 대체
                </li>
                <li className="text-base text-text-soft flex items-start gap-3 opacity-60 font-medium">
                  <div className="w-5 h-5 rounded-full border-2 border-text-soft shrink-0 mt-0.5"></div>
                  아이의 사생활을 무분별하게 노출하는 원문 전체 공개
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA (THE FINAL ORANGE BOX) */}
      <section className="text-center bg-orange text-white py-24 rounded-[4rem] relative overflow-hidden shadow-2xl brand-shadow">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blob-shape -ml-32 -mt-32"></div>
        <div className="relative z-10">
          <h2 className="font-hand text-3xl md:text-7xl mb-10 leading-tight break-keep">
            아이의 마음을 읽는 렌즈,<br />
            지금 바로 신청하세요
          </h2>
          <div className="flex justify-center gap-6">
            <Link to="/pricing">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#FF8A00" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange px-12 py-5 rounded-2xl text-xl font-black shadow-2xl transition-all"
              >
                베타 신청하기
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
