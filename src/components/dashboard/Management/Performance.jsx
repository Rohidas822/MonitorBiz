// src/components/dashboard/Performance.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSearch, FaUserCircle, FaUsers, FaInfoCircle, FaCheck } from 'react-icons/fa';

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

const Performance = () => {
  const navigate = useNavigate();
  const orangeColor = '#FF6F00'; // Primary orange
  const darkTextColor = '#111827'; // Deep black
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightGray = '#9CA3AF';

  // Mock data
  const teamMembers = [
    {
      id: 1,
      name: "Rohidas Raghu Lakade",
      role: "Administrator",
      status: "Active",
      avatar: "R",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Invoice INV-2024-001 created",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Quotation QUO-2024-002 sent",
      time: "4 hours ago",
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
            Team Performance Dashboard
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

      {/* Active Team Members Card */}
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
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: `${orangeColor}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaUsers size={20} color={orangeColor} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: lightGray, margin: '0' }}>
                Active Team Members
              </p>
              <h2 style={{ fontSize: '28px', fontWeight: '700', margin: '4px 0 0 0', color: darkTextColor }}>
                {teamMembers.length}
              </h2>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Team Members & Recent Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px',
        }}
      >
        {/* Team Members */}
        <AnimatedSection delay={0.2}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '24px',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0', color: darkTextColor }}>
              Team Members
            </h2>

            {teamMembers.map((member) => (
              <div
                key={member.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB',
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: `${orangeColor}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: orangeColor,
                    }}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '600', margin: '0', color: darkTextColor }}>
                      {member.name}
                    </p>
                    <p style={{ fontSize: '13px', color: lightGray, margin: '0' }}>
                      {member.role}
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#28a745', // Green for "Active"
                    padding: '4px 8px',
                    borderRadius: '16px',
                    backgroundColor: '#DFFFE0',
                  }}
                >
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Recent Activity */}
        <AnimatedSection delay={0.3}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '24px',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0', color: darkTextColor }}>
              Recent Activity
            </h2>

            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaInfoCircle size={14} color={lightGray} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', margin: '0', color: darkTextColor }}>
                    {activity.title}
                  </p>
                  <p style={{ fontSize: '13px', color: lightGray, margin: '4px 0 0 0' }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Performance;