import { motion } from "motion/react";
import { LayoutGrid, BarChart3 } from "lucide-react";
import { CHART_COLORS, getFilteredClickLogs } from "../lib/adminUtils";

interface ClickLogsTabProps {
  clickLogs: any[];
  clickSort: "latest" | "popular";
  setClickSort: (v: "latest" | "popular") => void;
  clickFilter: "week" | "month" | "all";
  setClickFilter: (v: "week" | "month" | "all") => void;
  clickView: "list" | "chart";
  setClickView: (v: "list" | "chart") => void;
  clickPage: number;
  setClickPage: (fn: (prev: number) => number) => void;
  logsPerPage: number;
}

export default function ClickLogsTab({
  clickLogs,
  clickSort, setClickSort,
  clickFilter, setClickFilter,
  clickView, setClickView,
}: ClickLogsTabProps) {
  const filtered = getFilteredClickLogs(clickLogs, clickFilter);

  return (
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
            <p className="text-[13px] text-medium-gray mb-8">{clickFilter === "week" ? "최근 일주일" : "최근 한 달"} · 총 {filtered.length}건</p>
            <div className="space-y-5">
              {(() => {
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
                {filtered.slice(0, 100).map((log) => (
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
  );
}
