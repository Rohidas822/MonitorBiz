
import React, { useState, useEffect, useRef } from 'react';
import {
  FaSearch,
  FaUser,
  FaUsers,
  FaFileAlt,
  FaChartLine,
  FaClock,
  FaArrowRight,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaEllipsisV,
  FaMoneyBillWave,
  FaBoxOpen,
  FaUserFriends,
} from 'react-icons/fa';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const bannerRef = useRef(null);

  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const grayTextColor = '#4B5563';
  const lightGray = '#F3F4F6';
  const borderColor = '#E5E7EB';

  // Inject keyframes once on mount
  useEffect(() => {
    const styleId = 'dashboard-inline-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-16px) rotate(8deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes glowPulse {
          from { box-shadow: 0 0 8px rgba(255,255,255,0.3); }
          to { box-shadow: 0 0 20px rgba(255,255,255,0.6); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }

    // Scroll-triggered animation for banner
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      bannerRef.current.style.opacity = '0';
      bannerRef.current.style.transform = 'translateY(20px)';
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) observer.unobserve(bannerRef.current);
    };
  }, []);

  // Mock data
  const todayOverview = {
    totalCustomers: 1,
    quotationsThisMonth: 0,
    totalInvoices: 0,
  };

  const salesSummary = {
    revenueThisMonth: 0,
    outstandingInvoices: 0,
    avgPaymentDays: 0,
  };

  const setupProgress = [
    { id: 1, title: 'Account Created', completed: true, description: 'Your Monitorbizz account is ready!' },
    { id: 2, title: 'Add Commodity', completed: true, description: 'Set up your products and materials' },
    { id: 3, title: 'Add Customers', completed: true, description: 'Build your customer database' },
    { id: 4, title: 'Create Quotations/Invoices', completed: false, description: 'Start billing your customers' },
  ];

  const businessDetails = {
    businessId: 50,
    plan: 'Free Plan',
    owner: 'Rohidas Raghu Lakade',
  };

  const user = {
    name: 'Rohidas Raghu Lakade',
    role: 'Administrator',
    business: 'Cleaning Services',
    date: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setIsMenuOpen(false);
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="min-vh-100 bg-light" style={{ backgroundColor: '#ffffffff', position: 'absolute', width: '81%', top: "20px", }}>
      {/* Header */}
      <header
        className="bg- shadow-sm"
        style={{ borderBottom: `1px solid ${borderColor}`, }}
      >
        <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center" >
          <div className="d-flex align-items-center">
            <h1 className="h5 fw-bold mb-0" style={{ color: orangeColor }}>
              Monitorbizz
            </h1>
          </div>

          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
                style={{
                  paddingLeft: '36px',
                  paddingRight: '12px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  borderRadius: '20px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '0.875rem',
                }}
              />
              <FaSearch
                className="position-absolute"
                style={{
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: grayTextColor,
                }}
              />
            </div>

            <div className="position-relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="btn d-flex align-items-center gap-2"
                style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.875rem',
                  color: darkTextColor,
                }}
              >
                <span className="fw-medium">{user.name}</span>
                <FaEllipsisV size={14} style={{ color: grayTextColor }} />
              </button>

              {isMenuOpen && (
                <div
                  className="position-absolute end-0 mt-2"
                  style={{
                    width: '200px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-2">
                    <div
                      className="dropdown-item d-flex align-items-center py-2 px-3"
                      style={{ cursor: 'pointer', color: darkTextColor }}
                    >
                      <FaUser className="me-2" style={{ color: grayTextColor }} /> My Account
                    </div>
                    <div
                      className="dropdown-item d-flex align-items-center py-2 px-3"
                      style={{ cursor: 'pointer', color: darkTextColor }}
                    >
                      <FaUsers className="me-2" style={{ color: grayTextColor }} /> Team
                    </div>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item d-flex align-items-center py-2 px-3 w-100 text-start"
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#dc3545',
                        fontWeight: '500',
                      }}
                    >
                      <FaArrowRight className="me-2 rotate-180" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-fluid px-4 py-4" style={{ maxWidth: '1400px' }}>
        {/* Welcome Banner - ENHANCED WITH ANIMATIONS */}
        <div
          ref={bannerRef}
          className="rounded-4 p-5 mb-4 text-white position-relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${orangeColor}, #f2874eff)`,
            boxShadow: '0 4px 20px rgba(255,111,0,0.25)',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          {/* Floating Animated Icons (Live Background) */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            <FaChartLine
              style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                fontSize: '2rem',
                color: 'rgba(255,255,255,0.12)',
                animation: 'float 15s infinite ease-in-out',
                animationDelay: '0s',
              }}
            />
            <FaMoneyBillWave
              style={{
                position: 'absolute',
                top: '30%',
                right: '10%',
                fontSize: '1.8rem',
                color: 'rgba(255,255,255,0.12)',
                animation: 'float 15s infinite ease-in-out',
                animationDelay: '-3s',
              }}
            />
            <FaBoxOpen
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '15%',
                fontSize: '1.6rem',
                color: 'rgba(255,255,255,0.12)',
                animation: 'float 15s infinite ease-in-out',
                animationDelay: '-7s',
              }}
            />
            <FaUserFriends
              style={{
                position: 'absolute',
                bottom: '35%',
                right: '18%',
                fontSize: '1.7rem',
                color: 'rgba(255,255,255,0.12)',
                animation: 'float 15s infinite ease-in-out',
                animationDelay: '-11s',
              }}
            />
          </div>

          <div className="row align-items-center position-relative" style={{ zIndex: 1 }}>
            <div className="col-lg-8">
              <h2 className="h3 fw-bold mb-2" style={{ textShadow: '0 0 8px rgba(255,255,255,0.6)' }}>
                Welcome back, {user.name}!
              </h2>
              <p className="mb-3 opacity-90">{user.business} • {user.role}</p>
              <div className="d-flex align-items-center mb-3">
                <FaClock
                  style={{
                    marginRight: '0.5rem',
                    animation: 'pulse 2s infinite',
                  }}
                />
                <span>{user.date} • {user.time}</span>
              </div>
              <div className="d-flex align-items-center">
                <div
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    display: 'inline-block',
                  }}
                >
                  <span className="display-5 fw-bold me-2">50</span>
                  <span className="small opacity-90">Business ID</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-end d-none d-lg-block">
              <div
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                  animation: 'glowPulse 3s infinite alternate',
                }}
              >
                <FaChartLine size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Rest of Dashboard (unchanged structure, only inline styles used) */}
        {/* Stats Row */}
        <div className="row g-4 mb-4">
          {/* Total Customers */}
          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: '12px', border: `1px solid ${borderColor}` }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="display-6 fw-bold" style={{ color: orangeColor }}>
                    {todayOverview.totalCustomers}
                  </div>
                  <div className="fw-medium" style={{ color: darkTextColor }}>
                    Total Customers
                  </div>
                  <div className="small" style={{ color: grayTextColor }}>
                    Active clients
                  </div>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: `${orangeColor}10`,
                    color: orangeColor,
                  }}
                >
                  <FaUsers size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Quotations This Month */}
          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: '12px', border: `1px solid ${borderColor}` }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="display-6 fw-bold" style={{ color: '#10B981' }}>
                    {todayOverview.quotationsThisMonth}
                  </div>
                  <div className="fw-medium" style={{ color: darkTextColor }}>
                    Quotations This Month
                  </div>
                  <div className="small" style={{ color: grayTextColor }}>
                    Generated quotes
                  </div>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: '#10B98110',
                    color: '#10B981',
                  }}
                >
                  <FaFileAlt size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Total Invoices */}
          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: '12px', border: `1px solid ${borderColor}` }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="display-6 fw-bold" style={{ color: '#8B5CF6' }}>
                    {todayOverview.totalInvoices}
                  </div>
                  <div className="fw-medium" style={{ color: darkTextColor }}>
                    Total Invoices
                  </div>
                  <div className="small" style={{ color: grayTextColor }}>
                    Billed amount
                  </div>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: '#8B5CF610',
                    color: '#8B5CF6',
                  }}
                >
                  <FaFileAlt size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Summary */}
        <div
          className="card mb-4 border-0 shadow-sm"
          style={{ borderRadius: '12px', border: `1px solid ${borderColor}` }}
        >
          <div className="card-header d-flex justify-content-between align-items-center py-3">
            <div>
              <h3 className="h5 fw-bold mb-0" style={{ color: darkTextColor }}>
                Sales Summary
              </h3>
              <p className="small mb-0" style={{ color: grayTextColor }}>
                Financial performance overview
              </p>
            </div>
            <a
              href="/reports"
              className="text-decoration-none fw-medium"
              style={{ color: orangeColor }}
            >
              View Reports →
            </a>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-md-3">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#10B98110',
                      color: '#10B981',
                    }}
                  >
                    <FaFileAlt size={16} />
                  </div>
                  <div>
                    <div className="fw-bold" style={{ color: darkTextColor }}>
                      ₹{salesSummary.revenueThisMonth}
                    </div>
                    <div className="small" style={{ color: grayTextColor }}>
                      Revenue (This Month)
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#EF444410',
                      color: '#EF4444',
                    }}
                  >
                    <FaTimes size={16} />
                  </div>
                  <div>
                    <div className="fw-bold" style={{ color: darkTextColor }}>
                      ₹{salesSummary.outstandingInvoices}
                    </div>
                    <div className="small" style={{ color: grayTextColor }}>
                      Outstanding Invoices
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#3B82F610',
                      color: '#3B82F6',
                    }}
                  >
                    <FaClock size={16} />
                  </div>
                  <div>
                    <div className="fw-bold" style={{ color: darkTextColor }}>
                      {salesSummary.avgPaymentDays}
                    </div>
                    <div className="small" style={{ color: grayTextColor }}>
                      Avg. Payment Days
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#8B5CF610',
                      color: '#8B5CF6',
                    }}
                  >
                    <FaUsers size={16} />
                  </div>
                  <div>
                    <div className="fw-bold" style={{ color: darkTextColor }}>
                      Top Customers
                    </div>
                    <div className="small" style={{ color: grayTextColor }}>
                      By Revenue
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h6 className="fw-medium mb-1" style={{ color: darkTextColor }}>
                Top 3 Customers
              </h6>
              <p className="small" style={{ color: grayTextColor }}>
                No customer data available
              </p>
            </div>
          </div>
        </div>

        {/* Setup Progress & Business Details */}
        <div className="row g-4 mb-4">
          {/* Setup Progress */}
          <div className="col-lg-6">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: '12px', border: `1px solid ${borderColor}` }}
            >
              <div className="card-header py-3">
                <h3 className="h5 fw-bold mb-0" style={{ color: darkTextColor }}>
                  Setup Progress
                </h3>
                <p className="small mb-0" style={{ color: grayTextColor }}>
                  Complete your billing setup
                </p>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-4">
                  {setupProgress.map((item) => (
                    <div key={item.id} className="d-flex align-items-start gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '28px',
                          height: '28px',
                          backgroundColor: item.completed ? `${orangeColor}20` : lightGray,
                          color: item.completed ? orangeColor : grayTextColor,
                          border: item.completed ? `2px solid ${orangeColor}` : `1px solid ${borderColor}`,
                        }}
                      >
                        {item.completed ? <FaCheck size={12} /> : <span className="small">{item.id}</span>}
                      </div>
                      <div>
                        <div className="fw-medium mb-1" style={{ color: darkTextColor }}>
                          {item.title}
                        </div>
                        <div className="small" style={{ color: grayTextColor }}>
                          {item.description}
                        </div>
                        {item.completed && (
                          <div className="mt-2" style={{ height: '4px', backgroundColor: '#E5E7EB', borderRadius: '2px' }}>
                            <div
                              className="h-100"
                              style={{
                                width: '100%',
                                backgroundColor: orangeColor,
                                borderRadius: '2px',
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="col-lg-6">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: '12px', border: `1px solid ${borderColor}` }}
            >
              <div className="card-header py-3">
                <h3 className="h5 fw-bold mb-0" style={{ color: darkTextColor }}>
                  Business Details
                </h3>
                <p className="small mb-0" style={{ color: grayTextColor }}>
                  Your account information
                </p>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-3 mb-4">
                  <div className="d-flex justify-content-between">
                    <span className="small" style={{ color: grayTextColor }}>
                      Business ID
                    </span>
                    <span className="fw-medium" style={{ color: darkTextColor }}>
                      {businessDetails.businessId}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="small" style={{ color: grayTextColor }}>
                      Plan
                    </span>
                    <span className="fw-medium" style={{ color: darkTextColor }}>
                      {businessDetails.plan}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="small" style={{ color: grayTextColor }}>
                      Owner
                    </span>
                    <span className="fw-medium" style={{ color: darkTextColor }}>
                      {businessDetails.owner}
                    </span>
                  </div>
                </div>

                <div
                  className="p-3 rounded-2"
                  style={{ backgroundColor: `${orangeColor}08`, border: `1px solid ${orangeColor}20` }}
                >
                  <div className="d-flex align-items-start">
                    <FaChartLine className="me-2 mt-1" style={{ color: orangeColor }} />
                    <div>
                      <div className="fw-medium" style={{ color: darkTextColor }}>
                        Upgrade Available
                      </div>
                      <div className="small" style={{ color: grayTextColor }}>
                        Unlock manufacturing features
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Banner */}
        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: '12px', border: `1px solid ${borderColor}` }}
        >
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <FaInfoCircle className="me-2" style={{ color: orangeColor }} />
              <h3 className="h5 fw-bold mb-0" style={{ color: darkTextColor }}>
                Built for Makers, Not Offices
              </h3>
            </div>
            <p className="small mb-3" style={{ color: grayTextColor }}>
              Track every job, machine hour, and material gram. No more guessing where your costs go.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span
                className="badge py-2 px-3"
                style={{
                  backgroundColor: '#10B98115',
                  color: '#10B981',
                  fontWeight: '500',
                  borderRadius: '6px',
                }}
              >
                Real-time tracking
              </span>
              <span
                className="badge py-2 px-3"
                style={{
                  backgroundColor: '#F59E0B15',
                  color: '#D97706',
                  fontWeight: '500',
                  borderRadius: '6px',
                }}
              >
                Cost analysis
              </span>
              <span
                className="badge py-2 px-3"
                style={{
                  backgroundColor: '#3B82F615',
                  color: '#2563EB',
                  fontWeight: '500',
                  borderRadius: '6px',
                }}
              >
                Machine monitoring
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;