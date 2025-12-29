// Login.jsx (Bootstrap Version)
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  // Validation rules
  const validateField = (name, value) => {
    let error = '';
    
    switch(name) {
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
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
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
    
    // ✅ REDIRECT TO DASHBOARD ON SUCCESS (instead of showing success message)
    localStorage.setItem("isLoggedIn", "true");
navigate("/dashboard");
    
  } catch (error) {
    setFormStatus({
      type: 'error',
      message: 'Invalid credentials. Please check your email and password.'
    });
    setIsSubmitting(false);
  }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
              <p className="text-muted small">Sign in to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <div className="position-relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  />
                  <span className="position-absolute top-50 start-0 translate-middle-y ms-1 text-secondary">
                    <FaEnvelope />
                  </span>
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
                    placeholder="Enter your password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  />
                  <span className="position-absolute top-50 start-0 translate-middle-y ms-1 text-secondary">
                    <FaLock />
                  </span>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
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

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="form-check-input"
                  />
                  <label htmlFor="rememberMe" className="form-check-label ms-2">
                    Remember me
                  </label>
                </div>
                <a href="/forgot-password" className="text-decoration-none text-primary fw-medium">
                  Forgot password?
                </a>
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
                      Signing In...
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center">
                      <FaArrowRight className="me-2" /> Sign In
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

              {/* Register Link */}
              <div className="text-center mt-3">
                <p className="text-muted small">
                  Don't have an account?{' '}
                  <a href="/register" className="text-decoration-none text-primary fw-medium">
                    Start free trial
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

export default Login;