import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './Gallery.css'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const images = [
    { id: 1, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786971881/photo1_cblcxl.jpg', category: 'projects', title: 'pen plotter' },
    { id: 2, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786972389/iotoutomation_lzvwwv.jpg', category: 'projects', title: 'traffic light ' },
    { id: 3, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786972981/circuittesting_fzgy9z.jpg', category: 'projects', title: 'microwave oven testing' },
    { id: 4, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786973697/pcbdesign1_tczvqf.jpg', category: 'pcb', title: 'PCB Design by ifteclabs' },
    { id: 5, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786973822/pcbdesign3_utly6y.jpg', category: 'pcb', title: 'PCB Design by ifteclabs' },
    { id: 6, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786973707/pcbdesign2_nruylp.jpg', category: 'pcb', title: 'PCB Design by ifteclabs' },
    { id: 7, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786974549/project_vnfxdl.jpg', category: 'projects', title: 'irrigation system' },
    { id: 8, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786974683/workshop1_sludyi.jpg', category: 'workshop', title: 'WORKSHOP' },
    { id: 9, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786974821/bootloader_vjuzc8.jpg', category: 'electronics', title: 'Bootloader' },
    { id: 10, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786974923/workshop2_e7aklg.jpg', category: 'workshop', title: 'WORKSHOP' },
    { id: 11, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786975179/robotic_tuld02.jpg', category: 'robotics', title: 'ROBOTIC ' },
    { id: 12, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786972140/photo2_j1kudb.jpg', category: 'projects', title: 'pen plotter' },
      { id: 13, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786975210/screenprinted_pcb_vx57rn.jpg', category: 'pcb', title: 'screen printer' },
      { id: 14, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786975464/microwave1_kzokrb.jpg', category: 'electronics', title: 'microwave ' },
      { id: 15, src: 'https://res.cloudinary.com/dsoj9ctkk/image/upload/v1786972389/iotoutomation_lzvwwv.jpg', category: 'projects', title: 'microwave ' }
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

  const openLightbox = (image) => {
    setSelectedImage(image)
    const sameTitleImages = images.filter(img => 
      img.title.trim().toLowerCase() === image.title.trim().toLowerCase()
    )
    const index = sameTitleImages.findIndex(img => img.id === image.id)
    setCurrentImageIndex(index !== -1 ? index : 0)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const sameTitleImages = images.filter(img => 
      img.title.trim().toLowerCase() === selectedImage.title.trim().toLowerCase()
    )
    if (sameTitleImages.length === 0) return
    const newIndex = (currentImageIndex + 1) % sameTitleImages.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(sameTitleImages[newIndex])
  }

  const prevImage = () => {
    const sameTitleImages = images.filter(img => 
      img.title.trim().toLowerCase() === selectedImage.title.trim().toLowerCase()
    )
    if (sameTitleImages.length === 0) return
    const newIndex = (currentImageIndex - 1 + sameTitleImages.length) % sameTitleImages.length
    setCurrentImageIndex(newIndex)
    setSelectedImage(sameTitleImages[newIndex])
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
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(image)}
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
              {currentImageIndex + 1} / {
                images.filter(img => 
                  img.title.trim().toLowerCase() === selectedImage.title.trim().toLowerCase()
                ).length
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
