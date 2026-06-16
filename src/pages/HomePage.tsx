import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Layers,
  EyeOff,
  Puzzle,
  MessageCircle,
  Clock,
  Heart,
  ShieldCheck,
  HeartHandshake,
  Users,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

// --- Sub-components ---
const SectionHeader = ({ badge, title, sub, center = true }: { badge: string; title: string; sub?: string; center?: boolean }) => (
  <div className={`mb-16 ${center ? "text-center" : "text-left"}`}>
    <span className="inline-block px-3 py-1 bg-primary-deep/10 text-primary-deep text-[12px] font-bold tracking-wider rounded-full mb-4 uppercase">
      {badge}
    </span>
    <h2 className="text-4xl md:text-[52px] font-bold text-charcoal mb-6 whitespace-pre-line leading-[1.2] font-brand tracking-tight">
      {title}
    </h2>
    {sub && <p className="text-medium-gray text-[19px] max-w-2xl mx-auto leading-relaxed">{sub}</p>}
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-pure-white p-8 rounded-lg border border-black/5 shadow-md hover:shadow-lg transition-premium"
  >
    <div className="w-16 h-16 bg-primary-deep/5 rounded-full flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-primary-deep" />
    </div>
    <h4 className="text-[22px] font-bold text-charcoal mb-3">{title}</h4>
    <p className="text-dark-gray leading-relaxed text-[16px]">{desc}</p>
  </motion.div>
);

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [reportTab, setReportTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [solutionStep, setSolutionStep] = useState(0);
  const [heroIdx, setHeroIdx] = useState(0);

  const heroImages = [
    "/images/Hero1.png",
    "/images/Hero2.png",
    "/images/Hero3.png",
    "/images/Hero4.png",
    "/images/Hero5.png",
    "/images/Hero6.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > 800 && window.scrollY < (document.documentElement.scrollHeight - 1200));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 72;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [window.location.hash]);

  return (
    <div id="home" className="overflow-x-hidden pt-[72px]">
      {/* S1. Hero Section */}
      <section className="relative bg-warm-white pt-8 pb-16 md:pt-12 md:pb-24 px-6 md:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-primary-deep/[0.03] rounded-full blur-[100px] -mr-[10%] -mt-[5%]"></div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="z-10 lg:col-span-7 text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 bg-secondary-coral/10 text-secondary-coral text-[13px] font-bold rounded-full mb-6">
              ✨ 7월 베타 런칭 | 테스터 사전 모집
            </span>
            <h1 className="text-[32px] md:text-[64px] font-bold text-charcoal leading-[1.2] lg:leading-[1.1] mb-6 md:mb-8 tracking-tight font-brand">
              "오늘 학교 어땠어?"에 <br className="hidden md:block" />
              <span className="text-primary-deep">"그냥"</span>이라는 답만 <br className="hidden md:block" />
              돌아오나요?
            </h1>
            <p className="text-[17px] md:text-[22px] text-medium-gray leading-[1.6] mb-8 md:mb-10 max-w-[640px] mx-auto lg:mx-0">
              아이가 케이와 나눈 하루를 요약해 보여주고, 오늘 저녁 어떤 대화를 나누면 좋을지 알려드립니다. 아이의 하루에 다시 연결되세요.
            </p>
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Link to="/pricing" className="w-full md:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#2D9F8F" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto bg-primary-deep text-white px-10 py-4.5 rounded-full text-lg font-bold shadow-lg flex items-center justify-center gap-2 group"
                >
                  무료 베타 신청하기 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <p className="text-[14px] text-medium-gray font-medium">선착순 100가정 · 7월 시작 · 완전 무료</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end lg:col-span-5 order-last lg:order-none"
          >
            <div className="rounded-[32px] overflow-hidden shadow-xl aspect-[4/5] md:aspect-[3/4] relative bg-light-gray w-full max-w-[460px]">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={heroIdx}
                  src={heroImages[heroIdx]} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  alt="서비스 소개 이미지" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </AnimatePresence>
              
              {/* Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroImages.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${i === heroIdx ? "bg-white w-6" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* S2. Social Proof Strip */}
      <section className="bg-light-gray py-10 px-6 border-y border-black/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:flex lg:flex-nowrap justify-center gap-x-8 gap-y-10 lg:gap-x-12">
          {[
            { label: "사전 신청 가정", val: "87+" },
            { label: "일일 요약 리포트", val: "1분" },
            { label: "매일 대화", val: "하루 5분 × 2회" },
            { label: "베타 오픈", val: "7월" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-3 text-center lg:text-left">
              <span className="text-charcoal font-bold text-xl lg:text-lg">{item.val}</span>
              <span className="text-medium-gray text-[13px] font-medium leading-tight">{item.label}</span>
              {i < 3 && <div className="hidden lg:block h-4 w-px bg-black/10 ml-8"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* S3. Problem Section */}
      <section id="problem" className="py-24 md:py-32 bg-warm-white px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeader badge="PARENTS' CONCERNS" title={"부모님, 이런 답답함을\n느끼고 계시지는 않나요?"} sub="바쁜 하루 속에서 아이와 제대로 대화할 틈을 놓치고 있습니다." />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { img: "/images/problem1.png", title: "물어봐도 돌아오는 답은 \"그냥\"", desc: "\"오늘 어땠어?\"라고 물어도 \"그냥\", \"몰라\"뿐. 아이의 하루가 궁금한데 알 방법이 없어 답답합니다." },
              { img: "/images/problem2.png", title: "무슨 얘기를 꺼내야 할지 모르겠다", desc: "아이의 하루를 모르니 막상 대화를 시작하려 해도 무슨 말부터 해야 할지 막막합니다." },
              { img: "/images/problem3.png", title: "바빠서 아이의 하루를 놓친다", desc: "맞벌이로 함께하는 시간이 부족해, 아이가 요즘 무엇에 관심 있고 어떤 기분인지 따라가기 어렵습니다." },
              { img: "/images/problem4.png", title: "부부의 이야기가 엇갈린다", desc: "아이 상태를 두고 한 명은 '괜찮다', 한 명은 '신경 쓰인다'며 서로 다르게 해석해 대화가 엇갈립니다." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-pure-white rounded-[24px] overflow-hidden border border-black/5 shadow-md hover:shadow-xl transition-all duration-500">
                <img src={item.img} alt={item.title} className="w-full h-[240px] object-cover" />
                <div className="p-8">
                  <h4 className="text-[26px] font-bold text-charcoal mb-3">{item.title}</h4>
                  <p className="text-dark-gray leading-relaxed text-[18px]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S4. Gap Section */}
      <section className="py-24 md:py-32 bg-light-gray px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeader badge="WHY NOT ENOUGH" title={"왜 기존 방식만으로는\n부족할까요?"} />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={Layers} title="단편적인 정보" desc="맘카페나 담임 상담은 특정 시점의 정보만 줍니다. 매일의 아이를 꾸준히 따라가기는 어렵습니다." />
            <FeatureCard icon={EyeOff} title="부모 앞에서는 닫히는 아이" desc="부모가 직접 물으면 아이는 속마음을 숨기기 쉽습니다. 판단하지 않는 친구 '케이'에게는 더 편하게 이야기합니다." />
            <FeatureCard icon={Puzzle} title="대화의 실마리가 없다" desc="육아서의 일반론은 '우리 아이'와 오늘 무슨 대화를 나눠야 할지까지는 알려주지 못합니다." />
          </div>
        </div>
      </section>

      {/* S5. Solution Section */}
      <section id="solution" className="py-24 md:py-32 bg-pure-white px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeader badge="OUR SOLUTION" title={"아이의 하루를 알고,\n대화를 되찾는 가장 쉬운 방법"} sub="아이는 편하게 이야기하고, 부모님은 매일 아이의 하루와 대화거리를 받습니다." />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image First on Mobile */}
            <div className="relative flex justify-center lg:col-span-5 order-1 lg:order-2">
              <div className="absolute inset-0 bg-primary-deep/5 rounded-[40px] translate-x-4 translate-y-4 -z-10 hidden lg:block"></div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={solutionStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-[280px] lg:max-w-[340px]"
                >
                  <div className="relative w-full drop-shadow-2xl mx-auto">
                    <img 
                      src={solutionStep === 2 ? "/images/M5.png" : "/images/M3.png"} 
                      alt="서비스 화면" 
                      className="w-full h-auto rounded-[2.5rem]"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-4 lg:col-span-7 order-2 lg:order-1">
              {[
                { icon: MessageCircle, title: "자연스러운 대화", desc: "아이가 좋아하는 관심사로 시작해, 케이가 하루 이야기를 자연스럽게 끌어냅니다. 공부가 아니라 친구와의 수다입니다.", img: "/images/M3.png" },
                { icon: Clock, title: "하루 두 번, 5분이면 충분", desc: "하교 후 5분, 잠들기 전 5분. 짧은 대화만으로 아이의 하루가 부모님께 전해집니다.", img: "/images/M3.png" },
                { icon: Heart, title: "오늘의 요약과 대화거리", desc: "그날 아이의 하루를 요약해드리고, 오늘 저녁 어떤 이야기를 나누면 좋을지 대화거리를 추천해드립니다.", img: "/images/M5.png" }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setSolutionStep(i)}
                  className={`flex gap-5 p-5 md:p-6 rounded-2xl transition-all cursor-pointer ${solutionStep === i ? "bg-primary-deep/5 shadow-sm" : "hover:bg-primary-deep/[0.02]"}`}
                >
                  <div className={`shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center transition-colors ${solutionStep === i ? "bg-primary-deep text-white" : "bg-primary-deep/10 text-primary-deep"}`}>
                    <item.icon className="w-8 h-8 md:w-12 md:h-12" />
                  </div>
                  <div>
                    <h4 className={`text-[20px] md:text-[26px] font-bold mb-1 transition-colors ${solutionStep === i ? "text-primary-deep" : "text-charcoal"}`}>{item.title}</h4>
                    <p className="text-dark-gray leading-relaxed text-[15px] md:text-[18px]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S5.5 Child Experience Section (New) */}
      <section className="py-24 md:py-32 bg-light-gray px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1 flex justify-center">
              <div className="relative w-full max-w-[280px] lg:max-w-[340px] drop-shadow-2xl">
                <img src="/images/M2.png" alt="아이 홈 화면" className="w-full h-auto rounded-[2.5rem]" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2 text-center lg:text-left">
              <SectionHeader badge="CHILD EXPERIENCE" title={"아이가 좋아할까요?\n공부가 아닌 놀이로 만나요"} center={false} />
              <div className="space-y-6 md:space-y-8 mt-[-20px] lg:mt-0">
                <div className="flex gap-4 items-start text-left">
                  <div className="w-10 h-10 bg-secondary-coral/10 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-secondary-coral" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">나만의 AI 친구 '케이'</h5>
                    <p className="text-medium-gray text-[15px] md:text-[16px]">나를 판단하지 않고 끝까지 들어주는 다정한 단짝 친구가 생깁니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start text-left">
                  <div className="w-10 h-10 bg-secondary-coral/10 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-secondary-coral" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">매일 기다려지는 미션</h5>
                    <p className="text-medium-gray text-[15px] md:text-[16px]">대화를 통해 얻은 단서로 매일 새로운 미션을 수행하며 성취감을 느껴요.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* S6. Report Preview */}
      <section id="report" className="py-24 md:py-32 bg-warm-white px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-8 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeader badge="REPORT PREVIEW" title={"아이의 마음,\n리포트로 읽어보세요"} sub="매주 제공되는 맞춤형 인사이트로 아이의 보이지 않는 변화를 발견합니다." center={false} />
            </motion.div>
            
            {/* Horizontal Tabs on Mobile */}
            <div className="flex lg:flex-col gap-2 md:gap-4 mt-6 md:mt-8 overflow-x-auto pb-2 px-4 lg:px-2 no-scrollbar -mx-6 lg:mx-0">
              {[
                { id: "daily", title: "일간", fullTitle: "일간 감정 흐름", desc: "오늘 아이가 케이와 나누었던 대화 중 핵심적인 감정 변화를 요약합니다." },
                { id: "weekly", title: "주간", fullTitle: "주간 소통 리포트", desc: "한 주간 아이가 나눈 이야기를 모아, 요즘 무엇에 관심 있고 어떤 하루를 보냈는지 알려드립니다." },
                { id: "monthly", title: "월간", fullTitle: "월간 성장 리포트", desc: "한 달간의 마음 흐름을 그래프로 보여주며 따뜻한 대화 팁을 제공합니다." }
              ].map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => setReportTab(tab.id as any)} 
                  className={`flex-1 lg:flex-none text-center lg:text-left p-3 md:p-6 rounded-xl border transition-all duration-300 min-w-[90px] md:min-w-[120px] lg:max-w-[540px] ${
                    reportTab === tab.id 
                      ? "bg-pure-white border-primary-deep shadow-md lg:translate-x-4 border-b-4" 
                      : "bg-pure-white/50 border-black/5 hover:border-black/10"
                  }`}
                >
                  <h4 className={`text-[14px] md:text-[19px] font-bold ${reportTab === tab.id ? "text-primary-deep" : "text-charcoal"}`}>
                    <span className="lg:hidden">{tab.title}</span>
                    <span className="hidden lg:inline">{tab.fullTitle}</span>
                  </h4>
                  <p className="hidden lg:block text-[17px] text-medium-gray leading-relaxed mt-1">{tab.desc}</p>
                </button>
              ))}
            </div>
            {/* Mobile Tab Description */}
            <div className="lg:hidden mt-4 text-center">
              <p className="text-[15px] text-medium-gray leading-relaxed">
                {[
                  { id: "daily", desc: "오늘 아이가 케이와 나누었던 대화 중 핵심적인 감정 변화를 요약합니다." },
                  { id: "weekly", desc: "한 주간 아이가 나눈 이야기를 모아, 요즘 무엇에 관심 있고 어떤 하루를 보냈는지 알려드립니다." },
                  { id: "monthly", desc: "한 달간의 마음 흐름을 그래프로 보여주며 따뜻한 대화 팁을 제공합니다." }
                ].find(t => t.id === reportTab)?.desc}
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center items-center order-last lg:order-none">
            <div className="relative w-full flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1A6B5A 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={reportTab} 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.4 }} 
                  className="w-full h-full flex items-center justify-center relative z-10"
                >
                  <div className="relative w-full max-w-[260px] lg:max-w-[300px] drop-shadow-2xl mx-auto">
                    <img 
                      src={
                        reportTab === 'daily' ? "/images/M4.png" : 
                        reportTab === 'weekly' ? "/images/M6.png" : 
                        "/images/M1.png"
                      } 
                      alt="리포트 화면" 
                      className="w-full h-auto rounded-[2.5rem]" 
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* S7. Safety Section */}
      <section id="safety" className="py-24 md:py-32 bg-charcoal text-white px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeader badge="DATA SAFETY" title={"무엇보다 아이의 프라이버시를\n최우선으로 생각합니다"} center={false} />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "대화 원문은 저장하지 않습니다", desc: "아이와 케이가 나눈 대화는 원문 그대로 저장하지 않고, 요약된 리포트 형태로만 안전하게 관리합니다." },
              { icon: HeartHandshake, title: "안전한 대화 환경", desc: "부적절한 대화가 발생하지 않도록 전문 가이드라인에 따라 케이의 대화를 세심하게 관리합니다." },
              { icon: Users, title: "부모님의 균형 잡힌 알 권리", desc: "아이의 프라이버시와 부모님의 알 권리 사이의 균형을 위해, 원문 대신 요약 인사이트만 제공합니다. 또한 혹시 모를 위험 신호가 감지될 경우 부모님께 알려드립니다." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 p-10 rounded-[32px] hover:bg-white/10 transition-all group">
                <item.icon className="w-14 h-14 text-primary-light mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-[26px] font-bold mb-4 text-pure-white">{item.title}</h4>
                <p className="text-white/85 leading-relaxed text-[18px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S8. FAQ Section */}
      <section id="faq" className="py-24 md:py-32 bg-light-gray px-6">
        <div className="max-w-[720px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeader badge="FAQ" title="자주 묻는 질문" />
          </motion.div>
          <div className="space-y-4">
            {[
              { q: "정말 무료인가요?", a: "네, 이번 7월 베타 테스트 기간 동안 선정된 100가정은 모든 기능을 완전 무료로 이용하실 수 있습니다." },
              { q: "몇 살부터 이용 가능한가요?", a: "언어 표현이 정교해지고 자기 생각이 또렷해지는 초등 2학년부터 4학년까지를 적극 권장합니다." },
              { q: "매일 대화해야 하나요?", a: "네, 하루 2회(각 5분) 대화를 권장합니다. 최소 2주간 꾸준히 대화해야 더 정확한 요약 리포트가 제공되기 시작합니다. 매일 꾸준히 할수록 아이의 하루를 더 잘 따라갈 수 있습니다." },
              { q: "데이터는 안전한가요?", a: "아이의 대화는 원문 그대로 저장하지 않으며, 케이가 요약한 리포트 형태로만 안전하게 관리됩니다. 어떤 경우에도 부모님의 동의 없이 제3자에게 제공되지 않습니다. 자세한 내용은 개인정보처리방침을 참고해 주세요." }
            ].map((item, i) => (
              <motion.div key={i} className="bg-pure-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full px-6 py-6 text-left flex justify-between items-center group">
                  <span className="font-bold text-charcoal group-hover:text-primary-deep transition-colors">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-medium-gray transition-transform ${activeFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-6 pb-6 text-dark-gray leading-relaxed text-[15px] border-t border-black/5 pt-4">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-medium-gray font-medium mb-6">더 궁금한 점이 있으신가요?</p>
            <Link to="/contact">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#1A6B5A" }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-deep text-white px-10 py-4 rounded-full font-bold shadow-lg flex items-center gap-2 mx-auto"
              >
                <MessageCircle className="w-5 h-5" />
                1:1 문의하기
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* S9. Final CTA Section */}
      <section id="pricing" className="footer-transition-gradient py-24 md:py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute -left-[5%] -top-[10%] w-[400px] h-[400px] bg-pure-white/10 rounded-full blur-[100px]"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-[48px] font-bold text-white mb-8 leading-tight font-brand">아이의 하루에 다시 연결되는<br />가장 쉬운 방법</h2>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed">선착순 100가정에게만 주어지는 무료 베타 혜택을 놓치지 마세요.</p>
            <Link to="/pricing">
              <motion.button whileHover={{ scale: 1.05, backgroundColor: "#FFFFFF", color: "#1A6B5A" }} whileTap={{ scale: 0.95 }} className="bg-pure-white text-primary-deep px-12 py-5 rounded-full text-xl font-bold shadow-2xl">무료 베타 신청하기</motion.button>
            </Link>
            <p className="mt-8 text-white/60 text-sm">현재 87가정 신청 완료 | 남은 인원 13명</p>
          </motion.div>
        </div>
      </section>

      {/* Floating CTA (Mobile) */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 w-full bg-pure-white shadow-[0_-8px_30px_rgba(0,0,0,0.1)] p-4 z-[500] md:hidden">
            <Link to="/pricing">
              <button className="w-full bg-primary-deep text-white py-4 rounded-full text-lg font-bold shadow-md">무료 베타 신청하기</button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating CTA for Mobile */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div 
            initial={{ y: 100 }} 
            animate={{ y: 0 }} 
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-black/5 p-4 z-[50] md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
          >
            <Link to="/pricing">
              <button className="w-full bg-primary-deep text-white py-4 rounded-full text-lg font-bold shadow-lg">
                무료 베타 신청하기
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
