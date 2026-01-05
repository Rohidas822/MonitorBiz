// src/components/dashboard/Billing/ViewCommodity.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaBox,
  FaArrowLeft,
  FaEdit,
} from 'react-icons/fa';

const ViewCommodity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [commodity, setCommodity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightGray = '#F3F4F6';

  // Fetch commodity from JSON Server
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
        setCommodity(commodityData);
      } catch (err) {
        console.error('Error fetching commodity:', err);
        setError('Failed to load commodity details. Please check if the commodity exists.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCommodity();
    }
  }, [id]);

  const handleBack = () => navigate('/dashboard/billing/commodity');
  const handleEdit = () => navigate(`/dashboard/billing/commodity/edit/${id}`);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get commodity code (prefer sku, fallback to id)
  const getCommodityCode = () => {
    return commodity.sku || `COM${String(commodity.id).padStart(5, '0')}`;
  };

  // Check availability
  const getAvailability = () => {
    // Services are typically not "available" like physical goods
    if (commodity.type === 'Service') return 'No';
    
    // For goods, check if stock exists and is greater than 0
    const stock = commodity.stock;
    if (stock === undefined || stock === null || stock === '' || stock === 'N/A') {
      return 'No';
    }
    
    const stockValue = parseFloat(stock);
    return !isNaN(stockValue) && stockValue > 0 ? 'Yes' : 'No';
  };

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

  if (error || !commodity) {
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
            {error || 'Commodity Not Found'}
          </h3>
          <p style={{ fontSize: '15px', color: '#6B7280', margin: '0 0 28px' }}>
            {error || 'The commodity you are looking for does not exist.'}
          </p>
          <button
            onClick={handleBack}
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
        padding: '20px',
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
          View Commodity
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={handleBack}
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
            Back to List
          </button>
          <button
            onClick={handleEdit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
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
            <FaEdit size={14} />
            Edit
          </button>
        </div>
      </div>

      {/* Material Details Card */}
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
            padding: '20px 24px',
            borderBottom: `1px solid ${borderColor}`,
            backgroundColor: '#FCFCFD',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#000000' }}>
            Material Details
          </h2>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Responsive Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Name */}
              <div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#6B7280', 
                  marginBottom: '4px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Name:
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: '#000000',
                  wordBreak: 'break-word'
                }}>
                  {commodity.commodityName || commodity.name || 'N/A'}
                </div>
              </div>

              {/* Code */}
              <div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#6B7280', 
                  marginBottom: '4px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Code:
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: '#000000'
                }}>
                  {getCommodityCode()}
                </div>
              </div>

              {/* Description */}
              <div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#6B7280', 
                  marginBottom: '4px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Description:
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  color: '#000000',
                  wordBreak: 'break-word'
                }}>
                  {commodity.description || 'No any description needed'}
                </div>
              </div>

              {/* Unit */}
              <div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#6B7280', 
                  marginBottom: '4px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Unit:
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  color: '#000000'
                }}>
                  {commodity.unit || 'N/A'}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Unit Price */}
              <div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#6B7280', 
                  marginBottom: '4px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Unit Price:
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: '#000000'
                }}>
                  {typeof commodity.unitPrice === 'number' 
                    ? commodity.unitPrice.toFixed(2) 
                    : commodity.unitPrice || 'N/A'}
                </div>
              </div>

              {/* GST Rate */}
              <div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#6B7280', 
                  marginBottom: '4px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  GST Rate:
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  color: '#000000'
                }}>
                  {commodity.gstRate ? `${commodity.gstRate}%` : 'N/A'}
                </div>
              </div>

              {/* Category */}
              <div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#6B7280', 
                  marginBottom: '4px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Category:
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  color: '#000000',
                  textTransform: 'capitalize'
                }}>
                  {commodity.category || 'N/A'}
                </div>
              </div>

              {/* Available */}
              <div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#6B7280', 
                  marginBottom: '4px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Available:
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  color: '#000000'
                }}>
                  {getAvailability()}
                </div>
              </div>
            </div>
          </div>

          {/* Timestamp Section */}
          <div style={{ 
            marginTop: '32px', 
            paddingTop: '24px', 
            borderTop: `1px solid ${borderColor}`,
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {/* Created At */}
            <div>
              <div style={{ 
                fontSize: '13px', 
                color: '#6B7280', 
                marginBottom: '4px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Created At:
              </div>
              <div style={{ 
                fontSize: '18px', 
                color: '#000000'
              }}>
                {formatDate(commodity.createdAt) || 'N/A'}
              </div>
            </div>

            {/* Updated At */}
            <div>
              <div style={{ 
                fontSize: '13px', 
                color: '#6B7280', 
                marginBottom: '4px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Updated At:
              </div>
              <div style={{ 
                fontSize: '18px', 
                color: '#000000'
              }}>
                {formatDate(commodity.updatedAt) || formatDate(commodity.createdAt) || 'N/A'}
              </div>
            </div>
          </div>

          {/* Back to List Button */}
          <div style={{ 
            marginTop: '32px', 
            paddingTop: '24px', 
            borderTop: `1px solid ${borderColor}`,
            textAlign: 'center'
          }}>
            <button
              onClick={handleBack}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                color: orangeColor,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto',
                padding: '12px 24px',
                borderRadius: '8px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${orangeColor}10`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <FaArrowLeft size={16} />
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCommodity;