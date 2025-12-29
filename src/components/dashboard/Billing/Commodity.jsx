// Commodity.jsx
import React from 'react';
import {
  FaSearch,
  FaUserCircle,
  FaBox,
  FaCheck,
  FaExclamationTriangle,
  FaTruck,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

const Commodity = () => {
  // Mock data
  const commodities = [
    {
      id: 1,
      name: 'Consulting Hour',
      type: 'Service',
      supplier: 'Primary Supplier',
      stock: 'N/A',
      reorderPoint: '50 hour',
      unitCost: '₹100.00',
      status: 'Active',
    },
  ];

  const stats = [
    { title: 'Total Commodities', value: 1, icon: <FaBox /> },
    { title: 'Active Commodities', value: 1, icon: <FaCheck /> },
    { title: 'Low Stock', value: 0, icon: <FaExclamationTriangle /> },
    { title: 'Vendors', value: 0, icon: <FaTruck /> },
  ];

  // Custom orange color for consistency
  const orangeColor = '#FF6F00';

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 fw-bold text-dark">Commodities</h1>
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

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col-6 col-md-3" key={index}>
            <div
              className="card h-100 border-start"
              style={{ borderLeftColor: orangeColor }}
            >
              <div className="card-body d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: `${orangeColor}20`,
                    color: orangeColor,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-muted mb-1 small">{stat.title}</p>
                  <h5 className="mb-0 fw-bold text-dark">{stat.value}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="card shadow-sm">
        <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
          <div>
            <h2 className="h5 fw-bold text-dark mb-1">Commodities</h2>
            <small className="text-muted">Home &gt; Commodities</small>
          </div>
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
            New Commodity
          </button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">COMMODITY</th>
                  <th>SUPPLIER</th>
                  <th>STOCK</th>
                  <th>
                    REORDER POINT
                    <span className="ms-1 text-muted" style={{ fontSize: '0.75em' }}>
                      ?
                    </span>
                  </th>
                  <th>UNIT COST</th>
                  <th>STATUS</th>
                  <th className="pe-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {commodities.map((item) => (
                  <tr key={item.id}>
                    <td className="ps-4 align-middle">
                      <div className="d-flex align-items-center">
                        <span className="me-2">{item.name}</span>
                        <span
                          className="badge rounded-pill"
                          style={{
                            backgroundColor: '#e1f5fe',
                            color: '#01579b',
                          }}
                        >
                          {item.type}
                        </span>
                      </div>
                    </td>
                    <td className="align-middle">{item.supplier}</td>
                    <td className="align-middle">
                      <span
                        className="badge rounded-pill"
                        style={{
                          backgroundColor: '#e1f5fe',
                          color: '#01579b',
                        }}
                      >
                        {item.stock}
                      </span>
                    </td>
                    <td className="align-middle">{item.reorderPoint}</td>
                    <td className="align-middle">{item.unitCost}</td>
                    <td className="align-middle">
                      <span
                        className="badge rounded-pill"
                        style={{
                          backgroundColor: '#e8f5e9',
                          color: '#2e7d32',
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="pe-4 align-middle">
                      <div className="d-flex">
                        <button className="btn p-1 text-primary">
                          <FaEye />
                        </button>
                        <button className="btn p-1 text-warning">
                          <FaEdit />
                        </button>
                        <button className="btn p-1 text-danger">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commodity;