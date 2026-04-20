import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, MessageCircle, ShieldCheck, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    category: "서비스 일반",
    question: "내친구 케이는 어떤 서비스인가요?",
    answer: "내친구 케이는 부모가 아이의 작은 변화를 더 일찍 이해하고, \n다음 성장 구간을 차분히 준비하도록 돕습니다. 아이는 AI 친구 케이와 즐겁게 대화하고, 부모님은 그 데이터를 바탕으로 한 리포트를 통해 아이를 더 깊이 이해하게 됩니다."
  },
  {
    category: "서비스 일반",
    question: "상담이나 진단을 대신할 수 있나요?",
    answer: "아니요, 내친구 케이는 의료적 진단이나 전문적인 심리 상담을 대체하는 서비스가 아닙니다. 부모님이 아이의 상태를 객관적으로 파악하고, 적절한 개입 시점을 판단할 수 있도록 돕는 '사전 이해 및 판단 지원 도구'입니다. 심각한 징후가 보일 경우 반드시 전문가의 도움을 받으시길 권장합니다."
  },
  {
    category: "아이 사용 경험",
    question: "아이가 AI와 대화하는 것을 어려워하지 않을까요?",
    answer: "내친구 케이의 AI는 아이들의 눈높이에 맞춘 다정하고 공감적인 대화 방식을 사용합니다. 또한, 재미있는 데일리 미션과 보상 시스템을 통해 아이들이 마치 게임을 하듯 즐겁게 참여할 수 있도록 설계되었습니다."
  },
  {
    category: "아이 사용 경험",
    question: "매일 대화해야 하나요?",
    answer: "네, 하루 2회(각 5분) 대화를 권장합니다. 최소 2주간 꾸준히 대화해야 정확한 인사이트 리포트가 제공되기 시작합니다. 매일 꾸준히 할수록 감정 흐름과 변화 패턴을 더 정밀하게 파악할 수 있습니다."
  },
  {
    category: "부모 리포트",
    question: "리포트는 언제 확인할 수 있나요?",
    answer: "일일 리포트는 아이가 저녁 미션을 마치고 잠든 뒤, 새벽에 발송됩니다. 주간 리포트는 매주 토요일 새벽, 월간 리포트는 매월 1일 새벽에 대시보드에서 확인하실 수 있습니다. 평소와 다른 특이 신호가 감지되면 알림 리포트가 즉시 발송됩니다."
  },
  {
    category: "보안 및 개인정보",
    question: "아이의 대화 내용이 안전하게 보호되나요?",
    answer: "아이의 대화 원문은 부모님께도 직접 공개되지 않으며, AI가 감정과 패턴만 요약하여 리포트로 전달합니다. 데이터는 Cloud 기반 보안 인프라에 저장되며, 부모님의 동의 없이는 절대 제3자에게 제공되지 않습니다. 자세한 데이터 보호 정책은 개인정보처리방침을 참고해 주세요."
  },
  {
    category: "보안 및 개인정보",
    question: "데이터를 삭제하려면 어떻게 하나요?",
    answer: "현재는 회원 탈퇴 시 계정과 함께 저장된 데이터가 삭제 정책에 따라 파기됩니다.\n서비스 이용 중에는 아이의 기록을 개별적으로 삭제하는 기능은 제공하지 않습니다."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaq = faqData.filter(faq => 
    faq.question.includes(searchTerm) || faq.answer.includes(searchTerm)
  );

  return (
    <div className="pt-24 md:pt-40 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-deep/10 text-primary-deep text-[13px] font-bold rounded-full mb-6">
            FAQ
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-8 leading-tight break-keep">
            궁금하신 점을<br />무엇이든 물어보세요
          </h1>
          <div className="max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="키워드를 입력해보세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-14 py-5 rounded-full border border-black/10 shadow-lg focus:border-primary-deep focus:ring-4 focus:ring-primary-deep/5 outline-none transition-all font-medium text-lg text-charcoal"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-medium-gray w-5 h-5" />
          </div>
        </motion.div>

        {/* FAQ List */}
        <section className="mb-32 max-w-3xl mx-auto">
          <div className="space-y-4">
            {filteredFaq.length > 0 ? (
              filteredFaq.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-pure-white rounded-lg border border-black/5 shadow-sm overflow-hidden"
                >
                  <button 
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-light-gray/50 transition-colors"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-bold text-secondary-coral uppercase tracking-wider">{faq.category}</span>
                      <h3 className="text-lg font-bold text-charcoal pr-4">{faq.question}</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-medium-gray transition-transform shrink-0 ${activeIndex === index ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-black/5"
                      >
                        <div className="px-8 py-6 bg-light-gray/30">
                          <p className="text-[16px] text-dark-gray leading-relaxed font-medium whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-pure-white rounded-lg border border-dashed border-black/10">
                <HelpCircle className="w-12 h-12 text-medium-gray mx-auto mb-4 opacity-20" />
                <p className="text-medium-gray font-bold">검색 결과가 없습니다. 다른 키워드로 검색해보세요.</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center py-16 md:py-24 bg-pure-white rounded-lg shadow-xl px-6 md:px-12 border border-black/5">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">더 궁금한 점이 있으신가요?</h2>
          <p className="text-medium-gray font-medium mb-12">전문 상담원이 친절하게 답변해드리겠습니다.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/contact">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#2D9F8F" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-primary-deep text-white px-10 py-4 rounded-full text-lg font-bold shadow-md transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                1:1 문의하기
              </motion.button>
            </Link>
            <Link to="/safety">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#F3F4F6" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-pure-white text-charcoal border border-black/10 px-10 py-4 rounded-full text-lg font-bold shadow-sm transition-all flex items-center justify-center gap-3"
              >
                <ShieldCheck className="w-5 h-5" />
                보안 정책 확인
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
