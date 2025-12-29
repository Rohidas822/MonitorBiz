// Expenses.jsx
import React from 'react';
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

const Expenses = () => {
  // Custom orange color
  const orangeColor = '#FF6F00';

  // Mock stats data
  const stats = [
    {
      title: 'Total Expenses',
      value: 0,
      icon: <FaMoneyBillWave />,
      subtitle: 'All time',
      color: '#495057', // dark gray
    },
    {
      title: 'Paid Expenses',
      value: 0,
      icon: <FaCheck />,
      subtitle: 'Completed',
      color: '#28a745', // green (semantic)
    },
    {
      title: 'Pending Payment',
      value: 0,
      icon: <FaClock />,
      subtitle: 'Awaiting payment',
      color: '#ffc107', // yellow (semantic)
    },
    {
      title: 'Total Spent',
      value: '₹0',
      icon: <FaChartLine />,
      subtitle: 'Rs Expense value',
      color: '#6f42c1', // purple (semantic) — can change to orange
    },
  ];

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 fw-bold text-dark">Expenses</h1>
        <div className="d-flex align-items-center">
          <div className="position-relative me-3">
            <input
              type="text"
              placeholder="Search..."
              className="form-control ps-5"
              style={{
                borderColor: '#ced4da',
                width: '220px',
              }}
            />
            <FaSearch
              className="position-absolute"
              style={{
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6c757d',
              }}
            />
          </div>
          <div className="d-flex align-items-center text-dark">
            <FaUserCircle className="me-2" />
            <span>Rohidas Raghu Lakade</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down ms-1"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Expenses Header Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h2 className="h5 fw-bold text-dark mb-1">Expenses</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb p-0 mb-1">
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none text-dark">
                    <FaFileAlt className="me-1" /> Home
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Expenses
                </li>
              </ol>
            </nav>
            <p className="text-muted mb-0">Track and manage your business expenses</p>
          </div>
          <div className="d-flex align-items-center">
            <span
              className="badge rounded-pill me-3"
              style={{
                backgroundColor: orangeColor,
                color: 'white',
              }}
            >
              <span className="me-1">●</span> 0 Total
            </span>
            <button
              className="btn text-white d-flex align-items-center"
              style={{
                backgroundColor: orangeColor,
                borderColor: orangeColor,
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#e65100')}
              onMouseOut={(e) => (e.target.style.backgroundColor = orangeColor)}
            >
              <FaPlus className="me-2" />
              New Expense
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col-6 col-md-3" key={index}>
            <div className="card h-100 border-start" style={{ borderLeftColor: stat.color }}>
              <div className="card-body d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-muted mb-1 small">{stat.title}</p>
                  <h5 className="mb-0 fw-bold text-dark">{stat.value}</h5>
                  <small className="text-muted">{stat.subtitle}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <FaWallet
            size={40}
            className="text-primary mb-3"
            style={{ color: orangeColor }}
          />
          <h3 className="fw-bold text-dark mb-3">No Expenses Yet</h3>
          <p className="text-muted mb-4">
            Start tracking your business expenses by creating your first expense entry. Categorize, tag, and monitor spending efficiently.
          </p>
          <div className="d-inline-flex gap-2">
            <button
              className="btn text-white d-flex align-items-center"
              style={{
                backgroundColor: orangeColor,
                borderColor: orangeColor,
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#e65100')}
              onMouseOut={(e) => (e.target.style.backgroundColor = orangeColor)}
            >
              <FaPlus className="me-2" />
              Create Expense
            </button>
            <button
              className="btn btn-outline-dark d-flex align-items-center"
              style={{
                borderColor: '#495057',
                color: '#212529',
              }}
            >
              <FaChartLine className="me-2" />
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;