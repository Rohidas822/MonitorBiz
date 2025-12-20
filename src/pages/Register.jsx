// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      alert('Account created! Please login.');
      navigate('/login');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#E6EAF2', // Light purple background
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        width: '400px',
        maxWidth: '100%',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <div style={{
          marginBottom: '20px',
          fontSize: '48px',
          color: '#5C40FF'
        }}>
          🌸 {/* Replace with your actual logo if available */}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#2D2D2D',
          marginBottom: '8px'
        }}>
          Create Account
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '30px',
          lineHeight: '1.5'
        }}>
          Join us to get unlimited access to data & information.
        </p>

        {/* Full Name Field */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
            marginBottom: '6px'
          }}>
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
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
            marginBottom: '6px'
          }}>
            Email *
          </label>
          <input
            type="email"
            placeholder="Enter your mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
            marginBottom: '6px'
          }}>
            Password *
          </label>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                cursor: 'pointer',
                color: '#888',
                fontSize: '14px'
              }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        </div>

        {/* Remember Me + Terms */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <input
              type="checkbox"
              id="agree"
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#5C40FF'
              }}
            />
            <label htmlFor="agree" style={{
              fontSize: '14px',
              color: '#333'
            }}>
              I agree to terms
            </label>
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#5C40FF',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            marginBottom: '20px'
          }}
        >
          Register
        </button>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          color: '#999',
          fontSize: '14px'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
          <span style={{ margin: '0 10px' }}>Or, Sign up with</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={() => alert('Google signup not implemented yet.')}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            style={{
              width: '20px',
              height: '20px'
            }}
          />
          Sign up with Google
        </button>

        {/* Login Link */}
        <p style={{
          fontSize: '14px',
          color: '#666'
        }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{
              color: '#5C40FF',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;