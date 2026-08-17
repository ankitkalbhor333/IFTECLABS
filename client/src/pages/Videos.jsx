import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import './Videos.css'

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState(null)

  const videos = [
    {
      id: 1,
      title: 'Electronics Assembly Process',
      category: 'Electronics',
      description: 'Step-by-step PCB assembly and component soldering',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      date: '2024-05-20'
    },
    {
      id: 2,
      title: 'Automation System Demo',
      category: 'Automation',
      description: 'Industrial PLC-based automation system in action',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop',
      url: 'https://www.youtube.com/embed/9bZkp7q19f0',
      date: '2024-05-18'
    },
    {
      id: 3,
      title: 'Product Testing & Quality',
      category: 'Testing',
      description: 'Quality assurance and testing procedures',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop',
      url: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      date: '2024-05-15'
    },
    {
      id: 4,
      title: 'IoT Device Development',
      category: 'IoT',
      description: 'Building smart devices with WiFi and sensors',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop',
      url: 'https://www.youtube.com/embed/Z1Xj_PvHWL8',
      date: '2024-05-10'
    },
    {
      id: 5,
      title: 'Robotics Control System',
      category: 'Robotics',
      description: 'Robot programming and motion control demonstration',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop',
      url: 'https://www.youtube.com/embed/FrKWiRv254g',
      date: '2024-05-08'
    },
    {
      id: 6,
      title: 'Training Workshop Day 1',
      category: 'Training',
      description: 'Hands-on training session on electronics basics',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop',
      url: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
      date: '2024-05-05'
    },
    {
      id: 7,
      title: 'PCB Design Tutorial',
      category: 'Electronics',
      description: 'Complete PCB design workflow from schematic to layout',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop',
      url: 'https://www.youtube.com/embed/9bZkp7q19f0',
      date: '2024-05-01'
    },
    {
      id: 8,
      title: 'Embedded Systems Programming',
      category: 'Embedded',
      description: 'Microcontroller programming with Arduino',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop',
      url: 'https://www.youtube.com/embed/ZZ5qV0ZF2W4',
      date: '2024-04-28'
    },
    {
      id: 9,
      title: 'PLC Ladder Logic Programming',
      category: 'Automation',
      description: 'Industrial automation using ladder logic',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop',
      url: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      date: '2024-04-25'
    }
  ]

  const categories = [
    { label: 'All Videos', value: 'all' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Automation', value: 'Automation' },
    { label: 'IoT', value: 'IoT' },
    { label: 'Robotics', value: 'Robotics' },
    { label: 'Embedded', value: 'Embedded' },
    { label: 'Training', value: 'Training' },
    { label: 'Testing', value: 'Testing' }
  ]

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => v.category === selectedCategory)

  return (
    <div className="videos">
      {/* Hero Section */}
      <section className="videos-hero">
        <div className="container">
          <h1>Videos</h1>
          <p>See our projects and work in action</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="videos-filter-section">
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
          <p className="video-count">
            {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="videos-grid-section">
        <div className="container">
          <div className="videos-grid">
            {filteredVideos.map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail" onClick={() => setSelectedVideo(video)}>
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-overlay">
                    <div className="play-button">
                      <FontAwesomeIcon icon={faPlay} />
                    </div>
                  </div>
                </div>
                <div className="video-content">
                  <div className="video-meta">
                    <span className="video-category">{video.category}</span>
                    <span className="video-date">{new Date(video.date).toLocaleDateString()}</span>
                  </div>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <button
                    className="watch-btn"
                    onClick={() => setSelectedVideo(video)}
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={() => setSelectedVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedVideo(null)}>×</button>
            <div className="video-player">
              <iframe
                width="100%"
                height="600"
                src={selectedVideo.url}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <h2>{selectedVideo.title}</h2>
              <p>{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
