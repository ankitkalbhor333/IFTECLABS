import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faPaperPlane,
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faClock,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './Enquiry.css'

const API_BASE_URL = 'http://localhost:5000/api'

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    enquiryType: '',
    service: '',
    budget: '',
    message: '',
    preferredContact: 'Email'
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [enquiryId, setEnquiryId] = useState('')

  const enquiryTypes = [
    'Project',
    'Consultation',
    'Training',
    'Support',
    'Partnership',
    'Other'
  ]

  const services = [
    'Electronics Product Development',
    'Industrial Automation & PLC',
    'IoT & Embedded Systems',
    'Robotics',
    'PCB Design & Fabrication',
    'Training & Consultancy'
  ]

  const budgetRanges = [
    'Below ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹5,00,000',
    '₹5,00,000 - ₹10,00,000',
    'Above ₹10,00,000',
    'Not Yet Decided'
  ]

  const contactMethods = ['Email', 'Phone', 'WhatsApp']

  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required'
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else if (value.trim().length > 100) {
          newErrors.name = 'Name cannot exceed 100 characters'
        } else {
          delete newErrors.name
        }
        break

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break

      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required'
        } else if (!/^[+0-9\s()-]{10,20}$/.test(value.trim())) {
          newErrors.phone = 'Please enter a valid phone number'
        } else {
          delete newErrors.phone
        }
        break

      case 'enquiryType':
        if (!value) {
          newErrors.enquiryType = 'Please select an enquiry type'
        } else {
          delete newErrors.enquiryType
        }
        break

      case 'service':
        if (!value) {
          newErrors.service = 'Please select a service'
        } else {
          delete newErrors.service
        }
        break

      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Project details are required'
        } else if (value.trim().length < 10) {
          newErrors.message = 'Please provide at least 10 characters'
        } else if (value.trim().length > 5000) {
          newErrors.message = 'Message cannot exceed 5000 characters'
        } else {
          delete newErrors.message
        }
        break

      default:
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (touched[name]) {
      validateField(name, value)
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target

    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    validateField(name, value)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[+0-9\s()-]{10,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.enquiryType) {
      newErrors.enquiryType = 'Please select an enquiry type'
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project details are required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters'
    }

    setErrors(newErrors)

    setTouched({
      name: true,
      email: true,
      phone: true,
      enquiryType: true,
      service: true,
      message: true
    })

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      setSubmitError('Please review the highlighted fields.')
      return
    }

    setLoading(true)

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        organization: formData.organization.trim() || '',
        enquiryType: formData.enquiryType,
        service: formData.service,
        budget: formData.budget || '',
        message: formData.message.trim(),
        preferredContact: formData.preferredContact
      }

      const response = await axios.post(
        `${API_BASE_URL}/enquiries`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data.success) {
        setEnquiryId(response.data.data.enquiryId)
        setSubmitted(true)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error)

      setSubmitError(
        error.response?.data?.message ||
        'Failed to submit enquiry. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  /* =========================
     SUCCESS SCREEN
  ========================== */

  if (submitted) {
    return (
      <div className="enquiry">

        <section className="enquiry-success-hero">
          <div className="enquiry-container">
            <span className="enquiry-eyebrow">
              ENQUIRY RECEIVED
            </span>

            <h1>Thank You for Reaching Out</h1>

            <p>
              Your project enquiry has been successfully submitted.
            </p>
          </div>
        </section>

        <section className="enquiry-success-section">
          <div className="enquiry-container">

            <div className="success-card">

              <div className="success-icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>

              <h2>Enquiry Submitted Successfully</h2>

              <p className="success-description">
                Thank you for contacting IFTECLABS. Our team has received
                your requirements and will review them shortly.
              </p>

              <div className="success-details">

                <div className="success-detail">
                  <span>Enquiry ID</span>
                  <strong>#{enquiryId}</strong>
                </div>

                <div className="success-detail">
                  <span>Service</span>
                  <strong>{formData.service}</strong>
                </div>

                <div className="success-detail">
                  <span>Contact Email</span>
                  <strong>{formData.email}</strong>
                </div>

              </div>

              <div className="next-steps">

                <div className="next-steps-header">
                  <FontAwesomeIcon icon={faInfoCircle} />

                  <div>
                    <h3>What happens next?</h3>
                    <p>Our usual process after receiving your enquiry.</p>
                  </div>
                </div>

                <div className="steps-list">

                  <div className="step-item">
                    <span>01</span>
                    <div>
                      <strong>Requirement Review</strong>
                      <p>
                        Our team reviews your project requirements.
                      </p>
                    </div>
                  </div>

                  <div className="step-item">
                    <span>02</span>
                    <div>
                      <strong>Team Contact</strong>
                      <p>
                        We contact you within 24–48 business hours.
                      </p>
                    </div>
                  </div>

                  <div className="step-item">
                    <span>03</span>
                    <div>
                      <strong>Project Discussion</strong>
                      <p>
                        We discuss your requirements and possible solutions.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              <div className="confirmation-message">
                <FontAwesomeIcon icon={faEnvelope} />

                <span>
                  Confirmation details have been sent to{' '}
                  <strong>{formData.email}</strong>
                </span>
              </div>

              <button
                onClick={() => {
                  window.location.href = '/'
                }}
                className="enquiry-btn enquiry-btn-primary"
              >
                Back to Home
                <FontAwesomeIcon icon={faArrowRight} />
              </button>

            </div>

          </div>
        </section>

      </div>
    )
  }

  /* =========================
     MAIN ENQUIRY PAGE
  ========================== */

  return (
    <div className="enquiry">

      {/* HERO */}

      <section className="enquiry-hero">

        <div className="enquiry-hero-grid"></div>

        <div className="enquiry-container enquiry-hero-content">

          <span className="enquiry-eyebrow">
            PROJECT ENQUIRY
          </span>

          <h1>
            Let's Build Something
            <span> Great Together.</span>
          </h1>

          <p>
            Tell us about your project, and our engineering team
            will get back to you with the right solution.
          </p>

          <div className="hero-trust">

            <div>
              <FontAwesomeIcon icon={faCheckCircle} />
              Engineering-focused solutions
            </div>

            <div>
              <FontAwesomeIcon icon={faCheckCircle} />
              Fast response
            </div>

            <div>
              <FontAwesomeIcon icon={faCheckCircle} />
              Custom solutions
            </div>

          </div>

        </div>

      </section>


      {/* MAIN */}

      <section className="enquiry-section">

        <div className="enquiry-container">

          <div className="enquiry-layout">

            {/* FORM */}

            <div className="enquiry-form-container">

              <div className="form-header">

                <span className="section-number">
                  01
                </span>

                <div>
                  <h2>Tell Us About Your Project</h2>

                  <p>
                    Share a few details about your requirements.
                    Our team will review your enquiry and contact you.
                  </p>
                </div>

              </div>


              <form
                onSubmit={handleSubmit}
                className="enquiry-form"
                noValidate
              >

                {submitError && (
                  <div className="form-alert">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <span>{submitError}</span>
                  </div>
                )}


                {/* CONTACT */}

                <div className="form-section">

                  <div className="form-section-title">

                    <span>01</span>

                    <div>
                      <h3>Contact Information</h3>
                      <p>How can we reach you?</p>
                    </div>

                  </div>


                  <div className="form-row">

                    {/* NAME */}

                    <div className="form-group">

                      <label>
                        Full Name
                        <span className="required">*</span>
                      </label>

                      <div className="input-wrapper">

                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Rahul Sharma"
                          className={errors.name ? 'input-error' : ''}
                          maxLength={100}
                        />

                        {formData.name && (
                          <span className="char-count">
                            {formData.name.length}/100
                          </span>
                        )}

                      </div>

                      {errors.name && (
                        <span className="error-msg">
                          {errors.name}
                        </span>
                      )}

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                      <label>
                        Email Address
                        <span className="required">*</span>
                      </label>

                      <div className="input-wrapper has-icon">

                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="input-icon"
                        />

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="your.email@example.com"
                          className={errors.email ? 'input-error' : ''}
                        />

                      </div>

                      {errors.email && (
                        <span className="error-msg">
                          {errors.email}
                        </span>
                      )}

                    </div>

                  </div>


                  <div className="form-row">

                    {/* PHONE */}

                    <div className="form-group">

                      <label>
                        Phone Number
                        <span className="required">*</span>
                      </label>

                      <div className="input-wrapper has-icon">

                        <FontAwesomeIcon
                          icon={faPhone}
                          className="input-icon"
                        />

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="+91 XXXXX XXXXX"
                          className={errors.phone ? 'input-error' : ''}
                          maxLength={20}
                        />

                      </div>

                      {errors.phone && (
                        <span className="error-msg">
                          {errors.phone}
                        </span>
                      )}

                    </div>


                    {/* ORGANIZATION */}

                    <div className="form-group">

                      <label>
                        Organization / College
                        <span className="optional">
                          Optional
                        </span>
                      </label>

                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="ABC College / XYZ Company"
                        maxLength={100}
                      />

                      {formData.organization && (
                        <span className="char-count">
                          {formData.organization.length}/100
                        </span>
                      )}

                    </div>

                  </div>

                </div>


                {/* PROJECT */}

                <div className="form-section">

                  <div className="form-section-title">

                    <span>02</span>

                    <div>
                      <h3>Project Requirements</h3>
                      <p>Tell us what you need help with.</p>
                    </div>

                  </div>


                  <div className="form-row">

                    {/* ENQUIRY TYPE */}

                    <div className="form-group">

                      <label>
                        Enquiry Type
                        <span className="required">*</span>
                      </label>

                      <select
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.enquiryType ? 'input-error' : ''}
                      >

                        <option value="">
                          Select enquiry type
                        </option>

                        {enquiryTypes.map(type => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type}
                          </option>
                        ))}

                      </select>

                      {errors.enquiryType && (
                        <span className="error-msg">
                          {errors.enquiryType}
                        </span>
                      )}

                    </div>


                    {/* SERVICE */}

                    <div className="form-group">

                      <label>
                        Service Required
                        <span className="required">*</span>
                      </label>

                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.service ? 'input-error' : ''}
                      >

                        <option value="">
                          Select service
                        </option>

                        {services.map(service => (
                          <option
                            key={service}
                            value={service}
                          >
                            {service}
                          </option>
                        ))}

                      </select>

                      {errors.service && (
                        <span className="error-msg">
                          {errors.service}
                        </span>
                      )}

                    </div>

                  </div>


                  {/* BUDGET */}

                  <div className="form-group">

                    <label>
                      Project Budget
                      <span className="optional">
                        Optional
                      </span>
                    </label>

                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select budget range
                      </option>

                      {budgetRanges.map(range => (
                        <option
                          key={range}
                          value={range}
                        >
                          {range}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>


                {/* COMMUNICATION */}

                <div className="form-section">

                  <div className="form-section-title">

                    <span>03</span>

                    <div>
                      <h3>Communication Preference</h3>
                      <p>How would you prefer us to contact you?</p>
                    </div>

                  </div>


                  <div className="contact-methods">

                    {contactMethods.map(method => (

                      <label
                        key={method}
                        className={`contact-method ${
                          formData.preferredContact === method
                            ? 'selected'
                            : ''
                        }`}
                      >

                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={
                            formData.preferredContact === method
                          }
                          onChange={handleChange}
                        />

                        <span className="custom-radio"></span>

                        <span>{method}</span>

                      </label>

                    ))}

                  </div>

                </div>


                {/* MESSAGE */}

                <div className="form-section">

                  <div className="form-section-title">

                    <span>04</span>

                    <div>
                      <h3>Project Details</h3>
                      <p>
                        Tell us about your requirements,
                        timeline and technical needs.
                      </p>
                    </div>

                  </div>


                  <div className="form-group">

                    <label>
                      Project Details / Message
                      <span className="required">*</span>
                    </label>

                    <div className="textarea-wrapper">

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Describe your project requirements, expected timeline, technical challenges, or any specific needs..."
                        className={errors.message ? 'input-error' : ''}
                        rows="7"
                        maxLength={5000}
                      />

                      <span className="char-count">
                        {formData.message.length}/5000
                      </span>

                    </div>

                    {errors.message && (
                      <span className="error-msg">
                        {errors.message}
                      </span>
                    )}

                  </div>

                </div>


                {/* SUBMIT */}

                <div className="submit-area">

                  <button
                    type="submit"
                    className="enquiry-btn enquiry-btn-submit"
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span className="button-spinner"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enquiry
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </>
                    )}

                  </button>

                  <p className="form-disclaimer">
                    <span>*</span> Required fields
                    <span className="divider"></span>
                    Your information is used only to respond to your enquiry.
                  </p>

                </div>

              </form>

            </div>


            {/* SIDEBAR */}

            <aside className="enquiry-info">

              {/* WHY */}

              <div className="info-card">

                <div className="info-card-header">
                  <span className="info-icon">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>

                  <div>
                    <h3>Why Work With Us?</h3>
                    <p>Built around your requirements.</p>
                  </div>
                </div>

                <ul>

                  <li>
                    <span>✓</span>
                    Engineering-focused solutions
                  </li>

                  <li>
                    <span>✓</span>
                    Custom project development
                  </li>

                  <li>
                    <span>✓</span>
                    Experienced technical team
                  </li>

                  <li>
                    <span>✓</span>
                    Transparent communication
                  </li>

                  <li>
                    <span>✓</span>
                    Reliable project delivery
                  </li>

                </ul>

              </div>


              {/* RESPONSE */}

              <div className="info-card response-card">

                <div className="response-icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>

                <div>

                  <span className="small-label">
                    QUICK RESPONSE
                  </span>

                  <h3>
                    24–48 Hours
                  </h3>

                  <p>
                    Most enquiries receive a response
                    within 24–48 business hours.
                  </p>

                </div>

              </div>


              {/* CONTACT */}

              <div className="info-card">

                <div className="info-card-header">

                  <span className="info-icon">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>

                  <div>
                    <h3>Prefer Direct Contact?</h3>
                    <p>We're happy to talk.</p>
                  </div>

                </div>


                <div className="direct-contact">

                  <a
                    href="tel:+919826588782"
                    className="direct-contact-item"
                  >

                    <span className="contact-icon">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>

                    <div>
                      <span>Phone</span>
                      <strong>+91 98265 88782</strong>
                    </div>

                  </a>


                  <a
                    href="mailto:iftechsystems@gmail.com"
                    className="direct-contact-item"
                  >

                    <span className="contact-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>

                    <div>
                      <span>Email</span>
                      <strong>iftechsystems@gmail.com</strong>
                    </div>

                  </a>

                </div>

              </div>


              {/* LOCATION */}

              <div className="location-note">

                <FontAwesomeIcon icon={faLocationDot} />

                <span>
                  Serving businesses, institutions
                  and technology projects.
                </span>

              </div>

            </aside>

          </div>


          {/* TRUST STRIP */}

          <div className="trust-strip">

            <span className="trust-title">
              FROM CONCEPT TO IMPLEMENTATION
            </span>

            <div className="trust-items">

              <span>Electronics</span>
              <span>Automation</span>
              <span>IoT & Embedded</span>
              <span>Robotics</span>
              <span>PCB Design</span>
              <span>Training</span>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}