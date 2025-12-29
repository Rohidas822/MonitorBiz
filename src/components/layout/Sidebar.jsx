// src/components/layout/Sidebar.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openSalesBilling, setOpenSalesBilling] = useState(false);
  const [openManagement, setOpenManagement] = useState(false);
  const [salesBillingHeight, setSalesBillingHeight] = useState(0);
  const [managementHeight, setManagementHeight] = useState(0);
  const location = useLocation();

  // Auto-expand sections based on active route
  useEffect(() => {
    if (location.pathname.startsWith("/dashboard/sales-billing")) {
      setOpenSalesBilling(true);
    } else if (location.pathname.startsWith("/dashboard/management")) {
      setOpenManagement(true);
    } else {
      setOpenSalesBilling(false);
      setOpenManagement(false);
    }
  }, [location.pathname]);

  const measureHeights = useCallback(() => {
    setSalesBillingHeight(230); // Adjusted for visual spacing
    setManagementHeight(230);
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

  // Base link style with orange and black color scheme
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
          M
        </div>
        <div>
          <div style={{ fontSize: "12px", fontWeight: "500", color: "#6B7280" }}>
            Administrator
          </div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#FFFFFF" }}>
            Monitorbizz
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

        {/* Sales & Billing Section */}
        <div>
          <button
            onClick={() => setOpenSalesBilling(!openSalesBilling)}
            style={sectionButtonStyle(openSalesBilling)}
            aria-expanded={openSalesBilling}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                className="icon-hover"
                style={{ fontSize: "18px", color: openSalesBilling ? "#FF6B00" : "#A1A1AA" }}
              >
                💰
              </span>
              <span>Sales & Billing</span>
            </div>
            <span
              className="rotate"
              style={{
                transform: openSalesBilling ? "rotate(180deg)" : "rotate(0deg)",
                color: "#FF6B00",
                transition: "transform 0.25s ease",
              }}
            >
              ▼
            </span>
          </button>

          <div
            style={{
              height: openSalesBilling ? `${salesBillingHeight}px` : "0px",
              opacity: openSalesBilling ? 1 : 0,
              overflow: "hidden",
              transition: "height 0.3s ease, opacity 0.2s ease",
              marginTop: openSalesBilling ? "8px" : "0",
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
                { to: "/dashboard/sales-billing/customers", label: "Customers" },
                { to: "/dashboard/sales-billing/commodity", label: "Commodity" },
                { to: "/dashboard/sales-billing/quotations", label: "Quotations" },
                { to: "/dashboard/sales-billing/invoices", label: "Invoices" },
                { to: "/dashboard/sales-billing/expenses", label: "Expenses" },
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

        {/* Management Section */}
        <div>
          <button
            onClick={() => setOpenManagement(!openManagement)}
            style={sectionButtonStyle(openManagement)}
            aria-expanded={openManagement}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                className="icon-hover"
                style={{ fontSize: "18px", color: openManagement ? "#FF6B00" : "#A1A1AA" }}
              >
                👥
              </span>
              <span>Management</span>
            </div>
            <span
              className="rotate"
              style={{
                transform: openManagement ? "rotate(180deg)" : "rotate(0deg)",
                color: "#FF6B00",
                transition: "transform 0.25s ease",
              }}
            >
              ▼
            </span>
          </button>

          <div
            style={{
              height: openManagement ? `${managementHeight}px` : "0px",
              opacity: openManagement ? 1 : 0,
              overflow: "hidden",
              transition: "height 0.3s ease, opacity 0.2s ease",
              marginTop: openManagement ? "8px" : "0",
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
                { to: "/dashboard/management/team", label: "Team" },
                { to: "/dashboard/management/business-profile", label: "Business Profile" },
                { to: "/dashboard/management/reports", label: "Reports" },
                { to: "/dashboard/management/activity-log", label: "Activity Log" },
                { to: "/dashboard/management/aging-report", label: "Aging Report" },
                { to: "/dashboard/management/performance", label: "Performance" },
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