import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { BarChart3, PieChart, TrendingUp, Calendar, FileText, MessageCircle, AlertCircle, CheckCircle2, Heart, Users, Sparkles } from "lucide-react";

export default function ReportDetailPage() {
  return (
    <div className="pt-40 pb-20 px-8 max-w-screen-xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="inline-block px-4 py-1.5 rounded-full bg-kblue/10 text-kblue text-xs font-black mb-6 uppercase tracking-widest">
          Parent Report & Dashboard
        </div>
        <h1 className="font-hand text-5xl md:text-7xl text-text-main mb-8 leading-tight">
          아이의 마음을 데이터로 읽다,<br />
          부모님을 위한 인사이트 리포트
        </h1>
        <p className="text-xl text-text-soft max-w-3xl mx-auto font-medium leading-relaxed">
          내친구 케이는 아이의 대화 데이터를 분석하여 부모님이 아이의 상태를<br />
          한눈에 파악하고 적절한 양육 결정을 내릴 수 있도록 돕습니다.
        </p>
      </motion.div>

      {/* 리포트 종류 */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-orange/20 hover:border-orange/40 transition-all group">
            <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8 group-hover:scale-110 transition-transform">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4">일일 리포트</h3>
            <p className="text-text-soft text-sm leading-relaxed mb-6">
              오늘 하루 아이가 느낀 주요 감정과 대화 키워드를 요약하여 매일 저녁 전달합니다.
            </p>
            <ul className="space-y-3 text-sm font-bold text-text-main">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange" /> 주요 감정 요약</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange" /> 핵심 대화 키워드</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange" /> 오늘의 소통 팁</li>
            </ul>
          </div>
          <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-orange/20 hover:border-kblue/40 transition-all group">
            <div className="w-14 h-14 bg-kblue/10 rounded-2xl flex items-center justify-center text-kblue mb-8 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4">주간/월간 리포트</h3>
            <p className="text-text-soft text-sm leading-relaxed mb-6">
              한 주, 한 달 동안의 감정 변화 추이와 반복되는 패턴을 분석하여 심층적인 인사이트를 제공합니다.
            </p>
            <ul className="space-y-3 text-sm font-bold text-text-main">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-kblue" /> 감정 흐름 차트</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-kblue" /> 관계/생활 만족도</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-kblue" /> 심층 행동 분석</li>
            </ul>
          </div>
          <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-orange/20 hover:border-yellow/60 transition-all group">
            <div className="w-14 h-14 bg-yellow/20 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4">알림 리포트</h3>
            <p className="text-text-soft text-sm leading-relaxed mb-6">
              부모님의 즉각적인 관심이나 개입이 필요한 특이 신호가 감지될 때 즉시 발송됩니다.
            </p>
            <ul className="space-y-3 text-sm font-bold text-text-main">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-600" /> 특이 신호 감지 알림</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-600" /> 상황별 개입 가이드</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-600" /> 대화 유도 질문지</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 대시보드 미리보기 */}
      <section className="mb-32 py-24 bg-kbg rounded-[4rem] px-12 border border-orange/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-hand text-4xl md:text-6xl text-text-main mb-8">한눈에 보는<br />아이의 마음 대시보드</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">감정 흐름 시각화</h4>
                  <p className="text-text-soft leading-relaxed">
                    기쁨, 슬픔, 화남, 불안 등 아이의 감정 변화를 그래프로 시각화하여 특정 시점의 감정 상태를 쉽게 파악합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-kblue">
                  <PieChart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">관심사 키워드 클라우드</h4>
                  <p className="text-text-soft leading-relaxed">
                    아이가 대화 중 자주 언급하는 단어들을 분석하여 현재 가장 큰 관심사나 고민거리를 보여줍니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-yellow-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">미션 수행 리포트</h4>
                  <p className="text-text-soft leading-relaxed">
                    학교생활, 친구관계 미션 수행 결과를 통해 아이의 사회성 발달 정도를 구조적으로 이해합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-orange/20 relative z-10">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-orange/20">
                    <img src="https://picsum.photos/seed/child/100/100" alt="Child" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black">안서아 <span className="text-[10px] font-medium text-text-soft">(7세)</span></h4>
                    <p className="text-[9px] font-bold text-green-500 uppercase tracking-wider">현재 상태: 안정적임</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-orange italic">AI Insight by K-Bestie</span>
              </div>
              <div className="space-y-6">
                <div className="p-5 bg-kbg rounded-2xl border border-orange/10">
                  <p className="text-xs text-text-soft leading-relaxed italic">
                    "오늘 전반적으로 안정적이지만, 또래 관계에서 약간의 아쉬움을 느낀 것으로 보입니다."
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-kbg rounded-2xl border border-orange/10">
                    <Heart className="w-4 h-4 text-orange mb-2" />
                    <p className="text-[9px] text-text-soft font-bold mb-1">감정 변화</p>
                    <p className="text-xs font-black">매우 긍정적</p>
                  </div>
                  <div className="p-4 bg-kbg rounded-2xl border border-orange/10">
                    <Users className="w-4 h-4 text-green-500 mb-2" />
                    <p className="text-[9px] text-text-soft font-bold mb-1">친구 관계</p>
                    <p className="text-xs font-black">안정적임</p>
                  </div>
                  <div className="p-4 bg-kbg rounded-2xl border border-orange/10">
                    <AlertCircle className="w-4 h-4 text-red-500 mb-2" />
                    <p className="text-[9px] text-text-soft font-bold mb-1">학교 스트레스</p>
                    <p className="text-xs font-black">약간 높음</p>
                  </div>
                  <div className="p-4 bg-kbg rounded-2xl border border-orange/10">
                    <Sparkles className="w-4 h-4 text-kblue mb-2" />
                    <p className="text-[9px] text-text-soft font-bold mb-1">에너지 레벨</p>
                    <p className="text-xs font-black">매우 활발함</p>
                  </div>
                </div>
                <div className="p-6 bg-kblue rounded-3xl text-white shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black">오늘의 대화 가이드</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">
                    "서아야, 오늘 학교에서 어떤 일이 너를 가장 크게 웃게 했어?"
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* 리포트 활용 가이드 */}
      <section className="mb-32">
        <div className="text-center mb-20">
          <h2 className="font-hand text-4xl md:text-6xl text-text-main mb-4">리포트를 어떻게 활용하나요?</h2>
          <p className="text-text-soft font-medium">단순한 정보 제공을 넘어, 실질적인 양육 가이드를 제안합니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex gap-8 items-start">
            <div className="shrink-0 w-16 h-16 bg-white rounded-3xl shadow-md flex items-center justify-center text-orange font-black text-2xl">01</div>
            <div>
              <h4 className="text-2xl font-black mb-4">대화의 물꼬 트기</h4>
              <p className="text-text-soft leading-relaxed">
                "학교 어땠어?"라는 막연한 질문 대신, 리포트에서 제안하는 구체적인 키워드로 대화를 시작하세요. 아이의 대답이 훨씬 풍성해집니다.
              </p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="shrink-0 w-16 h-16 bg-white rounded-3xl shadow-md flex items-center justify-center text-kblue font-black text-2xl">02</div>
            <div>
              <h4 className="text-2xl font-black mb-4">적절한 개입 시점 판단</h4>
              <p className="text-text-soft leading-relaxed">
                아이의 부정적인 감정이 일시적인지, 아니면 일주일 이상 지속되는 패턴인지 확인하여 전문가 상담이나 직접적인 개입이 필요한 시점을 결정합니다.
              </p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="shrink-0 w-16 h-16 bg-white rounded-3xl shadow-md flex items-center justify-center text-yellow-600 font-black text-2xl">03</div>
            <div>
              <h4 className="text-2xl font-black mb-4">아이의 강점 발견</h4>
              <p className="text-text-soft leading-relaxed">
                아이가 어떤 활동에서 가장 큰 성취감을 느끼고 즐거워하는지 데이터를 통해 발견하고, 아이의 자존감을 높여주는 칭찬의 근거로 활용합니다.
              </p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="shrink-0 w-16 h-16 bg-white rounded-3xl shadow-md flex items-center justify-center text-text-main font-black text-2xl">04</div>
            <div>
              <h4 className="text-2xl font-black mb-4">부모의 정서적 안정</h4>
              <p className="text-text-soft leading-relaxed">
                아이의 변화를 객관적인 수치로 확인하면서, 막연한 불안감에서 벗어나 차분하고 확신 있는 양육 태도를 유지할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-kblue text-white py-24 rounded-[4rem]">
        <h2 className="font-hand text-5xl md:text-7xl mb-8">우리 아이의 마음 리포트,<br />직접 확인해보세요</h2>
        <div className="flex justify-center gap-6">
          <Link to="/pricing">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-kblue px-10 py-5 rounded-2xl text-xl font-black shadow-2xl transition-all"
            >
              베타 신청하기
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
