import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faGear, faMicrochip, faBullseye, faLightbulb, faUsers, faArrowRight, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import './Services.css'

export default function Services() {
  const [expandedService, setExpandedService] = useState(null)

  const services = [
    {
      id: 1,
      icon: faBolt,
      title: 'Electronics Product Development',
      shortDesc: 'Custom hardware design and prototyping',
      fullDesc: 'From concept to production, we develop custom electronic products tailored to your requirements. Our expertise spans schematic design, PCB layout, component selection, and prototype development.',
      features: [
        'Schematic Design & Simulation',
        'PCB Layout & Design',
        'Component Selection & Sourcing',
        'Prototype Development',
        'Testing & Validation',
        'Production Ready Design'
      ],
      technologies: ['KiCad', 'Altium Designer', 'SPICE Simulation', 'Arduino', 'STM32', 'Various Microcontrollers']
    },
    {
      id: 2,
      icon: faGear,
      title: 'Industrial Automation & PLC',
      shortDesc: 'Manufacturing control systems',
      fullDesc: 'We design and implement industrial automation solutions using PLC programming, SCADA systems, and control logic for manufacturing and process automation.',
      features: [
        'PLC Programming (Ladder Logic, Structured Text)',
        'SCADA System Design',
        'Human-Machine Interface (HMI)',
        'Process Automation',
        'Safety Systems Integration',
        'System Testing & Commissioning'
      ],
      technologies: ['Siemens PLC', 'Allen-Bradley', 'Mitsubishi', 'Python', 'Modbus', 'Industrial Protocols']
    },
    {
      id: 3,
      icon: faMicrochip,
      title: 'IoT & Embedded Systems',
      shortDesc: 'Smart connected devices',
      fullDesc: 'Develop IoT solutions and embedded systems that connect, monitor, and control devices remotely with cloud integration and real-time data processing.',
      features: [
        'IoT Device Development',
        'Sensor Integration',
        'Wireless Communication (WiFi, Bluetooth, LoRaWAN)',
        'Cloud Integration',
        'Real-time Data Processing',
        'Mobile App Integration'
      ],
      technologies: ['ESP32', 'Arduino', 'Raspberry Pi', 'MQTT', 'AWS IoT', 'Azure IoT', 'Node.js']
    },
    {
      id: 4,
      icon: faBullseye,
      title: 'Robotics',
      shortDesc: 'Autonomous systems and robotics',
      fullDesc: 'Design and develop robotic systems for automation, manipulation, and autonomous navigation with advanced control algorithms.',
      features: [
        'Robot Design & Kinematics',
        'Motion Planning & Control',
        'Autonomous Navigation',
        'Computer Vision Integration',
        'ROS (Robot Operating System)',
        'Testing & Deployment'
      ],
      technologies: ['ROS', 'OpenCV', 'Python', 'C++', 'Servos & Motors', 'Sensors', 'Arduino/Raspberry Pi']
    },
    {
      id: 5,
      icon: faLightbulb,
      title: 'PCB Design & Fabrication',
      shortDesc: 'Circuit board manufacturing',
      fullDesc: 'Professional PCB design services from single-layer to multi-layer boards with support for high-speed and RF applications.',
      features: [
        'Schematic to PCB Design',
        'Multi-layer Board Design',
        'High-Speed & RF Design',
        'Component Placement Optimization',
        'Manufacturing File Preparation',
        'Quality Assurance'
      ],
      technologies: ['KiCad', 'Altium Designer', 'CAM Software', 'Manufacturing Standards', 'Assembly Support']
    },
    {
      id: 6,
      icon: faUsers,
      title: 'Training & Consultancy',
      shortDesc: 'Technical expertise and guidance',
      fullDesc: 'Comprehensive technical training programs and consultancy services for individuals, students, and organizations.',
      features: [
        'Hands-on Technical Training',
        'Project-based Learning',
        'Technology Consultancy',
        'System Design Guidance',
        'Best Practices Implementation',
        'Workshop & Seminars'
      ],
      technologies: ['Electronics', 'Automation', 'IoT', 'Robotics', 'Programming', 'System Design']
    }
  ]

  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id)
  }

  return (
    <div className="services">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive electronics, automation, and IoT solutions</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <h2>What We Offer</h2>
          <p className="section-subtitle">Innovative solutions for electronics, automation, and beyond</p>
          
          <div className="services-list">
            {services.map((service) => {
              const isExpanded = expandedService === service.id
              
              return (
                <div key={service.id} className={`service-item ${isExpanded ? 'expanded' : ''}`}>
                  <div 
                    className="service-header"
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="service-icon-box">
                      <FontAwesomeIcon icon={service.icon} />
                    </div>
                    <div className="service-title-section">
                      <h3>{service.title}</h3>
                      <p className="service-short-desc">{service.shortDesc}</p>
                    </div>
                    <div className="service-toggle">
                      {isExpanded ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="service-details">
                      <p className="service-full-desc">{service.fullDesc}</p>
                      
                      <div className="service-features-section">
                        <h4>Key Features:</h4>
                        <ul className="features-list">
                          {service.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="service-tech-section">
                        <h4>Technologies & Tools:</h4>
                        <div className="tech-tags">
                          {service.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="service-cta">
                        <Link to="/enquiry" className="btn btn-primary">
                          Get Started <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                        <p>Interested in this service? Send us an enquiry today!</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Cards Grid View (Optional) */}
      <section className="services-grid-section">
        <div className="container">
          <h2>Quick Service Overview</h2>
          <div className="services-grid">
            {services.map((service) => {
              return (
                <div key={service.id} className="service-card-grid">
                  <div className="card-icon">
                    <FontAwesomeIcon icon={service.icon} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.shortDesc}</p>
                  <Link to="/enquiry" className="card-link">
                    Learn More <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Our Services */}
      <section className="why-services">
        <div className="container">
          <h2>Why Choose Our Services</h2>
          <div className="why-grid">
            <div className="why-card">
              <h3>Expert Team</h3>
              <p>Experienced engineers with years of expertise in electronics, automation, and IoT.</p>
            </div>
            <div className="why-card">
              <h3>End-to-End Solutions</h3>
              <p>From design and development to testing, deployment, and support.</p>
            </div>
            <div className="why-card">
              <h3>Customization</h3>
              <p>Tailored solutions that fit your specific requirements and budget.</p>
            </div>
            <div className="why-card">
              <h3>Quality Assured</h3>
              <p>Rigorous testing and quality assurance at every stage of development.</p>
            </div>
            <div className="why-card">
              <h3>On-time Delivery</h3>
              <p>Committed to meeting deadlines and milestones consistently.</p>
            </div>
            <div className="why-card">
              <h3>Post-Delivery Support</h3>
              <p>Comprehensive support and maintenance after project delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today to discuss your requirements and get a customized solution</p>
          <Link to="/enquiry" className="btn btn-primary btn-large">
            Send Your Enquiry
          </Link>
        </div>
      </section>
    </div>
  )
}
