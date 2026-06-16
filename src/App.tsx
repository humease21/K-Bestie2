import React, { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import KidExperiencePage from "./pages/KidExperiencePage";
import SafetyPage from "./pages/SafetyPage";
import PricingPage from "./pages/PricingPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import InstitutionalPage from "./pages/InstitutionalPage";
import SecurityPage from "./pages/SecurityPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import ScrollToTop from "./components/ScrollToTop";
import { supabase } from "./lib/supabase";

const ALLOWED_ADMIN_EMAILS = ["markanitp@gmail.com"];

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const [accessDenied, setAccessDenied] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email ?? "";
      const isAllowed = !!session && ALLOWED_ADMIN_EMAILS.includes(email);
      if (session && !isAllowed) {
        await supabase.auth.signOut();
        setAccessDenied(true);
      }
      setIsAuthenticated(isAllowed);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const email = session?.user?.email ?? "";
      const isAllowed = !!session && ALLOWED_ADMIN_EMAILS.includes(email);
      if (session && !isAllowed) {
        await supabase.auth.signOut();
        setAccessDenied(true);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(isAllowed);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-warm-white">
      <div className="w-10 h-10 border-4 border-primary-deep/20 border-t-primary-deep rounded-full animate-spin"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location, accessDenied }} replace />;
  }

  return <>{children}</>;
}

function NavigationWrapper({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  // 익명 세션 ID — 탭 종료 시 소멸, 영구 추적 아님
  const [sessionId] = React.useState<string>(() => {
    let id = sessionStorage.getItem('k_session_id');
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem('k_session_id', id);
    }
    return id;
  });

  // 페이지뷰 기록 — 기존 클릭 수집과 완전 독립
  React.useEffect(() => {
    if (isAdminPath) return;
    let cancelled = false;
    const isFirst = !sessionStorage.getItem('k_session_first_pv');
    const params = new URLSearchParams(window.location.search);
    const referrer = isFirst ? (document.referrer || null) : null;
    const utmSource = isFirst ? (params.get('utm_source') || null) : null;
    const utmMedium = isFirst ? (params.get('utm_medium') || null) : null;
    const utmCampaign = isFirst ? (params.get('utm_campaign') || null) : null;
    import('./lib/supabase').then(async ({ supabase }) => {
      if (cancelled) return;
      await supabase.from('kbestie_page_views').insert([{
        session_id: sessionId,
        page_path: location.pathname,
        referrer,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        user_agent: navigator.userAgent,
      }]);
      if (isFirst) sessionStorage.setItem('k_session_first_pv', '1');
    }).catch(err => console.error('Pageview tracking error:', err));
    return () => { cancelled = true; };
  }, [location.pathname, isAdminPath, sessionId]);

  // 클릭 이벤트 추적 로직
  React.useEffect(() => {
    const handleGlobalClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // data-track 속성이 있는 요소나 버튼, 링크 등을 추적
      const trackableElement = target.closest('button, a, [data-track]');
      
      if (trackableElement && !isAdminPath) {
        const elementText = trackableElement.textContent?.trim()
          || trackableElement.getAttribute('aria-label')
          || trackableElement.querySelector('img')?.getAttribute('alt')
          || trackableElement.getAttribute('title')
          || '';
        const elementId = trackableElement.id || trackableElement.getAttribute('data-track') || 'unknown';
        
        try {
          await import('./lib/supabase').then(async ({ supabase }) => {
            await supabase.from('kbestie_click_logs').insert([
              {
                element_id: elementId,
                element_text: elementText?.slice(0, 50),
                page_path: location.pathname,
                user_agent: navigator.userAgent,
                session_id: sessionId
              }
            ]);
          });
        } catch (err) {
          // 로깅 오류는 사용자 경험을 방해하지 않도록 콘솔 출력만 수행
          console.error('Click tracking error:', err);
        }
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [location.pathname, isAdminPath, sessionId]);

  return (
    <div className="min-h-screen selection:bg-orange/20 selection:text-orange bg-cream/10">
      {!isAdminPath && <Navbar />}
      <main>
        {children}
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavigationWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/report-detail" element={<ReportDetailPage />} />
          <Route path="/kid-experience" element={<KidExperiencePage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/institutional" element={<InstitutionalPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </NavigationWrapper>
    </Router>
  );
}
