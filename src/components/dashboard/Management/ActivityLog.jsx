// src/components/dashboard/ActivityLog.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSearch, FaUserCircle, FaExclamationTriangle, FaCheck, FaArrowLeft } from 'react-icons/fa';

// Reusable animated wrapper
const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

const ActivityLog = () => {
  const navigate = useNavigate();
  const orangeColor = '#FF6F00'; // Primary orange
  const darkTextColor = '#111827'; // Deep black
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightGray = '#9CA3AF';

  const handleUpgrade = () => {
    alert('Upgrade to Premium Plan!');
    // Add navigation to upgrade page or open modal
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleContactSupport = () => {
    window.open('mailto:support@yourapp.com', '_blank');
  };

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: darkTextColor,
      }}
    >
      {/* Header */}
      <AnimatedSection>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: darkTextColor }}>
            Activity Log
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Search */}
            <div style={{ position: 'relative', width: '220px' }}>
              <FaSearch
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: lightGray,
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder="Search..."
                style={{
                  width: '100%',
                  paddingLeft: '36px',
                  paddingRight: '12px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
            </div>

            {/* User Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <FaUserCircle size={20} color={darkTextColor} />
              <span>Rohidas Raghu Lakade</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill={lightGray}
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Premium Lock Card */}
      <AnimatedSection delay={0.1}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '48px 32px',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {/* Warning Icon */}
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: `${orangeColor}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <FaExclamationTriangle size={28} color={orangeColor} />
          </div>

          {/* Title */}
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 12px', color: darkTextColor }}>
            Activity Log is Premium
          </h2>

          {/* Subtitle */}
          <p style={{ fontSize: '15px', color: lightGray, margin: '0 0 24px' }}>
            Track all system activities and user actions with detailed logs.
          </p>

          {/* Benefits List */}
          <div
            style={{
              textAlign: 'left',
              marginBottom: '24px',
              fontSize: '15px',
              color: darkTextColor,
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 12px 0' }}>
              What you get with paid plans:
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {[
                "Complete activity tracking",
                "Advanced reporting features",
                "Manufacturing modules",
                "Priority support",
              ].map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FaCheck size={14} color={orangeColor} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <button
              onClick={handleUpgrade}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '8px',
                backgroundColor: orangeColor,
                color: '#FFFFFF',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '300px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E05A00')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = orangeColor)}
            >
              <FaArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
              Upgrade to Paid Plan
            </button>

            <button
              onClick={handleBackToDashboard}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: darkTextColor,
                border: `1px solid ${borderColor}`,
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '300px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = orangeColor)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = borderColor)}
            >
              Back to Dashboard
            </button>
          </div>

          {/* Support Link */}
          <p
            style={{
              fontSize: '13px',
              color: lightGray,
              marginTop: '24px',
              cursor: 'pointer',
            }}
            onClick={handleContactSupport}
          >
            Need help? <span style={{ color: orangeColor, textDecoration: 'underline' }}>Contact Support</span>
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ActivityLog;