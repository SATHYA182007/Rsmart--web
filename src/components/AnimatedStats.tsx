import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Award, Building2, Users } from 'lucide-react';
import './AnimatedStats.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: <TrendingUp size={20} />, value: 3, suffix: ' Cr+', label: 'Highest Package', prefix: '₹' },
  { icon: <Award size={20} />, value: 58, suffix: ' LPA', label: 'Avg Top Placement', prefix: '₹' },
  { icon: <Building2 size={20} />, value: 50, suffix: '+', label: 'Industry Partners', prefix: '' },
  { icon: <Users size={20} />, value: 2000, suffix: '+', label: 'Students Placed', prefix: '' },
];

const AnimatedStats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.stat-item', { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
    });

    stats.forEach((stat, index) => {
      const obj = { value: 0 };
      const el = document.getElementById(`stat-num-${index}`);
      if (el) {
        gsap.to(obj, {
          value: stat.value, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => {
            const formatted = stat.value >= 1000 ? Math.floor(obj.value).toLocaleString() : Math.floor(obj.value).toString();
            el.innerText = `${stat.prefix}${formatted}${stat.suffix}`;
          }
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="stats-strip" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon-wrap">{stat.icon}</div>
              <div className="stat-value" id={`stat-num-${index}`}>{stat.prefix}0{stat.suffix}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
