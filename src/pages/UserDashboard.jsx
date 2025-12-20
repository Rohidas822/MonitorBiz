// src/pages/UserDashboard.jsx
import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa', // Soft light gray background
        fontFamily: '"Segoe UI", "Roboto", sans-serif'
      }}
    >
      {/* Main Layout: Sidebar + Content */}
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ flexShrink: 0 }}>
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            marginLeft: '250px', // Matches Sidebar width
            marginTop: '60px', // Account for Navbar height (if added later)
            padding: '24px',
            backgroundColor: '#ffffff', // Clean white content background
            minHeight: 'calc(100vh - 60px)', // Adjust for navbar
            boxSizing: 'border-box',
            transition: 'margin-left 0.2s ease' // Smooth sidebar toggle (optional)
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;