import { motion } from "motion/react";

const features = [
  {
    title: "반짝이는 마음 관찰",
    desc: "아이의 감정선을 따라가며 어떤 순간에 가장 행복해하는지 포착합니다.",
    img: "/images/feature1.png",
    bg: "bg-peach"
  },
  {
    title: "함께 크는 즐거움",
    desc: "작은 성취 하나하나가 모여 큰 자존감이 되는 과정을 기록합니다.",
    img: "/images/feature2.jpg",
    bg: "bg-lavender",
    offset: true
  },
  {
    title: "데일리 윈즈(Daily Wins)",
    desc: "오늘 우리 아이가 발견한 작은 별들을 부모님과 함께 공유해요.",
    img: "/images/feature3.png",
    bg: "bg-yellow"
  }
];

export default function Features() {
  return (
    <section className="bg-white py-32 relative overflow-hidden curved-edge">
      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="font-hand text-4xl md:text-5xl font-bold text-text-main">
            우리 아이의 <span className="text-5xl md:text-7xl text-coral underline decoration-yellow decoration-8 underline-offset-8">행복한 변화</span>
          </h2>
          <p className="mt-4 text-text-soft font-bold">차가운 데이터가 아닌 따뜻한 시선으로 관찰합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              className={`${f.bg} p-10 blob-card flex flex-col items-center text-center ${f.offset ? "md:-mt-6" : ""}`}
            >
              <div className="mb-8 bg-white blob-shape flex items-center justify-center p-4 w-64 h-64 shadow-sm">
                <img 
                  alt={f.title} 
                  className="w-full h-full object-contain rounded-3xl" 
                  src={f.img}
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display text-2xl font-black mb-4">{f.title}</h3>
              <p className="text-sm text-text-soft leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-peach rounded-full -mr-48 -mt-48 mix-blend-multiply opacity-50"></div>
    </section>
  );
}
