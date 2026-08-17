import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faLightbulb, faUsers, faBolt, faAward, faRocket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  const values = [
    {
      icon: faLightbulb,
      title: 'Innovation',
      description: 'Continuous innovation in electronics, automation, and embedded systems'
    },
    {
      icon: faBullseye,
      title: 'Quality',
      description: 'High standards in design, development, and deployment of solutions'
    },
    {
      icon: faUsers,
      title: 'Collaboration',
      description: 'Working closely with clients to understand and deliver their vision'
    },
    {
      icon: faBolt,
      title: 'Reliability',
      description: 'Robust and dependable solutions that perform under demanding conditions'
    },
    {
      icon: faAward,
      title: 'Excellence',
      description: 'Commitment to technical excellence and professional service'
    },
    {
      icon: faRocket,
      title: 'Growth',
      description: 'Supporting innovation and growth in electronics and automation sectors'
    }
  ]

  const expertise = [
    'Electronics Product Design & Development',
    'Industrial Automation & PLC Programming',
    'IoT & Embedded Systems',
    'Robotics & Autonomous Systems',
    'PCB Design & Fabrication',
    'Microcontroller Programming',
    'Sensor Integration',
    'Control Systems',
    'Custom Hardware Solutions',
    'Technical Training & Consultancy'
  ]

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About IFTECLABS ORG</h1>
          <p>Electronics | Automation | Innovation Lab</p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="intro-section">
        <div className="container">
          <div className="intro-content">
            <div className="intro-text">
              <h2>Who We Are</h2>
              <p>
                IFTECLABS ORG is a dedicated innovation laboratory specializing in electronics, industrial automation, 
                IoT solutions, and robotics. We bridge the gap between cutting-edge technology and practical industrial applications.
              </p>
              <p>
                With a team of experienced engineers and innovators, we transform ideas into working solutions. 
                From concept to production, we provide end-to-end engineering services tailored to meet the unique 
                requirements of our clients.
              </p>
              <p>
                Whether you need custom electronics development, PLC-based automation, IoT integration, or robotics solutions, 
                we have the expertise and commitment to deliver excellence.
              </p>
            </div>
            <div className="intro-image">
              <div className="image-placeholder">
                <FontAwesomeIcon icon={faBolt} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-card">
            <div className="card-icon">
              <FontAwesomeIcon icon={faBullseye} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To engineer innovative, reliable, and sustainable solutions in electronics, automation, and IoT 
              that empower businesses and researchers to achieve their goals.
            </p>
          </div>
          <div className="mission-card">
            <div className="card-icon">
              <FontAwesomeIcon icon={faRocket} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To be a trusted partner in innovation, delivering world-class engineering solutions that drive 
              technological advancement in electronics and automation industries.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <p className="section-subtitle">What drives us every day</p>
          <div className="values-grid">
            {values.map((value, index) => {
              return (
                <div key={index} className="value-card">
                  <div className="value-icon">
                    <FontAwesomeIcon icon={value.icon} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="expertise-section">
        <div className="container">
          <h2>Our Expertise</h2>
          <p className="section-subtitle">Comprehensive range of services and solutions</p>
          <div className="expertise-grid">
            {expertise.map((exp, index) => (
              <div key={index} className="expertise-item">
                <div className="expertise-icon">✓</div>
                <span>{exp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation & R&D */}
      <section className="innovation-section">
        <div className="container">
          <h2>Innovation & R&D</h2>
          <p className="section-subtitle">Driving technological advancement</p>
          <div className="innovation-content">
            <div className="innovation-text">
              <p>
                We maintain a state-of-the-art innovation laboratory equipped with modern tools and technologies 
                for research, prototyping, and product development. Our dedicated R&D team continuously explores 
                emerging technologies and trends in electronics, automation, and IoT.
              </p>
              <ul className="innovation-list">
                <li>Advanced prototyping facilities</li>
                <li>Testing and validation equipment</li>
                <li>Simulation and design tools</li>
                <li>Embedded systems development kit</li>
                <li>Industrial automation simulators</li>
                <li>Robotics development platform</li>
              </ul>
            </div>
            <div className="innovation-image">
              <div className="image-placeholder">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Support */}
      <section className="training-section">
        <div className="container">
          <h2>Training & Technical Support</h2>
          <p className="section-subtitle">Building expertise in the next generation</p>
          <div className="training-grid">
            <div className="training-card">
              <h3>Hands-on Training Programs</h3>
              <p>Comprehensive training in electronics design, PLC programming, IoT development, and robotics for students and professionals.</p>
            </div>
            <div className="training-card">
              <h3>Project Guidance</h3>
              <p>Expert mentorship and guidance for academic and industrial projects from conceptualization to completion.</p>
            </div>
            <div className="training-card">
              <h3>Technical Consultancy</h3>
              <p>Professional consulting services for technology selection, system design, and implementation strategies.</p>
            </div>
            <div className="training-card">
              <h3>Workshop & Seminars</h3>
              <p>Regular workshops and seminars on emerging technologies, industry trends, and best practices in automation and IoT.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's collaborate and bring your ideas to life with innovative engineering solutions</p>
          <Link to="/enquiry" className="btn btn-primary btn-large">
            Send Your Enquiry
          </Link>
        </div>
      </section>
    </div>
  )
}
