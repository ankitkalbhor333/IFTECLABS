import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './ProjectDetails.css'

export default function ProjectDetails() {
  const { slug } = useParams()

  // Sample projects data - in real app, this would come from API
  const projectsData = {
    'smart-irrigation': {
      id: 1,
      title: 'Smart Irrigation System',
      category: 'IoT',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop',
      description: 'IoT-based automated irrigation system for agricultural fields',
      fullDescription: 'A comprehensive IoT solution designed for modern agriculture. This smart irrigation system uses soil moisture sensors, weather data analysis, and automated valve control to optimize water usage and improve crop yield.',
      client: 'AgriTech Solutions',
      duration: '4 months',
      budget: '₹5,00,000',
      status: 'Completed',
      team: ['Electronics Engineer', 'Firmware Developer', 'IoT Specialist'],
      
      problem: 'Agricultural farmers were struggling with inconsistent water supply management, leading to crop damage and water wastage. Manual irrigation was time-consuming and inefficient.',
      
      solution: 'We designed an automated system using soil moisture sensors, weather APIs, and cloud connectivity. The system remotely monitors field conditions and automatically controls water pumps based on real-time data.',
      
      highlights: [
        'Real-time soil moisture monitoring with 10+ sensor nodes',
        'Weather-based irrigation scheduling',
        'Mobile app for remote farm management',
        'Automatic alert system for anomalies',
        '60% reduction in water consumption'
      ],
      
      technologies: [
        'Arduino',
        'ESP8266',
        'Soil Moisture Sensors',
        'GSM Module',
        'Cloud IoT',
        'React (Mobile App)',
        'Node.js Backend',
        'MongoDB'
      ],
      
      gallery: [
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop'
      ],
      
      links: {
        website: 'https://example.com',
        github: 'https://github.com'
      }
    },
    'robotic-arm': {
      id: 2,
      title: 'Industrial Robotic Arm',
      category: 'Robotics',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop',
      description: '6-DOF collaborative robotic arm with precision automation',
      fullDescription: 'A custom-designed 6-axis collaborative robot arm for industrial automation. Equipped with advanced sensors and control systems for precise manufacturing and assembly tasks.',
      client: 'Manufacturing Corp',
      duration: '6 months',
      budget: '₹15,00,000',
      status: 'Completed',
      team: ['Roboticist', 'Control Systems Engineer', 'Software Developer'],
      problem: 'Manual assembly processes were slow, error-prone, and posed safety risks to workers.',
      solution: 'We engineered a collaborative robotic arm with intuitive programming interface, safety features, and integration with existing manufacturing systems.',
      highlights: [
        '6-axis freedom with ±0.05mm precision',
        'Safe human-robot interaction',
        'Easy drag-and-drop programming',
        'Real-time performance monitoring',
        '300% increase in production speed'
      ],
      technologies: [
        'Stepper Motors',
        'Servo Controllers',
        'PLC Programming',
        'Real-time OS',
        'Python',
        'ROS (Robot OS)',
        'Vision Systems'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1485827404703-69613b8b4106?w=400&h=300&fit=crop'
      ],
      links: {
        website: '#',
        github: '#'
      }
    },
    'pcb-design': {
      id: 3,
      title: 'Custom PCB Design',
      category: 'PCB',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop',
      description: 'High-density multilayer PCB for medical device',
      fullDescription: 'Professional PCB design and fabrication for medical-grade electronic devices. Custom design with EMI shielding and precision component placement.',
      client: 'MedTech Solutions',
      duration: '2 months',
      budget: '₹2,50,000',
      status: 'Completed',
      team: ['PCB Designer', 'Hardware Engineer'],
      problem: 'Complex circuit requirements with strict size and reliability constraints for medical applications.',
      solution: 'Multi-layer PCB design with advanced EMI mitigation, impedance control, and thermal management.',
      highlights: [
        '8-layer PCB with 0.1mm traces',
        'Medical device compliance (ISO 13485)',
        'Thermal management design',
        'Signal integrity analysis',
        'Zero defect manufacturing'
      ],
      technologies: [
        'Altium Designer',
        'EAGLE CAD',
        'Signal Integrity Analysis',
        'Thermal Simulation',
        'Manufacturing Guidelines'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
      ],
      links: {
        website: '#',
        github: '#'
      }
    }
  }

  const project = projectsData[slug] || projectsData['smart-irrigation']

  return (
    <div className="project-details">
      {/* Back Navigation */}
      <Link to="/projects" className="back-link">
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Projects
      </Link>

      {/* Hero Section */}
      <section className="project-hero">
        <img src={project.image} alt={project.title} className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="category-badge">{project.category}</span>
            <h1>{project.title}</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="project-container">
        <div className="project-main">
          {/* Project Info */}
          <section className="project-info">
            <p className="description">{project.fullDescription}</p>
            
            {/* Key Details Grid */}
            <div className="details-grid">
              <div className="detail-card">
                <label>Client</label>
                <p>{project.client}</p>
              </div>
              <div className="detail-card">
                <label>Duration</label>
                <p>{project.duration}</p>
              </div>
              <div className="detail-card">
                <label>Budget</label>
                <p>{project.budget}</p>
              </div>
              <div className="detail-card">
                <label>Status</label>
                <p className="status-badge">{project.status}</p>
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="problem-solution">
              <div className="section">
                <h3>The Challenge</h3>
                <p>{project.problem}</p>
              </div>
              <div className="section">
                <h3>Our Solution</h3>
                <p>{project.solution}</p>
              </div>
            </div>

            {/* Key Highlights */}
            <section className="highlights-section">
              <h3>Key Highlights</h3>
              <ul className="highlights-list">
                {project.highlights.map((highlight, index) => (
                  <li key={index}>
                    <span className="checkmark">✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            {/* Technologies */}
            <section className="tech-section">
              <h3>Technologies Used</h3>
              <div className="tech-list">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>
            </section>

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <section className="gallery-section">
                <h3>Project Gallery</h3>
                <div className="gallery-grid">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="gallery-item">
                      <img src={image} alt={`${project.title} - ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Team */}
            <section className="team-section">
              <h3>Our Team</h3>
              <div className="team-list">
                {project.team.map((member, index) => (
                  <div key={index} className="team-member">
                    <div className="member-avatar"></div>
                    <p>{member}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="project-sidebar">
          <div className="sidebar-card">
            <h3>Quick Links</h3>
            <div className="link-buttons">
              {project.links.website !== '#' && (
                <a href={project.links.website} target="_blank" rel="noopener noreferrer" className="link-btn">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  Visit Website
                </a>
              )}
              {project.links.github !== '#' && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="link-btn">
                  <FontAwesomeIcon icon={faGithub} />
                  View Code
                </a>
              )}
              <a href="/enquiry" className="link-btn primary">
                <FontAwesomeIcon icon={faArrowRight} />
                Similar Project?
              </a>
            </div>
          </div>

          <div className="sidebar-card cta">
            <h3>Interested in similar work?</h3>
            <p>Let's discuss your project requirements and create something amazing together.</p>
            <a href="/enquiry" className="cta-btn">Start Your Project</a>
          </div>
        </aside>
      </div>

      {/* Related Projects */}
      <section className="related-projects">
        <div className="container">
          <h2>Related Projects</h2>
          <div className="related-grid">
            <Link to="/projects/smart-irrigation" className="related-card">
              <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop" alt="Smart Irrigation" />
              <div className="related-content">
                <span className="badge">IoT</span>
                <h4>Smart Irrigation System</h4>
              </div>
            </Link>
            <Link to="/projects/robotic-arm" className="related-card">
              <img src="https://images.unsplash.com/photo-1485827404703-69613b8b4106?w=300&h=200&fit=crop" alt="Robotic Arm" />
              <div className="related-content">
                <span className="badge">Robotics</span>
                <h4>Industrial Robotic Arm</h4>
              </div>
            </Link>
            <Link to="/projects/pcb-design" className="related-card">
              <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop" alt="PCB Design" />
              <div className="related-content">
                <span className="badge">PCB</span>
                <h4>Custom PCB Design</h4>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
