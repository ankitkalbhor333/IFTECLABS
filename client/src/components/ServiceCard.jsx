import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function ServiceCard({ icon: iconObj, title, description, onClick }) {
  return (
    <div className="service-card" onClick={onClick}>
      <div className="service-icon">
        <FontAwesomeIcon icon={iconObj} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="service-footer">
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  )
}
