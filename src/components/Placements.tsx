import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, Award, Briefcase } from 'lucide-react';
import './Placements.css';

gsap.registerPlugin(ScrollTrigger);

const Placements: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.pl-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    gsap.fromTo('.pl-stat', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: '.pl-stats', start: 'top 85%' } });
    gsap.fromTo('.pl-featured', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: '.pl-featured', start: 'top 85%' } });

    const items = [
      { id: 'pl-0', end: 3, suffix: ' Crore' },
      { id: 'pl-1', end: 58, suffix: ' LPA' },
      { id: 'pl-2', end: 50, suffix: '+' },
      { id: 'pl-3', end: 100, suffix: '%' }
    ];
    items.forEach(s => {
      const obj = { v: 0 };
      const el = document.getElementById(s.id);
      if (el) {
        gsap.to(obj, {
          v: s.end, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => {
            const p = ['pl-0', 'pl-1'].includes(s.id) ? '₹' : '';
            el.innerText = `${p}${Math.floor(obj.v)}${s.suffix}`;
          }
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="placements-section section-padding" id="placements" ref={sectionRef}>
      <div className="container">
        <div className="pl-header">
          <h2 className="section-title">Career <span className="text-gradient">Outcomes</span></h2>
          <p className="section-desc">Our commitment to your success starts from day one.</p>
        </div>
        <div className="pl-stats">
          <div className="pl-stat">
            <div className="pl-stat-icon"><TrendingUp size={22} /></div>
            <div className="pl-stat-value" id="pl-0">₹0 Crore</div>
            <div className="pl-stat-label">Highest Package</div>
          </div>
          <div className="pl-stat">
            <div className="pl-stat-icon"><Award size={22} /></div>
            <div className="pl-stat-value" id="pl-1">₹0 LPA</div>
            <div className="pl-stat-label">Avg Top Tier Placement</div>
          </div>
          <div className="pl-stat">
            <div className="pl-stat-icon"><Users size={22} /></div>
            <div className="pl-stat-value" id="pl-2">0+</div>
            <div className="pl-stat-label">Industry Partners</div>
          </div>
          <div className="pl-stat">
            <div className="pl-stat-icon"><Briefcase size={22} /></div>
            <div className="pl-stat-value" id="pl-3">0%</div>
            <div className="pl-stat-label">Industry Readiness</div>
          </div>
        </div>
        <div className="pl-featured">
          <h3>Placement preparation isn't a final semester task.</h3>
          <p>Career readiness is built into every semester — from resume building in Semester 1 to mock interviews and industry mentorship.</p>
          <div className="pl-logo-slider">
            <div className="pl-logo-track">
              {[
                { name: 'DELL', color: '#007DB8' },
                { name: 'INTEL', color: '#0071C5' },
                { name: 'MICROSOFT', color: '#00A4EF' },
                { name: 'GOOGLE', color: '#4285F4' },
                { name: 'AMAZON', color: '#FF9900' },
                { name: 'TCS', color: '#1A5B8C' },
                { name: 'INFOSYS', color: '#007CC3' },
                { name: 'DELL', color: '#007DB8' },
                { name: 'INTEL', color: '#0071C5' },
                { name: 'MICROSOFT', color: '#00A4EF' },
                { name: 'GOOGLE', color: '#4285F4' },
                { name: 'AMAZON', color: '#FF9900' },
                { name: 'TCS', color: '#1A5B8C' },
                { name: 'INFOSYS', color: '#007CC3' },
              ].map((l, i) => (
                <span key={i} className="pl-logo" style={{color: l.color}}>{l.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Placements;
