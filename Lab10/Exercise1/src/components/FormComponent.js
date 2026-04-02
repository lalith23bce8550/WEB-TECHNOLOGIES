import React, { useState } from 'react';
import '../styles/FormComponent.css';

const FormComponent = () => {
  // State management for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // State for error messages
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  // State for success message
  const [successMessage, setSuccessMessage] = useState('');
  
  // State to store all submitted data as cards
  const [submissions, setSubmissions] = useState([]);

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Email format validation using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input change - controlled component
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form
    if (validateForm()) {
      // Add new submission to the submissions array with a unique ID
      const newSubmission = {
        id: Date.now(),
        ...formData
      };
      setSubmissions([newSubmission, ...submissions]);
      setSuccessMessage('Form submitted successfully!');
      
      // Log the form data (in real application, this would be sent to server)
      console.log('Form Data:', formData);

      // Reset form fields after successful submission
      setFormData({
        name: '',
        email: '',
        password: ''
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setErrors({
      name: '',
      email: '',
      password: ''
    });
    setSuccessMessage('');
  };

  // Handle delete submission card
  const handleDeleteSubmission = (id) => {
    setSubmissions(submissions.filter(submission => submission.id !== id));
  };

  return (
    <div className="form-container">
      {/* Success Message - Conditional Rendering */}
      {successMessage && (
        <div className="success-message">
          <span className="success-icon">✓</span>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        {/* Name Input Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
          />
          {/* Conditional rendering of error message */}
          {errors.name && (
            <span className="error-message">
              <span className="error-icon">✕</span>
              {errors.name}
            </span>
          )}
        </div>

        {/* Email Input Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
          />
          {/* Conditional rendering of error message */}
          {errors.email && (
            <span className="error-message">
              <span className="error-icon">✕</span>
              {errors.email}
            </span>
          )}
        </div>

        {/* Password Input Field */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className={`form-input ${errors.password ? 'input-error' : ''}`}
          />
          {/* Conditional rendering of error message */}
          {errors.password && (
            <span className="error-message">
              <span className="error-icon">✕</span>
              {errors.password}
            </span>
          )}
        </div>

        {/* Form Buttons */}
        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="btn btn-reset">
            Reset
          </button>
        </div>
      </form>

      {/* Display submitted data as cards */}
      {submissions.length > 0 && (
        <div className="submissions-container">
          <h3 className="submissions-title">Submitted User Information</h3>
          <div className="cards-grid">
            {submissions.map((submission) => (
              <div key={submission.id} className="submission-card">
                <div className="card-header">
                  <h4 className="card-name">{submission.name}</h4>
                  <button
                    type="button"
                    onClick={() => handleDeleteSubmission(submission.id)}
                    className="delete-btn"
                    title="Delete card"
                  >
                    ✕
                  </button>
                </div>
                <div className="card-body">
                  <div className="card-field">
                    <label className="field-label">Email:</label>
                    <p className="field-value">{submission.email}</p>
                  </div>
                  <div className="card-field">
                    <label className="field-label">Password:</label>
                    <p className="field-value">
                      {'•'.repeat(submission.password.length)}
                    </p>
                  </div>
                </div>
                <div className="card-footer">
                  <span className="submission-time">
                    {new Date(submission.id).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
