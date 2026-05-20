import React from 'react';
import { Globe, MessageCircle, Camera, Briefcase, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="main-footer" id="contact">
    <div className="container">
      <div className="ft-top">
        <div className="ft-brand">
          <h2 className="ft-logo">RAISE SMART</h2>
          <p className="ft-mission">Dedicated to delivering excellence in technology education and bridging the gap between academic learning and industry requirements.</p>
          <div className="ft-social">
            {[Globe, MessageCircle, Camera, Briefcase].map((Icon, i) => (
              <a key={i} href="#"><Icon size={15} /></a>
            ))}
          </div>
        </div>
        <div className="ft-links">
          <div className="ft-col">
            <h3>Academics</h3>
            <ul>
              <li><a href="#programmes">Undergraduate</a></li>
              <li><a href="#programmes">Postgraduate</a></li>
              <li><a href="#programmes">Engineering</a></li>
              <li><a href="#comparison">Why Us</a></li>
            </ul>
          </div>
          <div className="ft-col">
            <h3>Contact</h3>
            <ul className="ft-contact">
              <li><MapPin size={13} /><span>Rathinam IT Park, Eachanari, Coimbatore – 641021</span></li>
              <li><Phone size={13} /><span>+91 766 910 9660</span></li>
              <li><Mail size={13} /><span>admissions@rsmartedu.in</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ft-bottom">
        <div>&copy; {new Date().getFullYear()} Raise Smart School of Technology. Part of Rathinam Group.</div>
        <div className="ft-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
