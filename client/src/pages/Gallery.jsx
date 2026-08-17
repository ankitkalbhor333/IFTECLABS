import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './Gallery.css'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'electronics', title: 'Electronics Assembly' },
    { id: 2, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'robotics', title: 'Robotic Systems' },
    { id: 3, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'automation', title: 'Automation System' },
    { id: 4, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'pcb', title: 'PCB Design' },
    { id: 5, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'workshop', title: 'Workshop Setup' },
    { id: 6, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'training', title: 'Training Session' },
    { id: 7, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'electronics', title: 'Component Testing' },
    { id: 8, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'robotics', title: 'Robot Testing' },
    { id: 9, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'iot', title: 'IoT Devices' },
    { id: 10, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'events', title: 'Company Event' },
    { id: 11, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'workshop', title: 'Workshop - Day 2' },
    { id: 12, src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop', category: 'projects', title: 'Final Project Demo' }
  ]

  const categories = [
    { label: 'All Images', value: 'all' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Robotics', value: 'robotics' },
    { label: 'Automation', value: 'automation' },
    { label: 'PCB Design', value: 'pcb' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Training', value: 'training' },
    { label: 'IoT', value: 'iot' },
    { label: 'Events', value: 'events' },
    { label: 'Projects', value: 'projects' }
  ]

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory)

  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % filteredImages.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <div className="gallery">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="container">
          <h1>Gallery</h1>
          <p>Our workspace, projects, and innovation</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="gallery-filter-section">
        <div className="container">
          <h3>Filter by Category</h3>
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <p className="image-count">
            {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(image, index)}
              >
                <img src={image.src} alt={image.title} />
                <div className="gallery-overlay">
                  <div className="image-info">
                    <p>{image.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="lightbox-image">
              <img src={selectedImage.src} alt={selectedImage.title} />
              <p className="lightbox-title">{selectedImage.title}</p>
            </div>

            <button className="lightbox-nav lightbox-next" onClick={nextImage}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className="lightbox-counter">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
