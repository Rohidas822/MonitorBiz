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
    setBillingHeight(220); // 5 items × ~30px = 150px
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
    padding: '8px 12px',
    borderRadius: '6px',
    display: 'block',
    transition: 'all 0.2s ease',
    fontSize: '14px'
  };

  const getLinkStyle = (path) => {
    if (isActive(path)) {
      return {
        ...baseLinkStyle,
        color: '#5C40FF',
        backgroundColor: 'rgba(92, 64, 255, 0.15)',
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
    backgroundColor: isOpen ? 'rgba(92, 64, 255, 0.06)' : 'transparent'
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
    color: isActive(path) ? '#5C40FF' : '#374151',
    backgroundColor: isActive(path) ? 'rgba(92, 64, 255, 0.1)' : 'transparent',
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
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
        zIndex: 100,
        overflowY: 'auto'
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: '22px',
          fontWeight: '800',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#111827'
        }}
      >
        <span style={{ color: '#5C40FF', fontSize: '24px' }}>📊</span>
        <span style={{ letterSpacing: '-0.5px' }}>MonitorBiz</span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Dashboard Button */}
        <Link
          to="/dashboard"
          style={topLevelStyle('/dashboard')}
        >
          <span>🏠</span>
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
              <span>💰</span>
              <span>Billing</span>
            </div>
            <span style={{ transition: 'transform 0.25s', transform: openBilling ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
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
            <div style={{ paddingLeft: '28px', display: 'flex', flexDirection: 'column', gap: '6px', }}>
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
              <span>📉</span>
              <span>Expense Tracking</span>
            </div>
            <span style={{ transition: 'transform 0.25s', transform: openExpense ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
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
          <span>📊</span>
          <span>Accounting</span>
        </Link>
      </nav>

      {/* Logout */}
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#FEF2F2',
            color: '#DC2626',
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
          onMouseOver={(e) => (e.target.style.backgroundColor = '#FEE2E2')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#FEF2F2')}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;