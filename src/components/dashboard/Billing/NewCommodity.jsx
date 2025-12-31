// src/components/dashboard/Billing/NewCommodity.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBox,
  FaPlus,
  FaArrowLeft,
} from 'react-icons/fa';

const NewCommodity = () => {
  const navigate = useNavigate();
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const lightGray = '#F3F4F6';
  const borderColor = '#D1D5DB';
  const backgroundColor = '#F9FAFB';

  const [formData, setFormData] = React.useState({
    commodityName: '',
    type: 'Good (Physical Product)',
    hsnCode: '',
    sku: '',
    barcode: '',
    productType: 'Product',
    unit: 'Kilogram (kg)',
    unitPrice: '',
    gstRate: '18',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Commodity added successfully!');
    navigate('/dashboard/billing/commodity');
  };

  const handleCancel = () => {
    navigate('/dashboard/billing/commodity');
  };

  // Reusable input style
  const inputStyle = (isFocused = false) => ({
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: `1px solid ${isFocused ? orangeColor : borderColor}`,
    fontSize: '14px',
    color: darkTextColor,
    backgroundColor: '#FFFFFF',
    transition: 'border-color 0.2s',
  });

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#000000',
          }}
        >
          <FaBox size={22} color={orangeColor} />
          New Commodity
        </h1>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            color: '#6B7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '8px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = orangeColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          <FaArrowLeft size={14} />
          Back to Commodities
        </button>
      </div>

      {/* Form Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '16px 24px',
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#000000' }}>
            Add New Commodity
          </h2>
        </div>
        <div style={{ padding: '28px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'start' }}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Commodity Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#000000',
                    }}
                  >
                    Commodity Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="commodityName"
                    placeholder="Enter commodity name"
                    value={formData.commodityName}
                    onChange={handleChange}
                    required
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>

                {/* HSN Code */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#000000',
                    }}
                  >
                    HSN Code
                  </label>
                  <input
                    type="text"
                    name="hsnCode"
                    placeholder="e.g., 7208, 3920, 8471"
                    value={formData.hsnCode}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>

                {/* Barcode */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#000000',
                    }}
                  >
                    Barcode
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    placeholder="Auto-generated if empty"
                    value={formData.barcode}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>

                {/* Unit */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#000000',
                    }}
                  >
                    Unit <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  >
                    <option value="Kilogram (kg)">Kilogram (kg)</option>
                    <option value="Gram (g)">Gram (g)</option>
                    <option value="Liter (L)">Liter (L)</option>
                    <option value="Piece">Piece</option>
                    <option value="Box">Box</option>
                    <option value="Unit">Unit</option>
                  </select>
                </div>

                {/* GST Rate */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#000000',
                    }}
                  >
                    GST Rate (%)
                  </label>
                  <input
                    type="number"
                    name="gstRate"
                    min="0"
                    max="100"
                    placeholder="18"
                    value={formData.gstRate}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Type */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#000000',
                    }}
                  >
                    Type <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  >
                    <option value="Good (Physical Product)">Good (Physical Product)</option>
                    <option value="Service">Service</option>
                  </select>
                </div>

                {/* SKU */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#000000',
                    }}
                  >
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    placeholder="Auto-generated if empty"
                    value={formData.sku}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>

                {/* Product Type */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#000000',
                    }}
                  >
                    Product Type
                  </label>
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  >
                    <option value="Product">Product</option>
                    <option value="Raw Material">Raw Material</option>
                    <option value="Finished Good">Finished Good</option>
                  </select>
                </div>

                {/* Unit Price */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#000000',
                    }}
                  >
                    Unit Price (₹) <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="unitPrice"
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    required
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#000000',
                    }}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g., Metals, Plastics, Electronics"
                    value={formData.category}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '6px',
                  color: '#000000',
                }}
              >
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Enter detailed description"
                value={formData.description}
                onChange={handleChange}
                style={{
                  ...inputStyle(),
                  resize: 'vertical',
                  minHeight: '100px',
                }}
                onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: 'none',
                  border: `1px solid ${borderColor}`,
                  color: '#4B5563',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#DC2626')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: orangeColor,
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E05A00')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = orangeColor)}
              >
                <FaPlus size={14} />
                Add Commodity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCommodity;