// src/pages/Dashboard.jsx (Bootstrap Version)
import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaUsers, FaFileAlt, FaChartLine, FaClock, FaArrowRight, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for dashboard
  const todayOverview = {
    totalCustomers: 1,
    quotationsThisMonth: 0,
    totalInvoices: 0
  };

  const salesSummary = {
    revenueThisMonth: 0,
    outstandingInvoices: 0,
    avgPaymentDays: 0,
    topCustomers: []
  };

  const setupProgress = [
    { id: 1, title: 'Account Created', completed: true, description: 'Your Monitorbizz account is ready!' },
    { id: 2, title: 'Add Commodity', completed: true, description: 'Set up your products and materials' },
    { id: 3, title: 'Add Customers', completed: true, description: 'Build your customer database' },
    { id: 4, title: 'Create Quotations/Invoices', completed: false, description: 'Start billing your customers' }
  ];

  const businessDetails = {
    businessId: 50,
    plan: 'Free Plan',
    owner: 'Rohidas Raghu Lakade'
  };

  const user = {
    name: 'Rohidas Raghu Lakade',
    role: 'Administrator',
    business: 'Cleaning Services',
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-bottom border-gray-200">
        <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <h1 className="h5 fw-bold text-orange-600 mb-0">Monitorbizz</h1>
          </div>
          
          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control ps-4 pe-3 py-2 border border-gray-300 rounded-pill"
              />
              <FaSearch className="position-absolute top-50 start-0 translate-middle-y text-gray-400 ms-2" />
            </div>
            
            <div className="position-relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
              >
                <span className="fw-medium">{user.name}</span>
                <FaArrowRight className="text-gray-400" />
              </button>
              
              {isMenuOpen && (
                <div className="position-absolute end-0 mt-2 w-200 bg-white rounded shadow border border-gray-200 z-50">
                  <div className="py-2">
                    <a href="/profile" className="dropdown-item d-flex align-items-center">
                      <FaUser className="me-2" /> My Account
                    </a>
                    <a href="/team" className="dropdown-item d-flex align-items-center">
                      <FaUsers className="me-2" /> Team
                    </a>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item d-flex align-items-center w-100"
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
      <div className="container-fluid px-4 py-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-4 p-4 mb-4 text-black">
          <div className="row align-items-start">
            <div className="col-md-8">
              <h2 className="h4 fw-bold mb-2">Welcome back, {user.name}!</h2>
              <p className="mb-3">{user.business} • {user.role}</p>
              <div className="d-flex align-items-center mb-3">
                <FaClock className="me-2" />
                {user.date} • {user.time}
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center me-4">
                  <span className="display-6 fw-bold">50</span>
                  <span className="ms-2 small">Business ID</span>
                </div>
                <div className="bg-white bg-opacity-20 rounded-circle p-2">
                  <FaChartLine className="fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Overview */}
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3 className="h5 fw-bold mb-0">Today's Overview</h3>
            <div className="d-flex align-items-center text-green-500">
              <div className="w-3 h-3 bg-green-500 rounded-circle me-2"></div>
              Live Data
            </div>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {/* Total Customers */}
              <div className="col-md-4">
                <div className="card h-100 border border-blue-200 bg-blue-50">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="display-5 fw-bold text-blue-600">{todayOverview.totalCustomers}</div>
                      <div className="small fw-medium text-blue-800">Total Customers</div>
                      <div className="small text-blue-600">Active clients</div>
                    </div>
                    <FaUsers className="text-blue-400 fs-3" />
                  </div>
                </div>
              </div>
              
              {/* Quotations This Month */}
              <div className="col-md-4">
                <div className="card h-100 border border-green-200 bg-green-50">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="display-5 fw-bold text-green-600">{todayOverview.quotationsThisMonth}</div>
                      <div className="small fw-medium text-green-800">Quotations This Month</div>
                      <div className="small text-green-600">Generated quotes</div>
                    </div>
                    <FaFileAlt className="text-green-400 fs-3" />
                  </div>
                </div>
              </div>
              
              {/* Total Invoices */}
              <div className="col-md-4">
                <div className="card h-100 border border-purple-200 bg-purple-50">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="display-5 fw-bold text-purple-600">{todayOverview.totalInvoices}</div>
                      <div className="small fw-medium text-purple-800">Total Invoices</div>
                      <div className="small text-purple-600">Billed amount</div>
                    </div>
                    <FaFileAlt className="text-purple-400 fs-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Summary */}
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h3 className="h5 fw-bold mb-0">Sales Summary</h3>
              <p className="small text-muted mb-0">Financial performance overview</p>
            </div>
            <a href="/reports" className="text-decoration-none text-orange-600 fw-medium">
              View Reports →
            </a>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              {/* Revenue This Month */}
              <div className="col-md-3">
                <div className="card h-100 border border-green-200 bg-green-50">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fs-4 fw-bold text-green-600">₹{salesSummary.revenueThisMonth}</div>
                      <div className="small text-green-800">Revenue (This Month)</div>
                    </div>
                    <FaFileAlt className="text-green-400 fs-4" />
                  </div>
                </div>
              </div>
              
              {/* Outstanding Invoices */}
              <div className="col-md-3">
                <div className="card h-100 border border-red-200 bg-red-50">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fs-4 fw-bold text-red-600">₹{salesSummary.outstandingInvoices}</div>
                      <div className="small text-red-800">Outstanding Invoices</div>
                    </div>
                    <FaTimes className="text-red-400 fs-4" />
                  </div>
                </div>
              </div>
              
              {/* Avg. Payment Days */}
              <div className="col-md-3">
                <div className="card h-100 border border-blue-200 bg-blue-50">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fs-4 fw-bold text-blue-600">{salesSummary.avgPaymentDays}</div>
                      <div className="small text-blue-800">Avg. Payment Days</div>
                    </div>
                    <FaClock className="text-blue-400 fs-4" />
                  </div>
                </div>
              </div>
              
              {/* Top Customers */}
              <div className="col-md-3">
                <div className="card h-100 border border-purple-200 bg-purple-50">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fs-4 fw-bold text-purple-600">Top Customers</div>
                      <div className="small text-purple-800">By Revenue</div>
                    </div>
                    <FaUsers className="text-purple-400 fs-4" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <h6 className="fw-medium text-gray-700 mb-1">Top 3 Customers</h6>
              <p className="small text-gray-500">No customer data available</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h3 className="h5 fw-bold mb-0">Quick Actions</h3>
              <p className="small text-muted mb-0">Get started with common tasks</p>
            </div>
            <button className="btn btn-link text-orange-600 fw-medium p-0">
              Fast Setup
            </button>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {/* Create Quote */}
              <div className="col-md-6">
                <div className="card h-100 border border-blue-200 bg-blue-50 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                    <FaFileAlt className="text-blue-600 fs-3 mb-3" />
                    <div className="fw-medium text-blue-800 mb-1">Create Quote</div>
                    <div className="small text-blue-600">New quotation</div>
                  </div>
                </div>
              </div>
              
              {/* Add Customer */}
              <div className="col-md-6">
                <div className="card h-100 border border-green-200 bg-green-50 text-center cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                    <FaUsers className="text-green-600 fs-3 mb-3" />
                    <div className="fw-medium text-green-800 mb-1">Add Customer</div>
                    <div className="small text-green-600">New client</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Progress & Business Details */}
        <div className="row g-4 mb-4">
          {/* Setup Progress */}
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h5 fw-bold mb-0">Setup Progress</h3>
                  <p className="small text-muted mb-0">Complete your billing setup</p>
                </div>
                <div className="d-flex align-items-center text-blue-500">
                  <div className="w-3 h-3 bg-blue-500 rounded-circle me-2"></div>
                  In Progress
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-3">
                  {setupProgress.map((item, index) => (
                    <div key={item.id} className="d-flex align-items-start gap-3">
                      <div className={`rounded-circle d-flex align-items-center justify-content-center ${
                        item.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`} style={{ width: '24px', height: '24px' }}>
                        {item.completed ? <FaCheck /> : <span>{item.id}</span>}
                      </div>
                      <div>
                        <div className="fw-medium text-gray-800">{item.title}</div>
                        <div className="small text-gray-500">{item.description}</div>
                        {item.completed && (
                          <div className="mt-2">
                            <div className="progress" style={{ height: '4px' }}>
                              <div className="progress-bar bg-green-500" role="progressbar" style={{ width: '100%' }}></div>
                            </div>
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
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h5 fw-bold mb-0">Business Details</h3>
                  <p className="small text-muted mb-0">Your account information</p>
                </div>
                <div className="d-flex align-items-center text-green-500">
                  <div className="w-3 h-3 bg-green-500 rounded-circle me-2"></div>
                  Active
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between">
                    <span className="small text-gray-500">Business ID</span>
                    <span className="fw-medium text-gray-800">{businessDetails.businessId}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="small text-gray-500">Plan</span>
                    <span className="fw-medium text-gray-800">{businessDetails.plan}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="small text-gray-500">Owner</span>
                    <span className="fw-medium text-gray-800">{businessDetails.owner}</span>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-blue-50 rounded">
                  <div className="d-flex align-items-center">
                    <FaChartLine className="text-blue-600 me-2" />
                    <div>
                      <div className="fw-medium text-blue-800">Upgrade Available</div>
                      <div className="small text-blue-600">Unlock manufacturing features</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <FaInfoCircle className="text-orange-600 me-2" />
              <h3 className="h5 fw-bold mb-0">Built for Makers, Not Offices</h3>
            </div>
            <p className="small text-gray-600 mb-3">
              Track every job, machine hour, and material gram. No more guessing where your costs go.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-success text-white">
                ✓ Real-time tracking
              </span>
              <span className="badge bg-warning text-dark">
                ✓ Cost analysis
              </span>
              <span className="badge bg-primary text-white">
                ✓ Machine monitoring
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;