// src/components/dashboard/Billing/Commodity.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

const Commodity = () => {
  const navigate = useNavigate();
  const [commodities, setCommodities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orangeColor = "#FF6F00";
  const darkTextColor = "#111827";
  const lightGray = "#F3F4F6";
  const borderColor = "#E5E7EB";
  const backgroundColor = "#F9FAFB";

  // Fetch commodities from JSON Server
  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:3000/commodities');
        
        if (!response.ok) {
          throw new Error('Failed to fetch commodities');
        }
        
        const data = await response.json();
        setCommodities(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching commodities:', err);
        setError('Failed to load commodities. Please check if JSON Server is running on port 3000.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommodities();
  }, []);

  // Calculate stats
  const totalCommodities = commodities.length;
  const activeCommodities = commodities.filter(c => c.status !== 'Inactive').length;
  const lowStock = commodities.filter(c => {
    // For services, stock is "N/A", so skip them
    if (c.type === 'Service' || c.stock === 'N/A') return false;
    const stockValue = parseFloat(c.stock);
    const reorderPointValue = parseFloat(c.reorderPoint);
    return !isNaN(stockValue) && !isNaN(reorderPointValue) && stockValue <= reorderPointValue;
  }).length;
  const vendors = new Set(commodities.map(c => c.supplier).filter(supplier => supplier)).size;

  // Handle delete commodity
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/commodities/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete commodity');
      }

      // Remove from local state
      setCommodities(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting commodity:', err);
      alert('Failed to delete commodity. Please try again.');
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "24px",
          backgroundColor: backgroundColor,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "3px solid #FF6F00",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          ></div>
          <p style={{ color: "#6B7280" }}>Loading commodities...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "24px",
          backgroundColor: backgroundColor,
          minHeight: "100vh",
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            padding: "48px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#FEF2F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <div style={{ color: "#EF4444", fontSize: "28px" }}>!</div>
          </div>
          <h3 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 12px", color: "#000000" }}>
            Error Loading Commodities
          </h3>
          <p style={{ fontSize: "15px", color: "#6B7280", margin: "0 0 28px" }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: orangeColor,
              color: "#FFFFFF",
              border: "none",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <FaPlus size={14} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Commodities",
      value: totalCommodities,
      icon: <FaBox color="#3B82F6" size={20} />,
    },
    {
      title: "Active Commodities",
      value: activeCommodities,
      icon: <FaCheck color="#10B981" size={20} />,
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: <FaExclamationTriangle color="#F59E0B" size={20} />,
    },
    { 
      title: "Vendors", 
      value: vendors, 
      icon: <FaTruck color="#8B5CF6" size={20} /> 
    },
  ];

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: backgroundColor,
        minHeight: "100vh",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: darkTextColor,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            margin: 0,
            color: "#000000",
          }}
        >
          Commodities
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Search */}
          <div style={{ position: "relative", width: "220px" }}>
            <FaSearch
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6B7280",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              style={{
                width: "100%",
                paddingLeft: "36px",
                paddingRight: "12px",
                paddingTop: "8px",
                paddingBottom: "8px",
                borderRadius: "8px",
                border: `1px solid ${borderColor}`,
                fontSize: "14px",
                color: darkTextColor,
                outline: "none",
              }}
            />
          </div>

          {/* User Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            }}
          >
            <FaUserCircle size={20} color="#4B5563" />
            <span>Rohidas Raghu Lakade</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="#6B7280"
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: `1px solid ${borderColor}`,
              transition: "box-shadow 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: `${stat.icon.props.color}10`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
              }}
            >
              {stat.icon}
            </div>
            <div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  margin: "0 0 4px 0",
                }}
              >
                {stat.title}
              </p>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  margin: 0,
                  color: "#000000",
                }}
              >
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: `1px solid ${borderColor}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 4px 0",
                color: "#000000",
              }}
            >
              Commodities
            </h2>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
              Home &gt; Commodities
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/billing/commodity/new")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: orangeColor,
              color: "#FFFFFF",
              border: "none",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#E05A00")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = orangeColor)
            }
          >
            <FaPlus size={14} />
            New Commodity
          </button>
        </div>

        {/* Empty State */}
        {commodities.length === 0 ? (
          <div style={{ padding: "48px 32px", textAlign: "center" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: `${orangeColor}10`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <FaBox size={28} color={orangeColor} />
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 12px", color: "#000000" }}>
              No Commodities Yet
            </h3>
            <p style={{ fontSize: "15px", color: "#6B7280", margin: "0 0 28px" }}>
              Start by creating your first commodity to manage inventory and pricing.
            </p>
            <button
              onClick={() => navigate("/dashboard/billing/commodity/new")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: orangeColor,
                color: "#FFFFFF",
                border: "none",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              <FaPlus size={14} />
              Create Commodity
            </button>
          </div>
        ) : (
          /* Table */
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB", textAlign: "left" }}>
                  {[
                    "COMMODITY",
                    "SUPPLIER",
                    "STOCK",
                    "REORDER POINT",
                    "UNIT COST",
                    "STATUS",
                    "ACTIONS",
                  ].map((header, idx) => (
                    <th
                      key={header}
                      style={{
                        padding:
                          idx === 0
                            ? "12px 24px"
                            : idx === 6
                            ? "12px 24px"
                            : "12px 16px",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#6B7280",
                        textTransform: "uppercase",
                        borderBottom: `2px solid ${borderColor}`,
                      }}
                    >
                      {header}
                      {header === "REORDER POINT" && (
                        <span
                          style={{
                            marginLeft: "4px",
                            fontSize: "0.75em",
                            color: "#9CA3AF",
                          }}
                        >
                          (?)
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {commodities.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FCFCFD")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FFFFFF")
                    }
                  >
                    <td style={{ padding: "16px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span style={{ fontWeight: "600", color: "#000000" }}>
                          {item.commodityName || item.name}
                        </span>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "16px",
                            backgroundColor: "#E1F5FE",
                            color: "#01579B",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {item.type}
                        </span>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#6B7280",
                            marginTop: "4px",
                          }}
                        >
                          SKU: {item.sku || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 16px", color: "#4B5563" }}>
                      {item.supplier || "N/A"}
                    </td>
                    <td style={{ padding: "16px 16px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "16px",
                          backgroundColor: item.stock === "0" || (item.stock && parseFloat(item.stock) === 0) ? "#FEF2F2" : "#E1F5FE",
                          color: item.stock === "0" || (item.stock && parseFloat(item.stock) === 0) ? "#DC2626" : "#01579B",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {item.stock || "N/A"} {item.unit || ""}
                      </span>
                      {item.stock === "0" || (item.stock && parseFloat(item.stock) === 0) && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#DC2626",
                            marginTop: "4px",
                          }}
                        >
                          Out of Stock
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "16px 16px", color: "#4B5563" }}>
                      {item.reorderPoint || "N/A"} {item.unit || ""}
                    </td>
                    <td
                      style={{
                        padding: "16px 16px",
                        color: "#4B5563",
                        fontWeight: "600",
                      }}
                    >
                      {typeof item.unitPrice === 'number' 
                        ? `₹${item.unitPrice.toFixed(2)}` 
                        : item.unitCost || 'N/A'}
                    </td>
                    <td style={{ padding: "16px 16px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "16px",
                          backgroundColor: item.status === 'Active' ? "#ECFDF5" : "#FEF2F2",
                          color: item.status === 'Active' ? "#059669" : "#DC2626",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {item.status || 'Active'}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", gap: "12px" }}>
                        {/* View */}
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/billing/commodity/view/${item.id}`
                            )
                          }
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#3B82F6",
                            fontSize: "16px",
                            padding: "4px",
                            borderRadius: "4px",
                          }}
                          aria-label="View commodity"
                        >
                          <FaEye />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/billing/commodity/edit/${item.id}`
                            )
                          }
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#F59E0B",
                            fontSize: "16px",
                            padding: "4px",
                            borderRadius: "4px",
                          }}
                          aria-label="Edit commodity"
                        >
                          <FaEdit />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id, item.commodityName || item.name)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#EF4444",
                            fontSize: "16px",
                            padding: "4px",
                            borderRadius: "4px",
                          }}
                          aria-label="Delete commodity"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Commodity;