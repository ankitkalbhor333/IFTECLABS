import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faGithub,
  faLinkedin,
  faYoutube,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'

import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Videos', path: '/videos' },
    { label: 'Enquiry', path: '/enquiry' },
    { label: 'Contact', path: '/contact' },
  ]

  const services = [
    'Electronics Product Development',
    'Industrial Automation & PLC',
    'IoT & Embedded Systems',
    'Robotics',
    'PCB Design & Fabrication',
    'Training & Consultancy',
    'Connect Bluetooth Service',
  ]

  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <h3>IFTECLABS ORG</h3>

          <p>Electronics | Automation | Innovation Lab</p>

          <p className="tagline">
            Engineering innovative solutions in electronics,
            automation, IoT and robotics.
          </p>

          <div style={{ marginTop: '12px' }}>
            <a 
              href="https://play.google.com/store/apps/details?id=de.kai_morich.serial_bluetooth_terminal"
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '0.82rem', color: 'var(--accent-light)', fontWeight: '600', textDecoration: 'underline' }}
            >
              📥 Serial Bluetooth Terminal App
            </a>
          </div>

          {/* Social Links */}
          <div className="social-links">

            <a
              href="#"
              className="social-icon"
              title="LinkedIn"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>

            <a
              href="#"
              className="social-icon"
              title="YouTube"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>

            <a
              href="#"
              className="social-icon"
              title="X / Twitter"
              aria-label="X / Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>

            <a
              href="#"
              className="social-icon"
              title="GitHub"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>

          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>

          <ul className="footer-links">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4>Our Services</h4>

          <ul className="footer-links">
            {services.map((service) => (
              <li key={service}>
                <Link to="/services">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section footer-contact">
          <h4>Get In Touch</h4>

          <div className="contact-item">
            <FontAwesomeIcon icon={faLocationDot} />

            <div>
              <p>A-163 Indra Vihar, Airport Road</p>
              <p>Bhopal, M.P. – 462030</p>
            </div>
          </div>

          <div className="contact-item">
            <FontAwesomeIcon icon={faPhone} />

            <a href="tel:+919826588782">
              +91 98265 88782
            </a>
          </div>

          <div className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} />

            <a href="mailto:iftechsystems@gmail.com">
              iftechsystems@gmail.com
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            &copy; {currentYear} IFTECLABS ORG. All Rights Reserved.
          </p>

          <div className="footer-bottom-links">

            <a
              href="https://play.google.com/store/apps/details?id=de.kai_morich.serial_bluetooth_terminal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bluetooth Terminal App
            </a>

            <span>•</span>

            <Link to="/privacy">
              Privacy Policy
            </Link>

            <span>•</span>

            <Link to="/terms">
              Terms &amp; Conditions
            </Link>

            <span>•</span>

            <Link to="/disclaimer">
              Disclaimer
            </Link>

          </div>
        </div>
      </div>
    </footer>
  )
}