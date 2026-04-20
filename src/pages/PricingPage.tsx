import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CheckCircle2, Star, Sparkles, Gift, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function PricingPage() {
  const [gender, setGender] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("초등학교 1학년");
  const [customGrade, setCustomGrade] = useState("");
  const [email, setEmail] = useState("");
  const [parentName, setParentName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    let formattedValue = "";

    if (value.length <= 3) {
      formattedValue = value;
    } else if (value.length <= 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length <= 11) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
    } else {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setPhone(formattedValue);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    let hasError = false;
    if (parentName.length < 2) {
      setNameError("성함을 2자 이상 입력해주세요.");
      hasError = true;
    }
    if (phone.length < 12) {
      setPhoneError("올바른 연락처를 입력해주세요.");
      hasError = true;
    }
    if (!validateEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      hasError = true;
    }

    if (hasError) return;
    
    setIsSubmitting(true);
    
    try {
      // 1. Duplicate Check
      const { data: existing } = await supabase
        .from('beta_applications')
        .select('id')
        .or(`email.eq.${email},phone.eq.${phone}`)
        .limit(1);

      if (existing && existing.length > 0) {
        alert("이미 신청된 연락처 또는 이메일입니다. 확인 후 다시 시도해주세요.");
        setIsSubmitting(false);
        return;
      }

      // 2. Submit to Supabase
      const finalGrade = grade === "기타" ? customGrade : grade;
      const { error: supabaseError } = await supabase
        .from('beta_applications')
        .insert([
          {
            parent_name: parentName,
            phone: phone,
            email: email,
            child_gender: gender === 'male' ? '남아' : gender === 'female' ? '여아' : '미선택',
            child_grade: finalGrade,
            motivation: (e.currentTarget as any).motivation?.value || ""
          }
        ]);

      if (supabaseError) throw supabaseError;

      // 3. Optional: FormSubmit (Email Notification)
      const submissionData = new FormData();
      submissionData.append("부모님성함", parentName);
      submissionData.append("연락처", phone);
      submissionData.append("이메일주소", email);
      submissionData.append("자녀학년", finalGrade);
      
      await fetch("https://formsubmit.co/ajax/contact@humease.com", {
        method: "POST",
        body: submissionData,
        headers: { 'Accept': 'application/json' }
      });

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert("전송 중 오류가 발생했습니다: " + (error.message || "잠시 후 다시 시도해주세요."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 md:pt-40 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-1.5 bg-secondary-coral/10 text-secondary-coral text-[13px] font-bold rounded-full mb-6">
            ✨ 7월 베타 런칭 | 테스터 사전 모집
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-8 leading-tight break-keep font-brand">
            지금 바로 베타 테스터로<br />
            참여하고 <span className="text-primary-deep">특별한 혜택</span>을 받으세요
          </h1>
          <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto font-medium leading-relaxed">
            내친구 케이는 현재 베타 테스트 기간으로,<br className="hidden md:block" />
            선정된 분들께는 1년 무료 이용권과 다양한 혜택을 드립니다.
          </p>
        </motion.div>

        {/* Benefits Cards */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Gift, 
                color: "text-secondary-coral", 
                bg: "bg-secondary-coral/5", 
                title: "지금 무료 시작하세요", 
                badge: "정식 오픈 후 1년 무료 이용\n+ 초대 시 추가 무료 혜택",
                desc: "베타테스터로 선정되면 정식 오픈 후 1년 동안 무료로 이용할 수 있으며, 추가 무료 혜택도 함께 누릴 수 있습니다."
              },
              { 
                icon: Sparkles, 
                color: "text-primary-deep", 
                bg: "bg-primary-deep/5", 
                title: "누구보다 먼저요", 
                badge: "신규 기능 선체험\n+ 베타 전용 커뮤니티 참여",
                desc: "정식 출시 전 미공개 기능을 가장 먼저 경험하고 베타 전용 커뮤니티에서 다른 부모님들과 소통할 수 있습니다."
              },
              { 
                icon: Star, 
                color: "text-secondary-coral", 
                bg: "bg-secondary-coral/5", 
                title: "함께 만드는 서비스", 
                badge: "의견 반영 + 베타 인증\n+ 참여 보상",
                desc: "베타테스터의 의견은 서비스에 우선 반영되며 후기 작성 시 추가 혜택과 베타 전용 뱃지가 제공됩니다."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4 }}
                className="p-10 bg-pure-white rounded-lg shadow-md border border-black/5 text-center flex flex-col transition-premium"
              >
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-8 mx-auto`}>
                  <item.icon className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-4">{item.title}</h3>
                <div className={`${item.color} font-bold text-[13px] mb-6 whitespace-pre-line leading-relaxed opacity-80`}>
                  {item.badge}
                </div>
                <p className="text-dark-gray text-[15px] leading-relaxed break-keep">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section className="mb-24 py-16 md:py-24 bg-pure-white rounded-lg shadow-xl px-6 md:px-16 border border-black/5 max-w-3xl mx-auto">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-success-green/10 text-success-green rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">베타 테스터 신청이<br />완료되었습니다!</h2>
              <p className="text-medium-gray font-medium mb-4">
                내친구 케이의 첫 번째 여정에 함께해주셔서 진심으로 감사합니다.
              </p>
              <p className="text-primary-deep font-bold text-lg">
                7월 초 정식 오픈 전, 입력해주신 연락처로<br />순차적으로 개별 안내해 드리겠습니다.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">베타 테스터 신청하기</h2>
                <p className="text-medium-gray font-medium">아래 정보를 입력해주시면 순차적으로 연락드리겠습니다.</p>
              </div>
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-charcoal ml-1">부모님 성함</label>
                    <input 
                      required
                      name="parent_name"
                      type="text" 
                      value={parentName}
                      onChange={(e) => {
                        setParentName(e.target.value);
                        if (nameError) setNameError("");
                      }}
                      placeholder="성함을 입력해주세요"
                      className={`w-full px-5 py-4 rounded-md border outline-none transition-all font-medium ${
                        nameError 
                          ? 'border-red-500 focus:ring-red-500/5' 
                          : 'border-black/10 focus:border-primary-deep focus:ring-4 focus:ring-primary-deep/5'
                      }`}
                    />
                    {nameError && <p className="text-xs text-red-500 ml-1 font-bold">{nameError}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-charcoal ml-1">연락처</label>
                    <input 
                      required
                      name="phone_number"
                      type="tel" 
                      value={phone}
                      onChange={(e) => {
                        handlePhoneChange(e);
                        if (phoneError) setPhoneError("");
                      }}
                      placeholder="010-0000-0000"
                      maxLength={13}
                      className={`w-full px-5 py-4 rounded-md border outline-none transition-all font-medium ${
                        phoneError 
                          ? 'border-red-500 focus:ring-red-500/5' 
                          : 'border-black/10 focus:border-primary-deep focus:ring-4 focus:ring-primary-deep/5'
                      }`}
                    />
                    {phoneError && <p className="text-xs text-red-500 ml-1 font-bold">{phoneError}</p>}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-charcoal ml-1">이메일 주소</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="example@email.com"
                    className={`w-full px-5 py-4 rounded-md border outline-none transition-all font-medium ${
                      emailError 
                        ? 'border-red-500 focus:ring-red-500/5' 
                        : 'border-black/10 focus:border-primary-deep focus:ring-4 focus:ring-primary-deep/5'
                    }`}
                  />
                  {emailError && (
                    <p className="text-xs text-red-500 ml-1 font-bold">{emailError}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-charcoal ml-1">자녀 성별</label>
                    <div className="flex gap-3">
                      <button 
                        type="button" 
                        onClick={() => setGender('male')}
                        className={`flex-1 py-4 rounded-md border font-bold transition-all ${
                          gender === 'male' 
                            ? 'bg-primary-deep text-white border-primary-deep shadow-md' 
                            : 'bg-pure-white text-medium-gray border-black/10 hover:border-primary-deep/50'
                        }`}
                      >
                        남아
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setGender('female')}
                        className={`flex-1 py-4 rounded-md border font-bold transition-all ${
                          gender === 'female' 
                            ? 'bg-primary-deep text-white border-primary-deep shadow-md' 
                            : 'bg-pure-white text-medium-gray border-black/10 hover:border-primary-deep/50'
                        }`}
                      >
                        여아
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-charcoal ml-1">자녀 학년</label>
                    <div className="space-y-4">
                      <select 
                        name="child_grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full px-5 py-4 rounded-md border border-black/10 focus:border-primary-deep focus:ring-4 focus:ring-primary-deep/5 outline-none transition-all font-bold appearance-none bg-pure-white text-charcoal"
                      >
                        <option>초등학교 1학년</option>
                        <option>초등학교 2학년</option>
                        <option>초등학교 3학년</option>
                        <option>초등학교 4학년</option>
                        <option>초등학교 5학년</option>
                        <option>초등학교 6학년</option>
                        <option>기타</option>
                      </select>
                      
                      {grade === "기타" && (
                        <motion.input 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          required
                          type="text"
                          name="custom_grade"
                          value={customGrade}
                          onChange={(e) => setCustomGrade(e.target.value)}
                          placeholder="학년을 직접 입력해주세요 (예: 중학교 1학년)"
                          className="w-full px-5 py-4 rounded-md border border-black/10 focus:border-primary-deep focus:ring-4 focus:ring-primary-deep/5 outline-none transition-all font-medium text-charcoal"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-charcoal ml-1">신청 동기 (선택)</label>
                  <textarea 
                    name="motivation"
                    placeholder="아이의 어떤 점이 가장 걱정되시나요? (예: 말수가 줄어듦, 친구 관계 등)"
                    rows={4}
                    className="w-full px-5 py-4 rounded-md border border-black/10 focus:border-primary-deep focus:ring-4 focus:ring-primary-deep/5 outline-none transition-all font-medium text-charcoal resize-none"
                  ></textarea>
                </div>
                {/* Policy Agreement */}
                <div className="flex items-start gap-3 pt-2 ml-1">
                  <input 
                    type="checkbox" 
                    id="policy-agree" 
                    name="policy-agree"
                    required
                    className="mt-1 w-5 h-5 rounded border-black/20 text-primary-deep focus:ring-primary-deep"
                  />
                  <label htmlFor="policy-agree" className="text-sm text-medium-gray leading-relaxed">
                    <Link to="/privacy" className="text-primary-deep underline underline-offset-4 font-bold">개인정보 수집 및 이용</Link> 및 <Link to="/terms" className="text-primary-deep underline underline-offset-4 font-bold">서비스 이용약관</Link>에 동의합니다. (필수)
                  </label>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: "#2D9F8F" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full py-5 bg-primary-deep text-white rounded-full text-lg font-bold shadow-lg transition-all flex items-center justify-center gap-3 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                      전송 중...
                    </>
                  ) : (
                    '신청 완료하기'
                  )}
                </motion.button>
              </form>
            </>
          )}
        </section>

        {/* Pricing Guide */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-brand">정식 출시 예정 가격</h2>
            <p className="text-medium-gray font-medium">베타 테스터 기간 종료 후 적용됩니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Care Start */}
            <div className="bg-pure-white rounded-lg shadow-md border border-black/5 p-10 text-center flex flex-col items-center">
              <span className="inline-block px-3 py-1 rounded-full bg-info-blue/10 text-info-blue text-[11px] font-bold mb-4">
                ₩10,000 절약
              </span>
              <h3 className="text-2xl font-bold text-charcoal mb-6">Care Start</h3>
              
              <div className="mb-8">
                <div className="text-medium-gray text-2xl line-through opacity-40 mb-1">19,900원</div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-bold text-charcoal">9,900원</span>
                  <span className="text-lg text-medium-gray font-medium">/ 월</span>
                </div>
              </div>

              <p className="text-primary-deep font-bold text-lg mb-6 leading-tight break-keep">
                부담 없이 시작하는 자녀 이해의 첫걸음
              </p>
              
              <p className="text-dark-gray font-medium text-sm leading-relaxed break-keep">
                아이와 케이의 일상 대화와 미션을 통해 자녀의 하루를 꾸준히 이해할 수 있는 기본 플랜입니다.
              </p>
            </div>

            {/* Care Insight */}
            <div className="bg-pure-white rounded-lg shadow-xl border-2 border-primary-deep p-10 text-center flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary-deep text-white px-4 py-1.5 text-[11px] font-bold">
                추천
              </div>
              
              <span className="inline-block px-3 py-1 rounded-full bg-secondary-coral/10 text-secondary-coral text-[11px] font-bold mb-4">
                70% 할인
              </span>
              <h3 className="text-2xl font-bold text-charcoal mb-6">Care Insight</h3>
              
              <div className="mb-8">
                <div className="text-medium-gray text-2xl line-through opacity-40 mb-1">49,900원</div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-bold text-charcoal">14,900원</span>
                  <span className="text-lg text-medium-gray font-medium">/ 월</span>
                </div>
              </div>

              <p className="text-primary-deep font-bold text-lg mb-6 leading-tight break-keep">
                더 깊이 읽고 더 정확히 돕는 부모 맞춤 인사이트
              </p>
              
              <p className="text-dark-gray font-medium text-sm leading-relaxed break-keep">
                더 풍부한 대화와 분석 기능을 바탕으로 아이의 감정 및 관계 흐름을 더 깊이 이해하는 추천 플랜입니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
