// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!agree) {
      newErrors.agree = 'You must agree to the terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // In real app: call API
      console.log('Registering:', { name, email, password });
      alert('Account created! Please login.');
      navigate('/login');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        fontFamily: '"Inter", -apple-system, Segoe UI, Roboto, sans-serif',
        padding: '20px'
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          width: '420px',
          maxWidth: '100%',
          textAlign: 'center',
          border: '1px solid #E5E7EB'
        }}
      >
        {/* Logo (neutral) */}
        <div
          style={{
            marginBottom: '20px',
            fontSize: '48px',
            color: '#1F2937'
          }}
        >
          🌸 {/* Replace with your actual logo if available */}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '8px'
          }}
        >
          Create Account
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '16px',
            color: '#6B7280',
            marginBottom: '32px',
            lineHeight: '1.5'
          }}
        >
          Join us to get unlimited access to data & information.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1F2937',
                marginBottom: '6px'
              }}
            >
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.name ? '1px solid #EF4444' : '1px solid #E5E7EB',
                borderRadius: '10px',
                fontSize: '15px',
                color: '#1F2937',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FF6B00'}
              onBlur={(e) => e.target.style.borderColor = errors.name ? '#EF4444' : '#E5E7EB'}
            />
            {errors.name && <p style={{ color: '#EF4444', fontSize: '13px', marginTop: '6px' }}>{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1F2937',
                marginBottom: '6px'
              }}
            >
              Email *
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.email ? '1px solid #EF4444' : '1px solid #E5E7EB',
                borderRadius: '10px',
                fontSize: '15px',
                color: '#1F2937',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FF6B00'}
              onBlur={(e) => e.target.style.borderColor = errors.email ? '#EF4444' : '#E5E7EB'}
            />
            {errors.email && <p style={{ color: '#EF4444', fontSize: '13px', marginTop: '6px' }}>{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1F2937',
                marginBottom: '6px'
              }}
            >
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 48px 12px 16px',
                  border: errors.password ? '1px solid #EF4444' : '1px solid #E5E7EB',
                  borderRadius: '10px',
                  fontSize: '15px',
                  color: '#1F2937',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#FF6B00'}
                onBlur={(e) => e.target.style.borderColor = errors.password ? '#EF4444' : '#E5E7EB'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6B7280',
                  fontSize: '16px'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '🔒'}
              </button>
            </div>
            {errors.password && <p style={{ color: '#EF4444', fontSize: '13px', marginTop: '6px' }}>{errors.password}</p>}
          </div>

          {/* Terms Agreement */}
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                color: errors.agree ? '#EF4444' : '#1F2937'
              }}
            >
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#FF6B00',
                  marginTop: '2px',
                  flexShrink: 0
                }}
              />
              <span>
                I agree to the <span style={{ color: '#FF6B00' }}>Terms of Service</span> and{' '}
                <span style={{ color: '#FF6B00' }}>Privacy Policy</span>.
              </span>
            </label>
            {errors.agree && <p style={{ color: '#EF4444', fontSize: '13px', marginTop: '6px' }}>{errors.agree}</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#FF6B00',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#E05A00')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#FF6B00')}
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '28px 0',
            color: '#9CA3AF',
            fontSize: '14px'
          }}
        >
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
          <span style={{ margin: '0 16px' }}>Or continue with</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={() => alert('Google signup not implemented yet.')}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 256 256" style={{ borderRadius: '4px' }}>
            <path
              fill="#4285F4"
              d="M227.9 130.1c0-7.8-1.5-15.3-4.2-22.3H128v43.3h55.4c-1.6 8.4-6.4 15.9-13.5 21.2v32.5h26.1c22.7-23.4 22.7-54.8 0-78.2z"
            ></path>
            <path
              fill="#34A853"
              d="M128 232c30.7 0 56.5-10.2 75.8-27.6l-26.1-20.2c-10.8 7.3-24.8 11.8-49.7 11.8-37.7 0-69.4-25-80.9-58.7H45.1v33.7c25.1 49.9 76.4 82 130.9 82z"
            ></path>
            <path
              fill="#FBBC05"
              d="M47.1 145.8c-2.7-8.1-4.2-16.8-4.2-25.8s1.4-17.7 4.2-25.8v-33.7h-22C11.4 87.7 4 115.8 4 146s7.4 58.3 20.8 85.5l22.3-33.7z"
            ></path>
            <path
              fill="#EA4335"
              d="M128 55.8c17.5 0 33.4 6 46.2 17.7L196 52.3C171.2 28.8 139.4 16 128 16c-54.5 0-105.8 32.1-130.9 82l22.2 33.7c11.5-33.7 43.2-58.7 80.9-58.7z"
            ></path>
          </svg>
          Sign up with Google
        </button>

        {/* Login Link */}
        <p style={{ fontSize: '15px', color: '#6B7280' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{
              color: '#FF6B00',
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;