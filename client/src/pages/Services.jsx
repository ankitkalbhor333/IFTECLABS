import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faGear, faMicrochip, faBullseye, faLightbulb, faUsers, faArrowRight, faChevronDown, faChevronUp, faMobileScreenButton } from '@fortawesome/free-solid-svg-icons'
import './Services.css'

export default function Services() {
  const [expandedService, setExpandedService] = useState(null)

  const services = [
    {
      id: 1,
      icon: faBolt,
      title: 'Electronics Product Development',
      shortDesc: 'Custom hardware design and prototyping',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
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
    },
    {
      id: 7,
      icon: faMobileScreenButton,
      title: 'Connect Bluetooth Service',
      shortDesc: 'Serial Bluetooth communication and monitoring',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&auto=format&fit=crop&q=80',
      fullDesc: 'We integrate secure, high-speed Bluetooth Classic and BLE communication capabilities into custom hardware designs. For testing serial data over Bluetooth with our systems, we utilize and recommend the Serial Bluetooth Terminal app.',
      features: [
        'Custom BLE GATT profiles',
        'Serial data logging and terminal debugging',
        'Mobile app integration and configuration utilities',
        'Bluetooth Classic Serial interface setup'
      ],
      technologies: ['ESP32 Classic / BLE', 'HC-05 Modules', 'Serial Bluetooth Terminal App', 'UART Serial Protocol'],
      appLink: 'https://play.google.com/store/apps/details?id=de.kai_morich.serial_bluetooth_terminal'
    }
  ]

  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id)
  }

  return (
    <div className="services">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container services-hero-grid">
          <div className="services-hero-copy">
            <span className="services-eyebrow">WHAT WE BUILD</span>
            <h1>Our Engineering Capabilities</h1>
            <p>
              We design and develop electronics, industrial automation, IoT, embedded systems and robotic solutions from concept to implementation.
            </p>
            <div className="services-hero-features">
              <div className="hero-feature-item">
                <span className="feature-icon-dot">✓</span>
                <span>Production-Ready PCBs</span>
              </div>
              <div className="hero-feature-item">
                <span className="feature-icon-dot">✓</span>
                <span>PLC & Industrial Automation</span>
              </div>
              <div className="hero-feature-item">
                <span className="feature-icon-dot">✓</span>
                <span>Wireless & IoT Integration</span>
              </div>
            </div>
          </div>
          <div className="services-hero-visual">
            <div className="collage-container">
              <div className="collage-card collage-main">
                <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&auto=format&fit=crop&q=80" alt="Electronics Testing" />
                <span className="collage-label">Electronics R&D</span>
              </div>
              <div className="collage-card collage-sub-one">
                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&auto=format&fit=crop&q=80" alt="Industrial Control" />
                <span className="collage-label">Automation</span>
              </div>
              <div className="collage-card collage-sub-two">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80" alt="IoT Chip" />
                <span className="collage-label">IoT Connectivity</span>
              </div>
            </div>
          </div>
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

                      <div className="service-cta" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Link to="/enquiry" className="btn btn-primary">
                          Get Started <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                        {service.appLink && (
                          <a
                            href={service.appLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                          >
                            Download Bluetooth App
                          </a>
                        )}
                        <p style={{ margin: 0 }}>Interested in this service? Send us an enquiry today!</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Cards Grid View */}
      <section className="services-grid-section">
        <div className="container">
          <h2>Quick Service Overview</h2>
          <div className="services-grid">
            {services.map((service) => {
              return (
                <div key={service.id} className="service-card-grid">
                  <div className="service-card-image">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className="service-card-content">
                    <div className="card-icon">
                      <FontAwesomeIcon icon={service.icon} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.shortDesc}</p>
                    <Link to="/enquiry" className="card-link">
                      Learn More <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
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
