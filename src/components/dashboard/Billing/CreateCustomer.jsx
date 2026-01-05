// src/components/dashboard/Billing/CreateCustomer.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState("individual");

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGstStatusChange = (hasGst) => {
    if (!hasGst) {
      setFormData((prev) => ({ ...prev, gst: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create customer object with customerType
    const customerData = {
      ...formData,
      customerType,
      id: Date.now(), // Simple ID generation (use UUID in production)
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error('Failed to create customer');
      }

      const createdCustomer = await response.json();
      console.log('Customer created:', createdCustomer);
      
      alert("Customer created successfully!");
      navigate("/dashboard/billing/customer");
    } catch (err) {
      console.error('Error creating customer:', err);
      alert("Failed to create customer. Please try again.");
    }
  };

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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Customers
      </button>

      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px", color: "#000000" }}>
        Add New Customer
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
        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#000000" }}>
          Customer Information
        </h3>

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
                onClick={() => setCustomerType(type.value)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: `1px solid ${customerType === type.value ? primaryColor : borderColor}`,
                  background: customerType === type.value ? primaryColor : backgroundColor,
                  color: customerType === type.value ? "#FFFFFF" : "#374151",
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Row 1: Name & Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "end" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
                Customer Name <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                name="name"
                placeholder="Enter customer name"
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
                placeholder="Enter phone number"
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
                placeholder="Enter email"
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
                placeholder="Enter contact person name"
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

          {/* Address */}
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#000000" }}>
              Address
            </label>
            <textarea
              name="address"
              rows={3}
              placeholder="Enter address"
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
                onChange={handleChange}
                value={formData.state}
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
                onChange={handleChange}
                value={formData.city}
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
                placeholder="Enter pincode"
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
              placeholder="Enter GSTIN (optional)"
              onChange={handleChange}
              value={formData.gst}
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
                onChange={handleChange}
                value={formData.paymentTerms}
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
              placeholder="Enter billing address"
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
              placeholder="Enter shipping address"
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Create Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;