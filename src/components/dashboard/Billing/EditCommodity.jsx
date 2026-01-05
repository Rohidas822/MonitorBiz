// src/components/dashboard/Billing/EditCommodity.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaBox,
  FaPlus,
  FaArrowLeft,
} from 'react-icons/fa';

const EditCommodity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
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
    status: 'Active',
    supplier: '',
    stock: '',
    reorderPoint: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#D1D5DB';
  const backgroundColor = '#F9FAFB';

  // Fetch commodity data
  useEffect(() => {
    const fetchCommodity = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:3000/commodities/${id}`);
        
        if (!response.ok) {
          throw new Error('Commodity not found');
        }
        
        const commodityData = await response.json();
        
        // Map the commodity data to form state
        setFormData({
          commodityName: commodityData.commodityName || commodityData.name || '',
          type: commodityData.type || 'Good (Physical Product)',
          hsnCode: commodityData.hsnCode || '',
          sku: commodityData.sku || '',
          barcode: commodityData.barcode || '',
          productType: commodityData.productType || 'Product',
          unit: commodityData.unit || 'Kilogram (kg)',
          unitPrice: commodityData.unitPrice || '',
          gstRate: commodityData.gstRate || '18',
          category: commodityData.category || '',
          description: commodityData.description || '',
          status: commodityData.status || 'Active',
          supplier: commodityData.supplier || '',
          stock: commodityData.stock || '',
          reorderPoint: commodityData.reorderPoint || '',
        });
      } catch (err) {
        console.error('Error fetching commodity:', err);
        setError('Failed to load commodity data. Please check if the commodity exists.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCommodity();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.commodityName || !formData.unit || !formData.unitPrice) {
      setError('Please fill in all required fields (Commodity Name, Unit, and Unit Price)');
      return;
    }

    try {
      setError(null);
      
      // Prepare updated commodity data
      const updatedData = {
        ...formData,
        id: parseInt(id), // Ensure ID is number
        unitPrice: parseFloat(formData.unitPrice),
        gstRate: parseFloat(formData.gstRate) || 0,
        // Keep existing createdAt if it exists
      };

      const response = await fetch(`http://localhost:3000/commodities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update commodity');
      }

      const updatedCommodity = await response.json();
      console.log('Commodity updated:', updatedCommodity);
      setSuccess(true);
      
      // Redirect after brief delay
      setTimeout(() => {
        navigate('/dashboard/billing/commodity');
      }, 1000);
    } catch (err) {
      console.error('Error updating commodity:', err);
      setError('Failed to update commodity. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate(`/dashboard/billing/commodity/view/${id}`);
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

  if (loading) {
    return (
      <div
        style={{
          padding: '24px',
          backgroundColor: backgroundColor,
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid #FF6F00',
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          ></div>
          <p style={{ color: '#6B7280' }}>Loading commodity details...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '24px',
          backgroundColor: backgroundColor,
          minHeight: '100vh',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '48px 32px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <div style={{ color: '#EF4444', fontSize: '28px' }}>!</div>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 12px', color: '#000000' }}>
            Error Loading Commodity
          </h3>
          <p style={{ fontSize: '15px', color: '#6B7280', margin: '0 0 28px' }}>
            {error}
          </p>
          <button
            onClick={() => navigate('/dashboard/billing/commodity')}
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
          >
            <FaArrowLeft size={14} />
            Back to Commodities
          </button>
        </div>
      </div>
    );
  }

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
            Edit Commodity Details
          </h2>
        </div>
        <div style={{ padding: '28px' }}>
          {error && (
            <div
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#DC2626",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
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
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              Commodity updated successfully! Redirecting...
            </div>
          )}

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