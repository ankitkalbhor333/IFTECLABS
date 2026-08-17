import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faLocationDot, faComment, faClock, faGlobe } from '@fortawesome/free-solid-svg-icons'
import './Contact.css'

export default function Contact() {
  const contactInfo = [
    {
      icon: faPhone,
      title: 'Phone',
      value: '+91 98265 88782',
      link: 'tel:+919826588782'
    },
    {
      icon: faEnvelope,
      title: 'Email',
      value: 'iftechsystems@gmail.com',
      link: 'mailto:iftechsystems@gmail.com'
    },
    {
      icon: faLocationDot,
      title: 'Address',
      value: 'A-163 Indra Vihar, Airport Road, Bhopal, M.P. – 462030',
      link: 'https://maps.google.com/?q=A-163+Indra+Vihar+Airport+Road+Bhopal'
    }
  ]

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ]

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Have any questions? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            {/* Left - Contact Info */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              <p className="section-subtitle">Reach out to us through any of these channels</p>

              <div className="contact-items">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item"
                  >
                    <div className="contact-icon">
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <div className="contact-text">
                      <h3>{item.title}</h3>
                      <p>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Links */}
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <a href="tel:+919826588782" className="action-btn call-btn">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>Call Now</span>
                  </a>
                  <a href="https://wa.me/919826588782" target="_blank" rel="noopener noreferrer" className="action-btn whatsapp-btn">
                    <FontAwesomeIcon icon={faComment} />
                    <span>WhatsApp</span>
                  </a>
                  <a href="mailto:iftechsystems@gmail.com" className="action-btn email-btn">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="business-hours">
                <h3>
                  <FontAwesomeIcon icon={faClock} />
                  Business Hours
                </h3>
                <div className="hours-list">
                  {businessHours.map((item, index) => (
                    <div key={index} className="hour-item">
                      <span className="day">{item.day}</span>
                      <span className="time">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Follow Us */}
              <div className="follow-us">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" title="Facebook">f</a>
                  <a href="#" title="Twitter">𝕏</a>
                  <a href="#" title="LinkedIn">in</a>
                  <a href="#" title="YouTube">▶</a>
                  <a href="#" title="Instagram">📷</a>
                </div>
              </div>
            </div>

            {/* Right - Map & Message */}
            <div className="contact-right">
              {/* Map */}
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.2543968419297!2d77.34651287459154!3d23.158946211256923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sA-163%20Indra%20Vihar%2C%20Airport%20Road%2C%20Bhopal!5e0!3m2!1sen!2sin!4v1699526826000"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '10px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Simple Message */}
              <div className="info-box">
                <FontAwesomeIcon icon={faGlobe} />
                <h3>Online Support</h3>
                <p>We're available online to answer your queries and help you get started with your project.</p>
                <a href="/enquiry" className="link-btn">Submit an Enquiry →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's collaborate and create something amazing together</p>
          <div className="cta-buttons">
            <a href="/enquiry" className="btn btn-primary">Send Enquiry</a>
            <a href="tel:+919826588782" className="btn btn-secondary">Call Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
