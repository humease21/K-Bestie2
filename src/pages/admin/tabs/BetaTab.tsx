import { motion } from "motion/react";
import { Search, User, Mail, Eye, EyeOff, Inbox, ChevronLeft, ChevronRight } from "lucide-react";
import { getGradeBadgeStyle } from "../lib/adminUtils";

interface BetaTabProps {
  betaApps: any[];
  newRowIds: Set<string>;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  gradeFilter: string;
  setGradeFilter: (v: string) => void;
  betaSort: "latest" | "oldest";
  setBetaSort: (v: "latest" | "oldest") => void;
  betaPage: number;
  setBetaPage: (fn: (prev: number) => number) => void;
  itemsPerPage: number;
  showPinId: string | null;
  setShowPinId: (id: string | null) => void;
}

function getFilteredBeta(
  betaApps: any[],
  searchTerm: string,
  gradeFilter: string,
  betaSort: "latest" | "oldest"
): any[] {
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
}

export default function BetaTab({
  betaApps, newRowIds,
  searchTerm, setSearchTerm,
  gradeFilter, setGradeFilter,
  betaSort, setBetaSort,
  betaPage, setBetaPage,
  itemsPerPage,
  showPinId, setShowPinId,
}: BetaTabProps) {
  const filtered = getFilteredBeta(betaApps, searchTerm, gradeFilter, betaSort);
  const paginated = filtered.slice((betaPage - 1) * itemsPerPage, betaPage * itemsPerPage);

  return (
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

      {/* Beta Applications Table */}
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
            {paginated.length > 0 ? (
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
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-light-gray/20 px-6 py-4 border-t border-black/5 flex items-center justify-between">
          <p className="text-[13px] text-medium-gray">
            총 <span className="font-bold text-charcoal">{filtered.length}</span>명 중 {(betaPage - 1) * itemsPerPage + 1}-{Math.min(betaPage * itemsPerPage, filtered.length)} 표시
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
              onClick={() => setBetaPage(prev => Math.min(Math.ceil(filtered.length / itemsPerPage), prev + 1))}
              disabled={betaPage >= Math.ceil(filtered.length / itemsPerPage)}
              className="p-2 rounded-md hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 p-4">
        {paginated.map((app) => (
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
  );
}
