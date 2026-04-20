import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "부모 고민", id: "problem" },
    { name: "서비스 특징", id: "solution" },
    { name: "리포트", id: "report" },
    { name: "안전 정책", id: "safety" },
    { name: "FAQ", id: "faq" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      if (location.pathname === "/") {
        const sections = menuItems.map(item => document.getElementById(item.id));
        const currentSection = sections.find(section => {
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        });
        if (currentSection) setActiveSection(currentSection.id);
        else if (window.scrollY < 100) setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    
    if (location.pathname !== "/") {
      // Navigate to home with hash
      navigate(`/#${id}`);
      // The actual scroll will be handled by a useEffect in HomePage.tsx
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 72; // Navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${
          scrolled 
            ? "bg-warm-white/85 backdrop-blur-xl border-b border-black/5 h-[72px]" 
            : "bg-transparent h-[80px]"
        }`}
      >
        <div className="max-w-[1200px] mx-auto h-full px-5 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <img 
              alt="내친구 케이 Logo" 
              className="h-9 md:h-10 w-auto" 
              src="/images/logo2.png" 
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center h-full">
            <div className="flex gap-8 h-full">
              {menuItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-base font-medium transition-colors group h-full flex items-center ${
                    activeSection === item.id ? "text-primary-deep font-semibold" : "text-dark-gray hover:text-primary-deep"
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-[20px] left-0 w-full h-0.5 bg-primary-deep transition-transform duration-300 origin-left ${
                    activeSection === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </button>
              ))}
            </div>
            
            <Link to="/pricing" className="ml-4">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#2D9F8F" }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary-deep text-white px-6 py-2.5 rounded-full text-[15px] font-semibold shadow-md transition-all whitespace-nowrap"
              >
                베타 신청하기
              </motion.button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <Link to="/pricing">
              <button className="bg-primary-deep text-white px-4 py-2 rounded-full text-[13px] font-bold shadow-sm">
                베타 신청
              </button>
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-charcoal"
              aria-label="메뉴 열기"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-warm-white flex flex-col justify-center px-10"
          >
            <div className="flex flex-col gap-8 text-center">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <button 
                    onClick={() => handleNavClick(item.id)}
                    className={`text-2xl font-bold transition-colors ${
                      activeSection === item.id ? "text-primary-deep" : "text-charcoal active:text-primary-deep"
                    }`}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link to="/pricing" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-primary-deep text-white py-4 rounded-full text-lg font-bold shadow-lg">
                    베타 신청하기
                  </button>
                </Link>
              </motion.div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 text-charcoal"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
