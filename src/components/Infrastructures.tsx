import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Infrastructures.css';

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  {
    src: '/ai_skills_laboratory.png',
    title: 'AI Skills Laboratory',
    tag: 'AI Research Lab'
  },
  {
    src: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/02.jpg',
    title: 'Brand Builder Studio',
    tag: 'Creative Sandbox'
  },
  {
    src: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/03.jpg',
    title: 'MAC Centre of Excellence',
    tag: 'Apple Authorized Training Center'
  },
  {
    src: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/04.jpg',
    title: 'Hybrid Learning Hub',
    tag: 'Classroom'
  },
  {
    src: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/05.jpg',
    title: 'R-FAB X STUDIO',
    tag: 'Robotics Experience'
  },
  {
    src: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/06.jpg',
    title: 'Experiential Learning Hub',
    tag: 'Innovation Hub'
  }
];

const Infrastructures: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.infra-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
    );
    gsap.fromTo('.infra-gallery-item',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: '.infra-gallery', start: 'top 85%' } }
    );
  }, { scope: ref });

  return (
    <section className="campus-section section-padding" id="campus" ref={ref}>
      <div className="container">
        <div className="infra-header">
          <h2 className="section-title">Campus & <span className="text-gradient">Infrastructure</span></h2>
          <p className="section-desc">A state-of-the-art ecosystem designed to inspire creativity and drive technological excellence.</p>
        </div>
        <div className="infra-gallery">
          {gallery.map((item, i) => (
            <div key={i} className="infra-gallery-item">
              <img src={item.src} alt={item.title} loading="lazy" />
              <div className="infra-hover-overlay">
                <span className="infra-item-tag">{item.tag}</span>
                <h4 className="infra-item-title">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infrastructures;
