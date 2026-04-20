import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-white py-20 px-6">
      <div className="max-w-[800px] mx-auto bg-pure-white p-8 md:p-12 rounded-2xl shadow-sm border border-black/5">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-medium-gray hover:text-primary-deep transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          뒤로가기
        </button>

        <h1 className="text-3xl font-bold text-charcoal mb-8">개인정보처리방침</h1>
        
        <div className="space-y-8 text-dark-gray leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">1. 수집하는 개인정보 항목</h2>
            <p>회사는 베타 테스터 모집 및 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-medium-gray">
              <li>수집항목: 이름, 연락처(휴대폰 번호), 이메일 주소, 자녀 학년</li>
              <li>수집방법: 홈페이지 내 신청 폼 입력</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">2. 개인정보의 수집 및 이용목적</h2>
            <p>수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-medium-gray">
              <li>베타 테스터 선정 및 결과 안내</li>
              <li>서비스 관련 공지사항 전달 및 상담 응대</li>
              <li>신규 서비스 개발 및 마케팅 활용(동의 시)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">3. 개인정보의 보유 및 이용기간</h2>
            <p>원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정 기간 동안 개인정보를 보관합니다.</p>
            <p className="mt-2 text-medium-gray">보유 기간: 베타 서비스 종료 후 1년 또는 사용자 요청 시 즉시 파기</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">4. 개인정보의 파기절차 및 방법</h2>
            <p>전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">5. 이용자의 권리</h2>
            <p>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지(동의철회)를 요청할 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">6. 개인정보 보호책임자</h2>
            <p>서비스 이용 중 발생하는 모든 개인정보 보호 관련 민원은 아래의 연락처로 문의해주시기 바랍니다.</p>
            <p className="mt-2 text-medium-gray">이메일: contact@humease.com</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-black/5 text-sm text-medium-gray text-center">
          본 방침은 2026년 4월 20일부터 시행됩니다.
        </div>
      </div>
    </div>
  );
}
