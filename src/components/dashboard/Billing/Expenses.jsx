// src/components/dashboard/Billing/Expenses.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaUserCircle,
  FaMoneyBillWave,
  FaPlus,
  FaCheck,
  FaClock,
  FaChartLine,
  FaWallet,
  FaFileAlt,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

const Expenses = () => {
  const navigate = useNavigate();
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';

  const stats = [
    {
      title: 'Total Expenses',
      value: 0,
      icon: <FaMoneyBillWave color="#495057" size={20} />,
      subtitle: 'All time',
      color: '#495057',
    },
    {
      title: 'Paid Expenses',
      value: 0,
      icon: <FaCheck color="#28a745" size={20} />,
      subtitle: 'Completed',
      color: '#28a745',
    },
    {
      title: 'Pending Payment',
      value: 0,
      icon: <FaClock color="#ffc107" size={20} />,
      subtitle: 'Awaiting payment',
      color: '#ffc107',
    },
    {
      title: 'Total Spent',
      value: '₹0',
      icon: <FaChartLine color="#6f42c1" size={20} />,
      subtitle: 'Rs Expense value',
      color: '#6f42c1',
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#000000' }}>
            Expenses
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <FaSearch
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6B7280',
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <FaUserCircle size={20} color="#4B5563" />
              <span>Rohidas Raghu Lakade</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="#6B7280"
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

      {/* Expenses Header Card */}
      <AnimatedSection delay={0.1}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0', color: '#000000' }}>
                Expenses
              </h2>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '13px',
                  color: '#6B7280',
                  marginBottom: '8px',
                }}
              >
                <FaFileAlt size={12} />
                <span>Home</span>
                <span> / </span>
                <span style={{ color: '#4B5563' }}>Expenses</span>
              </div>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                Track and manage your business expenses
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  backgroundColor: `${orangeColor}20`,
                  color: orangeColor,
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: orangeColor,
                  }}
                ></span>
                0 Total
              </div>
              <button
                onClick={() => navigate('/dashboard/billing/expenses/new')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: orangeColor,
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E05A00')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = orangeColor)}
              >
                <FaPlus size={14} />
                New Expense
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Cards */}
      <AnimatedSection delay={0.2}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                borderLeft: `4px solid ${stat.color}`,
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: `${stat.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                }}
              >
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>{stat.title}</p>
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0', color: '#000000' }}>
                  {stat.value}
                </h3>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Empty State */}
      <AnimatedSection delay={0.3}>
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
              backgroundColor: `${orangeColor}10`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <FaWallet size={28} color={orangeColor} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 12px', color: '#000000' }}>
            No Expenses Yet
          </h3>
          <p style={{ fontSize: '15px', color: '#6B7280', maxWidth: '500px', margin: '0 auto 28px' }}>
            Start tracking your business expenses by creating your first expense entry. Categorize, tag, and monitor spending efficiently.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => navigate('/dashboard/billing/expenses/new')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: orangeColor,
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E05A00')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = orangeColor)}
            >
              <FaPlus size={14} />
              Create Expense
            </button>
            <button
              onClick={()=> navigate('/dashboard/reports')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: '#374151',
                border: `1px solid ${borderColor}`,
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = orangeColor)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = borderColor)}
            >
              <FaChartLine size={14} />
              View Reports
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Expenses;