// src/components/dashboard/Billing/ViewCommodity.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaBox,
  FaArrowLeft,
  FaEdit,
} from 'react-icons/fa';

const ViewCommodity = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data — replace with API call in real app
  const commodity = {
    id: 1,
    commodityName: 'Consulting Hour',
    type: 'Service',
    hsnCode: '',
    sku: 'CONS-HR-001',
    barcode: '—',
    productType: 'Service',
    unit: 'Hour',
    unitPrice: '100.00',
    gstRate: '18',
    category: 'Professional Services',
    description: 'One hour of expert business consulting, including process analysis and recommendations.',
    status: 'Active',
  };

  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';

  const handleBack = () => navigate('/dashboard/billing/commodity');
  const handleEdit = () => navigate(`/dashboard/billing/commodity/edit/${id}`);

  const detailRow = (label, value, isHighlighted = false) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${borderColor}` }}>
      <span style={{ color: '#6B7280', fontSize: '14px' }}>{label}</span>
      <span style={{
        fontWeight: isHighlighted ? '600' : 'normal',
        color: isHighlighted ? darkTextColor : '#4B5563',
        fontSize: '14px',
        textAlign: 'right',
        maxWidth: '60%',
        wordBreak: 'break-word'
      }}>
        {value || '—'}
      </span>
    </div>
  );

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
            Back to Commodities
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

      {/* Detail Card */}
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
            backgroundColor: '#FCFCFD',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#000000' }}>
            {commodity.commodityName}
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0 0' }}>
            ID: {commodity.id} • {commodity.type}
          </p>
        </div>

        <div style={{ padding: '24px' }}>
          {detailRow('Commodity Name', commodity.commodityName, true)}
          {detailRow('Type', commodity.type)}
          {detailRow('HSN Code', commodity.hsnCode)}
          {detailRow('SKU', commodity.sku)}
          {detailRow('Barcode', commodity.barcode)}
          {detailRow('Product Type', commodity.productType)}
          {detailRow('Unit', commodity.unit)}
          {detailRow('Unit Price (₹)', `₹${commodity.unitPrice}`, true)}
          {detailRow('GST Rate (%)', `${commodity.gstRate}%`)}
          {detailRow('Category', commodity.category)}
          <div style={{ padding: '12px 0', borderBottom: `1px solid ${borderColor}` }}>
            <span style={{ color: '#6B7280', fontSize: '14px' }}>Description</span>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: darkTextColor, whiteSpace: 'pre-wrap' }}>
              {commodity.description || '—'}
            </p>
          </div>
          {detailRow('Status', commodity.status)}
        </div>
      </div>
    </div>
  );
};

export default ViewCommodity;