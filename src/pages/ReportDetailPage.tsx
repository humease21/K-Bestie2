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
          아이의 하루를 1분에 읽다,<br />
          부모님을 위한 요약 리포트
        </h1>
        <p className="text-xl text-text-soft max-w-3xl mx-auto font-medium leading-relaxed">
          아이가 케이와 나눈 하루를 요약해, 오늘 저녁 어떤 대화를 나누면 좋을지 알려드립니다.
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
              오늘 하루 아이가 나눈 주요 대화 주제와 핵심 단어를 요약하여 매일 저녁 전달합니다.
            </p>
            <ul className="space-y-3 text-sm font-bold text-text-main">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange" /> 하루 대화 요약</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange" /> 핵심 이야기 키워드</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange" /> 오늘 저녁 대화거리</li>
            </ul>
          </div>
          <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-orange/20 hover:border-kblue/40 transition-all group">
            <div className="w-14 h-14 bg-kblue/10 rounded-2xl flex items-center justify-center text-kblue mb-8 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4">주간/월간 리포트</h3>
            <p className="text-text-soft text-sm leading-relaxed mb-6">
               한 주, 한 달 동안 아이가 자주 이야기한 관심사와 대화 주제의 변화 흐름을 정리하여 보여드립니다.
            </p>
            <ul className="space-y-3 text-sm font-bold text-text-main">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-kblue" /> 주간 대화 요약</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-kblue" /> 관심사 변화 추이</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-kblue" /> 월간 소통 성장 기록</li>
            </ul>
          </div>
          <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-orange/20 hover:border-yellow/60 transition-all group">
            <div className="w-14 h-14 bg-yellow/20 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4">소통 알림</h3>
            <p className="text-text-soft text-sm leading-relaxed mb-6">
              아이와 자연스럽게 대화할 수 있도록 지원하며, 혹시 모를 위험 신호가 감지될 경우 부모님께 알려드립니다.
            </p>
            <ul className="space-y-3 text-sm font-bold text-text-main">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-600" /> 위험 신호 즉시 알림</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-600" /> 맞춤 소통 가이드</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-600" /> 저녁 대화 유도 팁</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 대시보드 미리보기 */}
      <section className="mb-32 py-24 bg-kbg rounded-[4rem] px-12 border border-orange/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-hand text-4xl md:text-6xl text-text-main mb-8">한눈에 보는<br />아이의 이야기 대시보드</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">아이의 하루 흐름</h4>
                  <p className="text-text-soft leading-relaxed">
                    기쁨, 즐거움 등 아이가 표현한 오늘 하루의 마음 상태를 요약하여 아이의 하루 흐름을 쉽게 파악합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-kblue">
                  <PieChart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">요즘 관심사 요약</h4>
                  <p className="text-text-soft leading-relaxed">
                    아이가 대화 중 자주 이야기한 관심 주제와 단어를 모아서 요즘 무엇에 가장 흥미를 보이는지 보여줍니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-yellow-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">대화 미션 요약</h4>
                  <p className="text-text-soft leading-relaxed">
                    일상 대화와 소통 미션 수행 결과를 통해 아이가 친구들과 어떻게 지내는지 자연스럽게 알 수 있게 돕습니다.
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
                    <p className="text-[9px] font-bold text-green-500 uppercase tracking-wider">오늘 하루: 밝았어요</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-orange italic">AI 요약 by K-Bestie</span>
              </div>
              <div className="space-y-6">
                <div className="p-5 bg-kbg rounded-2xl border border-orange/10">
                  <p className="text-xs text-text-soft leading-relaxed italic">
                    "오늘 전반적으로 밝은 기분으로 대화에 참여했으며, 친구들과 함께 있었던 재미있는 일들을 주로 나누었습니다."
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-kbg rounded-2xl border border-orange/10">
                    <Heart className="w-4 h-4 text-orange mb-2" />
                    <p className="text-[9px] text-text-soft font-bold mb-1">오늘 기분</p>
                    <p className="text-xs font-black">밝았어요</p>
                  </div>
                  <div className="p-4 bg-kbg rounded-2xl border border-orange/10">
                    <Users className="w-4 h-4 text-green-500 mb-2" />
                    <p className="text-[9px] text-text-soft font-bold mb-1">친구 이야기</p>
                    <p className="text-xs font-black">자주 나눴어요</p>
                  </div>
                  <div className="p-4 bg-kbg rounded-2xl border border-orange/10">
                    <AlertCircle className="w-4 h-4 text-kblue mb-2" />
                    <p className="text-[9px] text-text-soft font-bold mb-1">학교 이야기</p>
                    <p className="text-xs font-black">즐거웠어요</p>
                  </div>
                  <div className="p-4 bg-kbg rounded-2xl border border-orange/10">
                    <Sparkles className="w-4 h-4 text-kblue mb-2" />
                    <p className="text-[9px] text-text-soft font-bold mb-1">하루 에너지</p>
                    <p className="text-xs font-black">활기찼어요</p>
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
                <div className="p-6 bg-secondary-coral rounded-3xl text-white shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] font-black">주말에 함께할래요?</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">
                    아이가 이번 주말에 함께하고 싶은 걸 케이에게 살짝 전했어요 💌
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
          <p className="text-text-soft font-medium">단순한 정보 제공을 넘어, 실질적인 대화와 소통 가이드를 제안합니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex gap-8 items-start">
            <div className="shrink-0 w-16 h-16 bg-white rounded-3xl shadow-md flex items-center justify-center text-orange font-black text-2xl">01</div>
            <div>
              <h4 className="text-2xl font-black mb-4">대화의 물꼬 트기</h4>
              <p className="text-text-soft leading-relaxed">
                "오늘 학교 어땠어?"라는 막연한 질문 대신, 요약 리포트에서 제안하는 구체적인 키워드로 대화를 시작해 보세요. 아이의 대답이 훨씬 풍성해집니다.
              </p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="shrink-0 w-16 h-16 bg-white rounded-3xl shadow-md flex items-center justify-center text-kblue font-black text-2xl">02</div>
            <div>
              <h4 className="text-2xl font-black mb-4">자연스러운 대화 유도</h4>
              <p className="text-text-soft leading-relaxed">
                아이의 하루 이야기를 바탕으로 오늘 어떤 부분에 대해 더 귀 기울여 주어야 할지 파악하고, 아이와 더 깊이 소통할 수 있는 대화 방향을 제안합니다.
              </p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="shrink-0 w-16 h-16 bg-white rounded-3xl shadow-md flex items-center justify-center text-yellow-600 font-black text-2xl">03</div>
            <div>
              <h4 className="text-2xl font-black mb-4">아이의 관심사 발견</h4>
              <p className="text-text-soft leading-relaxed">
                아이가 요즘 어떤 이야기에서 즐거움을 느끼고 신나 했는지 발견하고, 아이의 자존감을 높여주는 칭찬과 소통의 근거로 활용합니다.
              </p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="shrink-0 w-16 h-16 bg-white rounded-3xl shadow-md flex items-center justify-center text-text-main font-black text-2xl">04</div>
            <div>
              <h4 className="text-2xl font-black mb-4">매일의 따뜻한 교감</h4>
              <p className="text-text-soft leading-relaxed">
                아이의 하루 일상을 꾸준히 파악하면서, 막연한 걱정에서 벗어나 확신을 가지고 자녀와 편안하고 따뜻하게 소통할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-kblue text-white py-24 rounded-[4rem]">
        <h2 className="font-hand text-5xl md:text-7xl mb-8">아이의 하루 요약과 대화거리,<br />직접 확인해보세요</h2>
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
