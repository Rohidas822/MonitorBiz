// src/components/layout/Sidebar.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openBilling, setOpenBilling] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [billingHeight, setBillingHeight] = useState(0);
  const [expenseHeight, setExpenseHeight] = useState(0);
  const location = useLocation();

  // Auto-expand sections based on active route
  useEffect(() => {
    if (location.pathname.startsWith("/dashboard/billing")) {
      setOpenBilling(true);
    } else if (location.pathname.startsWith("/dashboard/expense")) {
      setOpenExpense(true);
    } else {
      setOpenBilling(false);
      setOpenExpense(false);
    }
  }, [location.pathname]);

  const measureHeights = useCallback(() => {
    setBillingHeight(230); // Adjusted for visual spacing
    setExpenseHeight(180);
  }, []);

  useEffect(() => {
    measureHeights();
    window.addEventListener("resize", measureHeights);
    return () => window.removeEventListener("resize", measureHeights);
  }, [measureHeights]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname === path;

  // Base link style
  const baseLinkStyle = {
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    display: "block",
    transition: "all 0.25s ease",
    fontSize: "14px",
    color: "#9CA3AF", // Light gray for inactive
    fontWeight: "500",
  };

  const getLinkStyle = (path) => {
    if (isActive(path)) {
      return {
        ...baseLinkStyle,
        color: "#FF6B00",
        backgroundColor: "rgba(255, 107, 0, 0.1)",
        fontWeight: "600",
      };
    }
    return baseLinkStyle;
  };

  const sectionButtonStyle = (isOpen) => ({
    background: "transparent",
    border: "none",
    color: "#E5E7EB",
    textAlign: "left",
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background-color 0.25s",
    backgroundColor: isOpen ? "rgba(255, 107, 0, 0.1)" : "transparent",
  });

  const topLevelStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "15px",
    color: isActive(path) ? "#FF6B00" : "#E5E7EB",
    backgroundColor: isActive(path) ? "rgba(255, 107, 0, 0.1)" : "transparent",
    textDecoration: "none",
    transition: "background-color 0.25s ease",
  });

  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "#0F0F0F", // Near black
        height: "100vh",
        position: "fixed",
        padding: "24px 16px",
        boxSizing: "border-box",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        zIndex: 100,
        overflowY: "auto",
        borderRight: "1px solid #2D2D2D",
      }}
    >
      {/* Animated Icon Styles */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .icon-hover {
            display: inline-block;
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .icon-hover:hover {
            animation: bounce 0.5s ease;
            color: #FF6B00 !important;
          }
          .rotate {
            transition: transform 0.25s ease;
          }
        `}
      </style>

      {/* Logo / Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px",
          borderRadius: "12px",
          backgroundColor: "#1A1A1A",
          marginBottom: "24px",
          border: "1px solid #2D2D2D",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#FF6B00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          W
        </div>
        <div>
          <div style={{ fontSize: "12px", fontWeight: "500", color: "#6B7280" }}>
            Web Developer
          </div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#FFFFFF" }}>
            Vishwakarma Smith
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* Dashboard Button */}
        <Link to="/dashboard" style={topLevelStyle("/dashboard")}>
          <span
            className="icon-hover"
            style={{ fontSize: "18px", color: isActive("/dashboard") ? "#FF6B00" : "#A1A1AA" }}
          >
            📊
          </span>
          <span>Dashboard</span>
        </Link>

        {/* Billing Section */}
        <div>
          <button
            onClick={() => setOpenBilling(!openBilling)}
            style={sectionButtonStyle(openBilling)}
            aria-expanded={openBilling}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                className="icon-hover"
                style={{ fontSize: "18px", color: openBilling ? "#FF6B00" : "#A1A1AA" }}
              >
                💰
              </span>
              <span>Billing</span>
            </div>
            <span
              className="rotate"
              style={{
                transform: openBilling ? "rotate(180deg)" : "rotate(0deg)",
                color: "#FF6B00",
                transition: "transform 0.25s ease",
              }}
            >
              ▼
            </span>
          </button>

          <div
            style={{
              height: openBilling ? `${billingHeight}px` : "0px",
              opacity: openBilling ? 1 : 0,
              overflow: "hidden",
              transition: "height 0.3s ease, opacity 0.2s ease",
              marginTop: openBilling ? "8px" : "0",
              
            }}
          >
            <div
              style={{
                paddingLeft: "28px",
                display: "flex",
                flexDirection: "column",
              gap: "6px",
                
              }}
            >
              {[
                { to: "/dashboard/billing/customer", label: "Customer Info" },
                { to: "/dashboard/billing/quote", label: "Quote" },
                { to: "/dashboard/billing/invoice", label: "Invoice" },
                { to: "/dashboard/billing/payment", label: "Payment" },
                { to: "/dashboard/billing/items", label: "Items" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={getLinkStyle(item.to)}
                  className="icon-hover"
                >
                  {item.label}
                </Link>
              ))}
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
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                className="icon-hover"
                style={{ fontSize: "18px", color: openExpense ? "#FF6B00" : "#A1A1AA" }}
              >
                📉
              </span>
              <span>Expense Tracking</span>
            </div>
            <span
              className="rotate"
              style={{
                transform: openExpense ? "rotate(180deg)" : "rotate(0deg)",
                color: "#FF6B00",
                transition: "transform 0.25s ease",
              }}
            >
              ▼
            </span>
          </button>

          <div
            style={{
              height: openExpense ? `${expenseHeight}px` : "0px",
              opacity: openExpense ? 1 : 0,
              overflow: "hidden",
              transition: "height 0.3s ease, opacity 0.2s ease",
              marginTop: openExpense ? "8px" : "0",
            }}
          >
            <div
              style={{
                paddingLeft: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {[
                { to: "/dashboard/expense/employee", label: "Employee Expense" },
                { to: "/dashboard/expense/company", label: "Company Client" },
                { to: "/dashboard/expense/credit", label: "Credit" },
                { to: "/dashboard/expense/miscellaneous", label: "Miscellaneous" },
                { to: "/dashboard/expense/dynamic", label: "Dynamic" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={getLinkStyle(item.to)}
                  className="icon-hover"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Accounting */}
        <Link
          to="/dashboard/accounting"
          style={topLevelStyle("/dashboard/accounting")}
        >
          <span
            className="icon-hover"
            style={{ fontSize: "18px", color: isActive("/dashboard/accounting") ? "#FF6B00" : "#A1A1AA" }}
          >
            📈
          </span>
          <span>Accounting</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: "#FF6B00",
          color: "#000000",
          fontWeight: "700",
          fontSize: "14px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.25s, transform 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#FF8C33";
          e.target.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#FF6B00";
          e.target.style.transform = "scale(1)";
        }}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;