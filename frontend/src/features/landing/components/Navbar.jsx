import { useState, useEffect } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#stats", label: "Stats" },
    { href: "#developers", label: "Team" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2' 
          : 'py-4'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl transition-all duration-300 ${
        scrolled 
          ? 'glass-dark shadow-xl mx-4 lg:mx-auto py-3' 
          : 'py-2'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              className={`transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'}`} 
              loading="lazy" 
              alt="Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-all duration-300 hover:text-indigo-400 ${
                  scrolled ? 'text-white/90' : 'text-white/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Login Link */}
            <Link
              to="/login"
              className={`hidden sm:block font-medium transition-all duration-300 hover:text-indigo-400 ${
                scrolled ? 'text-white/90' : 'text-white/80'
              }`}
            >
              Sign In
            </Link>

            {/* Sign Up Button */}
            <Link
              to="/register"
              className="btn-primary inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
            >
              Get Started
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg glass text-white"
              onClick={() => setIsOpen(!isOpen)} 
              aria-label="Toggle menu"
            >
              {isOpen ? <VscChromeClose size={22} /> : <RiMenu3Fill size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-white/10 mt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <Link 
                    to="/login" 
                    className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-3 rounded-xl btn-primary text-white text-center font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
