import { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '../../../lib/supabase';
import AnimatedNumber from '../components/AnimatedNumber';
import {
  CHART_COLORS,
  getFilteredPageViews,
  getAnalyticsSummary,
  getChannelStats,
} from '../lib/adminUtils';

interface AnalyticsTabProps {
  isVisible: boolean;
  betaApps: any[];
}

const FILTER_LABELS: Record<string, string> = { week: '일주일', month: '한 달', all: '전체' };

export default function AnalyticsTab({ isVisible, betaApps }: AnalyticsTabProps) {
  const [pageViews, setPageViews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pvFilter, setPvFilter] = useState<'week' | 'month' | 'all'>('week');
  const hasFetchedRef = useRef(false);

  const doFetch = async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from('kbestie_page_views')
        .select('*')
        .order('created_at', { ascending: false });
      setPageViews(data || []);
    } catch (err) {
      console.error('Analytics fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isVisible || hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    doFetch();
  }, [isVisible]);

  const handleRefresh = () => {
    hasFetchedRef.current = false;
    doFetch();
  };

  const filtered = getFilteredPageViews(pageViews, pvFilter);
  const summary = getAnalyticsSummary(filtered, betaApps.length);
  const channelStats = getChannelStats(pageViews, betaApps, pvFilter);
  const hasData = channelStats.some(c => c.visitors > 0);

  const kpiCards = [
    { label: '고유 방문자', value: summary.uniqueVisitors, color: '#38BDF8' },
    { label: '베타 신청', value: summary.betaCount, color: '#E8845A' },
    { label: '전환율 (%)', value: summary.conversionRate, color: '#34D399' },
    { label: '총 페이지뷰', value: summary.totalPageViews, color: '#A3E635' },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 bg-black/5 p-1 rounded-full">
          {(['week', 'month', 'all'] as const).map(f => (
            <button
              key={f}
              onClick={() => setPvFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all ${
                pvFilter === f ? 'bg-white text-charcoal shadow-sm' : 'text-medium-gray hover:text-charcoal'
              }`}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-medium-gray hover:bg-light-gray rounded-md transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          새로고침
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-primary-deep/20 border-t-primary-deep rounded-full animate-spin" />
        </div>
      )}

      {!isLoading && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpiCards.map((card, i) => (
              <div
                key={i}
                className="bg-pure-white p-6 rounded-lg border border-black/5 shadow-sm flex flex-col gap-2 border-t-[3px]"
                style={{ borderTopColor: card.color }}
              >
                <span className="text-[12px] text-medium-gray font-semibold uppercase tracking-wider">
                  {card.label}
                </span>
                <AnimatedNumber value={card.value} color={card.color} />
              </div>
            ))}
          </div>

          {/* Channel Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Table */}
            <div className="bg-pure-white rounded-lg border border-black/5 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-black/10 bg-light-gray/50">
                <h4 className="text-[14px] font-bold text-charcoal">채널별 방문자</h4>
              </div>
              <table className="w-full text-left">
                <thead className="bg-light-gray/30 border-b border-black/5">
                  <tr>
                    <th className="px-4 py-2.5 text-[12px] font-bold text-medium-gray">채널</th>
                    <th className="px-4 py-2.5 text-[12px] font-bold text-medium-gray text-right">방문자</th>
                    <th className="px-4 py-2.5 text-[12px] font-bold text-medium-gray text-right">신청</th>
                    <th className="px-4 py-2.5 text-[12px] font-bold text-medium-gray text-right">전환율</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {channelStats.map((row, i) => (
                    <tr key={i} className="hover:bg-light-gray/10 transition-all">
                      <td className="px-4 py-3 text-[13px] font-bold text-charcoal">{row.channel}</td>
                      <td className="px-4 py-3 text-[13px] text-dark-gray text-right">{row.visitors}</td>
                      <td className="px-4 py-3 text-[13px] text-dark-gray text-right">{row.conversions}</td>
                      <td
                        className="px-4 py-3 text-[13px] font-bold text-right"
                        style={{ color: row.visitors > 0 ? '#34D399' : '#9CA3AF' }}
                      >
                        {row.conversionRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pie Chart */}
            <div className="bg-pure-white rounded-lg border border-black/5 shadow-sm p-6">
              <h4 className="text-[14px] font-bold text-charcoal mb-4">채널별 방문 비중</h4>
              {hasData ? (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={channelStats.filter(c => c.visitors > 0)}
                      dataKey="visitors"
                      nameKey="channel"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                    >
                      {channelStats
                        .filter(c => c.visitors > 0)
                        .map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => [`${v}명`, '방문자']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[240px]">
                  <p className="text-[13px] text-medium-gray font-medium">수집된 방문 데이터가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
