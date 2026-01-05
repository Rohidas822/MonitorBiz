// src/components/dashboard/Billing/EditCustomer.jsx
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
  FaEdit,
  FaPlus
} from "react-icons/fa";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    contactPerson: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    gst: "",
    paymentTerms: "Due on Receipt",
    billingAddress: "",
    shippingAddress: "",
    customerType: "individual",
  });

  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:3000/customers/${id}`);
        
        if (!response.ok) {
          throw new Error('Customer not found');
        }
        
        const customerData = await response.json();
        
        // Map the existing customer data to form state
        setFormData({
          name: customerData.name || "",
          phone: customerData.phone || "",
          email: customerData.email || "",
          contactPerson: customerData.contactPerson || "",
          address: customerData.address || "",
          state: customerData.state || "",
          city: customerData.city || "",
          pincode: customerData.pincode || "",
          gst: customerData.gst || "",
          paymentTerms: customerData.paymentTerms || "Due on Receipt",
          billingAddress: customerData.billingAddress || "",
          shippingAddress: customerData.shippingAddress || "",
          customerType: customerData.customerType || "individual",
        });
      } catch (err) {
        console.error('Error fetching customer:', err);
        setError('Failed to load customer data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerTypeChange = (type) => {
    setFormData(prev => ({ ...prev, customerType: type }));
  };

  const handleGstStatusChange = (hasGst) => {
    if (!hasGst) {
      setFormData(prev => ({ ...prev, gst: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSuccess(false);
      setError(null);
      
      const response = await fetch(`http://localhost:3000/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update customer');
      }
      
      setSuccess(true);
      // Redirect after a brief delay to show success
      setTimeout(() => {
        navigate(`/dashboard/billing/customer/view/${id}`);
      }, 1000);
    } catch (err) {
      console.error('Error updating customer:', err);
      setError('Failed to update customer. Please try again.');
    }
  };

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

  // Constants for styling
  const primaryColor = "#FF6B00";
  const darkTextColor = "#111827";
  const lightGray = "#F3F4F6";
  const borderColor = "#D1D5DB";
  const backgroundColor = "#FFFFFF";

  return (
    <div
      style={{
        padding: "24px",
        background: "#F9FAFB",
        minHeight: "100vh",
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: darkTextColor,
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
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
        Back to Customer Details
      </button>

      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px", color: "#000000" }}>
        Edit Customer
      </h2>

      <div
        style={{
          background: backgroundColor,
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          padding: "28px",
          maxWidth: "900px",
        }}
      >
        {error && (
          <div
            style={{
              backgroundColor: "#FEF2F2",
              border: "1px solid #FECACA",
              color: "#DC2626",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "24px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}
        
        {success && (
          <div
            style={{
              backgroundColor: "#ECFDF5",
              border: "1px solid #A7F3D0",
              color: "#059669",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "24px",
              fontSize: "14px",
            }}
          >
            Customer updated successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Row 1: Name & Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "end" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
                Customer Name <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${borderColor}`,
                  fontSize: "14px",
                  color: darkTextColor,
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
                Phone <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${borderColor}`,
                  fontSize: "14px",
                  color: darkTextColor,
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
            </div>
          </div>

          {/* Row 2: Email & Contact Person */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${borderColor}`,
                  fontSize: "14px",
                  color: darkTextColor,
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
                Contact Person
              </label>
              <input
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${borderColor}`,
                  fontSize: "14px",
                  color: darkTextColor,
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
            </div>
          </div>

          {/* Customer Type Toggle */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#000000" }}>
              Customer Type
            </label>
            <div style={{ display: "inline-flex", gap: "8px", marginTop: "8px" }}>
              {[
                { value: "business", label: "Business", icon: "🏢" },
                { value: "individual", label: "Individual", icon: "👤" },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleCustomerTypeChange(type.value)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: `1px solid ${formData.customerType === type.value ? primaryColor : borderColor}`,
                    background: formData.customerType === type.value ? primaryColor : backgroundColor,
                    color: formData.customerType === type.value ? "#FFFFFF" : "#374151",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                  }}
                >
                  {type.icon} {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
              Address
            </label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: `1px solid ${borderColor}`,
                fontSize: "14px",
                color: darkTextColor,
                resize: "vertical",
              }}
              onFocus={(e) => (e.target.style.borderColor = primaryColor)}
              onBlur={(e) => (e.target.style.borderColor = borderColor)}
            />
          </div>

          {/* State, City, Pincode */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${borderColor}`,
                  fontSize: "14px",
                  color: darkTextColor,
                  backgroundColor: "#FFFFFF",
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${borderColor}`,
                  fontSize: "14px",
                  color: darkTextColor,
                  backgroundColor: "#FFFFFF",
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              >
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
                Pincode
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${borderColor}`,
                  fontSize: "14px",
                  color: darkTextColor,
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
            </div>
          </div>

          {/* GSTIN */}
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
              GSTIN
            </label>
            <input
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: `1px solid ${borderColor}`,
                fontSize: "14px",
                color: darkTextColor,
              }}
              onFocus={(e) => (e.target.style.borderColor = primaryColor)}
              onBlur={(e) => (e.target.style.borderColor = borderColor)}
            />
          </div>

          {/* Payment Terms & GST Status */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
                Payment Terms
              </label>
              <select
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${borderColor}`,
                  fontSize: "14px",
                  color: darkTextColor,
                  backgroundColor: "#FFFFFF",
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              >
                <option>Due on Receipt</option>
                <option>Net 15</option>
                <option>Net 30</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
                GST Status
              </label>
              <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="gstStatus"
                    checked={!!formData.gst}
                    onChange={() => handleGstStatusChange(true)}
                    style={{ accentColor: primaryColor }}
                  />
                  <span>With GST</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="gstStatus"
                    checked={!formData.gst}
                    onChange={() => handleGstStatusChange(false)}
                    style={{ accentColor: primaryColor }}
                  />
                  <span>Without GST</span>
                </label>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
              Billing Address
            </label>
            <textarea
              name="billingAddress"
              rows={3}
              value={formData.billingAddress}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: `1px solid ${borderColor}`,
                fontSize: "14px",
                color: darkTextColor,
                resize: "vertical",
              }}
              onFocus={(e) => (e.target.style.borderColor = primaryColor)}
              onBlur={(e) => (e.target.style.borderColor = borderColor)}
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
              Shipping Address
            </label>
            <textarea
              name="shippingAddress"
              rows={3}
              value={formData.shippingAddress}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: `1px solid ${borderColor}`,
                fontSize: "14px",
                color: darkTextColor,
                resize: "vertical",
              }}
              onFocus={(e) => (e.target.style.borderColor = primaryColor)}
              onBlur={(e) => (e.target.style.borderColor = borderColor)}
            />
          </div>

          {/* Submit Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "1px solid #D1D5DB",
                background: "transparent",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                background: primaryColor,
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <FaPlus size={14} />
              Update Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;