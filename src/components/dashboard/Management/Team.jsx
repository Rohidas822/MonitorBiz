// src/components/dashboard/Team.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSearch, FaUserCircle, FaPlus, FaUsers, FaTimes } from 'react-icons/fa';

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

// Modal Component
const AddTeamMemberModal = ({ isOpen, onClose }) => {
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#E5E7EB';
  const lightGray = '#9CA3AF';

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Team member added!');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            color: lightGray,
            cursor: 'pointer',
          }}
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 24px 0', color: darkTextColor }}>
          Add Team Member
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: darkTextColor,
              }}
            >
              Email Address *
            </label>
            <input
              type="email"
              placeholder="Enter work email address (e.g., john@company.com)"
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                fontSize: '14px',
                color: darkTextColor,
                outline: 'none',
              }}
            />
            <p style={{ fontSize: '12px', color: lightGray, marginTop: '4px' }}>
              This will be their login username
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: darkTextColor,
              }}
            >
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                fontSize: '14px',
                color: darkTextColor,
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: darkTextColor,
              }}
            >
              Password *
            </label>
            <input
              type="password"
              placeholder="Set login password (min 8 characters)"
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                fontSize: '14px',
                color: darkTextColor,
                outline: 'none',
              }}
            />
            <p style={{ fontSize: '12px', color: lightGray, marginTop: '4px' }}>
              User can change this password after first login
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: darkTextColor,
              }}
            >
              Role *
            </label>
            <select
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                fontSize: '14px',
                color: darkTextColor,
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath d='M7 10l5 5 5-5z' fill='%239CA3AF'/%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '12px',
              }}
            >
              <option value="">Choose a role for this team member</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="member">Member</option>
            </select>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: darkTextColor,
                border: `1px solid ${borderColor}`,
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = orangeColor)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = borderColor)}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
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
              Add Team Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Team = () => {
  const navigate = useNavigate();
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightGray = '#9CA3AF';

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTeamMember = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            Team Management
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

      {/* Team Members Card */}
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
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0', color: darkTextColor }}>
                Team Members
              </h2>
              <p style={{ fontSize: '14px', color: lightGray, margin: 0 }}>
                Manage your workshop team and invite new members
              </p>
            </div>
            <button
              onClick={handleAddTeamMember}
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
              Add Team Member
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Active Team Members Section */}
      <AnimatedSection delay={0.2}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0', color: darkTextColor }}>
            Active Team Members
          </h3>
          <div
            style={{
              textAlign: 'center',
              padding: '48px 32px',
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              backgroundColor: `${orangeColor}05`,
            }}
          >
            <FaUsers size={40} color={lightGray} style={{ marginBottom: '16px' }} />
            <p style={{ fontSize: '15px', color: lightGray, margin: 0 }}>
              No team members yet. Invite your first team member!
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Modal */}
      <AddTeamMemberModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Team;