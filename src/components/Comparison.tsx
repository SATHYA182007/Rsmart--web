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
    gsap.fromTo('.cmp-aspect-cell', { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: '.cmp-grid', start: 'top 85%' } });
    gsap.fromTo('.cmp-rsmart-cell', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: '.cmp-grid', start: 'top 85%' } });
    gsap.fromTo('.cmp-normal-cell', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: '.cmp-grid', start: 'top 85%' } });
  }, { scope: sectionRef });

  return (
    <section className="why-section section-padding" id="comparison" ref={sectionRef}>
      <div className="container">
        <div className="wh-header">
          <h2 className="section-title">Why Raise Smart?</h2>
          <p className="section-desc">See how Raise Smart School transforms education compared to traditional college study.</p>
        </div>

        <div className="cmp-table-wrapper">
          <div className="cmp-grid">
            {/* Header row */}
            <div className="cmp-row cmp-row--header">
              <div className="cmp-aspect-cell cmp-aspect-cell--empty"></div>
              <div className="cmp-rsmart-cell cmp-rsmart-cell--header">
                <span className="cmp-card-tag">Advantage</span>
                <h4 className="cmp-card-title">Raise Smart School</h4>
              </div>
              <div className="cmp-normal-cell cmp-normal-cell--header">
                <span className="cmp-card-tag">Traditional Education</span>
                <h4 className="cmp-card-title">Normal College</h4>
              </div>
            </div>

            {/* Data rows */}
            {comparisons.map((row, i) => (
              <div key={i} className="cmp-row">
                <div className="cmp-aspect-cell">
                  <span className="cmp-aspect-bullet"></span>
                  {row.aspect}
                </div>
                <div className="cmp-rsmart-cell">
                  <div className="cmp-icon-wrapper cmp-icon-wrapper--check">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="cmp-text">{row.rsmart}</span>
                </div>
                <div className="cmp-normal-cell">
                  <div className="cmp-icon-wrapper cmp-icon-wrapper--x">
                    <X size={12} strokeWidth={3} />
                  </div>
                  <span className="cmp-text">{row.normal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;