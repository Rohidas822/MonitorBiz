// src/components/dashboard/Billing/CreateQuote.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaCalendar,
} from 'react-icons/fa';

const CreateQuote = () => {
  const navigate = useNavigate();
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const lightGray = '#F3F4F6';
  const borderColor = '#D1D5DB';
  const backgroundColor = '#F9FAFB';

  // Mock customer list
  const customers = [
    { id: 1, name: 'Sample Client', email: 'client@example.com' },
    { id: 2, name: 'Tech Solutions Ltd.', email: 'tech@example.com' },
  ];

  // Form state
  const [formData, setFormData] = useState({
    customerId: '',
    validUntil: '2026-01-29',
    notes: '',
  });

  // Quote items state
  const [items, setItems] = useState([
    {
      id: 1,
      commodity: '',
      description: '',
      qty: 1,
      unit: 'Piece',
      unitPrice: 0,
      discount: 0,
      taxRate: 18,
      total: 0,
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // Calculate total for this item
    const qty = parseFloat(newItems[index].qty) || 0;
    const unitPrice = parseFloat(newItems[index].unitPrice) || 0;
    const discount = parseFloat(newItems[index].discount) || 0;
    const taxRate = parseFloat(newItems[index].taxRate) || 0;

    const subtotal = qty * unitPrice * (1 - discount / 100);
    const tax = subtotal * (taxRate / 100);
    newItems[index].total = subtotal + tax;

    setItems(newItems);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      commodity: '',
      description: '',
      qty: 1,
      unit: 'Piece',
      unitPrice: 0,
      discount: 0,
      taxRate: 18,
      total: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.total - (item.qty * item.unitPrice * item.taxRate / 100)), 0).toFixed(2);
  const taxTotal = items.reduce((sum, item) => sum + (item.qty * item.unitPrice * item.taxRate / 100), 0).toFixed(2);
  const grandTotal = (parseFloat(subtotal) + parseFloat(taxTotal)).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quote Data:', { formData, items });
    alert('Quotation created successfully!');
    navigate('/dashboard/billing/quote');
  };

  const handleCancel = () => {
    navigate('/dashboard/billing/quote');
  };

  // Reusable input style
  const inputStyle = (isFocused = false) => ({
    padding: '8px 12px',
    borderRadius: '6px',
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
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#000000' }}>
            Create New Quotation
          </h1>
          <nav style={{ fontSize: '13px', color: '#6B7280' }}>
            <span>Home</span> &gt; <span>Quotations</span> &gt; <span>Create</span>
          </nav>
        </div>
        <button
          onClick={handleCancel}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#F3F4F6',
            color: '#4B5563',
            border: `1px solid ${borderColor}`,
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5E7EB')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
        >
          <FaArrowLeft size={14} />
          Back to Quotations
        </button>
      </div>

      {/* Main Form Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          padding: '28px',
          maxWidth: '100%',
        }}
      >
        {/* Customer & Valid Until */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
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
              Customer <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
              style={inputStyle()}
              onFocus={(e) => (e.target.style.borderColor = orangeColor)}
              onBlur={(e) => (e.target.style.borderColor = borderColor)}
            >
              <option value="">Select Customer</option>
              {customers.map((cust) => (
                <option key={cust.id} value={cust.id}>
                  {cust.name}
                </option>
              ))}
            </select>
          </div>
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
              Valid Until <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleChange}
                required
                style={{
                  ...inputStyle(),
                  paddingRight: '36px',
                }}
                onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
              <FaCalendar
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6B7280',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '6px',
              color: '#000000',
            }}
          >
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes, terms, or special instructions for this quotation..."
            rows={3}
            style={{
              ...inputStyle(),
              resize: 'vertical',
              minHeight: '80px',
            }}
            onFocus={(e) => (e.target.style.borderColor = orangeColor)}
            onBlur={(e) => (e.target.style.borderColor = borderColor)}
          />
        </div>

        {/* Quotation Items Table */}
        <div
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#000000' }}>Quotation Items</h3>
            <button
              onClick={addItem}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '6px',
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
              <FaPlus size={12} />
              Add Item
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F3F4F6', textAlign: 'left' }}>
                  {[
                    'COMMODITY',
                    'DESCRIPTION',
                    'QTY',
                    'UNIT',
                    'UNIT PRICE',
                    'DISCOUNT %',
                    'TAX %',
                    'TOTAL',
                    'ACTION',
                  ].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: '10px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#6B7280',
                        textTransform: 'uppercase',
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FCFCFD')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                  >
                    <td style={{ padding: '12px' }}>
                      <select
                        value={item.commodity}
                        onChange={(e) => handleItemChange(index, 'commodity', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: '6px 10px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      >
                        <option value="">Choose a commodity</option>
                        <option value="Consulting Hour">Consulting Hour</option>
                        <option value="Software License">Software License</option>
                        <option value="Hardware Setup">Hardware Setup</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: '6px 10px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: '6px 10px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: '6px 10px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      >
                        <option value="Piece">Piece</option>
                        <option value="Hour">Hour</option>
                        <option value="Kg">Kg</option>
                        <option value="Unit">Unit</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: '6px 10px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.discount}
                        onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: '6px 10px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.taxRate}
                        onChange={(e) => handleItemChange(index, 'taxRate', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: '6px 10px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      />
                    </td>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#000000' }}>
                      ₹{item.total.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => removeItem(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#EF4444',
                          fontSize: '16px',
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#F3F4F6',
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#4B5563' }}>Subtotal:</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>₹{subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#4B5563' }}>Tax:</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>₹{taxTotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${borderColor}`, paddingTop: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#000000' }}>Total:</span>
              <span style={{ fontSize: '16px', fontWeight: '700', color: orangeColor }}>₹{grandTotal}</span>
            </div>
          </div>
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
            onClick={handleSubmit}
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
            Create Quotation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuote;