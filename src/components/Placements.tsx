import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowRight } from 'lucide-react';
import './Placements.css';

const LinkedinIcon = ({ size = 14, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

interface Student {
  name: string;
  package: string;
  packageSuffix?: string;
  company: string;
  companyColor: string;
  role: string;
  department: string;
  cardBg: string;
  image: string;
  logo: string;
  story: string;
  isHero?: boolean;
  linkedin: string;
}

const students: Student[] = [
  {
    name: 'K.B. Mohana Rajan',
    package: '₹3 CRORE',
    packageSuffix: 'Per Annum',
    company: 'Top MNC',
    companyColor: '#ef4444',
    role: 'Principal Systems Architect',
    department: 'Department of CSE',
    cardBg: '#ef4444',
    isHero: true,
    image: '/placements/clean_kb_mohana_rajan.png',
    logo: '/placements/logo_kb_mohana_rajan.png',
    story: 'Recruited directly to a major technology giant in Silicon Valley as a Principal Systems Architect, designing next-generation high-throughput database fabrics and distributed AI systems.',
    linkedin: 'https://www.linkedin.com/school/rathinamcollege/',
  },
  {
    name: 'Devi Sri S',
    package: '₹58 LPA',
    company: 'Palo Alto Networks',
    companyColor: '#e55a1c',
    role: 'Senior Cloud Security Architect',
    department: 'Department of ECE',
    cardBg: '#0ea5e9',
    image: '/placements/clean_devi_sri.png',
    logo: '/placements/logo_devi_sri.png',
    story: 'Joined the core infrastructure protection team at Palo Alto Networks, implementing machine-learning threat models for enterprise low-latency traffic security.',
    linkedin: 'https://www.linkedin.com/in/devi-sri-074508274/',
  },
  {
    name: 'Kanishka R',
    package: '₹57 LPA',
    company: 'Leora',
    companyColor: '#16a34a',
    role: 'User Cognitive Specialist',
    department: 'M.Sc. Psychology',
    cardBg: '#84cc16',
    image: '/placements/clean_kanishka.png',
    logo: '/placements/logo_kanishka.png',
    story: 'Applied cognitive psychology paradigms to interactive digital health platforms, scaling to over 5 million active users globally.',
    linkedin: 'https://www.linkedin.com/in/kanishka-r-5ba0421bb/',
  },
  {
    name: 'Aditya S',
    package: '₹45 LPA',
    company: 'Palo Alto Networks',
    companyColor: '#e55a1c',
    role: 'Systems Security Engineer',
    department: 'Department of CSE',
    cardBg: '#a21caf',
    image: '/placements/clean_aditya.png',
    logo: '/placements/logo_aditya.png',
    story: 'Integrated multi-agent defensive orchestrators inside enterprise cloud fabrics at Palo Alto Networks, reducing attack surface by 60%.',
    linkedin: 'https://www.linkedin.com/in/adithyahere/',
  },
  {
    name: 'Karthick Balashanmugam',
    package: '₹41 LPA',
    company: 'Autodesk',
    companyColor: '#000000',
    role: 'Platform Development Engineer',
    department: 'Department of CSE',
    cardBg: '#7c3aed',
    image: '/placements/clean_karthick.png',
    logo: '/placements/logo_karthick.png',
    story: 'Spearheaded web assemblies and high-performance visual processing engines for Autodesk cloud design packages, cutting render time by 45%.',
    linkedin: 'https://www.linkedin.com/in/karthick-balashanmugam-0ab069231/',
  },
  {
    name: 'R. Naveen Kumar',
    package: '₹35 LPA',
    company: 'ServiceNow',
    companyColor: '#0ea5e9',
    role: 'Lead Application Specialist',
    department: 'Department of AI&DS',
    cardBg: '#84cc16',
    image: '/placements/clean_naveen.png',
    logo: '/placements/logo_naveen.png',
    story: 'Engineered machine-learning pipelines to automate enterprise helpdesk ticket workflows, achieving 60% faster resolution rate.',
    linkedin: 'https://www.linkedin.com/school/rathinamcollege/',
  },
  {
    name: 'Pradeep J',
    package: '₹21 LPA',
    company: 'Juspay',
    companyColor: '#0f172a',
    role: 'Fintech Software Developer',
    department: 'Department of AI&DS',
    cardBg: '#0ea5e9',
    image: '/placements/clean_pradeep.png',
    logo: '/placements/logo_pradeep.png',
    story: 'Rebuilt payment gateway pipelines with high-concurrency architecture, reducing transaction failures by over 80%.',
    linkedin: 'https://www.linkedin.com/in/pradeep-j-linked-in/',
  },
  {
    name: 'Janani K',
    package: '₹10 LPA',
    company: 'Mr. Cooper',
    companyColor: '#dc2626',
    role: 'Software Systems Engineer',
    department: 'Department of ECE',
    cardBg: '#ef4444',
    image: '/placements/clean_janani.png',
    logo: '/placements/logo_janani.png',
    story: 'Built intelligent loan processing rules engines, increasing overall processing throughput by 35% across corporate customer portfolios.',
    linkedin: 'https://www.linkedin.com/in/janani-k-013803275/',
  },
];

const Placements: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useGSAP(() => {
    gsap.fromTo('.pl-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
    );
    gsap.fromTo('.pl-card',
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: 'power2.out', scrollTrigger: { trigger: '.pl-grid', start: 'top 85%' } }
    );
  }, { scope: sectionRef });

  return (
    <section className="placements-section section-padding" id="placements" ref={sectionRef}>
      <div className="container pl-container">

        {/* Section Header */}
        <div className="pl-header">
          <h2 className="section-title">Global Placement <span className="text-gradient">Records</span></h2>
          <p className="section-desc">Our students secure industry-defining career outcomes, breaking benchmarks with elite packages.</p>
        </div>

        {/* Student Grid */}
        <div className="pl-grid-wrapper">
          <div className="pl-grid-bg-text">PLACEMENTS</div>
          <div className="pl-grid">
            {students.map((s, i) => (
              <div
                key={i}
                className={`pl-card${s.isHero ? ' pl-card--hero' : ''}`}
                onClick={() => setSelectedStudent(s)}
              >
                {/* Portrait image with clean white background and overlay badge */}
                <div className="pl-card-photo">
                  <img src={s.image} alt={s.name} className="pl-card-img" />
                  <div className="pl-card-badge">
                    {s.package}
                  </div>
                </div>

                {/* Info strip */}
                <div className="pl-card-info">
                  <p className="pl-card-name">{s.name}</p>
                  <p className="pl-card-dept">{s.department}</p>
                  <div className="pl-card-logo-container">
                    <img src={s.logo} alt={s.company} className="pl-card-logo-img" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedStudent && (
          <div className="pl-modal-bg" onClick={() => setSelectedStudent(null)}>
            <div className="pl-modal" onClick={e => e.stopPropagation()}>
              <button className="pl-modal-close" onClick={() => setSelectedStudent(null)} aria-label="Close">
                <X size={16} />
              </button>

              <div className="pl-modal-inner">
                {/* Left — portrait */}
                <div className="pl-modal-left">
                  <img src={selectedStudent.image} alt={selectedStudent.name} className="pl-modal-portrait" />
                </div>

                {/* Right — details */}
                <div className="pl-modal-right">
                  <div className="pl-modal-logo-container">
                    <img src={selectedStudent.logo} alt={selectedStudent.company} className="pl-modal-logo-img" />
                  </div>
                  <h3 className="pl-modal-name">{selectedStudent.name}</h3>
                  <p className="pl-modal-role">{selectedStudent.role}</p>
                  <p className="pl-modal-dept">{selectedStudent.department}</p>

                  <div className="pl-modal-pkg-row">
                    <span className="pl-modal-pkg">
                      {selectedStudent.package}
                      {selectedStudent.packageSuffix && <small>{selectedStudent.packageSuffix}</small>}
                    </span>
                  </div>

                  <div className="pl-modal-divider" />
                  <p className="pl-modal-story">{selectedStudent.story}</p>

                  <div className="pl-modal-actions">
                    <a href="#contact" className="pl-modal-cta" onClick={() => setSelectedStudent(null)}>
                      Join Raise Smart <ArrowRight size={14} />
                    </a>
                    {selectedStudent.linkedin && (
                      <a href={selectedStudent.linkedin} target="_blank" rel="noopener noreferrer" className="pl-modal-linkedin-btn" title="LinkedIn Profile">
                        <LinkedinIcon size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Placements;
