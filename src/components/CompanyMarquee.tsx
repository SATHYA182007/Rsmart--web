import React from 'react';
import './CompanyMarquee.css';

const companies = [
  { name: 'Accenture', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Accenture-logo.png' },
  { name: 'Cognizant', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/cognizant.png' },
  { name: 'TCS', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Tata_Consultancy_Services_Logo.svg.png' },
  { name: 'Infosys', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Infosys_logo.svg.png' },
  { name: 'Deloitte', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Deloitte-logo.png' },
  { name: 'ServiceNow', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/ServiceNow-Logo.png' },
  { name: 'Microsoft', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/download-1.png' },
  { name: 'Amazon', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/download-1-1.png' },
  { name: 'Google', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/download-2.png' },
  { name: 'Dell', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/download-5.png' },
  { name: 'Intel', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/download-1-2.png' },
  { name: 'Qualitest', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Qualitest-R-TM_Blue-.png' },
  { name: 'Sutherland', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/sutherland-global-services-vector-logo.png' },
  { name: 'CSS Corp', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/CSS_Corp_logo.svg.png' },
  { name: 'Claysys', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/claysys-logo.png' },
  { name: 'Cloud Destinations', logo: 'https://rsmart2.rankuhigher.com/wp-content/uploads/2026/03/Cloud-Destinations-logo.png' },
];

const CompanyMarquee: React.FC = () => {
  return (
    <section className="company-marquee-section">
      <div className="container">
        <div className="cm-header">
          <h3>Our Placement Partners</h3>
        </div>
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...companies, ...companies].map((c, i) => (
            <div className="marquee-item" key={i}>
              <img src={c.logo} alt={c.name} className="company-logo-img" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyMarquee;
