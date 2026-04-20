import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, Server, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecuritySection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-10 rounded-[3rem] border border-peach/10 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-kblue/10 rounded-2xl flex items-center justify-center text-kblue">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-black text-text-main">{title}</h3>
    </div>
    <div className="space-y-4 text-text-soft leading-relaxed">
      {children}
    </div>
  </motion.div>
);

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-bg-main pt-32 pb-24 px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <Link to="/faq" className="inline-flex items-center gap-2 text-text-soft hover:text-kblue transition-colors mb-8 font-bold">
            <ArrowLeft className="w-5 h-5" />
            FAQ로 돌아가기
          </Link>
          <h1 className="font-hand text-5xl md:text-7xl text-text-main mb-6">보안 및 개인정보 보호 정책</h1>
          <p className="text-xl text-text-soft font-medium">
            우리는 아이의 안전과 부모님의 신뢰를 최우선으로 생각합니다. 최고 수준의 기술과 엄격한 정책으로 데이터를 보호합니다.
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SecuritySection icon={Lock} title="데이터 보호">
            <p>데이터는 전송 구간과 저장 구간에서 보호되며, 접근 권한은 인증과 권한 정책에 따라 관리됩니다. 민감한 정보는 필요한 범위 안에서만 처리되도록 설계합니다.</p>
          </SecuritySection>

          <SecuritySection icon={ShieldCheck} title="접근 권한 통제">
            <p>아이, 부모, 관리자별 접근 범위를 나누고, 필요한 권한만 부여하는 방식으로 운영합니다. 민감 데이터는 서버 측 검증과 권한 정책을 통해 보호합니다.</p>
          </SecuritySection>

          <SecuritySection icon={FileText} title="최소 수집 원칙">
            <p>서비스 제공에 필요한 최소한의 정보만 수집하고 사용합니다. 부모 리포트에는 원문 전체보다 핵심 변화와 요약된 인사이트를 중심으로 반영합니다.</p>
          </SecuritySection>

          <SecuritySection icon={Eye} title="아이의 표현 공간 존중">
            <p>부모 리포트는 아이의 대화 원문을 그대로 노출하기보다, 부모가 이해와 대화에 도움을 받을 수 있는 내용 중심으로 구성합니다. 아이의 표현 공간과 부모의 보호 역할 사이의 균형을 지향합니다.</p>
          </SecuritySection>
        </div>

        {/* Compliance Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-12 bg-kblue text-white rounded-[4rem] text-center"
        >
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 opacity-50" />
          <h2 className="text-3xl font-black mb-6">우리는 법적 기준을 준수합니다</h2>
          <p className="max-w-3xl mx-auto text-white/80 leading-relaxed font-medium">
            개인정보 보호법 및 정보통신망법 등 관련 법령을 철저히 준수하며, 
            정기적인 보안 감사를 통해 시스템의 안전성을 검증받고 있습니다. 
            아이의 마음을 돌보는 일, 가장 안전한 환경에서 시작하세요.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
