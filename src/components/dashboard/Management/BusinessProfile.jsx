// src/components/dashboard/BusinessProfile.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUpload, FaEdit, FaCalendar, FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';

// Reusable animated wrapper
const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

const BusinessProfile = () => {
  const orangeColor = '#FF6F00'; // Primary orange
  const darkTextColor = '#111827'; // Deep black
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightGray = '#9CA3AF';
  const successColor = '#28a745';
  const warningColor = '#ffc107';

  const [formData, setFormData] = useState({
    businessLogo: null,
    businessName: 'Cleaning Services',
    legalName: 'Same as business name if not different',
    email: 'abc@gmail.com',
    phone: '7550764010',
    address: 'Katraj, Pune, Maharashtra',
    city: '',
    state: '',
    pinCode: '400001',
    gstin: '22AAAAA0000A1Z5',
    pan: 'ABCDE1234F',
    hsnSac: '9964',
    currency: 'INR',
    financialYearStart: '',
    paymentTerms: '30',
    termsAndConditions: 'Default terms and conditions for quotations and invoices...',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, businessLogo: file }));
    }
  };

  const handleSave = () => {
    alert('Profile saved successfully!');
    // Add API call here
  };

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: darkTextColor,
      }}
    >
      {/* Header */}
      <AnimatedSection>
        <div
          style={{
            marginBottom: '24px',
          }}
        >
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0', color: darkTextColor }}>
            Business Profile
          </h1>
          <p style={{ fontSize: '14px', color: lightGray, margin: '0' }}>
            Complete your business information for professional quotations and invoices.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '12px',
              fontSize: '13px',
              color: warningColor,
            }}
          >
            <FaCheck size={14} />
            <span>Step 1 of 1: Complete your business profile</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: "#ef6f20ff",
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ef6f20ff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ef6f20ff")}
          >
            <FaUpload size={14} />
            Load Sample Data
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              color: darkTextColor,
              border: `1px solid ${borderColor}`,
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = orangeColor)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = borderColor)}
          >
            <FaFilePdf size={14} />
            Preview PDF
          </button>
        </div>
      </AnimatedSection>

      {/* Business Identity */}
      <AnimatedSection delay={0.1}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: '700',
              margin: '0 0 16px 0',
              color: darkTextColor,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: orangeColor }}>📁</span> Business Identity
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                Business Logo *
              </label>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  border: `1px dashed ${borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F3F4F6',
                  position: 'relative',
                }}
              >
                {formData.businessLogo ? (
                  <img
                    src={URL.createObjectURL(formData.businessLogo)}
                    alt="Logo"
                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                  />
                ) : (
                  <span style={{ fontSize: '24px', color: lightGray }}>C</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  marginTop: '8px',
                  fontSize: '14px',
                  color: darkTextColor,
                  padding: '8px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  width: '100%',
                }}
              />
              <p style={{ fontSize: '12px', color: lightGray, marginTop: '4px' }}>
                JPG, PNG only. Max 2MB. Auto-resized to 200x200px for PDFs.
              </p>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter business name"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                Legal Name
              </label>
              <input
                type="text"
                name="legalName"
                value={formData.legalName}
                onChange={handleInputChange}
                placeholder="Same as business name if not different"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact & Address */}
      <AnimatedSection delay={0.2}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: '700',
              margin: '0 0 16px 0',
              color: darkTextColor,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: orangeColor }}>📞</span> Contact & Address
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ gridColumn: '1 / span 2' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                Address *
              </label>
              <div
                style={{
                  position: 'relative',
                }}
              >
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    fontSize: '14px',
                    color: darkTextColor,
                    outline: 'none',
                  }}
                />
                <FaEdit
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: lightGray,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                PIN Code
              </label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                placeholder="Enter PIN code"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Tax Compliance */}
      <AnimatedSection delay={0.3}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: '700',
              margin: '0 0 16px 0',
              color: darkTextColor,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: orangeColor }}>💰</span> Tax Compliance
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                GSTIN
              </label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
                placeholder="Enter GSTIN"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: '12px', color: lightGray, marginTop: '4px' }}>
                15 characters. Required for B2B invoices.
              </p>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                PAN
              </label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleInputChange}
                placeholder="Enter PAN"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: '12px', color: lightGray, marginTop: '4px' }}>
                10 characters. Format: ABCDE1234F
              </p>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                HSN/SAC Profile
              </label>
              <input
                type="text"
                name="hsnSac"
                value={formData.hsnSac}
                onChange={handleInputChange}
                placeholder="Enter HSN/SAC code"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: '12px', color: lightGray, marginTop: '4px' }}>
                Default HSN/SAC code for your products/services
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Financial Settings */}
      <AnimatedSection delay={0.4}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: '700',
              margin: '0 0 16px 0',
              color: darkTextColor,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: orangeColor }}>📊</span> Financial Settings
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath d='M7 10l5 5 5-5z' fill='%239CA3AF'/%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '12px',
                }}
              >
                <option value="INR">INR ₹</option>
                <option value="USD">USD $</option>
                <option value="EUR">EUR €</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                Financial Year Start
              </label>
              <div
                style={{
                  position: 'relative',
                }}
              >
                <input
                  type="text"
                  name="financialYearStart"
                  value={formData.financialYearStart}
                  onChange={handleInputChange}
                  placeholder="dd mm yyyy"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    fontSize: '14px',
                    color: darkTextColor,
                    outline: 'none',
                  }}
                />
                <FaCalendar
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: lightGray,
                    cursor: 'pointer',
                  }}
                />
              </div>
              <p style={{ fontSize: '12px', color: lightGray, marginTop: '4px' }}>
                Invoice numbering resets annually
              </p>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: darkTextColor,
                }}
              >
                Payment Terms (Days)
              </label>
              <input
                type="number"
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
                placeholder="Enter days"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: '12px', color: lightGray, marginTop: '4px' }}>
                Default payment due period
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Branding */}
      <AnimatedSection delay={0.5}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: '700',
              margin: '0 0 16px 0',
              color: darkTextColor,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: orangeColor }}>🎨</span> Branding
          </h2>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: darkTextColor,
              }}
            >
              Terms & Conditions
            </label>
            <div
              style={{
                position: 'relative',
              }}
            >
              <textarea
                name="termsAndConditions"
                value={formData.termsAndConditions}
                onChange={handleInputChange}
                placeholder="Default terms and conditions for quotations and invoices..."
                rows="6"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
              <FaEdit
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  color: lightGray,
                  cursor: 'pointer',
                }}
              />
            </div>
            <p style={{ fontSize: '12px', color: lightGray, marginTop: '4px' }}>
              This will appear on your quotes and invoices
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: lightGray,
                marginTop: '8px',
              }}
            >
              <span>0/1200 characters</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Save Button */}
      <AnimatedSection delay={0.6}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: lightGray,
            }}
          >
            <FaCheck size={14} color={successColor} />
            <span>Changes are auto-saved as draft</span>
          </div>
          <button
            onClick={handleSave}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: orangeColor,
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E05A00')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = orangeColor)}
          >
            <FaCheck size={14} />
            Save Profile
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default BusinessProfile;