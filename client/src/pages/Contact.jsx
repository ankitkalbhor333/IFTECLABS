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
      link: 'https://www.google.com/maps/place/IF-TECH+EMBEDDED+SYSTEMS/@23.2786731,77.3609952,201m/data=!3m1!1e3!4m6!3m5!1s0x397c67c154ef4591:0xcceaeed61f6441e3!8m2!3d23.2783754!4d77.3609269!16s%2Fg%2F11b8r6nbtc!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D'
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
              <a
                href="https://www.google.com/maps/place/IF-TECH+EMBEDDED+SYSTEMS/@23.2786731,77.3609952,201m/data=!3m1!1e3!4m6!3m5!1s0x397c67c154ef4591:0xcceaeed61f6441e3!8m2!3d23.2783754!4d77.3609269!16s%2Fg%2F11b8r6nbtc!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="map-link-wrapper"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div className="map-container">
                  <iframe
                    src="https://maps.google.com/maps?q=IF-TECH%20EMBEDDED%20SYSTEMS%20Bhopal&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '10px', pointerEvents: 'none' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </a>

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
