import { motion } from "motion/react";

export default function CTA() {
  return (
    <section className="py-32 bg-peach overflow-hidden">
      <div className="max-w-screen-lg mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-12 md:p-24 blob-card shadow-xl relative overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-white to-yellow -z-10"></div>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-coral opacity-10 blob-shape"></div>
          
          <h2 className="font-hand text-4xl md:text-6xl font-bold text-text-main mb-8 leading-tight">
            잠든 <span className="text-5xl md:text-8xl text-coral inline-block transform rotate-1">잠재력</span>을 깨우는<br />
            가장 다정한 방법
          </h2>
          <p className="text-xl text-text-soft font-medium mb-12 max-w-xl mx-auto leading-relaxed">
            지금 바로 아이와 함께하는 발견 여행을 시작해보세요. 7일간의 무료 체험으로 매일의 행복을 수집하세요.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-coral text-white px-12 py-6 rounded-full text-2xl font-black shadow-2xl shadow-coral/20 transition-all"
          >
            오늘의 발견 시작하기
          </motion.button>
          
          <div className="mt-16 flex justify-center gap-12 grayscale opacity-40">
            <span className="text-xs font-black tracking-widest uppercase">Safe Care</span>
            <span className="text-xs font-black tracking-widest uppercase">AI Discovery</span>
            <span className="text-xs font-black tracking-widest uppercase">Happy Growth</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
