import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, MessageCircle, Heart, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      return;
    }
    setEmailError("");
    
    setIsSubmitting(true);
    
    try {
      const submissionData = new FormData();
      const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
      
      submissionData.append("_subject", `내친구케이 1:1 문의 [${today}]`);
      submissionData.append("성함", name);
      submissionData.append("이메일주소", email);
      submissionData.append("문의내용", message);
      
      // 1. Send Email via FormSubmit
      const mailResponse = await fetch("https://formsubmit.co/ajax/contact@humease.com", {
        method: "POST",
        body: submissionData,
        headers: {
          'Accept': 'application/json'
        }
      });

      // 2. Save to Supabase (NEW!)
      const { error: supabaseError } = await supabase
        .from('inquiries')
        .insert([
          {
            name: name,
            email: email,
            subject: '1:1 문의',
            message: message,
            status: 'pending'
          }
        ]);

      if (supabaseError) {
        console.error("Supabase Saving Error:", supabaseError);
      }

      if (mailResponse.ok) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Failed to send inquiry");
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
      alert("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-40 pb-20 px-8 max-w-screen-xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <div className="inline-block px-4 py-1.5 rounded-full bg-yellow text-orange text-xs font-black mb-6 uppercase tracking-widest">
          Brand & Contact
        </div>
        <h1 className="font-hand text-5xl md:text-7xl text-text-main mb-8 leading-tight">
          아이와 부모 사이의<br />따뜻한 연결 고리가 되겠습니다
        </h1>
        <p className="text-xl text-text-soft max-w-3xl mx-auto font-medium leading-relaxed">
          내친구 케이는 부모님이 아이의 마음을 더 잘 이해하고, 더 행복한 가정을 만들어갈 수 있도록 돕는 파트너입니다.
        </p>
      </motion.div>

      {/* 브랜드 소개 */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-orange/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange/5 rounded-full -mr-20 -mt-20"></div>
            <h2 className="font-hand text-4xl md:text-6xl text-text-main mb-8">우리의 미션</h2>
            <p className="text-lg text-text-soft leading-relaxed mb-12 font-medium">
              "아이의 마음을 읽는 렌즈가 되어, 부모님의 막연한 불안감을 확신 있는 양육으로 바꿉니다."
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center text-orange">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-text-main">공감과 이해</h4>
                  <p className="text-sm text-text-soft">아이의 감정을 있는 그대로 존중하고 이해하는 문화를 만듭니다.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-kblue/10 rounded-xl flex items-center justify-center text-kblue">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-text-main">신뢰와 안전</h4>
                  <p className="text-sm text-text-soft">가장 안전한 기술로 소중한 데이터를 보호하고 신뢰를 구축합니다.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-yellow/20 rounded-xl flex items-center justify-center text-orange-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-text-main">성장과 변화</h4>
                  <p className="text-sm text-text-soft">데이터를 통해 아이와 부모가 함께 성장하는 경험을 제공합니다.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-hand text-4xl md:text-6xl text-text-main mb-8">문의하기</h2>
            <div className="p-8 bg-white rounded-3xl border border-orange/20 shadow-sm">
              <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-orange" />
                1:1 문의 남기기
              </h4>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <p className="font-black text-xl text-text-main mb-3">문의가 정상적으로 접수되었습니다.</p>
                  <p className="text-text-soft font-bold mb-4 text-sm leading-relaxed break-keep">
                    '내친구 케이'에 관심을 가져주셔서 진심으로 감사합니다.<br />
                    보내주신 소중한 문의 내용을 신중히 검토하여<br />빠른 시일 내에 답변드릴 수 있도록 하겠습니다.
                  </p>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input 
                    required
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="성함"
                    className="w-full px-6 py-4 rounded-2xl border border-orange/10 focus:border-orange outline-none transition-all font-bold"
                  />
                  <div className="space-y-1">
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      placeholder="이메일 주소"
                      className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all font-bold ${
                        emailError ? 'border-red-500' : 'border-orange/10 focus:border-orange'
                      }`}
                    />
                    {emailError && (
                      <p className="text-xs text-red-500 ml-2 font-bold">{emailError}</p>
                    )}
                  </div>
                  <textarea 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="문의 내용을 입력해주세요"
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl border border-orange/10 focus:border-orange outline-none transition-all font-bold resize-none"
                  ></textarea>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-secondary-coral text-white rounded-2xl font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        전송 중...
                      </>
                    ) : (
                      '문의하기'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
