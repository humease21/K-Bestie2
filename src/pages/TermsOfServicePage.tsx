import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
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

        <h1 className="text-3xl font-bold text-charcoal mb-8">서비스 이용약관</h1>
        
        <div className="space-y-8 text-dark-gray leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">제 1 조 (목적)</h2>
            <p>본 약관은 '내친구 케이'(이하 "회사")가 제공하는 베타 서비스 및 관련 제반 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">제 2 조 (용어의 정의)</h2>
            <ul className="list-disc pl-5 space-y-2 text-medium-gray">
              <li>"서비스"라 함은 '내친구 케이'가 제공하는 AI 양육 인사이트 서비스를 의미합니다.</li>
              <li>"이용자"라 함은 회사의 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 고객을 의미합니다.</li>
              <li>"베타 테스터"라 함은 정식 출시 전 서비스를 미리 체험하고 피드백을 제공하기로 동의한 이용자를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">제 3 조 (약관의 효력 및 변경)</h2>
            <p>회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 화면에 게시합니다. 회사는 필요한 경우 관계법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">제 4 조 (서비스의 제공 및 제한)</h2>
            <p>본 서비스는 베타 테스트 단계로, 기술적 오류나 중단이 발생할 수 있습니다. 회사는 안정적인 서비스 제공을 위해 최선을 다하나, 베타 기간 중 발생한 데이터 손실 등에 대해 법적 책임을 지지 않습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">제 5 조 (이용자의 의무)</h2>
            <p>이용자는 서비스를 이용할 때 다음 각 호의 행위를 하여서는 안 됩니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-medium-gray">
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 변경</li>
              <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신 또는 게시</li>
              <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">제 6 조 (회사의 의무)</h2>
            <p>회사는 관련법과 본 약관이 금지하거나 미풍양속에 어긋나는 행위를 하지 않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여 노력합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">제 7 조 (면책조항)</h2>
            <p>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-black/5 text-sm text-medium-gray text-center">
          최종 업데이트: 2026년 4월 20일
        </div>
      </div>
    </div>
  );
}
