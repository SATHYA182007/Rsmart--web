import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Code, Globe, Cpu, Award, Briefcase, MapPin, Users, Monitor } from 'lucide-react';
import './WhyRaiseSmart.css';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: <Building2 size={20} />,
    title: 'IT Park Ecosystem',
    subtitle: 'Direct connection to tech companies and startups.',
    bullets: [
      'Learning integrated with industry',
      'On-campus IT Park for direct ecosystem access',
      'Work alongside real startups and innovators'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'
  },
  {
    icon: <Code size={20} />,
    title: 'Build From Day One',
    subtitle: 'Hands-on tech development.',
    bullets: [
      'Project-driven learning from semester one',
      'Develop real applications and software systems',
      'Build a strong professional portfolio early'
    ],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop'
  },
  {
    icon: <Globe size={20} />,
    title: 'Global & Industry Exposure',
    subtitle: 'Learn from global experts.',
    bullets: [
      'Mentorship from tech leaders and entrepreneurs',
      'Engage in masterclasses and tech workshops',
      'Gain insights into global tech standards'
    ],
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    icon: <Cpu size={20} />,
    title: 'AI & Emerging Tech',
    subtitle: "Tomorrow's technologies, integrated today.",
    bullets: [
      'Curriculum focused on AI, ML, and Web3',
      'Learn modern software engineering and cloud',
      'Stay ahead with market-demanded skill modules'
    ],
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop'
  },
  {
    icon: <Award size={20} />,
    title: 'Skill Certification',
    subtitle: 'Earn industry-validated credentials.',
    bullets: [
      'Gain specialized technical certifications',
      'Master Cloud, AI, and Cybersecurity',
      'Boost your career profile every semester'
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop'
  },
  {
    icon: <Briefcase size={20} />,
    title: 'Industry Immersion',
    subtitle: 'Experience active engineering environments.',
    bullets: [
      'Bridge academic theory with corporate operations',
      'Solve live challenges and industry case studies',
      'Transition smoothly into professional workflows'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'
  },
  {
    icon: <MapPin size={20} />,
    title: 'Field Exposure',
    subtitle: 'Step outside into real tech operations.',
    bullets: [
      'Visits to tech hubs and data centers',
      'Observe real engineering and infrastructure',
      'Connect theories to real-world digital systems'
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop'
  },
  {
    icon: <Users size={20} />,
    title: 'Leadership Training',
    subtitle: 'Develop emotional intelligence and leadership.',
    bullets: [
      'Build problem-solving and strategic skills',
      'Outbound camps and team-based exercises',
      'Foster trust, soft skills, and character'
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    icon: <Monitor size={20} />,
    title: 'MacBook Neo',
    subtitle: 'Professional workstation gear.',
    bullets: [
      'Equipped with high-performance MacBooks',
      'Pre-loaded with essential developer tools',
      'Native speed for complex builds and AI'
    ],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop'
  }
];

const WhyRaiseSmart: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.wrs-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
    );
    gsap.fromTo('.wrs-grid-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: '.wrs-grid-container', start: 'top 85%' } }
    );
  }, { scope: sectionRef });

  return (
    <section className="wrs-section section-padding" id="why-raise-smart" ref={sectionRef}>
      <div className="container wrs-layout-container">
        <div className="wrs-header">
          <h2 className="section-title">Why Raise Smart <span className="text-gradient">School of Technology?</span></h2>
          <div className="wrs-title-indicator-line">
            <span className="dot pink"></span>
            <span className="dot red"></span>
            <span className="dot orange"></span>
            <span className="line"></span>
          </div>
        </div>

        {/* Grid Container */}
        <div className="wrs-grid-container">
          {benefits.map((b, idx) => (
            <div key={idx} className="wrs-grid-card" style={{ backgroundImage: `url(${b.image})` }}>
              <div className="wrs-grid-overlay"></div>
              
              <div className="wrs-grid-content">
                <div className="wrs-grid-icon-badge">{b.icon}</div>
                <h3 className="wrs-grid-title">{b.title}</h3>
                <p className="wrs-grid-subtitle">{b.subtitle}</p>
                
                <ul className="wrs-grid-bullets">
                  {b.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="wrs-grid-bullet-item">
                      <span className="wrs-bullet-dot"></span>
                      <span className="wrs-grid-bullet-text">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRaiseSmart;