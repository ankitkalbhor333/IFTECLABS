import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faFilter } from '@fortawesome/free-solid-svg-icons'
import './Projects.css'

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'Smart IoT Weather Station',
      category: 'IoT',
      description: 'Real-time environmental monitoring with cloud integration',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop',
      problem: 'Need for real-time weather data collection',
      solution: 'Developed IoT device with WiFi connectivity and cloud dashboard',
      technologies: ['ESP32', 'MQTT', 'AWS IoT Core', 'React'],
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Industrial PLC Automation System',
      category: 'Automation',
      description: 'Automated manufacturing control system with safety features',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop',
      problem: 'Manual production line requiring automation',
      solution: 'Implemented PLC-based control system with HMI interface',
      technologies: ['Siemens S7-1200', 'Ladder Logic', 'Python', 'TIA Portal'],
      date: '2024-02-20'
    },
    {
      id: 3,
      title: 'Mobile Robotic Platform',
      category: 'Robotics',
      description: 'Autonomous navigation and obstacle detection system',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop',
      problem: 'Need for autonomous material handling',
      solution: 'Developed mobile robot with autonomous navigation',
      technologies: ['ROS', 'OpenCV', 'Arduino', 'Python'],
      date: '2024-03-10'
    },
    {
      id: 4,
      title: 'PCB Design & Manufacturing',
      category: 'PCB',
      description: 'Multi-layer PCB design with high-speed routing',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop',
      problem: 'Complex circuit requiring professional PCB layout',
      solution: 'Designed 4-layer PCB with impedance control',
      technologies: ['Altium Designer', 'CAM', 'KiCad', 'Manufacturing'],
      date: '2024-03-25'
    },
    {
      id: 5,
      title: 'Smart Building Control System',
      category: 'Embedded',
      description: 'IoT-based building automation with energy monitoring',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop',
      problem: 'High energy consumption in buildings',
      solution: 'Implemented smart sensors and automation system',
      technologies: ['STM32', 'LoRaWAN', 'Modbus', 'Node.js'],
      date: '2024-04-05'
    },
    {
      id: 6,
      title: 'Robotic Arm Gripper',
      category: 'Robotics',
      description: 'Precision mechanical gripper with feedback control',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop',
      problem: 'Delicate object handling requirements',
      solution: 'Designed servo-controlled gripper with force feedback',
      technologies: ['Servo Motors', 'Arduino', 'Mechanical Design', 'C++'],
      date: '2024-04-20'
    },
    {
      id: 7,
      title: 'Water Quality Monitoring System',
      category: 'IoT',
      description: 'Multi-sensor water quality analysis and reporting',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop',
      problem: 'Manual water quality testing',
      solution: 'Automated system with real-time monitoring',
      technologies: ['Arduino Mega', 'Sensors', 'WiFi', 'Dashboard'],
      date: '2024-05-10'
    },
    {
      id: 8,
      title: 'Power Factor Correction System',
      category: 'Electronics',
      description: 'Industrial power quality improvement solution',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop',
      problem: 'Low power factor and reactive power',
      solution: 'Designed and developed PFC system',
      technologies: ['Power Electronics', 'Microcontroller', 'PCB Design', 'Testing'],
      date: '2024-05-25'
    },
    {
      id: 9,
      title: 'Academic Project: Quadcopter',
      category: 'Academic',
      description: 'DIY quadcopter with altitude control',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop',
      problem: 'Student project for learning drone mechanics',
      solution: 'Guided development of complete quadcopter system',
      technologies: ['Arduino', 'MPU6050', 'Motors', 'Control Systems'],
      date: '2024-06-01'
    }
  ]

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Automation', value: 'Automation' },
    { label: 'IoT', value: 'IoT' },
    { label: 'Embedded', value: 'Embedded' },
    { label: 'Robotics', value: 'Robotics' },
    { label: 'PCB', value: 'PCB' },
    { label: 'Academic', value: 'Academic' }
  ]

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter)

  return (
    <div className="projects">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <h1>Our Projects</h1>
          <p>Showcasing our innovation and expertise</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="projects-filter-section">
        <div className="container">
          <div className="filter-header">
            <FontAwesomeIcon icon={faFilter} />
            <h3>Filter by Category</h3>
          </div>
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`filter-btn ${selectedFilter === cat.value ? 'active' : ''}`}
                onClick={() => setSelectedFilter(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <p className="project-count">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          {filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <span className="project-badge">{project.category}</span>
                    <div className="project-overlay">
                      <Link to={`/projects/${project.id}`} className="view-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-date">{new Date(project.date).toLocaleDateString()}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tech-chip">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tech-chip more">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                    <Link to={`/projects/${project.id}`} className="project-link">
                      View Project <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-projects">
              <p>No projects found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="projects-cta">
        <div className="container">
          <h2>Interested in a Similar Project?</h2>
          <p>Contact us to discuss your requirements</p>
          <Link to="/enquiry" className="btn btn-primary btn-large">
            Send Your Enquiry
          </Link>
        </div>
      </section>
    </div>
  )
}
