// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(); // Sets localStorage and updates context
      navigate('/dashboard');
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
          Welcome back!
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '30px',
          lineHeight: '1.5'
        }}>
          Enter to get unlimited access to data & information.
        </p>

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

        {/* Remember Me + Forgot Password */}
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
              id="remember"
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#5C40FF'
              }}
            />
            <label htmlFor="remember" style={{
              fontSize: '14px',
              color: '#333'
            }}>
              Remember me
            </label>
          </div>
          <span
            onClick={() => alert('Forgot password? Feature coming soon!')}
            style={{
              fontSize: '14px',
              color: '#5C40FF',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Forgot your password?
          </span>
        </div>

        {/* Login Button */}
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
          Log In
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
          <span style={{ margin: '0 10px' }}>Or, Login with</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={() => alert('Google login not implemented yet.')}
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

        {/* Register Link */}
        <p style={{
          fontSize: '14px',
          color: '#666'
        }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{
              color: '#5C40FF',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;