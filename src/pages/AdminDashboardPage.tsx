import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Users, MessageSquare, LogOut, RefreshCw, Search, 
  ChevronRight, Calendar, User, Phone, Mail, Clock, 
  Download, Eye, EyeOff, CheckCircle2, Inbox, 
  ChevronLeft, LayoutGrid, BarChart3, AlertCircle, X, CheckCircle, ShieldAlert
} from "lucide-react";
import { supabase } from "../lib/supabase";

const CHART_COLORS = [
  "#38BDF8", "#2DD4BF", "#34D399", "#4ADE80", "#A3E635",
  "#FACC15", "#FBBF24", "#FB923C", "#F87171", "#F472B6"
];

// Reusable Count Animation Component
function AnimatedNumber({ value, color }: { value: number, color: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      prevValue.current = value;
      setDisplayValue(value);
    }
  }, [value]);

  return (
    <div className="relative h-[40px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayValue}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 text-[40px] font-bold leading-none tracking-tight"
          style={{ color }}
        >
          {displayValue}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Toast Component
function Toast({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void, key?: any }) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className={`fixed top-24 right-8 z-[2000] flex items-center gap-4 bg-pure-white p-4 rounded-lg shadow-lg border-l-4 ${type === 'success' ? 'border-[#22C55E]' : 'border-[#EF4444]'} min-w-[320px] pointer-events-auto`}
    >
      {type === 'success' ? <CheckCircle className="w-5 h-5 text-[#22C55E]" /> : <AlertCircle className="w-5 h-5 text-[#EF4444]" />}
      <p className="text-[14px] font-medium text-charcoal flex-1">{message}</p>
      <button onClick={onClose} className="text-medium-gray hover:text-charcoal"><X className="w-4 h-4" /></button>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"click" | "inquiry" | "beta">("click");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [inquirySubTab, setInquirySubTab] = useState<"pending" | "resolved">("pending");
  const [betaApps, setBetaApps] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [clickLogs, setClickLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newRowIds, setNewRowIds] = useState<Set<string>>(new Set());
  
  // Security
  const [connStatus, setConnStatus] = useState<'online' | 'reconnecting' | 'offline'>('online');
  
  // Toasts & Dialogs
  const [toasts, setToasts] = useState<any[]>([]);
  const pollingRef = useRef<any>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ id: string, show: boolean } | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("전체");
  const [betaSort, setBetaSort] = useState<"latest" | "oldest">("latest");
  const [showPinId, setShowPinId] = useState<string | null>(null);

  // Click log state
  const [clickSort, setClickSort] = useState<"latest" | "popular">("popular");
  const [clickFilter, setClickFilter] = useState<"week" | "month" | "all">("week");
  const [clickView, setClickView] = useState<"list" | "chart">("chart");
  
  // Pagination state
  const [betaPage, setBetaPage] = useState(1);
  const itemsPerPage = 10;
  const [clickPage, setClickPage] = useState(1);
  const logsPerPage = 50;
  
  const navigate = useNavigate();

  // --- Session Security ---
  useEffect(() => {
    let timeoutId: any;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsSessionExpired(true);
      }, 30 * 60 * 1000); // 30 minutes
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsSessionExpired(true);
      }
    };

    fetchData();
    checkSession();

    // Auto-refresh polling (30s)
    pollingRef.current = setInterval(fetchData, 30000);
    // Session check polling
    const sessionInterval = setInterval(checkSession, 60000);
    
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      clearInterval(sessionInterval);
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
      const { data: betaData } = await supabase.from("beta_applications").select("*").order("created_at", { ascending: false });
      const { data: inquiryData } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      const { data: clickData } = await supabase.from("click_logs").select("*").order("created_at", { ascending: false });
      
      // Identify new rows for highlighting
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

  const handleResolveInquiry = async (id: any, replyContent?: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    try {
      const targetId = isNaN(Number(id)) ? id : Number(id);
      
      const { error, count } = await supabase
        .from("inquiries")
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
  };

  const handleReopenInquiry = async (id: any) => {
    console.log("Attempting to reopen inquiry:", id, typeof id);
    if (pollingRef.current) clearInterval(pollingRef.current);
    try {
      const targetId = isNaN(Number(id)) ? id : Number(id);

      const { error, count } = await supabase
        .from("inquiries")
        .update({ 
          status: "pending"
        }, { count: 'exact' })
        .eq("id", targetId);
      
      if (error) {
        console.error("Supabase error during reopen:", error);
        throw error;
      }

      if (count === 0) {
        throw new Error(`업데이트된 데이터가 없습니다. (ID: ${id}, Type: ${typeof id})`);
      }
      
      // Force refresh data from server after update
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
  };

  const executeResolveInquiry = () => {
    if (confirmDialog?.id) {
      handleResolveInquiry(confirmDialog.id, replyText);
      setConfirmDialog(null);
    }
  };

  const downloadCSV = () => {
    const data = activeTab === "beta" ? betaApps : (activeTab === "click" ? clickLogs : inquiries);
    if (!data.length) return;
    
    addToast("다운로드를 준비 중입니다...", "success");
    
    let csvContent = "\uFEFF"; 
    let headers: string[] = [];
    if (activeTab === "beta") headers = ["신청시간", "부모님성함", "연락처", "이메일", "성별", "학년", "신청동기"];
    else if (activeTab === "inquiry") headers = ["문의시간", "이름", "이메일", "제목", "내용", "상태"];
    else headers = ["시간", "텍스트/ID", "위치", "기기정보"];
    
    csvContent += headers.join(",") + "\n";
    
    data.forEach(item => {
      let row: string[] = [];
      if (activeTab === "beta") row = [item.created_at, item.parent_name, item.phone, item.email, item.child_gender, item.child_grade, `"${(item.motivation || "").replace(/"/g, '""')}"`];
      else if (activeTab === "inquiry") row = [item.created_at, item.name, item.email, item.subject, `"${(item.message || "").replace(/"/g, '""')}"`, item.status];
      else row = [item.created_at, item.element_text || item.element_id, item.page_path, item.user_agent];
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `K-Bestie_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getFilteredBeta = () => {
    let filtered = betaApps.filter(app => 
      app.parent_name.includes(searchTerm) || app.phone.includes(searchTerm) || app.email.includes(searchTerm)
    );
    if (gradeFilter !== "전체") {
      filtered = filtered.filter(app => app.child_grade.includes(gradeFilter));
    }
    return [...filtered].sort((a, b) => {
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      return betaSort === "latest" ? timeB - timeA : timeA - timeB;
    });
  };

  const getFilteredClickLogs = () => {
    let filtered = [...clickLogs];
    if (clickFilter !== "all") {
      const threshold = new Date();
      if (clickFilter === "week") threshold.setDate(threshold.getDate() - 7);
      if (clickFilter === "month") threshold.setMonth(threshold.getMonth() - 1);
      filtered = filtered.filter(log => new Date(log.created_at) >= threshold);
    }
    return filtered;
  };

  const getGradeBadgeStyle = (grade: string) => {
    if (grade.includes("1") || grade.includes("2")) return "bg-green-500/10 text-green-600";
    if (grade.includes("3") || grade.includes("4")) return "bg-blue-500/10 text-blue-600";
    return "bg-purple-500/10 text-purple-600";
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans text-charcoal relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-8">
        {/* Admin Header */}
        <header className="flex justify-between items-start mb-10">
          <div 
            onClick={() => navigate("/")} 
            className="cursor-pointer group"
          >
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
            { id: "beta", label: "베타 신청 현황" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
                    {activeTab === "beta" ? "명단" : activeTab === "click" ? "로그" : "문의"}
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
                  <button onClick={downloadCSV} className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 border border-black/10 rounded-md text-[13px] font-medium text-dark-gray hover:bg-light-gray transition-all">
                    <Download className="w-3.5 h-3.5" /> 엑셀
                  </button>
                  <button onClick={fetchData} className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-[13px] font-medium text-medium-gray hover:bg-light-gray rounded-md transition-all">
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> 새로고침
                  </button>
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
                    <div className="space-y-4">
                      {/* Search & Filter Bar */}
                      <div className="bg-light-gray/50 rounded-lg p-3 flex flex-wrap gap-3 items-center border border-black/5">
                        <div className="relative flex-1 min-w-[240px]">
                          <input 
                            type="text" 
                            placeholder="이름, 연락처, 이메일 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-pure-white rounded-md border border-black/10 text-[14px] outline-none focus:border-primary-deep transition-all"
                          />
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-gray" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-medium-gray">학년:</span>
                          <select 
                            value={gradeFilter}
                            onChange={(e) => setGradeFilter(e.target.value)}
                            className="bg-pure-white border border-black/10 rounded-md px-3 py-2 text-[14px] outline-none"
                          >
                            <option>전체</option>
                            <option>초1</option><option>초2</option><option>초3</option>
                            <option>초4</option><option>초5</option><option>초6</option>
                            <option>기타</option>
                          </select>
                        </div>
                        <button 
                          onClick={() => setBetaSort(betaSort === "latest" ? "oldest" : "latest")}
                          className="text-[13px] font-bold text-dark-gray hover:text-primary-deep px-2"
                        >
                          {betaSort === "latest" ? "최신순 ↓" : "오래된순 ↑"}
                        </button>
                      </div>

                      {/* Beta Applications Table / Card View */}
                      <div className="bg-pure-white rounded-lg border border-black/5 shadow-sm overflow-hidden overflow-x-auto">
                        <table className="hidden md:table w-full text-left">
                          <thead className="bg-light-gray/50 border-b border-black/10">
                            <tr>
                              <th className="px-6 py-4 text-[13px] font-bold text-medium-gray w-16">No.</th>
                              <th className="px-6 py-4 text-[13px] font-bold text-medium-gray w-[25%]">신청 시간</th>
                              <th className="px-6 py-4 text-[13px] font-bold text-medium-gray w-[40%]">전용 이름 / 연락처</th>
                              <th className="px-6 py-4 text-[13px] font-bold text-medium-gray w-[35%]">상세 내역</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-black/5">
                            {(() => {
                              const filtered = getFilteredBeta();
                              const paginated = filtered.slice((betaPage - 1) * itemsPerPage, betaPage * itemsPerPage);
                              
                              return paginated.length > 0 ? (
                                paginated.map((app, idx) => (
                                <motion.tr 
                                  key={app.id} 
                                  animate={newRowIds.has(app.id) ? { backgroundColor: "rgba(232,132,90,0.1)" } : { backgroundColor: "rgba(255,255,255,1)" }}
                                  className="hover:bg-light-gray/10 transition-all group"
                                >
                                  <td className="px-6 py-4 text-[14px] font-bold text-charcoal">
                                    {filtered.length - ((betaPage - 1) * itemsPerPage + idx)}
                                  </td>
                                  <td className="px-6 py-4">
                                    <p className="text-[14px] font-medium text-charcoal">{new Date(app.created_at).toLocaleString()}</p>
                                    <p className="text-[12px] text-medium-gray font-mono mt-1">ID: {app.id.toString().slice(0, 8)}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 bg-light-gray/50 rounded-full flex items-center justify-center border border-black/5">
                                        <User className="w-5 h-5 text-medium-gray" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-[14px] font-bold text-charcoal">{app.parent_name}</span>
                                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${getGradeBadgeStyle(app.child_grade)}`}>
                                            {app.child_grade.replace("초등학교 ", "초")}
                                          </span>
                                        </div>
                                        <p className="text-[13px] text-medium-gray mt-0.5 font-medium">{app.phone}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2 text-[14px] text-dark-gray font-medium">
                                        <Mail className="w-3.5 h-3.5 text-primary-deep" /> {app.email}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <div className="px-3 py-1 bg-light-gray/50 border border-black/5 rounded-md flex items-center gap-2">
                                          <span className="text-[13px] font-mono text-medium-gray">PIN: {showPinId === app.id ? (app.child_pin || "1234") : "••••"}</span>
                                          <button 
                                            title="PIN 조회 이력이 기록됩니다"
                                            onClick={() => {
                                              setShowPinId(app.id);
                                              setTimeout(() => setShowPinId(null), 3000);
                                            }}
                                            className="text-medium-gray hover:text-charcoal"
                                          >
                                            {showPinId === app.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </motion.tr>
                              ))
                            ) : (
                              <tr><td colSpan={3} className="py-24 text-center">
                                <Inbox className="w-12 h-12 text-black/10 mx-auto mb-4" />
                                <p className="text-medium-gray font-medium">신청 내역이 없습니다.</p>
                              </td></tr>
                            );
                          })()}
                          </tbody>
                        </table>

                        {/* Pagination for Beta */}
                        <div className="bg-light-gray/20 px-6 py-4 border-t border-black/5 flex items-center justify-between">
                          <p className="text-[13px] text-medium-gray">
                            총 <span className="font-bold text-charcoal">{getFilteredBeta().length}</span>명 중 {(betaPage-1)*itemsPerPage + 1}-{Math.min(betaPage*itemsPerPage, getFilteredBeta().length)} 표시
                          </p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setBetaPage(prev => Math.max(1, prev - 1))}
                              disabled={betaPage === 1}
                              className="p-2 rounded-md hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="flex items-center px-3 text-[14px] font-bold text-primary-deep">{betaPage}</span>
                            <button 
                              onClick={() => setBetaPage(prev => Math.min(Math.ceil(getFilteredBeta().length / itemsPerPage), prev + 1))}
                              disabled={betaPage >= Math.ceil(getFilteredBeta().length / itemsPerPage)}
                              className="p-2 rounded-md hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                        
                      {/* Mobile Card View */}
                      <div className="md:hidden space-y-3 p-4">
                        {getFilteredBeta().slice((betaPage - 1) * itemsPerPage, betaPage * itemsPerPage).map((app) => (
                          <motion.div 
                            key={app.id} 
                            animate={newRowIds.has(app.id) ? { scale: 1.02, borderColor: "#E8845A" } : { scale: 1, borderColor: "rgba(0,0,0,0.05)" }}
                            className="bg-pure-white border rounded-lg p-4 shadow-sm"
                          >
                            <div className="flex justify-between items-start mb-3 border-b border-black/5 pb-2">
                              <span className="text-[11px] text-medium-gray">{new Date(app.created_at).toLocaleString()}</span>
                              <span className="text-[11px] font-mono text-medium-gray">ID: {app.id.toString().slice(0, 8)}</span>
                            </div>
                            <div className="flex items-center gap-3 mb-3 border-b border-black/5 pb-2">
                              <div className="w-10 h-10 bg-light-gray/50 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-medium-gray" /></div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[14px] font-bold">{app.parent_name}</span>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getGradeBadgeStyle(app.child_grade)}`}>{app.child_grade}</span>
                                </div>
                                <p className="text-[13px] text-medium-gray">{app.phone}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-[13px] text-dark-gray"><Mail className="w-3.5 h-3.5" /> {app.email}</div>
                              <div className="flex items-center justify-between bg-light-gray/30 p-2 rounded-md">
                                <span className="text-[12px] font-mono">PIN: {showPinId === app.id ? (app.child_pin || "1234") : "••••"}</span>
                                <button onClick={() => { setShowPinId(app.id); setTimeout(() => setShowPinId(null), 3000); }}><Eye className="w-3.5 h-3.5 text-medium-gray" /></button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "click" && (
                    <div className="bg-pure-white rounded-lg border border-black/5 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                      {/* Filter Bar */}
                      <div className="p-4 flex flex-wrap gap-4 items-center border-b border-black/5 bg-light-gray/30">
                        <div className="flex gap-1 bg-black/5 p-1 rounded-full">
                          <button 
                            onClick={() => { setClickSort("latest"); setClickView("list"); }} 
                            className={`px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold transition-all ${clickSort === "latest" ? "bg-white text-charcoal shadow-sm" : "text-medium-gray hover:text-charcoal"}`}
                          >
                            최신순
                          </button>
                          <button 
                            onClick={() => { setClickSort("popular"); setClickView("chart"); }} 
                            className={`px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold transition-all ${clickSort === "popular" ? "bg-white text-charcoal shadow-sm" : "text-medium-gray hover:text-charcoal"}`}
                          >
                            인기순
                          </button>
                        </div>
                        <div className="hidden md:block w-[1px] h-4 bg-black/10" />
                        <div className="flex gap-1 bg-black/5 p-1 rounded-full">
                          <button onClick={() => setClickView("list")} className={`px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold transition-all ${clickView === "list" ? "bg-white text-charcoal shadow-sm" : "text-medium-gray hover:text-charcoal"} flex items-center gap-1.5`}><LayoutGrid className="w-3.5 h-3.5" /> 목록</button>
                          <button onClick={() => setClickView("chart")} className={`px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold transition-all ${clickView === "chart" ? "bg-white text-charcoal shadow-sm" : "text-medium-gray hover:text-charcoal"} flex items-center gap-1.5`}><BarChart3 className="w-3.5 h-3.5" /> 차트</button>
                        </div>
                        <div className="hidden md:block w-[1px] h-4 bg-black/10" />
                        <div className="flex gap-1 bg-black/5 p-1 rounded-full">
                          <button onClick={() => setClickFilter("week")} className={`px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold transition-all ${clickFilter === "week" ? "bg-white text-charcoal shadow-sm" : "text-medium-gray hover:text-charcoal"}`}>일주일</button>
                          <button onClick={() => setClickFilter("month")} className={`px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold transition-all ${clickFilter === "month" ? "bg-white text-charcoal shadow-sm" : "text-medium-gray hover:text-charcoal"}`}>한 달</button>
                        </div>
                      </div>

                      <div className="p-6">
                        {clickView === "chart" ? (
                          <div className="bg-[#F9FAFB] rounded-lg p-6 md:p-8 border border-black/5">
                            <h4 className="text-[18px] md:text-[20px] font-bold text-charcoal mb-1">Top 10 클릭 요소</h4>
                            <p className="text-[13px] text-medium-gray mb-8">{clickFilter === "week" ? "최근 일주일" : "최근 한 달"} · 총 {getFilteredClickLogs().length}건</p>
                            <div className="space-y-5">
                              {(() => {
                                const filtered = getFilteredClickLogs();
                                const counts = filtered.reduce((acc: any, log) => { 
                                  const key = log.element_text || '미지정 요소'; 
                                  acc[key] = (acc[key] || 0) + 1; 
                                  return acc; 
                                }, {});
                                const sorted = Object.entries(counts).sort(([, a]: any, [, b]: any) => b - a).slice(0, 10);
                                const max = sorted[0]?.[1] as number || 1;
                                return sorted.map(([name, count]: any, idx) => (
                                  <div key={idx} className="flex items-center gap-4 md:gap-6 group">
                                    <span className="w-7 h-7 flex items-center justify-center bg-black/5 rounded-full text-[12px] font-bold text-medium-gray shrink-0">{idx + 1}</span>
                                    <span className="w-20 md:w-28 text-[13px] font-medium text-dark-gray truncate">{name}</span>
                                    <div className="flex-1 h-7 bg-black/5 rounded-md overflow-hidden relative">
                                      <motion.div 
                                        initial={{ width: 0 }} 
                                        animate={{ width: `${(count / max) * 100}%` }} 
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="h-full rounded-md group-hover:brightness-110 transition-all flex items-center justify-end px-3 shadow-inner" 
                                        style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                                      >
                                        {(count / max) > 0.15 && <span className="text-[10px] font-black text-white/90">{count}회</span>}
                                      </motion.div>
                                    </div>
                                    <span className="w-10 text-right text-[13px] font-bold text-medium-gray">{count}</span>
                                  </div>
                                ));
                              })()}
                            </div>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[800px]">
                              <thead className="bg-light-gray/50 border-b border-black/10 text-[13px] font-bold text-medium-gray">
                                <tr>
                                  <th className="px-4 py-4 w-[15%]">시간</th>
                                  <th className="px-4 py-4 w-[10%]">구분</th>
                                  <th className="px-4 py-4 w-[25%]">텍스트/ID</th>
                                  <th className="px-4 py-4 w-[20%]">위치</th>
                                  <th className="px-4 py-4 w-[30%]">기기 정보</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-black/5">
                                {getFilteredClickLogs().slice(0, 100).map((log) => (
                                  <tr key={log.id} className="hover:bg-light-gray/10 transition-all group">
                                    <td className="px-4 py-5 text-[14px] text-dark-gray">{new Date(log.created_at).toLocaleString()}</td>
                                    <td className="px-4 py-5">
                                      <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider">CLICK</span>
                                    </td>
                                    <td className="px-4 py-5">
                                      <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-charcoal group-hover:text-primary-deep transition-colors">{log.element_text || "UNKNOWN"}</span>
                                        <span className="text-[11px] text-medium-gray font-mono mt-0.5">ID: {log.element_id}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-5 font-mono text-[13px] text-primary-deep">{log.page_path}</td>
                                    <td className="px-4 py-5 max-w-[200px] truncate text-[11px] text-medium-gray" title={log.user_agent}>
                                      {log.user_agent}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "inquiry" && (
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
                          {(() => {
                            const filteredIqs = inquiries.filter(i => i.status === (inquirySubTab === 'resolved' ? 'resolved' : 'pending'));
                            return filteredIqs.length > 0 ? (
                              filteredIqs.map((iq, idx) => (
                                <motion.tr 
                                  key={iq.id} 
                                  className="hover:bg-light-gray/10 transition-all group"
                                >
                                  <td className="px-6 py-4 text-[14px] font-bold text-charcoal">
                                    {filteredIqs.length - idx}
                                  </td>
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
                                        onClick={() => handleReopenInquiry(iq.id)}
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
                            );
                          })()}
                        </tbody>
                      </table>
                      
                      {/* Mobile Inquiry Card View */}
                      <div className="md:hidden space-y-4 p-4">
                        {inquiries.filter(i => i.status === (inquirySubTab === 'resolved' ? 'resolved' : 'pending')).map((iq) => (
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
                                  onClick={() => handleReopenInquiry(iq.id)}
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
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {confirmDialog && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setConfirmDialog(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-pure-white rounded-[1.5rem] p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <h3 className="text-[20px] font-bold text-charcoal mb-2">해결 완료 처리하시겠습니까?</h3>
              <p className="text-[14px] text-medium-gray mb-8">해결됨 탭으로 이동하며 부모님께 안내됩니다.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDialog(null)} className="flex-1 py-3 bg-light-gray rounded-xl font-bold text-dark-gray hover:bg-light-gray/80 transition-all">취소</button>
                <button onClick={executeResolveInquiry} className="flex-1 py-3 bg-primary-deep text-white rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg">확인</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-black/5 flex justify-between items-center bg-light-gray/20">
                <div>
                  <h3 className="text-[20px] md:text-[24px] font-bold text-charcoal">문의 상세 내용</h3>
                  <p className="text-[13px] text-medium-gray mt-1">{new Date(selectedInquiry.created_at).toLocaleString()}</p>
                </div>
                <button onClick={() => setIsReplyModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* User Info */}
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

                {/* Inquiry Content */}
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

                {/* Reply Section */}
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

              {/* Modal Footer */}
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
                    onClick={() => handleReopenInquiry(selectedInquiry.id)}
                    className="px-6 py-3 bg-secondary-coral/10 text-secondary-coral font-bold rounded-xl text-[15px] hover:bg-secondary-coral/20 transition-all"
                  >
                    미해결
                  </button>

                  {selectedInquiry.status !== 'resolved' && (
                    <button 
                      onClick={() => {
                        setConfirmDialog({ id: selectedInquiry.id, show: true });
                      }}
                      className="px-6 py-3 bg-success-green text-white font-bold rounded-xl text-[15px] shadow-lg hover:bg-success-green/90 transition-all flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> 해결
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleResolveInquiry(selectedInquiry.id, replyText)}
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

      {/* Session Expired Modal */}
      <AnimatePresence>
        {isSessionExpired && (
          <div className="fixed inset-0 z-[4000] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="relative bg-pure-white rounded-[1.5rem] p-10 max-w-md w-full shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-[#EF4444]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="w-10 h-10 text-[#EF4444]" />
              </div>
              <h3 className="text-[24px] font-bold text-charcoal mb-3">세션이 만료되었습니다</h3>
              <p className="text-[16px] text-medium-gray mb-10 leading-relaxed">보안을 위해 다시 로그인해 주세요.<br/>30분 이상 비활동 시 자동으로 로그아웃됩니다.</p>
              <button 
                onClick={() => navigate("/admin/login")}
                className="w-full py-4 bg-primary-deep text-white rounded-xl font-bold text-[16px] shadow-xl hover:bg-primary-light transition-all"
              >
                다시 로그인하기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
