import { motion } from "motion/react";
import { Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-48 pb-32 px-8 max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2"
      >
        <div className="mb-8">
          <img 
            src="/images/logo2.png" 
            alt="내친구 케이" 
            className="h-20 w-auto"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="font-hand text-5xl md:text-7xl font-bold leading-[1.1] text-text-main mb-8">
          아이의 <span className="text-coral text-6xl md:text-8xl inline-block transform -rotate-2">작은 꿈</span>,<br />
          내일의 반짝이는 별로
        </h1>
        <p className="text-xl font-medium text-text-soft leading-relaxed mb-10 max-w-lg">
          매일 발견하는 우리 아이만의 특별함. 차가운 수치 대신 따뜻한 이야기로 성장을 기록하고 daily wins를 함께 축하해요.
        </p>
        <div className="flex flex-wrap gap-4">
          <motion.button 
            whileHover={{ rotate: 1, scale: 1.02 }}
            className="bg-coral text-white px-10 py-5 rounded-full text-lg font-black shadow-xl shadow-coral/10 transition-all"
          >
            지금 탐험 시작하기
          </motion.button>
          <motion.button 
            whileHover={{ backgroundColor: "#f3e8ff" }}
            className="bg-white text-text-main border-2 border-lavender px-10 py-5 rounded-full text-lg font-black transition-all"
          >
            체험 가이드 보기
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2 relative"
      >
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-lavender blob-shape -z-10 animate-pulse opacity-50"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-yellow blob-shape -z-10 opacity-50"></div>
        
        <div className="bg-white p-6 blob-card shadow-2xl relative">
          <div className="w-full aspect-square bg-gradient-to-br from-peach to-lavender rounded-[40px] flex items-center justify-center overflow-hidden">
            <img 
              alt="Child reaching for a star" 
              className="w-4/5 h-4/5 object-contain" 
              src="/images/potentials.jpg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-6 flex items-center gap-4 bg-mint p-4 rounded-3xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
              <Leaf className="text-green-500 w-6 h-6" />
            </div>
            <div className="w-full">
              <div className="flex justify-between text-[10px] font-black text-green-700 uppercase mb-1">
                <span>잠재력 성장 중</span>
                <span>88%</span>
              </div>
              <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "88%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-green-400 rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
