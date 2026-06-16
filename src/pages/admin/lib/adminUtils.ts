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
