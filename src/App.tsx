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
import AdminDashboardPage from "./pages/AdminDashboardPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import ScrollToTop from "./components/ScrollToTop";
import { supabase } from "./lib/supabase";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-warm-white">
      <div className="w-10 h-10 border-4 border-primary-deep/20 border-t-primary-deep rounded-full animate-spin"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function NavigationWrapper({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  // 클릭 이벤트 추적 로직
  React.useEffect(() => {
    const handleGlobalClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // data-track 속성이 있는 요소나 버튼, 링크 등을 추적
      const trackableElement = target.closest('button, a, [data-track]');
      
      if (trackableElement && !isAdminPath) {
        const elementText = trackableElement.textContent?.trim() || (trackableElement as any).innerText?.trim();
        const elementId = trackableElement.id || trackableElement.getAttribute('data-track') || 'unknown';
        
        try {
          await import('./lib/supabase').then(async ({ supabase }) => {
            await supabase.from('click_logs').insert([
              {
                element_id: elementId,
                element_text: elementText?.slice(0, 50),
                page_path: location.pathname,
                user_agent: navigator.userAgent
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
  }, [location.pathname, isAdminPath]);

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
