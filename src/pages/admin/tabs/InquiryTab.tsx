import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, User, Mail, Inbox, X, CheckCircle } from "lucide-react";

interface InquiryTabProps {
  inquiries: any[];
  inquirySubTab: "pending" | "resolved";
  selectedInquiry: any | null;
  setSelectedInquiry: (v: any | null) => void;
  isReplyModalOpen: boolean;
  setIsReplyModalOpen: (v: boolean) => void;
  replyText: string;
  setReplyText: (v: string) => void;
  setConfirmDialog: (v: { id: string, show: boolean } | null) => void;
  onResolve: (id: any, replyContent?: string) => Promise<void>;
  onReopen: (id: any) => Promise<void>;
}

export default function InquiryTab({
  inquiries,
  inquirySubTab,
  selectedInquiry, setSelectedInquiry,
  isReplyModalOpen, setIsReplyModalOpen,
  replyText, setReplyText,
  setConfirmDialog,
  onResolve, onReopen,
}: InquiryTabProps) {
  const filteredIqs = inquiries.filter(i => i.status === (inquirySubTab === 'resolved' ? 'resolved' : 'pending'));

  return (
    <>
      {/* Inquiry Table */}
      <div className="bg-pure-white rounded-lg border border-black/5 shadow-sm overflow-hidden">
        <table className="hidden md:table w-full text-left">
          <thead className="bg-light-gray/50 border-b border-black/10">
            <tr>
              <th className="px-6 py-4 text-[13px] font-bold text-medium-gray w-16">No.</th>
              <th className="px-6 py-4 text-[13px] font-bold text-medium-gray w-[20%]">문의 시간</th>
              <th className="px-6 py-4 text-[13px] font-bold text-medium-gray w-[25%]">이름 / 이메일</th>
              <th className="px-6 py-4 text-[13px] font-bold text-medium-gray w-[40%]">문의 주제 / 내용</th>
              <th className="px-6 py-4 text-[13px] font-bold text-medium-gray w-[15%]">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filteredIqs.length > 0 ? (
              filteredIqs.map((iq, idx) => (
                <motion.tr key={iq.id} className="hover:bg-light-gray/10 transition-all group">
                  <td className="px-6 py-4 text-[14px] font-bold text-charcoal">{filteredIqs.length - idx}</td>
                  <td className="px-6 py-4 text-[14px] text-dark-gray">{new Date(iq.created_at).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <p className="text-[14px] font-bold text-charcoal">{iq.user_name || iq.name}</p>
                    <p className="text-[12px] text-primary-deep font-medium mt-0.5">{iq.user_email || iq.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 max-w-[400px]">
                      <span className="text-[14px] font-bold text-charcoal truncate">{iq.subject}</span>
                      <span className="text-[13px] text-medium-gray truncate">{iq.message}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedInquiry(iq);
                          setReplyText(iq.admin_reply || "");
                          setIsReplyModalOpen(true);
                        }}
                        className="px-4 py-2 bg-light-gray/50 text-dark-gray text-[12px] font-bold rounded-md hover:bg-light-gray transition-all"
                      >
                        상세 보기
                      </button>
                      {inquirySubTab === 'pending' ? (
                        <button
                          onClick={() => setConfirmDialog({ id: iq.id, show: true })}
                          className="px-4 py-2 bg-success-green/10 text-success-green text-[12px] font-bold rounded-md hover:bg-success-green/20 transition-all"
                        >
                          해결
                        </button>
                      ) : (
                        <button
                          onClick={() => onReopen(iq.id)}
                          className="px-4 py-2 bg-secondary-coral/10 text-secondary-coral text-[12px] font-bold rounded-md hover:bg-secondary-coral/20 transition-all"
                        >
                          미해결로 변경
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr><td colSpan={5} className="py-24 text-center">
                <Inbox className="w-12 h-12 text-black/10 mx-auto mb-4" />
                <p className="text-medium-gray font-medium">문의 내역이 없습니다.</p>
              </td></tr>
            )}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 p-4">
          {filteredIqs.map((iq) => (
            <div key={iq.id} className="bg-pure-white border border-black/5 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[11px] text-medium-gray">{new Date(iq.created_at).toLocaleString()}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${iq.status === 'resolved' ? 'bg-success-green/10 text-success-green' : 'bg-secondary-coral/10 text-secondary-coral'}`}>
                  {iq.status === 'resolved' ? '처리완료' : '검토중'}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-[15px] font-bold text-charcoal">{iq.user_name || iq.name}</p>
                <p className="text-[13px] text-primary-deep mt-0.5">{iq.user_email || iq.email}</p>
              </div>
              <div className="p-4 bg-light-gray/30 rounded-lg mb-4 text-[14px] text-dark-gray line-clamp-2">"{iq.message}"</div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedInquiry(iq);
                    setReplyText(iq.admin_reply || "");
                    setIsReplyModalOpen(true);
                  }}
                  className="flex-1 py-3 bg-primary-deep text-white font-bold rounded-xl text-[14px]"
                >
                  상세 보기
                </button>
                {inquirySubTab === 'pending' ? (
                  <button
                    onClick={() => setConfirmDialog({ id: iq.id, show: true })}
                    className="flex-1 py-3 bg-success-green text-white font-bold rounded-xl text-[14px]"
                  >
                    해결
                  </button>
                ) : (
                  <button
                    onClick={() => onReopen(iq.id)}
                    className="flex-1 py-3 bg-secondary-coral text-white font-bold rounded-xl text-[14px]"
                  >
                    미해결
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Detail & Reply Modal */}
      <AnimatePresence>
        {isReplyModalOpen && selectedInquiry && (
          <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsReplyModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-pure-white rounded-[1.5rem] md:rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-6 border-b border-black/5 flex justify-between items-center bg-light-gray/20">
                <div>
                  <h3 className="text-[20px] md:text-[24px] font-bold text-charcoal">문의 상세 내용</h3>
                  <p className="text-[13px] text-medium-gray mt-1">{new Date(selectedInquiry.created_at).toLocaleString()}</p>
                </div>
                <button onClick={() => setIsReplyModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-medium-gray uppercase tracking-widest">문의자</label>
                    <p className="text-[16px] font-bold flex items-center gap-2 text-charcoal"><User className="w-4 h-4 text-primary-deep" /> {selectedInquiry.user_name || selectedInquiry.name}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-medium-gray uppercase tracking-widest">연락처/이메일</label>
                    <p className="text-[16px] font-bold flex items-center gap-2 text-charcoal"><Mail className="w-4 h-4 text-primary-deep" /> {selectedInquiry.user_email || selectedInquiry.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-medium-gray uppercase tracking-widest">문의 제목</label>
                  <p className="text-[18px] font-bold text-charcoal">{selectedInquiry.subject}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-medium-gray uppercase tracking-widest">문의 내용</label>
                  <div className="bg-light-gray/30 p-6 rounded-2xl text-[15px] leading-relaxed text-dark-gray whitespace-pre-wrap min-h-[120px] font-medium border border-black/5 italic">
                    "{selectedInquiry.message}"
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-black/5">
                  <label className="text-[11px] font-black text-medium-gray uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary-deep" /> 관리자 답변 작성
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="부모님께 전달할 답변을 입력하세요..."
                    className="w-full h-40 p-5 rounded-2xl border border-black/10 focus:border-primary-deep outline-none resize-none text-[15px] transition-all bg-pure-white shadow-inner font-medium"
                  />
                </div>
              </div>

              <div className="px-8 py-6 border-t border-black/5 bg-light-gray/20 flex flex-wrap gap-4 justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsReplyModalOpen(false)}
                    className="px-6 py-3 text-dark-gray font-bold text-[15px] hover:bg-black/5 rounded-xl transition-all"
                  >
                    닫기
                  </button>
                  <a
                    href={`mailto:${selectedInquiry.user_email || selectedInquiry.email}?subject=${encodeURIComponent("[내친구 케이] 문의하신 내용에 대한 답변입니다")}&body=${encodeURIComponent(`안녕하세요, ${selectedInquiry.user_name || selectedInquiry.name}님.\n\n문의하신 내용에 대해 답변 드립니다.\n\n--- 문의 내용 ---\n${selectedInquiry.message}\n\n----------------\n\n`)}`}
                    className="px-6 py-3 bg-info-blue/10 text-info-blue font-bold rounded-xl text-[15px] hover:bg-info-blue/20 transition-all flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" /> 메일 발송
                  </a>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => onReopen(selectedInquiry.id)}
                    className="px-6 py-3 bg-secondary-coral/10 text-secondary-coral font-bold rounded-xl text-[15px] hover:bg-secondary-coral/20 transition-all"
                  >
                    미해결
                  </button>
                  {selectedInquiry.status !== 'resolved' && (
                    <button
                      onClick={() => setConfirmDialog({ id: selectedInquiry.id, show: true })}
                      className="px-6 py-3 bg-success-green text-white font-bold rounded-xl text-[15px] shadow-lg hover:bg-success-green/90 transition-all flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> 해결
                    </button>
                  )}
                  <button
                    onClick={() => onResolve(selectedInquiry.id, replyText)}
                    className="px-8 py-3 bg-primary-deep text-white font-bold rounded-xl text-[15px] shadow-lg hover:bg-primary-light transition-all"
                  >
                    답변 저장
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
