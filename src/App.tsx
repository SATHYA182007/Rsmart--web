import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AcademicWings from './components/AcademicWings';
import WhyRaiseSmart from './components/WhyRaiseSmart';
import Comparison from './components/Comparison';
import Placements from './components/Placements';
import S4S from './components/S4S';
import Infrastructures from './components/Infrastructures';
import Footer from './components/Footer';
import AnimatedStats from './components/AnimatedStats';
import CompanyMarquee from './components/CompanyMarquee';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useGSAP(() => {
    gsap.to('.scroll-progress', {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0.3 }
    });
  });

  return (
    <div className="app-container">
      <div className="scroll-progress" />
      <Header />
      <main>
        <Hero />
        <AnimatedStats />
        <WhyRaiseSmart />
        <AcademicWings />
        <CompanyMarquee />
        <Comparison />
        <Placements />
        <S4S />
        <Infrastructures />
      </main>
      <Footer />
    </div>
  );
};

export default App;
