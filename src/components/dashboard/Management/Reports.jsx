// src/components/dashboard/Reports.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSearch, FaUserCircle, FaMoneyBillWave, FaChartLine, FaStopwatch, FaArrowRight } from 'react-icons/fa';

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

const Reports = () => {
  const navigate = useNavigate();
  const orangeColor = '#FF6F00'; // Primary orange
  const darkTextColor = '#111827'; // Deep black
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightGray = '#9CA3AF';

  const handleViewAgingReport = () => {
    navigate('/dashboard/reports/aging'); // Adjust path as needed
  };

  const reports = [
    {
      id: 1,
      title: "Who owes me money?",
      description: "See overdue invoices by customer",
      icon: <FaMoneyBillWave size={24} color="#D946EF" />,
      button: {
        text: "View Aging Report →",
        color: "#f07924ff", // Red
        
      },
      bgColor: "#FEF3F2", // Light red
    },
    {
      id: 2,
      title: "What's selling?",
      description: "Top commodities by revenue",
      icon: <FaChartLine size={24} color="#10B981" />,
      button: {
        text: "Coming Soon →",
        color: "#10B981", // Green
        onClick: () => alert("Feature coming soon!"),
      },
      bgColor: "#ECFDF5", // Light green
    },
    {
      id: 3,
      title: "How fast do I get paid?",
      description: "Average days to receive payment",
      icon: <FaStopwatch size={24} color="#3B82F6" />,
      button: {
        text: "Coming Soon →",
        color: "#3B82F6", // Blue
        onClick: () => alert("Feature coming soon!"),
      },
      bgColor: "#DBEAFE", // Light blue
    },
  ];

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
            Reports
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

      {/* Breadcrumb */}
      <AnimatedSection delay={0.1}>
        <div
          style={{
            marginBottom: '24px',
            fontSize: '14px',
            color: lightGray,
          }}
        >
          <span>Home</span> <span> &gt; </span> <span style={{ color: darkTextColor }}>Reports</span>
        </div>
      </AnimatedSection>

      {/* Report Cards */}
      {reports.map((report, index) => (
        <AnimatedSection key={report.id} delay={0.2 + index * 0.1}>
          <div
            style={{
              backgroundColor: report.bgColor,
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {report.icon}
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0', color: darkTextColor }}>
                  {report.title}
                </h2>
                <p style={{ fontSize: '14px', color: lightGray, margin: 0 }}>
                  {report.description}
                </p>
              </div>
            </div>
            <button
              onClick={()=>{navigate('/dashboard/management/aging-report')}}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: report.button.color,
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                if (report.button.color === '#DC2626') {
                  e.currentTarget.style.backgroundColor = '#B91C1C';
                } else if (report.button.color === '#10B981') {
                  e.currentTarget.style.backgroundColor = '#059669';
                } else if (report.button.color === '#3B82F6') {
                  e.currentTarget.style.backgroundColor = '#2563EB';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = report.button.color;
              }}
            >
              {report.button.text}
              <FaArrowRight size={14} />
            </button>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
};

export default Reports;