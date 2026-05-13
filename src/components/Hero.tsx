import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.hero-title-line span', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12 })
      .fromTo('.hero-tagline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.6')
      .fromTo('.hero-cta-box', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.6')
      .fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=1.5');

    gsap.to('.hero-bg-image', { scale: 1.05, scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-overlay', { opacity: 0.95, scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-text-content', { opacity: 0, y: -60, scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '40% top', scrub: true } });
  }, { scope: heroRef });

  return (
    <section className="hero-section" ref={heroRef}>
      <img
        src="https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/IT-park-1.jpg"
        alt="Rathinam College Campus"
        className="hero-bg-image"
      />
      <div className="hero-overlay" />
      <div className="hero-accent-shape" />
      <div className="container hero-content-wrapper">
        <div className="hero-text-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Rathinam Group of Institutions · Coimbatore
          </div>
          <div className="hero-pre-title">Learn. Build. Innovate.</div>
          <h1 className="hero-title-main">
            <span className="hero-title-line"><span>Don't Just Study</span></span>
            <span className="hero-title-line"><span className="text-highlight">Tech. Build It.</span></span>
          </h1>
          <p className="hero-tagline">
            At Raise Smart School of Technology, you don't just attend classes — you create projects, solve real problems, and become industry-ready.
          </p>
          <div className="hero-cta-box">
            <a href="#programmes" className="btn btn-primary">Enquire Now <Sparkles size={16} /></a>
            <a href="#why-raise-smart" className="btn btn-outline">Why Raise Smart <ArrowRight size={16} /></a>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
};

export default Hero;