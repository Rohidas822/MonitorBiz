// src/pages/Register.jsx
import React, { useState } from 'react';
import { FaUser, FaBuilding, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    address: '',
    plan: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const grayTextColor = '#374151';
  const lightBg = '#f9fafb';

  // Validation rules
  const validateField = (name, value) => {
    let error = '';
    
    switch(name) {
      case 'businessName':
        if (!value.trim()) error = 'Business name is required';
        break;
      case 'phoneNumber':
        if (!value) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone number must be 10 digits';
        } else if (!/^[6-9]/.test(value)) {
          error = 'Phone number must start with 6-9';
        }
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        break;
      case 'plan':
        if (!value) error = 'Please select a plan';
        break;
      case 'fullName':
        if (!value.trim()) error = 'Full name is required';
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Must include uppercase, lowercase, and number';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus({
        type: 'success',
        message: 'Account created successfully! Redirecting to login...'
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const plans = [
    { value: '', label: 'Select a plan' },
    { value: 'basic', label: 'Basic Plan – ₹99/month' },
    { value: 'pro', label: 'Pro Plan – ₹299/month' },
    { value: 'enterprise', label: 'Enterprise Plan – ₹999/month' }
  ];

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ backgroundColor: lightBg, fontFamily: "'Inter', sans-serif" }}>
      <div className="w-100" style={{ maxWidth: '520px' }}>
        <div className="bg-white rounded-3 shadow-sm border" style={{ border: '1px solid #e5e7eb' }}>
          {/* Header */}
          <div className="text-center p-4 pb-3">
            <div className="d-flex justify-content-center mb-3">
              <div 
                className="d-flex align-items-center justify-content-center rounded-2"
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: `${orangeColor}20`,
                  color: orangeColor 
                }}
              >
                <FaBuilding size={28} />
              </div>
            </div>
            <h1 className="h3 fw-bold" style={{ color: darkTextColor }}>Monitorbizz</h1>
            <p className="text-muted small">Create your account to get started</p>
          </div>

          <div className="px-4 pb-4">
            <form onSubmit={handleSubmit}>
              {/* Business Details */}
              <div className="mb-4">
                <h2 className="h6 fw-semibold text-uppercase text-muted mb-3" style={{ letterSpacing: '0.5px' }}>
                  Business Details
                </h2>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: grayTextColor }}>Business Name *</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g., Kumar Metal Works"
                      className={`form-control py-2 ${errors.businessName ? 'is-invalid' : ''}`}
                      style={{ borderColor: errors.businessName ? '#dc3545' : '#d1d5db' }}
                    />
                    {errors.businessName && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes size={14} />
                      </div>
                    )}
                  </div>
                  {errors.businessName && <div className="text-danger small mt-1">{errors.businessName}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: grayTextColor }}>Phone Number *</label>
                  <div className="position-relative">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className={`form-control py-2 ${errors.phoneNumber ? 'is-invalid' : ''}`}
                      style={{ borderColor: errors.phoneNumber ? '#dc3545' : '#d1d5db' }}
                    />
                    {errors.phoneNumber && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes size={14} />
                      </div>
                    )}
                  </div>
                  <small className="text-muted">10-digit mobile starting with 6–9</small>
                  {errors.phoneNumber && <div className="text-danger small mt-1">{errors.phoneNumber}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: grayTextColor }}>Address *</label>
                  <div className="position-relative">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Industrial Area, Phase 2, Mumbai"
                      rows="2"
                      className={`form-control py-2 ${errors.address ? 'is-invalid' : ''}`}
                      style={{ borderColor: errors.address ? '#dc3545' : '#d1d5db' }}
                    />
                    {errors.address && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes size={14} />
                      </div>
                    )}
                  </div>
                  {errors.address && <div className="text-danger small mt-1">{errors.address}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: grayTextColor }}>Choose Plan *</label>
                  <div className="position-relative">
                    <select
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className={`form-select py-2 ${errors.plan ? 'is-invalid' : ''}`}
                      style={{ borderColor: errors.plan ? '#dc3545' : '#d1d5db' }}
                    >
                      {plans.map((plan) => (
                        <option key={plan.value} value={plan.value}>
                          {plan.label}
                        </option>
                      ))}
                    </select>
                    {errors.plan && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes size={14} />
                      </div>
                    )}
                  </div>
                  {errors.plan && <div className="text-danger small mt-1">{errors.plan}</div>}
                </div>
              </div>

              {/* Owner Details */}
              <div className="mb-4">
                <h2 className="h6 fw-semibold text-uppercase text-muted mb-3" style={{ letterSpacing: '0.5px' }}>
                  Owner Details
                </h2>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: grayTextColor }}>Full Name *</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Rajesh Kumar"
                      className={`form-control py-2 ${errors.fullName ? 'is-invalid' : ''}`}
                      style={{ borderColor: errors.fullName ? '#dc3545' : '#d1d5db' }}
                    />
                    {errors.fullName && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes size={14} />
                      </div>
                    )}
                  </div>
                  {errors.fullName && <div className="text-danger small mt-1">{errors.fullName}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: grayTextColor }}>Email Address *</label>
                  <div className="position-relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rajesh@kumarworks.com"
                      className={`form-control py-2 ${errors.email ? 'is-invalid' : ''}`}
                      style={{ borderColor: errors.email ? '#dc3545' : '#d1d5db' }}
                    />
                    {errors.email && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes size={14} />
                      </div>
                    )}
                  </div>
                  {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: grayTextColor }}>Password *</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 8 chars with A, a, 0"
                      className={`form-control py-2 ${errors.password ? 'is-invalid' : ''}`}
                      style={{ borderColor: errors.password ? '#dc3545' : '#d1d5db', paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('password')}
                      className="btn"
                      style={{ 
                        position: 'absolute', 
                        right: '10px', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        padding: 0,
                        color: '#6b7280'
                      }}
                    >
                      {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                    {formData.password && !errors.password && (
                      <div className="position-absolute end-0 top-50 translate-middle-y" style={{ right: '32px' }}>
                        <FaCheck size={14} style={{ color: '#10B981' }} />
                      </div>
                    )}
                  </div>
                  {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: grayTextColor }}>Confirm Password *</label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      className={`form-control py-2 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      style={{ borderColor: errors.confirmPassword ? '#dc3545' : '#d1d5db', paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="btn"
                      style={{ 
                        position: 'absolute', 
                        right: '10px', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        padding: 0,
                        color: '#6b7280'
                      }}
                    >
                      {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                    {formData.confirmPassword && !errors.confirmPassword && (
                      <div className="position-absolute end-0 top-50 translate-middle-y" style={{ right: '32px' }}>
                        <FaCheck size={14} style={{ color: '#10B981' }} />
                      </div>
                    )}
                  </div>
                  {errors.confirmPassword && <div className="text-danger small mt-1">{errors.confirmPassword}</div>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-grid mb-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: orangeColor,
                    borderColor: orangeColor,
                    color: '#ffffff',
                    padding: '0.6rem 1.2rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#e65100')}
                  onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = orangeColor)}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <FaCheck className="me-2" /> Create My Account
                    </>
                  )}
                </button>
              </div>

              {/* Status Message */}
              {formStatus && (
                <div 
                  className={`alert alert-${formStatus.type === 'success' ? 'success' : 'danger'} p-3 rounded-2 mb-3`}
                  role="alert"
                >
                  <div className="d-flex align-items-center">
                    {formStatus.type === 'success' ? (
                      <FaCheck className="me-2 text-success" />
                    ) : (
                      <FiAlertTriangle className="me-2 text-danger" />
                    )}
                    <span>{formStatus.message}</span>
                  </div>
                </div>
              )}

              {/* Login Link */}
              <div className="text-center mt-2">
                <p className="mb-0 small" style={{ color: grayTextColor }}>
                  Already have an account?{' '}
                  <Link to="/login" className="fw-medium" style={{ color: orangeColor, textDecoration: 'none' }}>
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 small" style={{ color: '#6b7280' }}>
          © {new Date().getFullYear()} Monitorbizz. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Register;