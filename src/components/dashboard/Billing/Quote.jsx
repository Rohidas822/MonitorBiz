// Quote.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUserCircle,
  FaFileAlt,
  FaPlus,
  FaUsers,
} from "react-icons/fa";

const Quote = () => {
  const navigate = useNavigate();
  const orangeColor = "#FF6F00";
  const darkTextColor = "#111827";
  const lightGray = "#F3F4F6";
  const borderColor = "#E5E7EB";
  const backgroundColor = "#F9FAFB";

  const handleCreateQuote = () => {
    navigate("/dashboard/billing/quote/new");
  };

  const handleAddCustomer = () => {
    navigate("/dashboard/billing/customer/create");
  };

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
          Quotations
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

      {/* Quotation Header Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 8px 0",
                color: "#000000",
              }}
            >
              Quotations
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "13px",
                color: "#6B7280",
                marginBottom: "8px",
              }}
            >
              <FaFileAlt size={12} />
              <span>Home</span>
              <span> / </span>
              <span style={{ color: "#4B5563" }}>Quotations</span>
            </div>
            <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
              Manage customer quotes and proposals
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "16px",
                backgroundColor: `${orangeColor}20`,
                color: orangeColor,
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: orangeColor,
                }}
              ></span>
              0 Total
            </div>
            <button
              onClick={handleCreateQuote}
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
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#E05A00")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = orangeColor)
              }
            >
              <FaPlus size={14} />
              New Quotation
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
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
            backgroundColor: `${orangeColor}10`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <FaFileAlt size={28} color={orangeColor} />
        </div>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            margin: "0 0 12px",
            color: "#000000",
          }}
        >
          No Quotations Yet
        </h3>
        <p
          style={{
            fontSize: "15px",
            color: "#6B7280",
            maxWidth: "500px",
            margin: "0 auto 28px",
          }}
        >
          Start creating professional quotations for your customers. Track
          proposals and convert them to invoices seamlessly.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleCreateQuote}
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#E05A00")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = orangeColor)
            }
          >
            <FaPlus size={14} />
            Create Quote
          </button>
          <button
            onClick={handleAddCustomer}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: "#374151",
              border: `1px solid ${borderColor}`,
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = orangeColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = borderColor)
            }
          >
            <FaUsers size={14} />
            Add Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote;