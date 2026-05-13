import React, { useState, useRef } from 'react';
import { Menu, X, ArrowRight, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.navbar-pill', { y: -30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power4.out", delay: 0.2 });
  }, { scope: headerRef });

  return (
    <header className={`main-header ${isScrolled ? 'header-scrolled' : ''}`} ref={headerRef}>
      <div className="navbar-pill">
        <a href="/" className="nav-left">
          <div className="rgu-logo">
            <span className="rgu-logo-text">RGU</span>
          </div>
          <div className="rgu-text-group">
            <span className="rgu-title">Rathinam Global University</span>
            <div className="rgu-badges">
              <span className="naac-badge">
                <GraduationCap size={10} />
                NAAC A++ Accredited
              </span>
            </div>
          </div>
        </a>

        <nav className={`nav-center ${mobileMenuOpen ? 'nav-mobile-open' : ''}`}>
          <button className="nav-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close">
            <X size={20} />
          </button>
          <ul className="nav-list">
            <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About us</a></li>
            <li><a href="#admissions" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Admissions</a></li>
            <li><a href="#programmes" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Academics</a></li>
            <li><a href="#placements" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Placements</a></li>
            <li><a href="#campus" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Campus Life</a></li>
          </ul>
        </nav>

        <div className="nav-right">
          <a href="#contact" className="btn-apply">
            Apply Now <ArrowRight size={14} />
          </a>
          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />}
    </header>
  );
};

export default Header;