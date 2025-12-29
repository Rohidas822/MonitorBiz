// Register.jsx (Bootstrap Version)
import React, { useState } from 'react';
import { FaUser, FaBuilding, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck, FaTimes, FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';

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
          error = 'Password must contain uppercase, lowercase and numbers';
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
    
    // Clear error when user types
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
    
    // Validate all fields
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({
        type: 'success',
        message: 'Account created successfully! Welcome to Monitorbizz.'
      });
      
      // Reset form after successful submission
      setFormData({
        businessName: '',
        phoneNumber: '',
        address: '',
        plan: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
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

  // Plan options
  const plans = [
    { value: '', label: 'Select a plan' },
    { value: 'basic', label: 'Basic Plan - ₹99/month' },
    { value: 'pro', label: 'Pro Plan - ₹299/month' },
    { value: 'enterprise', label: 'Enterprise Plan - ₹999/month' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 overflow-hidden position-relative">
      {/* Animated Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
        <div className="position-absolute top-0 end-0 translate-middle-x translate-middle-y w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-circle opacity-20 animate-blob"></div>
        <div className="position-absolute bottom-0 start-0 translate-middle-x translate-middle-y w-80 h-80 bg-gradient-to-br from-pink-400 to-orange-500 rounded-circle opacity-20 animate-blob animation-delay-2000"></div>
        <div className="position-absolute top-50 start-50 translate-middle w-80 h-80 bg-gradient-to-br from-green-400 to-teal-500 rounded-circle opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="position-relative z-10 d-flex align-items-center justify-content-center min-vh-100 p-3">
        <div className="w-100" style={{ maxWidth: '500px' }}>
          <div className="bg-white rounded-4 shadow-lg border border-white-20 p-4 p-md-5">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="d-flex justify-content-center mb-3">
                <div className="d-flex align-items-center justify-content-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9M9 9l3 3-3 3m12-3a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2v-6z" />
                  </svg>
                </div>
              </div>
              <h1 className="h2 fw-bold text-gray-800 mb-1">Monitorbizz</h1>
              <p className="text-muted small">Start your free trial today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Business Details Section */}
              <div className="mb-4">
                <h2 className="h5 fw-semibold text-gray-700 mb-3 d-flex align-items-center">
                  <FaBuilding className="me-2 text-blue-500" /> Business Details
                </h2>
                
                <div className="mb-3">
                  <label className="form-label">Business Name</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g., Kumar Metal Works"
                      className={`form-control ${errors.businessName ? 'is-invalid' : ''}`}
                    />
                    {errors.businessName && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes />
                      </div>
                    )}
                  </div>
                  {errors.businessName && <div className="invalid-feedback">{errors.businessName}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="position-relative">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                    />
                    {errors.phoneNumber && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes />
                      </div>
                    )}
                  </div>
                  <small className="form-text text-muted">10-digit mobile number starting with 6-9</small>
                  {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <div className="position-relative">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Industrial Area, Phase 2, Mumbai"
                      rows="3"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    />
                    {errors.address && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes />
                      </div>
                    )}
                  </div>
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Choose Your Plan</label>
                  <div className="position-relative">
                    <select
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className={`form-select ${errors.plan ? 'is-invalid' : ''}`}
                    >
                      {plans.map((plan) => (
                        <option key={plan.value} value={plan.value}>
                          {plan.label}
                        </option>
                      ))}
                    </select>
                    {errors.plan && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes />
                      </div>
                    )}
                  </div>
                  <small className="form-text text-muted">You can upgrade anytime</small>
                  {errors.plan && <div className="invalid-feedback">{errors.plan}</div>}
                </div>
              </div>

              {/* Owner Details Section */}
              <div className="mb-4">
                <h2 className="h5 fw-semibold text-gray-700 mb-3 d-flex align-items-center">
                  <FaUser className="me-2 text-blue-500" /> Owner Details
                </h2>
                
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Rajesh Kumar"
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    />
                    {errors.fullName && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes />
                      </div>
                    )}
                  </div>
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <div className="position-relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rajesh@kumarworks.com"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    {errors.email && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes />
                      </div>
                    )}
                  </div>
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 8 characters"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('password')}
                      className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {formData.password && !errors.password && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-success">
                        <FaCheck />
                      </div>
                    )}
                  </div>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {formData.confirmPassword && !errors.confirmPassword && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-success">
                        <FaCheck />
                      </div>
                    )}
                  </div>
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mb-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary w-100 ${isSubmitting ? 'disabled' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center">
                      <FaCheck className="me-2" /> Create My Account
                    </div>
                  )}
                </button>
              </div>

              {/* Status Message */}
              {formStatus && (
                <div className={`alert ${formStatus.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                  {formStatus.type === 'success' ? (
                    <div className="d-flex align-items-center">
                      <FaCheck className="me-2" /> {formStatus.message}
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <FiAlertTriangle className="me-2" /> {formStatus.message}
                    </div>
                  )}
                </div>
              )}

              {/* Login Link */}
              <div className="text-center mt-3">
                <p className="text-muted small">
                  Already have an account?{' '}
                  <a href="/login" className="text-decoration-none text-primary fw-medium">
                    Sign in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="position-absolute bottom-0 start-0 end-0 text-center text-xs text-gray-500 py-3">
        © {new Date().getFullYear()} Monitorbizz. All rights reserved.
      </div>
    </div>
  );
};

export default Register;