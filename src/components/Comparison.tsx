import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';
import './Comparison.css';

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  { aspect: 'Learning Approach', normal: 'Theory-heavy textbook learning', rsmart: 'Competency-based hands-on immersive learning from day one' },
  { aspect: 'Industry Exposure', normal: 'Limited to guest lectures & internships in final year', rsmart: 'Direct access to 50+ tech companies on campus from Semester 1' },
  { aspect: 'Projects', normal: 'Theoretical assignments & final-year projects only', rsmart: 'Build and deploy real technology solutions from Semester 1' },
  { aspect: 'Curriculum', normal: 'Outdated syllabus with slow updates', rsmart: 'Future-ready curriculum: AI, Cloud, Cyber, Data Science' },
  { aspect: 'Career Readiness', normal: 'Separate training & placement cell', rsmart: 'Professional readiness built into daily learning' },
];

const Comparison: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.wh-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    gsap.fromTo('.cmp-row', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: '.cmp-table', start: 'top 85%' } });
  }, { scope: sectionRef });

  return (
    <section className="why-section section-padding" id="comparison" ref={sectionRef}>
      <div className="container">
        <div className="wh-header">
          <h2 className="section-title">Why Raise Smart?</h2>
          <p className="section-desc">See how Raise Smart School transforms education compared to traditional college study.</p>
        </div>

        <div className="cmp-table">
          <div className="cmp-headers">
            <div className="cmp-aspect-head">Aspect</div>
            <div className="cmp-label cmp-normal-head"><X size={14} /> Normal College</div>
            <div className="cmp-label cmp-rsmart-head"><Check size={14} /> Raise Smart School</div>
          </div>
          {comparisons.map((row, i) => (
            <div key={i} className="cmp-row">
              <div className="cmp-aspect">{row.aspect}</div>
              <div className="cmp-cell cmp-normal">{row.normal}</div>
              <div className="cmp-cell cmp-rsmart">{row.rsmart}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comparison;