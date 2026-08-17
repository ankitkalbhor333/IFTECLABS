import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <span className="project-badge">{project.category}</span>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Link to={`/projects/${project.id}`} className="project-link">
          View Details <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  )
}
