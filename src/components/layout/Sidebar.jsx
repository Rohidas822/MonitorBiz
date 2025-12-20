// src/components/layout/Sidebar.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [openBilling, setOpenBilling] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [billingHeight, setBillingHeight] = useState(0);
  const [expenseHeight, setExpenseHeight] = useState(0);
  const location = useLocation();

  // Auto-expand sections based on active route
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard/billing')) {
      setOpenBilling(true);
    } else if (location.pathname.startsWith('/dashboard/expense')) {
      setOpenExpense(true);
    } else {
      setOpenBilling(false);
      setOpenExpense(false);
    }
  }, [location.pathname]);

  // Measure dropdown heights (5 billing items, 5 expense items)
  const measureHeights = useCallback(() => {
    setBillingHeight(220); // 5 items × ~30px = 150px + padding
    setExpenseHeight(160); // 5 items
  }, []);

  useEffect(() => {
    measureHeights();
    window.addEventListener('resize', measureHeights);
    return () => window.removeEventListener('resize', measureHeights);
  }, [measureHeights]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  const isActive = (path) => location.pathname === path;

  // Base link style
  const baseLinkStyle = {
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    display: 'block',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: '500'
  };

  const getLinkStyle = (path) => {
    if (isActive(path)) {
      return {
        ...baseLinkStyle,
        color: '#6C47FF',
        backgroundColor: 'rgba(108, 71, 255, 0.1)',
        fontWeight: '600'
      };
    }
    return {
      ...baseLinkStyle,
      color: '#6B7280',
      fontWeight: '500'
    };
  };

  const sectionButtonStyle = (isOpen) => ({
    background: 'transparent',
    border: 'none',
    color: '#1F2937',
    textAlign: 'left',
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.2s',
    backgroundColor: isOpen ? 'rgba(108, 71, 255, 0.06)' : 'transparent'
  });

  // Style for top-level nav items like Dashboard & Accounting
  const topLevelStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '15px',
    color: isActive(path) ? '#6C47FF' : '#374151',
    backgroundColor: isActive(path) ? 'rgba(108, 71, 255, 0.1)' : 'transparent',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease'
  });

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#FFFFFF',
        height: '100vh',
        position: 'fixed',
        padding: '24px 16px',
        boxSizing: 'border-box',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        zIndex: 100,
        overflowY: 'auto',
        borderRight: '1px solid #E5E7EB'
      }}
    >
      {/* Logo / Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: '#F9FAFB',
          marginBottom: '24px',
          border: '1px solid #E5E7EB'
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#6C47FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#FFFFFF'
          }}
        >
          👤
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280' }}>Product Designer</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Andrew Smith</div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Dashboard Button */}
        <Link
          to="/dashboard"
          style={topLevelStyle('/dashboard')}
        >
          <span style={{ color: '#6C47FF', fontSize: '18px' }}>📊</span>
          <span>Dashboard</span>
        </Link>

        {/* Billing Section */}
        <div>
          <button
            onClick={() => setOpenBilling(!openBilling)}
            style={sectionButtonStyle(openBilling)}
            aria-expanded={openBilling}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#6C47FF', fontSize: '18px' }}>💰</span>
              <span>Billing</span>
            </div>
            <span style={{ transition: 'transform 0.25s', transform: openBilling ? 'rotate(180deg)' : 'rotate(0deg)', color: '#6C47FF' }}>▼</span>
          </button>

          <div
            style={{
              height: openBilling ? `${billingHeight}px` : '0px',
              opacity: openBilling ? 1 : 0,
              overflow: 'hidden',
              transition: 'height 0.3s ease, opacity 0.2s ease',
              marginTop: openBilling ? '8px' : '0'
            }}
          >
            <div style={{ paddingLeft: '28px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Link to="/dashboard/billing/customer" style={getLinkStyle('/dashboard/billing/customer')}>Customer Info</Link>
              <Link to="/dashboard/billing/quote" style={getLinkStyle('/dashboard/billing/quote')}>Quote</Link>
              <Link to="/dashboard/billing/invoice" style={getLinkStyle('/dashboard/billing/invoice')}>Invoice</Link>
              <Link to="/dashboard/billing/payment" style={getLinkStyle('/dashboard/billing/payment')}>Payment</Link>
              <Link to="/dashboard/billing/items" style={getLinkStyle('/dashboard/billing/items')}>Items</Link>
            </div>
          </div>
        </div>

        {/* Expense Tracking Section */}
        <div>
          <button
            onClick={() => setOpenExpense(!openExpense)}
            style={sectionButtonStyle(openExpense)}
            aria-expanded={openExpense}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#6C47FF', fontSize: '18px' }}>📉</span>
              <span>Expense Tracking</span>
            </div>
            <span style={{ transition: 'transform 0.25s', transform: openExpense ? 'rotate(180deg)' : 'rotate(0deg)', color: '#6C47FF' }}>▼</span>
          </button>

          <div
            style={{
              height: openExpense ? `${expenseHeight}px` : '0px',
              opacity: openExpense ? 1 : 0,
              overflow: 'hidden',
              transition: 'height 0.3s ease, opacity 0.2s ease',
              marginTop: openExpense ? '8px' : '0'
            }}
          >
            <div style={{ paddingLeft: '28px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Link to="/dashboard/expense/employee" style={getLinkStyle('/dashboard/expense/employee')}>Employee Expense</Link>
              <Link to="/dashboard/expense/company" style={getLinkStyle('/dashboard/expense/company')}>Company Client</Link>
              <Link to="/dashboard/expense/credit" style={getLinkStyle('/dashboard/expense/credit')}>Credit</Link>
              <Link to="/dashboard/expense/miscellaneous" style={getLinkStyle('/dashboard/expense/miscellaneous')}>Miscellaneous</Link>
              <Link to="/dashboard/expense/dynamic" style={getLinkStyle('/dashboard/expense/dynamic')}>Dynamic</Link>
            </div>
          </div>
        </div>

        {/* Accounting */}
        <Link
          to="/dashboard/accounting"
          style={topLevelStyle('/dashboard/accounting')}
        >
          <span style={{ color: '#6C47FF', fontSize: '18px' }}>📈</span>
          <span>Accounting</span>
        </Link>
      </nav>

      {/* Messages Section */}
      <div style={{ marginTop: '24px', borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '12px' }}>
          MESSAGES
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Erik Gunsel', 'Emily Smith', 'Arthur Adeik'].map((name, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                color: '#6B7280',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#F9FAFB')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#6C47FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#FFFFFF'
                }}
              >
                {name.charAt(0)}
              </div>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Task Button */}
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <button
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#FF9234',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'background-color 0.2s',
            outline: 'none'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#FF7F1F')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#FF9234')}
        >
          <span>➕</span>
          <span>Add New Task</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;