// src/pages/Login.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

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

  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const grayTextColor = '#374151';
  const lightBg = '#f9fafb';

  // Validation
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
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
    Object.keys(formData).forEach((field) => {
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
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // 🟢 SUCCESS: Redirect to dashboard
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Invalid credentials. Please check your email and password.'
      });
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div
      className="min-vh-100 position-relative overflow-hidden"
      style={{
        backgroundColor: lightBg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >
      {/* Animated Background Orbs */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
        {/* Left Orb */}
        <div
          className="position-absolute top-25 start-10 w-64 h-64 rounded-circle"
          style={{
            background: `radial-gradient(circle, ${orangeColor}30, transparent 70%)`,
            animation: 'float 18s infinite ease-in-out',
            transform: 'translateY(0)',
          }}
        ></div>

        {/* Right Orb */}
        <div
          className="position-absolute bottom-20 end-10 w-72 h-72 rounded-circle"
          style={{
            background: `radial-gradient(circle, #00000010, transparent 70%)`,
            animation: 'float 20s infinite ease-in-out reverse',
            transform: 'translateY(0)',
          }}
        ></div>

        {/* Center Orb */}
        <div
          className="position-absolute top-50 start-50 translate-middle w-80 h-80 rounded-circle"
          style={{
            background: `radial-gradient(circle, ${orangeColor}15, transparent 80%)`,
            animation: 'float 22s infinite ease-in-out',
            transform: 'translateY(0)',
          }}
        ></div>
      </div>

      {/* Global Animation Style */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25%  { transform: translateY(-20px) translateX(10px); }
          50%  { transform: translateY(10px) translateX(-15px); }
          75%  { transform: translateY(-15px) translateX(5px); }
        }
      `}</style>

      {/* Main Content */}
      <div className="position-relative z-10 d-flex align-items-center justify-content-center min-vh-100 p-3">
        <div className="w-100" style={{ maxWidth: '480px' }}>
          <div
            className="bg-white rounded-3 shadow-sm"
            style={{ border: '1px solid #e5e7eb' }}
          >
            {/* Logo & Title */}
            <div className="text-center p-4 pb-3">
              <div className="d-flex justify-content-center mb-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-2"
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: `${orangeColor}20`,
                    color: orangeColor,
                  }}
                >
                  <FaLock size={28} />
                </div>
              </div>
              <h1 className="h3 fw-bold" style={{ color: darkTextColor }}>
                Welcome Back
              </h1>
              <p className="text-muted small">Sign in to your Monitorbizz account</p>
            </div>

            {/* Form */}
            <div className="px-4 pb-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-medium" style={{ color: grayTextColor }}>
                    Email Address
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@business.com"
                      className={`form-control py-2 ps-5 ${errors.email ? 'is-invalid' : ''}`}
                      style={{ borderColor: errors.email ? '#dc3545' : '#d1d5db' }}
                    />
                    <span
                      className="position-absolute top-50 start-0 translate-middle-y ms-3"
                      style={{ color: '#6b7280' }}
                    >
                      <FaEnvelope size={14} />
                    </span>
                    {errors.email && (
                      <div className="position-absolute end-0 top-50 translate-middle-y text-danger">
                        <FaTimes size={14} />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <div className="text-danger small mt-1">{errors.email}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium" style={{ color: grayTextColor }}>
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`form-control py-2 ps-5 ${errors.password ? 'is-invalid' : ''}`}
                      style={{ borderColor: errors.password ? '#dc3545' : '#d1d5db', paddingRight: '40px' }}
                    />
                    <span
                      className="position-absolute top-50 start-0 translate-middle-y ms-3"
                      style={{ color: '#6b7280' }}
                    >
                      <FaLock size={14} />
                    </span>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="btn"
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: 0,
                        color: '#6b7280',
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
                  {errors.password && (
                    <div className="text-danger small mt-1">{errors.password}</div>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input type="checkbox" id="remember" className="form-check-input" style={{ accentColor: orangeColor }} />
                    <label htmlFor="remember" className="form-check-label ms-2 small" style={{ color: grayTextColor }}>
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="small fw-medium" style={{ color: orangeColor, textDecoration: 'none' }}>
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="d-grid mb-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: orangeColor,
                      borderColor: orangeColor,
                      color: '#ffffff',
                      padding: '0.65rem 1.2rem',
                      fontWeight: '600',
                      fontSize: '1rem',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#e65100')}
                    onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = orangeColor)}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <FaArrowRight className="me-2" /> Sign In
                      </>
                    )}
                  </button>
                </div>

                {/* Error Banner */}
                {formStatus?.type === 'error' && (
                  <div className="alert alert-danger p-3 rounded-2 mb-4 d-flex align-items-center" role="alert">
                    <FiAlertTriangle className="me-2" size={16} /> {formStatus.message}
                  </div>
                )}

                {/* Register Link */}
                <div className="text-center">
                  <p className="mb-0 small" style={{ color: grayTextColor }}>
                    Don’t have an account?{' '}
                    <Link to="/register" className="fw-medium" style={{ color: orangeColor, textDecoration: 'none' }}>
                      Start free trial
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
    </div>
  );
};

export default Login;