// src/components/dashboard/Billing/ViewCustomer.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaBuilding,
  FaFileAlt,
  FaHome,
  FaEdit 
} from "react-icons/fa";

const ViewCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // ✅ Using port 3000 (your JSON Server port)
        const response = await fetch(`http://localhost:3000/customers/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Customer not found');
          }
          throw new Error(`Server error: ${response.status}`);
        }
        
        const customerData = await response.json();
        setCustomer(customerData);
      } catch (err) {
        console.error('Error fetching customer:', err);
        setError(err.message || 'Failed to load customer');
      } finally {
        setLoading(false);
      }
    };

    if (id && !isNaN(id)) {
      fetchCustomer();
    } else {
      setError('Invalid customer ID');
      setLoading(false);
    }
  }, [id]);

  // Handle loading state
  if (loading) {
    return (
      <div
        style={{
          padding: "24px",
          background: "#F9FAFB",
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
              border: "3px solid #FF6B00",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          ></div>
          <p style={{ color: "#6B7280" }}>Loading customer details...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div
        style={{
          padding: "24px",
          background: "#F9FAFB",
          minHeight: "100vh",
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            padding: "48px 32px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
            Error Loading Customer
          </h3>
          <p style={{ fontSize: "15px", color: "#6B7280", margin: "0 0 28px" }}>
            {error}. Please check if JSON Server is running on port 3000.
          </p>
          <button
            onClick={() => navigate("/dashboard/billing/customer")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#FF6B00",
              color: "#FFFFFF",
              border: "none",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <FaArrowLeft style={{ marginRight: "6px" }} />
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  // Get customer initials for avatar
  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // Get business type display
  const getBusinessType = () => {
    return customer.customerType === 'business' ? 'Business' : 'Individual';
  };

  // Get GST status
  const getGstStatus = () => {
    return customer.gst ? customer.gst : 'No GST';
  };

  return (
    <div
      style={{
        padding: "24px",
        background: "#F9FAFB",
        minHeight: "100vh",
        fontFamily: '"Inter", sans-serif',
        color: "#1F2937",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/billing/customer")}
        style={{
          background: "none",
          border: "none",
          fontSize: "14px",
          fontWeight: "600",
          color: "#4B5563",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "24px",
        }}
      >
        <FaArrowLeft />
        Back to Customers
      </button>

      {/* Customer Details Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          padding: "28px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
          {/* Customer Avatar */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#FFF5EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "700",
              color: "#FF6B00",
            }}
          >
            {getInitials(customer.name)}
          </div>

          {/* Customer Info */}
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 8px 0", color: "#000000" }}>
              {customer.name}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "16px",
                  backgroundColor: "#ECFDF5",
                  color: "#059669",
                  fontSize: "12px",
                  fontWeight: "600",
                  display: "inline-block",
                }}
              >
                Active
              </span>
              <span style={{ color: "#6B7280", fontSize: "14px" }}>ID: {customer.id}</span>
            </div>
            <p style={{ fontSize: "14px", color: "#6B7280", margin: "0" }}>
              {getBusinessType()} • {getGstStatus()}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          {/* Contact Information */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px", color: "#000000", display: "flex", alignItems: "center", gap: "8px" }}>
              <FaUser />
              Contact Information
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <FaPhone style={{ color: "#6B7280", marginTop: "4px" }} />
                <div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>Phone</div>
                  <div style={{ fontWeight: "600", color: "#000000" }}>{customer.phone || "Not provided"}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <FaEnvelope style={{ color: "#6B7280", marginTop: "4px" }} />
                <div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>Email</div>
                  <div style={{ fontWeight: "600", color: "#000000" }}>{customer.email || "Not provided"}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <FaUser style={{ color: "#6B7280", marginTop: "4px" }} />
                <div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>Contact Person</div>
                  <div style={{ fontWeight: "600", color: "#000000" }}>{customer.contactPerson || "Not provided"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px", color: "#000000", display: "flex", alignItems: "center", gap: "8px" }}>
              <FaMapMarkerAlt />
              Address Information
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <FaHome style={{ color: "#6B7280", marginTop: "4px" }} />
                <div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>Address</div>
                  <div style={{ fontWeight: "600", color: "#000000" }}>{customer.address || "Not provided"}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <FaBuilding style={{ color: "#6B7280", marginTop: "4px" }} />
                <div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>City, State, Pincode</div>
                  <div style={{ fontWeight: "600", color: "#000000" }}>
                    {customer.city || "N/A"}, {customer.state || "N/A"} - {customer.pincode || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px", color: "#000000", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaFileAlt />
            Additional Information
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>GSTIN</div>
              <div style={{ fontWeight: "600", color: "#000000" }}>{getGstStatus()}</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Payment Terms</div>
              <div style={{ fontWeight: "600", color: "#000000" }}>{customer.paymentTerms || "Not provided"}</div>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          <div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px", fontWeight: "600" }}>Billing Address</div>
            <div style={{ 
              padding: "12px", 
              backgroundColor: "#F9FAFB", 
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              minHeight: "60px"
            }}>
              {customer.billingAddress || "Not provided"}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px", fontWeight: "600" }}>Shipping Address</div>
            <div style={{ 
              padding: "12px", 
              backgroundColor: "#F9FAFB", 
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              minHeight: "60px"
            }}>
              {customer.shippingAddress || "Not provided"}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => navigate(`/dashboard/billing/customer/edit/${customer.id}`)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#FF6B00",
              color: "#FFFFFF",
              border: "none",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E05A00")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF6B00")}
          >
            <FaEdit />
            Edit Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;