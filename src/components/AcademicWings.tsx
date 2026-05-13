import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ArrowRight, Book, Code, Shield, Cpu, Palette, PieChart, TrendingUp } from 'lucide-react';
import './AcademicWings.css';

gsap.registerPlugin(ScrollTrigger);

interface Program { id: string; title: string; category: 'BSc' | 'MBA' | 'BE/BTech'; duration: string; icon: React.ReactNode; image: string; }

const programs: Program[] = [
  { id: '1', title: 'Computer Science with AI Certification by INTEL', category: 'BSc', duration: '3 Years', icon: <Cpu size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/04/Bsc.jpg-1024x683.jpeg' },
  { id: '2', title: 'Computer Science with Cyber Security', category: 'BSc', duration: '3 Years', icon: <Shield size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Future-Tech-Curriculam-1.jpg' },
  { id: '3', title: 'Information Technology with Data Science', category: 'BSc', duration: '3 Years', icon: <Code size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Hand-on-Project-1.jpg' },
  { id: '4', title: 'Artificial Intelligence & Machine Learning (GIP)', category: 'BSc', duration: '3 Years', icon: <Cpu size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Industry-Exposure-1.jpg' },
  { id: '5', title: 'Computer Science (AI) with GIP', category: 'BSc', duration: '3 Years', icon: <Book size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/01-1-1.jpg' },
  { id: '6', title: 'Computer Science with AI & DS with GIP', category: 'BSc', duration: '3 Years', icon: <Code size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/02-1-1.jpg' },
  { id: '7', title: 'Visual Communication - AI & VFX Designer with GIP', category: 'BSc', duration: '3 Years', icon: <Palette size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Media-1-2.jpg-1024x682.jpeg' },
  { id: '8', title: 'Visual Communication - AI & VFX Designer', category: 'BSc', duration: '3 Years', icon: <Palette size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/03-1-1.jpg' },
  { id: '9', title: 'Costume Design and Fashion with GIP', category: 'BSc', duration: '3 Years', icon: <Book size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/04-1-1.jpg' },
  { id: '10', title: 'MBA Business Analytics & AI', category: 'MBA', duration: '2 Years', icon: <PieChart size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/04/MBA.jpg-1024x683.jpeg' },
  { id: '11', title: 'MBA Digital Marketing', category: 'MBA', duration: '2 Years', icon: <TrendingUp size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Industry-Exposure-1.jpg' },
  { id: '12', title: 'Artificial Intelligence & Data Science', category: 'BE/BTech', duration: '4 Years', icon: <Cpu size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/04/B.E-B.Tech_.jpg-1024x683.jpeg' },
  { id: '13', title: 'Computer Science Engineering (AI & ML)', category: 'BE/BTech', duration: '4 Years', icon: <Code size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/01.jpg' },
  { id: '14', title: 'Computer Science Engineering', category: 'BE/BTech', duration: '4 Years', icon: <Cpu size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/02.jpg' },
  { id: '15', title: 'Computer Science Engineering (Cyber Security)', category: 'BE/BTech', duration: '4 Years', icon: <Shield size={18} />, image: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/04.jpg' },
];

const AcademicWings: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredPrograms = programs.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  useGSAP(() => {
    gsap.fromTo('.ps-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } });
    gsap.fromTo('.ps-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out", scrollTrigger: { trigger: '.ps-grid', start: 'top 85%' } });
  }, { scope: containerRef, dependencies: [filteredPrograms] });

  return (
    <section className="programs-section section-padding" id="programmes" ref={containerRef}>
      <div className="container">
        <div className="ps-header">
          <h2 className="section-title">Academic <span className="text-gradient">Programmes</span></h2>
          <p className="section-desc">Industry-integrated degrees designed for tomorrow's innovators.</p>
        </div>
        <div className="ps-filter-bar">
          <div className="ps-filters">
            {['All', 'BSc', 'MBA', 'BE/BTech'].map(cat => (
              <button key={cat} className={`ps-filter ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
                {cat === 'All' ? 'All Programs' : cat}
              </button>
            ))}
          </div>
          <div className="ps-search">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Find a program..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="ps-grid">
          {filteredPrograms.length > 0 ? filteredPrograms.map(p => (
            <div key={p.id} className="ps-card">
              <div className="ps-card-image">
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className="ps-card-overlay">
                  <span className="ps-tag">{p.category}</span>
                </div>
              </div>
              <div className="ps-detail">
                <h3 className="ps-title">{p.title}</h3>
                <div className="ps-meta">
                  <span className="ps-duration">{p.duration}</span>
                  <a href="#contact" className="ps-link">Details <ArrowRight size={13} /></a>
                </div>
              </div>
            </div>
          )) : <div style={{gridColumn: '1/-1', textAlign: 'center', padding: 60, color: 'var(--text-muted)'}}>No programs match your search.</div>}
        </div>
      </div>
    </section>
  );
};

export default AcademicWings;
