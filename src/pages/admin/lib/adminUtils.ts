export const CHART_COLORS = [
  "#38BDF8", "#2DD4BF", "#34D399", "#4ADE80", "#A3E635",
  "#FACC15", "#FBBF24", "#FB923C", "#F87171", "#F472B6"
];

export function getGradeBadgeStyle(grade: string): string {
  if (grade.includes("1") || grade.includes("2")) return "bg-green-500/10 text-green-600";
  if (grade.includes("3") || grade.includes("4")) return "bg-blue-500/10 text-blue-600";
  return "bg-purple-500/10 text-purple-600";
}

export function getFilteredClickLogs(
  clickLogs: any[],
  clickFilter: "week" | "month" | "all"
): any[] {
  let filtered = [...clickLogs];
  if (clickFilter !== "all") {
    const threshold = new Date();
    if (clickFilter === "week") threshold.setDate(threshold.getDate() - 7);
    if (clickFilter === "month") threshold.setMonth(threshold.getMonth() - 1);
    filtered = filtered.filter(log => new Date(log.created_at) >= threshold);
  }
  return filtered;
}

export function mapReferrer(referrer: string, utmSource?: string): string {
  if (utmSource) return utmSource;
  if (!referrer) return '직접';
  if (referrer.includes('naver')) return 'naver';
  if (referrer.includes('google')) return 'google';
  if (referrer.includes('instagram') || referrer.includes('ig.me')) return 'instagram';
  if (referrer.includes('youtube') || referrer.includes('youtu.be')) return 'youtube';
  return '기타';
}

export function getFilteredPageViews(
  pageViews: any[],
  filter: "week" | "month" | "all"
): any[] {
  if (filter === "all") return pageViews;
  const threshold = new Date();
  if (filter === "week") threshold.setDate(threshold.getDate() - 7);
  if (filter === "month") threshold.setMonth(threshold.getMonth() - 1);
  return pageViews.filter(pv => new Date(pv.created_at) >= threshold);
}

export interface AnalyticsSummary {
  uniqueVisitors: number;
  totalPageViews: number;
  betaCount: number;
  conversionRate: number;
}

export function getAnalyticsSummary(
  filteredPageViews: any[],
  betaCount: number
): AnalyticsSummary {
  const uniqueVisitors = new Set(filteredPageViews.map(pv => pv.session_id)).size;
  const conversionRate = uniqueVisitors > 0
    ? parseFloat(((betaCount / uniqueVisitors) * 100).toFixed(1))
    : 0;
  return { uniqueVisitors, totalPageViews: filteredPageViews.length, betaCount, conversionRate };
}

export interface ChannelStat {
  channel: string;
  visitors: number;
  conversions: number;
  conversionRate: string;
}

export function getChannelStats(
  pageViews: any[],
  betaApps: any[],
  filter: "week" | "month" | "all"
): ChannelStat[] {
  const filtered = getFilteredPageViews(pageViews, filter);
  const filteredSessions = new Set(filtered.map((pv: any) => pv.session_id));

  const sessionChannel: Record<string, string> = {};
  filtered.forEach((pv: any) => {
    if (!sessionChannel[pv.session_id]) {
      sessionChannel[pv.session_id] = mapReferrer(pv.referrer || '', pv.utm_source || undefined);
    }
  });

  const visitorsByChannel: Record<string, Set<string>> = {};
  Object.entries(sessionChannel).forEach(([sid, ch]) => {
    if (!visitorsByChannel[ch]) visitorsByChannel[ch] = new Set();
    visitorsByChannel[ch].add(sid);
  });

  const conversionsByChannel: Record<string, number> = {};
  betaApps.forEach((app: any) => {
    if (app.session_id && filteredSessions.has(app.session_id)) {
      const ch = sessionChannel[app.session_id] || '기타';
      conversionsByChannel[ch] = (conversionsByChannel[ch] || 0) + 1;
    }
  });

  const channels = ['직접', 'naver', 'google', 'instagram', 'youtube', '기타'];
  return channels.map(ch => {
    const visitors = visitorsByChannel[ch]?.size || 0;
    const conversions = conversionsByChannel[ch] || 0;
    const conversionRate = visitors > 0
      ? ((conversions / visitors) * 100).toFixed(1)
      : '0.0';
    return { channel: ch, visitors, conversions, conversionRate };
  });
}

export function downloadCSV(
  activeTab: "click" | "inquiry" | "beta",
  betaApps: any[],
  inquiries: any[],
  clickLogs: any[],
  addToast: (msg: string, type: "success" | "error") => void
): void {
  const data = activeTab === "beta" ? betaApps : (activeTab === "click" ? clickLogs : inquiries);
  if (!data.length) return;

  addToast("다운로드를 준비 중입니다...", "success");

  let csvContent = "﻿";
  let headers: string[] = [];
  if (activeTab === "beta") headers = ["신청시간", "부모님성함", "연락처", "이메일", "성별", "학년", "신청동기"];
  else if (activeTab === "inquiry") headers = ["문의시간", "이름", "이메일", "제목", "내용", "상태"];
  else headers = ["시간", "텍스트/ID", "위치", "기기정보"];

  csvContent += headers.join(",") + "\n";

  data.forEach((item: any) => {
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
}
