// src/components/dashboard/AgingReport.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSearch, FaUserCircle, FaCheck, FaDownload } from 'react-icons/fa';

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

const AgingReport = () => {
  const navigate = useNavigate();
  const orangeColor = '#FF6F00'; // Primary orange
  const darkTextColor = '#111827'; // Deep black
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightGray = '#9CA3AF';

  // Mock data for aging buckets
  const agingBuckets = [
    {
      title: "Current",
      amount: "₹0.00",
      bgColor: "#F0FDF4", // Light green
      textColor: "#166534", // Dark green
      borderColor: "#86EFAC", // Green border
    },
    {
      title: "0-30 Days",
      amount: "₹0.00",
      bgColor: "#FEF9C3", // Light yellow
      textColor: "#92400E", // Dark orange
      borderColor: "#F59E0B", // Yellow border
    },
    {
      title: "31-60 Days",
      amount: "₹0.00",
      bgColor: "#F9FAFB", // White
      textColor: "#1F2937", // Black
      borderColor: "#D1D5DB", // Gray border
    },
    {
      title: "61-90 Days",
      amount: "₹0.00",
      bgColor: "#FEF2F2", // Light red
      textColor: "#991B1B", // Dark red
      borderColor: "#FCA5A5", // Red border
    },
    {
      title: "90+ Days",
      amount: "₹0.00",
      bgColor: "#FEF2F2", // Light red
      textColor: "#991B1B", // Dark red
      borderColor: "#FCA5A5", // Red border
    },
  ];

  const handleExportCSV = () => {
    alert('Exporting CSV...'); // Replace with actual download logic
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
            Dashboard
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

      {/* Page Title */}
      <AnimatedSection delay={0.1}>
        <div
          style={{
            marginBottom: '24px',
          }}
        >
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0', color: darkTextColor }}>
            Accounts Receivable Aging
          </h1>
          <p style={{ fontSize: '14px', color: lightGray, margin: '0' }}>
            Outstanding invoices by age
          </p>
        </div>
      </AnimatedSection>

      {/* Export Button */}
      <AnimatedSection delay={0.2}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '24px',
          }}
        >
          <button
            onClick={handleExportCSV}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#e75e15ff', 
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#da550dff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#cf5f0aff')}
          >
            <FaDownload size={14} />
            Export CSV
          </button>
        </div>
      </AnimatedSection>

      {/* Aging Buckets */}
      <AnimatedSection delay={0.3}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {agingBuckets.map((bucket, index) => (
            <div
              key={index}
              style={{
                backgroundColor: bucket.bgColor,
                borderRadius: '12px',
                padding: '16px',
                border: `2px solid ${bucket.borderColor}`,
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0', color: bucket.textColor }}>
                {bucket.title}
              </h3>
              <p style={{ fontSize: '20px', fontWeight: '700', margin: '0', color: bucket.textColor }}>
                {bucket.amount}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Empty State */}
      <AnimatedSection delay={0.4}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '48px 32px',
            textAlign: 'center',
          }}
        >
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
            <FaCheck size={28} color={orangeColor} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 12px', color: darkTextColor }}>
            All Caught Up!
          </h3>
          <p style={{ fontSize: '15px', color: lightGray, margin: 0 }}>
            No outstanding invoices found.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AgingReport;