import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Code, Globe, Cpu, Award, Briefcase, MapPin, Users, Monitor } from 'lucide-react';
import './WhyRaiseSmart.css';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: <Building2 size={22} />,
    title: 'IT Park Ecosystem',
    subtitle: 'Direct connection to real tech companies and startups',
    desc: 'Raise Smart features an Integrated IT Park that connects students directly with the tech ecosystem. Students work alongside startups, developers, and innovators, gaining practical exposure to real technology development environments.',
  },
  {
    icon: <Code size={22} />,
    title: 'Build From Day One',
    subtitle: 'Hands-on projects and real-world tech development',
    desc: 'From the first semester, students work on real-world projects, applications, and solutions, gaining hands-on experience that prepares them for real careers.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Global & Industry Exposure',
    subtitle: 'Learn from global experts and industry mentors',
    desc: 'Students interact with industry experts, global mentors, and technology leaders through workshops, guest sessions, and collaborative projects.',
  },
  {
    icon: <Cpu size={22} />,
    title: 'Future-Ready AI Curriculum',
    subtitle: 'AI-driven learning with modern technologies',
    desc: 'The curriculum focuses on AI, software engineering, emerging technologies, and innovation, ensuring students graduate with skills relevant to the fast-changing tech world.',
  },
  {
    icon: <Award size={22} />,
    title: 'Semester Skill Certification',
    subtitle: 'Earn certifications that validate real skills',
    desc: 'Every semester is aligned with industry-relevant certification programs. Students gain verified skills in programming, AI, cloud, and emerging technologies.',
  },
  {
    icon: <Briefcase size={22} />,
    title: 'Semester Industry Immersion',
    subtitle: 'Experience the industry every semester',
    desc: 'Each semester includes live projects, company interactions, and practical exposure to real workflows. This continuous immersion bridges the gap between academics and industry.',
  },
  {
    icon: <MapPin size={22} />,
    title: 'Field Exposure Programme',
    subtitle: 'Step outside the classroom into the real world',
    desc: 'Students participate in field visits to tech parks, companies, and innovation hubs, observing real operations and understanding how technology is implemented.',
  },
  {
    icon: <Users size={22} />,
    title: 'Outbound Leadership Training',
    subtitle: 'Build leadership beyond academics',
    desc: 'Through outbound training programs, students develop leadership, teamwork, and decision-making skills with real-world challenges and experiential learning sessions.',
  },
  {
    icon: <Monitor size={22} />,
    title: 'MacBook Neo',
    subtitle: 'Empowered with the right technology',
    desc: 'Students are equipped with high-performance MacBook devices to support their learning journey — from coding to design and AI development.',
  },
];

const WhyRaiseSmart: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.wrs-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    gsap.fromTo('.wrs-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: '.wrs-grid', start: 'top 85%' } });
  }, { scope: sectionRef });

  return (
    <section className="wrs-section section-padding" id="why-raise-smart" ref={sectionRef}>
      <div className="container">
        <div className="wrs-header">
          <h2 className="section-title">Why Raise Smart <span className="text-gradient">School of Technology?</span></h2>
          <p className="section-desc">Raise Smart is a competency-based learning ecosystem designed to transform students into career-ready technology professionals.</p>
        </div>
        <div className="wrs-grid">
          {benefits.map((b, i) => (
            <div key={i} className="wrs-card">
              <div className="wrs-icon-wrap">{b.icon}</div>
              <h3 className="wrs-title">{b.title}</h3>
              <p className="wrs-subtitle">{b.subtitle}</p>
              <p className="wrs-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRaiseSmart;