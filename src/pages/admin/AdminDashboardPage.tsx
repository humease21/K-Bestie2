import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Users, MessageSquare, LogOut, RefreshCw,
  Clock, Download, CheckCircle2
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import AnimatedNumber from "./components/AnimatedNumber";
import Toast from "./components/Toast";
import ConfirmDialog from "./components/ConfirmDialog";
import BetaTab from "./tabs/BetaTab";
import InquiryTab from "./tabs/InquiryTab";
import ClickLogsTab from "./tabs/ClickLogsTab";
import { downloadCSV } from "./lib/adminUtils";

const AnalyticsTab = lazy(() => import('./tabs/AnalyticsTab'));

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"click" | "inquiry" | "beta" | "analytics">("click");
  const [analyticsTabMounted, setAnalyticsTabMounted] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [inquirySubTab, setInquirySubTab] = useState<"pending" | "resolved">("pending");
  const [betaApps, setBetaApps] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [clickLogs, setClickLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newRowIds, setNewRowIds] = useState<Set<string>>(new Set());

  const [connStatus, setConnStatus] = useState<'online' | 'reconnecting' | 'offline'>('online');

  const [toasts, setToasts] = useState<any[]>([]);
  const pollingRef = useRef<any>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ id: string, show: boolean } | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("전체");
  const [betaSort, setBetaSort] = useState<"latest" | "oldest">("latest");

  const [clickSort, setClickSort] = useState<"latest" | "popular">("popular");
  const [clickFilter, setClickFilter] = useState<"week" | "month" | "all">("week");
  const [clickView, setClickView] = useState<"list" | "chart">("chart");

  const [betaPage, setBetaPage] = useState(1);
  const itemsPerPage = 10;
  const [clickPage, setClickPage] = useState(1);
  const logsPerPage = 50;

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    pollingRef.current = setInterval(fetchData, 30000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const fetchData = async () => {
    try {
      const { data: betaData } = await supabase.from("kbestie_beta_applications").select("*").order("created_at", { ascending: false });
      const { data: inquiryData } = await supabase.from("kbestie_inquiries").select("*").order("created_at", { ascending: false });
      const { data: clickData } = await supabase.from("kbestie_click_logs").select("*").order("created_at", { ascending: false });

      if (betaApps.length > 0) {
        const newOnes = betaData?.filter(b => !betaApps.find(prev => prev.id === b.id)).map(b => b.id) || [];
        if (newOnes.length > 0) {
          setNewRowIds(new Set([...newOnes]));
          setTimeout(() => setNewRowIds(new Set()), 3000);
        }
      }

      setBetaApps(betaData || []);
      setInquiries(inquiryData || []);
      setClickLogs(clickData || []);
      setConnStatus('online');
    } catch (err) {
      console.error("Fetch error:", err);
      setConnStatus('offline');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleResolveInquiry = useCallback(async (id: any, replyContent?: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    try {
      const targetId = isNaN(Number(id)) ? id : Number(id);
      const { error, count } = await supabase
        .from("kbestie_inquiries")
        .update({ status: "resolved" }, { count: 'exact' })
        .eq("id", targetId);
      if (error) throw error;
      if (count === 0) {
        throw new Error("DB 업데이트 권한이 없습니다. Supabase RLS 설정을 확인해 주세요.");
      }
      await fetchData();
      setIsReplyModalOpen(false);
      setSelectedInquiry(null);
      setReplyText("");
      addToast("문의가 해결 완료 처리되었습니다.", "success");
    } catch (err: any) {
      console.error("Resolve error:", err.message);
      addToast(err.message || "상태 변경 중 오류가 발생했습니다.", "error");
    } finally {
      setActionLoading(null);
      pollingRef.current = setInterval(fetchData, 30000);
    }
  }, []);

  const handleReopenInquiry = useCallback(async (id: any) => {
    console.log("Attempting to reopen inquiry:", id, typeof id);
    if (pollingRef.current) clearInterval(pollingRef.current);
    try {
      const targetId = isNaN(Number(id)) ? id : Number(id);
      const { error, count } = await supabase
        .from("kbestie_inquiries")
        .update({ status: "pending" }, { count: 'exact' })
        .eq("id", targetId);
      if (error) {
        console.error("Supabase error during reopen:", error);
        throw error;
      }
      if (count === 0) {
        throw new Error(`업데이트된 데이터가 없습니다. (ID: ${id}, Type: ${typeof id})`);
      }
      await fetchData();
      setIsReplyModalOpen(false);
      setSelectedInquiry(null);
      addToast("문의가 미해결 상태로 변경되었습니다.", "success");
    } catch (err: any) {
      console.error("Reopen error detail:", err);
      addToast(err.message || "상태 변경 중 오류가 발생했습니다.", "error");
    } finally {
      pollingRef.current = setInterval(fetchData, 30000);
    }
  }, []);

  const executeResolveInquiry = () => {
    if (confirmDialog?.id) {
      handleResolveInquiry(confirmDialog.id, replyText);
      setConfirmDialog(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans text-charcoal relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-8">
        {/* Admin Header */}
        <header className="flex justify-between items-start mb-10">
          <div onClick={() => navigate("/")} className="cursor-pointer group">
            <h1 className="text-[32px] font-bold tracking-tight mb-1">
              <span className="font-extrabold tracking-tighter text-primary-deep group-hover:text-primary-light transition-colors">K-Bestie</span> Admin Console
            </h1>
            <div className="flex items-center gap-2">
              <motion.div
                animate={connStatus === 'online' ? { opacity: [1, 0.4, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className={`w-2 h-2 rounded-full ${connStatus === 'online' ? 'bg-[#22C55E]' : connStatus === 'reconnecting' ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`}
              />
              <span className="text-[13px] text-medium-gray font-medium">
                {connStatus === 'online' ? '실시간 현황' : connStatus === 'reconnecting' ? '연결 재시도 중...' : '연결 끊김'}
              </span>
            </div>
          </div>
          <motion.button
            whileHover={{ backgroundColor: "rgba(239,68,68,0.08)", borderColor: "#EF4444" }}
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 border border-black/10 rounded-xl text-[14px] font-medium text-[#EF4444] transition-all"
          >
            <LogOut className="w-4 h-4" /> 로그아웃
          </motion.button>
        </header>

        {/* KPI Dashboard Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-8">
          {[
            { label: "베타 신청", count: betaApps.length, icon: Users, color: "#E8845A", bg: "rgba(232,132,90,0.1)", tab: "beta" },
            { label: "문의 전체", count: inquiries.length, icon: MessageSquare, color: "#3B82F6", bg: "rgba(59,130,246,0.1)", tab: "inquiry" },
            {
              label: "답변 대기",
              count: inquiries.filter(i => i.status !== 'resolved').length,
              icon: Clock,
              color: inquiries.filter(i => i.status !== 'resolved').length > 0 ? "#F59E0B" : "#22C55E",
              bg: inquiries.filter(i => i.status !== 'resolved').length > 0 ? "rgba(245,158,11,0.1)" : "rgba(34,197,94,0.1)",
              tab: "inquiry",
              subTab: "pending"
            },
            { label: "완료", count: inquiries.filter(i => i.status === 'resolved').length, icon: CheckCircle2, color: "#22C55E", bg: "rgba(34,197,94,0.1)", tab: "inquiry", subTab: "resolved" }
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", cursor: "pointer" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab(card.tab as any);
                if (card.subTab) setInquirySubTab(card.subTab as any);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className={`bg-pure-white p-6 rounded-lg border border-black/5 flex flex-col justify-between min-h-[120px] transition-all border-t-[3px] ${card.label === '답변 대기' && card.count > 0 ? 'bg-[#FFFBEB]/30' : ''}`}
              style={{ borderTopColor: card.color }}
            >
              <div className="flex justify-between items-start">
                <span className="text-[13px] text-medium-gray font-medium uppercase tracking-wider">{card.label}</span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: card.bg }}>
                  <card.icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
              </div>
              <AnimatedNumber value={card.count} color={card.color} />
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 border-b-2 border-black/5 flex overflow-x-auto overflow-y-hidden no-scrollbar">
          {[
            { id: "click", label: "실시간 클릭 로그" },
            { id: "inquiry", label: "1:1 문의 리스트" },
            { id: "beta", label: "베타 신청 현황" },
            { id: "analytics", label: "방문자 분석" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                if (tab.id === 'analytics') setAnalyticsTabMounted(true);
              }}
              className={`px-6 py-4 text-[13px] md:text-[15px] whitespace-nowrap font-medium transition-all relative ${
                activeTab === tab.id ? "text-primary-deep font-bold" : "text-medium-gray hover:text-charcoal"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-primary-deep" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Content Action Bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-[20px] font-bold text-charcoal">
                    {activeTab === "beta" ? "명단" : activeTab === "click" ? "로그" : activeTab === "inquiry" ? "문의" : "방문자 분석"}
                  </h3>
                  {activeTab === "inquiry" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setInquirySubTab("pending")}
                        className={`px-4 py-1.5 rounded-full text-[14px] font-bold transition-all ${
                          inquirySubTab === "pending"
                            ? "bg-[#EF4444] text-white shadow-md"
                            : "bg-black/5 text-medium-gray hover:bg-black/10"
                        }`}
                      >
                        미해결 ({inquiries.filter(i => i.status !== 'resolved').length})
                      </button>
                      <button
                        onClick={() => setInquirySubTab("resolved")}
                        className={`px-4 py-1.5 rounded-full text-[14px] font-bold transition-all ${
                          inquirySubTab === "resolved"
                            ? "bg-[#22C55E] text-white shadow-md"
                            : "bg-black/5 text-medium-gray hover:bg-black/10"
                        }`}
                      >
                        해결됨 ({inquiries.filter(i => i.status === 'resolved').length})
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  {activeTab !== "analytics" && (
                    <button
                      onClick={() => downloadCSV(activeTab, betaApps, inquiries, clickLogs, addToast)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 border border-black/10 rounded-md text-[13px] font-medium text-dark-gray hover:bg-light-gray transition-all"
                    >
                      <Download className="w-3.5 h-3.5" /> 엑셀
                    </button>
                  )}
                  {activeTab !== "analytics" && <button
                    onClick={fetchData}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-[13px] font-medium text-medium-gray hover:bg-light-gray rounded-md transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> 새로고침
                  </button>}
                </div>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40">
                  <div className="w-10 h-10 border-4 border-primary-deep/20 border-t-primary-deep rounded-full animate-spin mb-4"></div>
                  <p className="font-bold text-medium-gray">데이터를 불러오는 중...</p>
                </div>
              ) : (
                <>
                  {activeTab === "beta" && (
                    <BetaTab
                      betaApps={betaApps}
                      newRowIds={newRowIds}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      gradeFilter={gradeFilter}
                      setGradeFilter={setGradeFilter}
                      betaSort={betaSort}
                      setBetaSort={setBetaSort}
                      betaPage={betaPage}
                      setBetaPage={setBetaPage}
                      itemsPerPage={itemsPerPage}
                    />
                  )}
                  {activeTab === "click" && (
                    <ClickLogsTab
                      clickLogs={clickLogs}
                      clickSort={clickSort}
                      setClickSort={setClickSort}
                      clickFilter={clickFilter}
                      setClickFilter={setClickFilter}
                      clickView={clickView}
                      setClickView={setClickView}
                      clickPage={clickPage}
                      setClickPage={setClickPage}
                      logsPerPage={logsPerPage}
                    />
                  )}
                  {activeTab === "inquiry" && (
                    <InquiryTab
                      inquiries={inquiries}
                      inquirySubTab={inquirySubTab}
                      selectedInquiry={selectedInquiry}
                      setSelectedInquiry={setSelectedInquiry}
                      isReplyModalOpen={isReplyModalOpen}
                      setIsReplyModalOpen={setIsReplyModalOpen}
                      replyText={replyText}
                      setReplyText={setReplyText}
                      setConfirmDialog={setConfirmDialog}
                      onResolve={handleResolveInquiry}
                      onReopen={handleReopenInquiry}
                    />
                  )}
                </>
              )}

              {/* AnalyticsTab — 첫 클릭 후 마운트 유지, 폴링 대상 아님 */}
              {analyticsTabMounted && (
                <div className={activeTab === 'analytics' ? 'block' : 'hidden'}>
                  <Suspense
                    fallback={
                      <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-primary-deep/20 border-t-primary-deep rounded-full animate-spin" />
                      </div>
                    }
                  >
                    <AnalyticsTab isVisible={activeTab === 'analytics'} betaApps={betaApps} />
                  </Suspense>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ConfirmDialog — 컨테이너 레벨 */}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        onConfirm={executeResolveInquiry}
        onCancel={() => setConfirmDialog(null)}
      />

      {/* Toasts Container */}
      <div className="fixed top-0 right-0 p-8 z-[2000] pointer-events-none w-full max-w-sm">
        <AnimatePresence>
          {toasts.map(t => (
            <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
