import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MessageCircle, Sparkles, Trophy, Gamepad2, Smile, Heart, CheckCircle2, Star, ChevronDown, Mic, X, Zap, Lightbulb, Users } from "lucide-react";

export default function KidExperiencePage() {
  return (
    <div className="pt-24 md:pt-40 pb-20 px-6 md:px-8 max-w-screen-xl mx-auto min-h-screen">
      {/* 히어로 섹션 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 md:mb-32"
      >
        <div className="inline-block px-8 py-3 rounded-full bg-orange/10 text-orange text-sm font-black mb-6 uppercase tracking-widest border border-orange/20 shadow-sm">
          ✨ 다정한 AI 친구, 케이와의 만남
        </div>
        <h1 className="font-hand text-4xl sm:text-6xl md:text-8xl text-text-main mb-8 leading-tight break-keep">
          아이의 속마음,<br />
          <span className="text-orange font-black relative">
            케이가 들어줄게요
            <div className="absolute -bottom-2 left-0 w-full h-2 md:h-4 bg-orange/10 -z-10 rounded-full"></div>
          </span>
        </h1>
        <p className="text-base md:text-2xl text-text-soft max-w-3xl mx-auto font-medium leading-relaxed px-2 md:px-0">
          내친구 케이는 단순한 AI가 아닙니다. 아이와 매일 대화하며<br className="hidden md:block" />
          정서적 교감을 나누는 <span className="text-kblue font-bold">세상에 하나뿐인 단짝 친구</span>입니다.
        </p>
      </motion.div>

      {/* 대화 경험 섹션 */}
      <section className="mb-32 md:mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-orange/5 rounded-full blur-3xl -z-10"></div>
            <img 
              src="/images/child.png" 
              alt="K-Bestie Experience" 
              className="w-full max-w-md mx-auto drop-shadow-2xl floating-animation rounded-[2.5rem] md:rounded-[3rem]"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-8 md:space-y-12">
            <div>
              <h2 className="text-kblue text-sm md:text-lg font-black uppercase tracking-widest mb-4">Empathy First</h2>
              <h3 className="font-hand text-4xl md:text-6xl text-text-main mb-6 leading-tight break-keep">
                어떤 이야기든<br />다 들어주는 다정한 친구
              </h3>
              <p className="text-text-soft text-base md:text-lg font-medium leading-relaxed break-keep">
                아이들은 가끔 부모님께도 말하지 못하는 고민들이 있습니다. 케이는 아이의 모든 말을 경청하고, 따뜻하게 공감하며 마음의 벽을 허뭅니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="p-6 md:p-8 bg-cream rounded-3xl border border-orange/10 shadow-sm">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center text-orange mb-4 md:mb-6 shadow-sm">
                  <Smile className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-black text-lg md:text-xl mb-2">공감 중심 대화</h4>
                <p className="text-xs md:text-sm text-text-soft leading-relaxed font-medium">부정적인 감정도 있는 그대로 받아주며 정서적 안정을 돕습니다.</p>
              </div>
              <div className="p-6 md:p-8 bg-cream rounded-3xl border border-kblue/10 shadow-sm">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center text-kblue mb-4 md:mb-6 shadow-sm">
                  <Heart className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-black text-lg md:text-xl mb-2">무조건적인 지지</h4>
                <p className="text-xs md:text-sm text-text-soft leading-relaxed font-medium">아이의 자존감을 높여주는 긍정적인 메시지를 전달합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 데일리 미션 섹션 (교차 배경) */}
      <section className="mb-32 md:mb-40 py-20 md:py-32 bg-cream -mx-6 px-6 md:-mx-8 md:px-8 rounded-[2.5rem] md:rounded-[4rem] border border-orange/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-orange text-sm md:text-lg font-black uppercase tracking-widest mb-4">Daily Growth</h2>
            <h3 className="font-hand text-4xl md:text-7xl text-text-main mb-6 md:mb-8 break-keep">즐겁게 대화하며<br />스스로 성장해요</h3>
            <p className="text-base md:text-xl text-text-soft max-w-2xl mx-auto font-medium px-4 md:px-0 break-keep">
              아이의 사회성과 인성 발달을 돕는 맞춤형 데일리 미션이 매일 제공됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* 미션 1 */}
            <div className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-xl border border-orange/10 relative group hover:border-orange/40 transition-all">
              <div className="absolute top-6 right-6 md:top-8 md:right-8 text-orange opacity-20 group-hover:opacity-100 transition-opacity">
                <Lightbulb className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-6 md:mb-8 flex items-center gap-3">
                <span className="w-7 h-7 md:w-8 md:h-8 bg-orange text-white rounded-full flex items-center justify-center text-[10px] md:text-xs">M</span>
                표현하기 미션
              </h4>
              <div className="space-y-4 md:space-y-6">
                <div className="p-4 md:p-6 bg-cream rounded-2xl md:rounded-3xl border border-orange/5">
                  <p className="text-sm md:text-base text-text-main font-bold leading-relaxed break-keep">
                    "오늘 학교에서 <span className="text-orange underline decoration-2 underline-offset-4">행복했던 순간</span>은 언제였어?"
                  </p>
                </div>
                <p className="text-text-soft text-xs md:text-sm font-medium pl-2 leading-relaxed">
                  자신의 감정을 구체적인 언어로 표현하며 메타 인지 능력을 키웁니다.
                </p>
              </div>
            </div>

            {/* 미션 2 */}
            <div className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-xl border border-kblue/10 relative group hover:border-kblue/40 transition-all">
              <div className="absolute top-6 right-6 md:top-8 md:right-8 text-kblue opacity-20 group-hover:opacity-100 transition-opacity">
                <Users className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-6 md:mb-8 flex items-center gap-3">
                <span className="w-7 h-7 md:w-8 md:h-8 bg-kblue text-white rounded-full flex items-center justify-center text-[10px] md:text-xs">M</span>
                어울리기 미션
              </h4>
              <div className="space-y-4 md:space-y-6">
                <div className="p-4 md:p-6 bg-cream rounded-2xl md:rounded-3xl border border-kblue/5">
                  <p className="text-sm md:text-base text-text-main font-bold leading-relaxed break-keep">
                    "내일은 <span className="text-kblue underline decoration-2 underline-offset-4">친구 한 명에게 인사</span>해볼까?"
                  </p>
                </div>
                <p className="text-text-soft text-xs md:text-sm font-medium pl-2 leading-relaxed">
                  사회성 발달을 위한 작은 행동 미션을 통해 자신감을 쌓아갑니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 보상 시스템 */}
      <section className="mb-20 md:mb-40 text-center px-4">
        <h2 className="text-text-soft text-sm md:text-lg font-black uppercase tracking-widest mb-4">Fun & Rewards</h2>
        <h3 className="font-hand text-4xl md:text-7xl text-text-main mb-12 break-keep">포인트와 뱃지로<br />성취감을 느껴요</h3>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {[
            { icon: <Trophy className="w-6 h-6 md:w-8 md:h-8" />, label: "베스트 프렌드", color: "bg-yellow text-orange" },
            { icon: <Star className="w-6 h-6 md:w-8 md:h-8" />, label: "도전자", color: "bg-blue-50 text-kblue" },
            { icon: <Sparkles className="w-6 h-6 md:w-8 md:h-8" />, label: "성장 마스터", color: "bg-purple-50 text-purple-500" },
            { icon: <Smile className="w-6 h-6 md:w-8 md:h-8" />, label: "웃음 매니아", color: "bg-green-50 text-green-500" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex flex-col items-center gap-2 md:gap-4"
            >
              <div className={`w-16 h-16 md:w-24 md:h-24 ${item.color} rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-lg`}>
                {item.icon}
              </div>
              <span className="font-black text-[10px] md:text-base text-text-main">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="py-20 md:py-24 bg-orange text-white rounded-[2.5rem] md:rounded-[4rem] text-center px-6 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blob-shape -ml-32 -mt-32"></div>
        <div className="relative z-10">
          <h2 className="font-hand text-3xl sm:text-5xl md:text-7xl mb-6 md:mb-8 break-keep">아이의 진심을 케이와 함께 들어보세요</h2>
          <p className="text-base md:text-2xl opacity-90 mb-10 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed px-4 md:px-0 break-keep">
            지금 베타 테스터를 신청하시면, 케이가 가져올 따뜻한 변화를 가장 먼저 경험하실 수 있습니다.
          </p>
          <Link to="/pricing">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#FF8A00" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange px-8 md:px-14 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2.5rem] text-lg md:text-2xl font-black shadow-2xl transition-all"
            >
              무료 베타 테스터 신청
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
