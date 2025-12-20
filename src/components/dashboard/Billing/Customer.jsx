// src/components/dashboard/Billing/Customer.jsx
import React, { useState } from 'react';
import { FaInfoCircle, FaCopy, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal","Delhi",
  "Jammu and Kashmir","Ladakh","Puducherry"
];

const COUNTRIES = [
  "India", "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "China", "Brazil"
];

const LANGUAGES = [
  "English", "Hindi", "Marathi"
];

const initialFormState = {
  companyName: '',
  gstNumber: '',
  billingAddress: '',
  billingCity: '',
  billingState: '',
  billingPincode: '',
  shippingAddress: '',
  shippingCity: '',
  shippingState: '',
  shippingPincode: '',
  phone: '',
  email: '',
  contactPerson: '',
  workPhone: '',
  mobilePhone: '',
  customerLanguage: 'English',
  billingAttention: '',
  billingCountry: 'India',
  billingStreet1: '',
  billingStreet2: '',
  shippingAttention: '',
  shippingCountry: 'India',
  shippingStreet1: '',
  shippingStreet2: ''
};

const Customer = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [activeTab, setActiveTab] = useState('address');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Customer data submitted:', formData);
    alert('Customer details saved successfully!');
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  const copyBillingToShipping = () => {
    setFormData(prev => ({
      ...prev,
      shippingAttention: prev.billingAttention,
      shippingCountry: prev.billingCountry,
      shippingStreet1: prev.billingStreet1,
      shippingStreet2: prev.billingStreet2,
      shippingCity: prev.billingCity,
      shippingState: prev.billingState,
      shippingPincode: prev.billingPincode
    }));
  };

  // Animated info icon component
  const InfoIcon = ({ tooltip }) => (
    <motion.span
      whileHover={{ scale: 1.2, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '6px',
        color: '#5C40FF',
        cursor: 'help'
      }}
      title={tooltip}
    >
      <FaInfoCircle />
    </motion.span>
  );

  // Animated copy icon component
  const CopyIcon = ({ onClick, tooltip }) => (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'transparent',
        border: 'none',
        color: '#5C40FF',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        padding: '6px 12px',
        borderRadius: '6px'
      }}
      title={tooltip}
    >
      <FaCopy size={14} />
      {tooltip}
    </motion.button>
  );

  return (
    <div style={{
      padding: '24px',
      fontFamily: '"Inter", -apple-system, Segoe UI, Roboto, sans-serif',
      color: '#374151',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
          Customer Information
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', marginTop: '8px' }}>
          Manage billing/shipping details, GST, and contact information
        </p>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        padding: '32px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Top Form Fields */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div>
            <label style={labelStyle}>
              Company Name *<InfoIcon tooltip="Registered business name" />
            </label>
            <input name="companyName" required value={formData.companyName} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>
              Contact Person<InfoIcon tooltip="Primary contact for communications" />
            </label>
            <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>
              Email Address<InfoIcon tooltip="Business email address" />
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>
                Work Phone<InfoIcon tooltip="Office/work contact number" />
              </label>
              <input name="workPhone" value={formData.workPhone} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>
                Mobile<InfoIcon tooltip="Mobile contact number" />
              </label>
              <input name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>
              Customer Language<InfoIcon tooltip="Preferred language for communication" />
            </label>
            <select name="customerLanguage" value={formData.customerLanguage} onChange={handleChange} style={inputStyle}>
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          borderBottom: '1px solid #E5E7EB',
          marginBottom: '24px',
          paddingBottom: '12px'
        }}>
          <div style={{
            display: 'flex',
            gap: '24px',
            borderBottom: '2px solid transparent',
            paddingBottom: '8px'
          }}>
            {['Other Details', 'Address', 'Contact Persons', 'Custom Fields', 'Remarks'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(/\s+/g, '-'))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: activeTab === tab.toLowerCase().replace(/\s+/g, '-') ? '600' : '400',
                  color: activeTab === tab.toLowerCase().replace(/\s+/g, '-') ? '#5C40FF' : '#6B7280',
                  borderBottom: activeTab === tab.toLowerCase().replace(/\s+/g, '-') ? '2px solid #5C40FF' : 'none',
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Address Section */}
        {activeTab === 'address' && (
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937' }}>Billing Address</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <CopyIcon onClick={copyBillingToShipping} tooltip="Copy billing address" />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div>
                <label style={labelStyle}>
                  Attention<InfoIcon tooltip="Recipient name for billing" />
                </label>
                <input name="billingAttention" value={formData.billingAttention} onChange={handleChange} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>
                  Country/Region
                </label>
                <select name="billingCountry" value={formData.billingCountry} onChange={handleChange} style={inputStyle}>
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  Address
                </label>
                <textarea
                  name="billingStreet1"
                  rows="1"
                  placeholder="Street 1"
                  value={formData.billingStreet1}
                  onChange={handleChange}
                  style={{ ...inputStyle, marginBottom: '8px' }}
                />
                <textarea
                  name="billingStreet2"
                  rows="1"
                  placeholder="Street 2"
                  value={formData.billingStreet2}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  City
                </label>
                <input name="billingCity" value={formData.billingCity} onChange={handleChange} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>
                  State
                </label>
                <select name="billingState" value={formData.billingState} onChange={handleChange} style={inputStyle}>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>
                  PIN Code
                </label>
                <input name="billingPincode" value={formData.billingPincode} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937' }}>Shipping Address</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div>
                <label style={labelStyle}>
                  Attention<InfoIcon tooltip="Recipient name for shipping" />
                </label>
                <input name="shippingAttention" value={formData.shippingAttention} onChange={handleChange} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>
                  Country/Region
                </label>
                <select name="shippingCountry" value={formData.shippingCountry} onChange={handleChange} style={inputStyle}>
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  Address
                </label>
                <textarea
                  name="shippingStreet1"
                  rows="1"
                  placeholder="Street 1"
                  value={formData.shippingStreet1}
                  onChange={handleChange}
                  style={{ ...inputStyle, marginBottom: '8px' }}
                />
                <textarea
                  name="shippingStreet2"
                  rows="1"
                  placeholder="Street 2"
                  value={formData.shippingStreet2}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  City
                </label>
                <input name="shippingCity" value={formData.shippingCity} onChange={handleChange} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>
                  State
                </label>
                <select name="shippingState" value={formData.shippingState} onChange={handleChange} style={inputStyle}>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>
                  PIN Code
                </label>
                <input name="shippingPincode" value={formData.shippingPincode} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" onClick={handleReset} style={resetBtnStyle}>
                Reset
              </button>
              <button type="submit" style={saveBtnStyle}>
                Save Customer
              </button>
            </div>
          </form>
        )}

        {/* Other Tab Content Placeholder */}
        {activeTab !== 'address' && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6B7280',
            fontSize: '18px'
          }}>
            {activeTab === 'other-details' && 'Other Details content will appear here.'}
            {activeTab === 'contact-persons' && 'Contact Persons content will appear here.'}
            {activeTab === 'custom-fields' && 'Custom Fields content will appear here.'}
            {activeTab === 'remarks' && 'Remarks content will appear here.'}
          </div>
        )}
      </div>
    </div>
  );
};

/* Styles */
const labelStyle = { 
  fontSize: '14px', 
  fontWeight: '600', 
  marginBottom: '8px', 
  display: 'block' 
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #D1D5DB',
  borderRadius: '10px',
  backgroundColor: '#F9FAFB',
  fontSize: '16px'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px'
};

const sectionTitle = { 
  fontSize: '20px', 
  fontWeight: '600', 
  marginBottom: '16px' 
};

const copyBtnStyle = {
  border: '1px solid #5C40FF',
  background: 'transparent',
  color: '#5C40FF',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer'
};

const resetBtnStyle = {
  padding: '10px 24px',
  backgroundColor: '#FFFFFF',
  color: '#374151',
  borderRadius: '10px',
  border: '1px solid #D1D5DB',
  fontWeight: '500',
  cursor: 'pointer'
};

const saveBtnStyle = {
  padding: '10px 28px',
  backgroundColor: '#5C40FF',
  color: '#fff',
  borderRadius: '10px',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer'
};

export default Customer;