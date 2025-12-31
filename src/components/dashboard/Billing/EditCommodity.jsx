// src/components/dashboard/Billing/EditCommodity.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaBox,
  FaPlus,
  FaArrowLeft,
} from 'react-icons/fa';

const EditCommodity = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data — replace with API fetch
  const initialData = {
    commodityName: 'Consulting Hour',
    type: 'Service',
    hsnCode: '',
    sku: 'CONS-HR-001',
    barcode: '',
    productType: 'Service',
    unit: 'Hour',
    unitPrice: '100.00',
    gstRate: '18',
    category: 'Professional Services',
    description: 'One hour of expert business consulting, including process analysis and recommendations.',
  };

  const [formData, setFormData] = React.useState(initialData);

  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#D1D5DB';
  const backgroundColor = '#F9FAFB';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Data:', formData);
    alert('Commodity updated successfully!');
    navigate('/dashboard/billing/commodity');
  };

  const handleCancel = () => {
    navigate('/dashboard/billing/commodity/view/' + id);
  };

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
          Edit Commodity
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
          Back to View
        </button>
      </div>

      {/* Form Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2 p 10px rgba(0,0,0,0.05)',
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
            Edit Commodity Details
          </h2>
        </div>
        <div style={{ padding: '28px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'start' }}>
              {/* Left */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
                    Commodity Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="commodityName"
                    value={formData.commodityName}
                    onChange={handleChange}
                    required
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
                    HSN Code
                  </label>
                  <input
                    type="text"
                    name="hsnCode"
                    value={formData.hsnCode}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
                    Barcode
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
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
                    <option value="Hour">Hour</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
                    GST Rate (%)
                  </label>
                  <input
                    type="number"
                    name="gstRate"
                    min="0"
                    max="100"
                    value={formData.gstRate}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>
              </div>

              {/* Right */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
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
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
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
                    <option value="Service">Service</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
                    Unit Price (₹) <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="unitPrice"
                    min="0"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    required
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#000000' }}>
                Description
              </label>
              <textarea
                name="description"
                rows={4}
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
                Update Commodity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCommodity;