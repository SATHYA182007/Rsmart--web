import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Infrastructures.css';

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/01.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/02.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/03.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/04.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/05.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/06.jpg',
];

const Infrastructures: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.infra-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: 'top 80%' } });
    gsap.fromTo('.infra-gallery-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: '.infra-gallery', start: 'top 85%' } });
  }, { scope: ref });

  return (
    <section className="campus-section section-padding" id="campus" ref={ref}>
      <div className="container">
        <div className="infra-header">
          <h2 className="section-title">Campus & <span className="text-gradient">Infrastructure</span></h2>
          <p className="section-desc">A state-of-the-art ecosystem designed to inspire creativity and drive technological excellence.</p>
        </div>
        <div className="infra-gallery">
          {gallery.map((src, i) => (
            <div key={i} className="infra-gallery-item">
              <img src={src} alt={`Campus ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infrastructures;
