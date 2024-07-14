import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="about-us-page">
      <h1>About Us</h1>
      <section className="contact-info">
        <p>Phone: 123-456-7890</p>
        <p>Email: info@campersshop.com</p>
        <p>Address: 123 Camping St, Camp City, CA 12345</p>
      </section>
      <section className="map">{/* Embed Google Map */}</section>
      <section className="social-media">
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
      </section>
      <section className="mission-statement">
        <h2>Our Mission</h2>
        <p>To provide the best camping gear for all your outdoor adventures.</p>
      </section>
      <section className="team">
        <h2>Our Team</h2>
        {/* Add team members' photos and bios */}
      </section>
    </div>
  );
};

export default AboutUsPage;
