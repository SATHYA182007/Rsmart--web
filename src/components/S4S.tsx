import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, MessageSquare, Users, Target, Globe } from 'lucide-react';
import './S4S.css';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/1d868436-bab4-4732-b20b-2f6be7c25ed8.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/2b355402-ed0d-46fb-86f3-028b010eb718.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/50b318d4-b623-4ce4-afe4-cfee12eafaa8.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/ab4a6008-48e1-4880-8f5e-29233545bdc9.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/5961d84b-8606-442f-b9bc-7416763f0ea6.jpg',
  'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/06.jpg',
];

const benefits = [
  { icon: <Users size={18} />, text: 'Peer-to-peer learning' },
  { icon: <Target size={18} />, text: 'Leadership development' },
  { icon: <Globe size={18} />, text: 'Industry exposure' },
  { icon: <Code size={18} />, text: 'Technical excellence' },
  { icon: <MessageSquare size={18} />, text: 'Collaborative growth' },
];

const S4S: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.s4s-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    gsap.fromTo('.s4s-benefit', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: '.s4s-benefits', start: 'top 85%' } });
    gsap.fromTo('.s4s-slider-wrapper', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: '.s4s-slider-wrapper', start: 'top 80%' } });
    gsap.fromTo('.s4s-wing', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: '.s4s-wings', start: 'top 85%' } });
  }, { scope: sectionRef });

  return (
    <section className="s4s-section section-padding" id="s4s-community" ref={sectionRef}>
      <div className="container">
        <div className="s4s-header">
          <h2 className="section-title">Students for <span className="text-gradient">Students</span> <span className="s4s-brackets">(S4S)</span></h2>
          <p className="s4s-desc">
            Students for Students (S4S) is a student-led platform designed to create a culture of shared learning, leadership, and innovation on campus. Built on the belief that when students learn from students, growth multiplies, S4S ensures that every opportunity becomes a learning experience for the entire student community.
          </p>
        </div>

        <div className="s4s-row">
          <div className="s4s-left">
            <h3 className="s4s-promotes-title">S4S promotes</h3>
            <div className="s4s-benefits">
              {benefits.map((b, i) => (
                <div key={i} className="s4s-benefit">
                  <span className="s4s-benefit-icon">{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="s4s-slider-wrapper">
            {slides.map((src, i) => (
              <img key={i} src={src} alt={`Student Life ${i + 1}`} className={`s4s-slide ${i === activeSlide ? 'active' : ''}`} loading="lazy" />
            ))}
            <div className="s4s-slide-dots">
              {slides.map((_, i) => (
                <button key={i} className={`s4s-dot ${i === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(i)} />
              ))}
            </div>
          </div>
        </div>

        <div className="s4s-wings-label">
          <span>WING 1</span>
          <span>WING 2</span>
        </div>

        <div className="s4s-wings">
          <div className="s4s-wing">
            <div className="s4s-wing-content">
              <h3>CRAFT <span className="wing-sub">— Career Readiness and Future Technology</span></h3>
              <p className="wing-objective">Objective: To prepare students for future careers by developing technical competence, innovation skills, and real-world problem-solving abilities.</p>
              <ul>
                <li>Hackathons and technical competitions</li>
                <li>Project presentations and innovation challenges</li>
                <li>Emerging technologies</li>
                <li>Skill-building workshops</li>
                <li>Knowledge-sharing sessions</li>
              </ul>
            </div>
            <img src="https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Media-1.jpg-1024x1024.jpeg" alt="CRAFT Wing" className="s4s-wing-img" loading="lazy" />
          </div>
          <div className="s4s-wing">
            <div className="s4s-wing-content">
              <h3>AITED <span className="wing-sub">— AI Tools Exploration & Development</span></h3>
              <p className="wing-objective">Objective: To empower students with hands-on experience in Artificial Intelligence, exploring modern tools and emerging technological trends.</p>
              <ul>
                <li>AI tool experimentation</li>
                <li>Prompt engineering workshops</li>
                <li>Emerging tech trends</li>
                <li>Machine learning basics</li>
                <li>AI-driven problem solving</li>
              </ul>
            </div>
            <img src="/ai_skills_laboratory.png" alt="AITED Wing" className="s4s-wing-img" style={{ objectFit: 'contain', padding: '40px', backgroundColor: '#050505' }} loading="lazy" />
          </div>
        </div>

        <div className="s4s-platforms-header">
          <h2 className="section-title">Our Innovation <span className="text-gradient">Platforms</span></h2>
        </div>

        <div className="s4s-platforms">
          <div className="s4s-platform">
            <div className="s4s-platform-icon">
              <img src="https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/ai.png" alt="AITED" />
            </div>
            <div className="s4s-platform-content">
              <h3>AITED <span className="platform-sub">— AI Tools Exploration & Development</span></h3>
              <p>Students explore Artificial Intelligence tools and emerging technologies, experiment with modern platforms, and stay updated with technological trends.</p>
            </div>
          </div>
          <div className="s4s-platform">
            <div className="s4s-platform-icon">
              <img src="https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/conversation.png" alt="Pro Power Talks" />
            </div>
            <div className="s4s-platform-content">
              <h3>Pro Power Talks <span className="platform-sub">— Industry Interaction (Biweekly Sessions)</span></h3>
              <p>Industry professionals interact directly with students, sharing real-world insights, career guidance, and exposure to current market demands.</p>
            </div>
          </div>
          <div className="s4s-platform">
            <div className="s4s-platform-icon">
              <img src="https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/solution.png" alt="Peer Power Hive" />
            </div>
            <div className="s4s-platform-content">
              <h3>Peer Power Hive <span className="platform-sub">— Interest-Based Innovation Teams</span></h3>
              <p>Students form teams based on common interests such as Game Design, Game Development, Web Development, and Mobile App Development. They engage in focused evening sessions, exploring the latest tools under faculty mentorship.</p>
            </div>
          </div>
          <div className="s4s-platform">
            <div className="s4s-platform-icon">
              <img src="https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/classroom.png" alt="Peer Power Talks" />
            </div>
            <div className="s4s-platform-content">
              <h3>Peer Power Talks <span className="platform-sub">— Students Empowering Students</span></h3>
              <p>Students share their knowledge, competition experiences, and new learnings with peers, strengthening communication and collaborative learning.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default S4S;
