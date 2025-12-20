// src/components/layout/Navbar.jsx
import React from 'react';

const Navbar = ({ user = 'Admin' }) => {
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.hash = '/login';
  };

  return (
    <header
      style={{
        height: '60px',
        backgroundColor: '#1a2530', // Dark navy — professional & modern
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        position: 'fixed',
        top: 0,
        left: 250, // Aligns with sidebar width
        right: 0,
        zIndex: 1000,
        fontFamily: 'Segoe UI, Roboto, sans-serif'
      }}
    >
      {/* Left: App Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: '#3498db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '18px',
            color: 'white'
          }}
        >
          M
        </div>
        <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0, letterSpacing: '0.5px' }}>
          monitorBiz
        </h1>
      </div>

      {/* Right: User Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Welcome Text */}
        <span style={{ fontSize: '14px', color: '#e0e6ed' }}>
          Welcome, <strong>{user}</strong>
        </span>

        {/* Profile Avatar */}
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#2ecc71',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '14px'
          }}
        >
          {user.charAt(0).toUpperCase()}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            padding: '6px 12px',
            backgroundColor: 'transparent',
            border: '1px solid #e74c3c',
            color: '#e74c3c',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(231, 76, 60, 0.1)')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;