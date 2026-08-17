import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faBolt,
  faBullseye,
  faChevronRight,
  faCode,
  faCogs,
  faGear,
  faIndustry,
  faLightbulb,
  faMicrochip,
  faPlay,
  faRobot,
  faSitemap,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import './Home.css'

export default function Home() {
  const [projects] = useState([
    {
      id: 1,
      title: 'Smart IoT Monitoring Suite',
      description: 'Connected sensing and cloud analytics for industrial environments.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
      category: 'IoT'
    },
    {
      id: 2,
      title: 'Industrial PLC Automation',
      description: 'Process control system built for precision, safety and throughput.',
      image:
        'https://images.unsplash.com/photo-1558494949cc5c7f5b0ca8d7d4dcdc6c2?auto=format&fit=crop&w=900&q=80',
      category: 'Automation'
    },
    {
      id: 3,
      title: 'Robotic Prototype Platform',
      description: 'Autonomous navigation and machine vision for field operations.',
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
      category: 'Robotics'
    }
  ])

  const [videos] = useState([
    {
      id: 1,
      title: 'Electronics Assembly Workflow',
      thumbnail:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 2,
      title: 'Automation System Demo',
      thumbnail:
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 3,
      title: 'Prototype Validation Lab',
      thumbnail:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80'
    }
  ])

  const [gallery] = useState([
    { id: 1, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
    { id: 2, image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80' },
    { id: 3, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80' },
    { id: 4, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80' },
    { id: 5, image: 'https://images.unsplash.com/photo-1558494949cc5c7f5b0ca8d7d4dcdc6c2?auto=format&fit=crop&w=800&q=80' },
    { id: 6, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' }
  ])

  const services = [
    {
      icon: faBolt,
      title: 'Electronics Product Development',
      description: 'From concept to prototype, we design practical electronic systems with reliability and manufacturing readiness.'
    },
    {
      icon: faCogs,
      title: 'Industrial Automation & PLC',
      description: 'Machine control, safety logic and smart process optimisation for modern production environments.'
    },
    {
      icon: faMicrochip,
      title: 'IoT & Embedded Systems',
      description: 'Connected devices, sensor networks and embedded intelligence built for real-world deployment.'
    },
    {
      icon: faRobot,
      title: 'Robotics',
      description: 'Autonomous and semi-autonomous robotics for inspection, motion control and intelligent workflows.'
    },
    {
      icon: faCode,
      title: 'PCB Design & Fabrication',
      description: 'Circuit design, PCB layout and hardware validation to ensure accurate, scalable solutions.'
    },
    {
      icon: faUsers,
      title: 'Training & Consultancy',
      description: 'Technical mentoring, engineering guidance and skill-building support for teams and institutions.'
    }
  ]

  const stats = [
    { value: '10+', label: 'Engineering Projects' },
    { value: '6+', label: 'Core Services' },
    { value: '5+', label: 'Technology Domains' },
    { value: '100%', label: 'Engineering Focus' }
  ]

  const processSteps = [
    { number: '01', title: 'Discover', description: 'Understand the problem and technical goal.' },
    { number: '02', title: 'Design', description: 'Develop the engineering solution and system architecture.' },
    { number: '03', title: 'Prototype', description: 'Build and validate practical hardware and logic prototypes.' },
    { number: '04', title: 'Test', description: 'Verify reliability, safety and performance before deployment.' },
    { number: '05', title: 'Deploy', description: 'Deliver the final working solution with support.' }
  ]

  const technologies = [
    {
      title: 'Microcontrollers',
      items: ['Arduino', 'ESP32', 'STM32']
    },
    {
      title: 'Automation',
      items: ['PLC', 'SCADA', 'HMI']
    },
    {
      title: 'Communication',
      items: ['MQTT', 'Modbus', 'CAN', 'Wi-Fi', 'Bluetooth']
    },
    {
      title: 'Design',
      items: ['PCB Design', 'Embedded C', 'CAD', 'Circuit Simulation']
    }
  ]

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">ENGINEERING • AUTOMATION • INNOVATION</div>
            <h1>
              IFTECLABS
              <span>Building intelligent engineering solutions for the real world.</span>
            </h1>
            <p>
              We design and develop electronics, automation, IoT, embedded systems and robotic solutions from concept to implementation.
            </p>

            <div className="hero-actions">
              <Link to="/enquiry" className="btn btn-primary">
                Start a Project
              </Link>
              <Link to="/services" className="btn btn-secondary">
                Explore Services
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-label="Engineering lab visual">
            <div className="lab-panel main-panel">
              <div className="panel-header">
                <span className="dot red" />
                <span className="dot amber" />
                <span className="dot green" />
              </div>
              <div className="panel-body">
                <div className="circuit-board">
                  <span className="trace trace-one" />
                  <span className="trace trace-two" />
                  <span className="trace trace-three" />
                  <span className="chip chip-one">
                    <FontAwesomeIcon icon={faMicrochip} />
                  </span>
                  <span className="chip chip-two">
                    <FontAwesomeIcon icon={faCogs} />
                  </span>
                </div>
              </div>
            </div>

            <div className="lab-card card-top">
              <FontAwesomeIcon icon={faIndustry} />
              <span>Automation</span>
            </div>
            <div className="lab-card card-bottom">
              <FontAwesomeIcon icon={faBolt} />
              <span>Electronics</span>
            </div>
          </div>
        </div>

        <div className="container stats-row">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block about-block">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="about-image-card">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80"
                alt="IFTECLABS engineering workspace"
              />
            </div>
          </div>

          <div className="about-copy">
            <div className="section-tag">About IFTECLABS</div>
            <h2>Engineering Ideas Into Real Solutions</h2>
            <p>
              IFTECLABS is an engineering and innovation laboratory focused on electronics, industrial automation, IoT, embedded systems, robotics and product development.
            </p>

            <div className="about-list">
              <div className="about-item">
                <span>01</span>
                <div>
                  <h3>Research & Development</h3>
                </div>
              </div>
              <div className="about-item">
                <span>02</span>
                <div>
                  <h3>Product Development</h3>
                </div>
              </div>
              <div className="about-item">
                <span>03</span>
                <div>
                  <h3>Industrial Automation</h3>
                </div>
              </div>
              <div className="about-item">
                <span>04</span>
                <div>
                  <h3>Technical Training</h3>
                </div>
              </div>
            </div>

            <Link to="/about" className="btn btn-primary large-action">
              Learn More About IFTECLABS
            </Link>
          </div>
        </div>
      </section>

      <section className="section-block services-block">
        <div className="container">
          <div className="section-heading">
            <div className="section-tag">What We Do</div>
            <h2>Engineering capabilities designed to turn ideas into working solutions.</h2>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={service.title} className="service-card">
                <div className="service-number">0{index + 1}</div>
                <div className="service-icon-wrap">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/services" className="card-link">
                  Learn More <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block process-block">
        <div className="container">
          <div className="section-heading centered">
            <div className="section-tag">Process</div>
            <h2>From Idea to Implementation</h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <div key={step.number} className="process-step">
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block projects-block">
        <div className="container">
          <div className="section-heading">
            <div className="section-tag">Featured Projects</div>
            <h2>Featured Engineering Projects</h2>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-image-wrap">
                  <img src={project.image} alt={project.title} />
                  <span className="project-badge">{project.category}</span>
                </div>
                <div className="project-content">
                  <span className="project-type">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <Link to={`/projects/${project.id}`} className="card-link">
                    View Project <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block tech-block">
        <div className="container">
          <div className="section-heading centered">
            <div className="section-tag">Technology Stack</div>
            <h2>Our Technology Stack</h2>
          </div>

          <div className="tech-grid">
            {technologies.map((group) => (
              <div key={group.title} className="tech-card">
                <h3>{group.title}</h3>
                <div className="badge-row">
                  {group.items.map((item) => (
                    <span key={item} className="tech-badge">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block gallery-block">
        <div className="container">
          <div className="section-heading gallery-heading">
            <div>
              <div className="section-tag">Inside IFTECLABS</div>
              <h2>Explore our workspace, prototypes and engineering activities.</h2>
            </div>
            <Link to="/gallery" className="inline-link">
              View Full Gallery <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </div>

          <div className="gallery-grid">
            {gallery.map((item) => (
              <div key={item.id} className="gallery-item">
                <img src={item.image} alt="Engineering gallery item" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="video-section">
        <div className="container video-layout">
          <div className="video-content">
            <div className="section-tag light">Videos</div>
            <h2>See Engineering In Action</h2>
            <p>
              Explore the systems, workshops and prototype work that define how IFTECLABS turns ideas into operational technology.
            </p>
            <Link to="/videos" className="btn btn-primary">
              Explore Videos
            </Link>
          </div>

          <div className="video-card-featured">
            <div className="video-poster">
              <div className="play-button-wrap">
                <FontAwesomeIcon icon={faPlay} />
              </div>
            </div>
            <div className="video-meta">
              <h3>IFTECLABS WORKSHOP</h3>
              <p>Prototype testing, electronics assembly and automation systems.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block cta-section">
        <div className="container cta-panel">
          <div>
            <div className="section-tag light">Training & Consultancy</div>
            <h2>Looking to Build Something?</h2>
            <p>
              Whether you are developing a prototype, automating a process, building an IoT solution or looking for technical training, let’s discuss your requirement.
            </p>
          </div>

          <div className="cta-actions">
            <Link to="/enquiry" className="btn btn-primary">
              Send Enquiry
            </Link>
            <Link to="/contact" className="btn btn-secondary light-variant">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
