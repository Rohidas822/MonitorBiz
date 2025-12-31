// src/components/dashboard/Billing/CreateInvoice.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaCalendar,
} from 'react-icons/fa';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const lightGray = '#F3F4F6';
  const borderColor = '#D1D5DB';
  const backgroundColor = '#F9FAFB';

  // Mock work orders (replace with API)
  const workOrders = [
    { id: 1, name: 'Project Alpha - Setup' },
    { id: 2, name: 'Consulting Package B' },
    { id: 3, name: 'Hardware Installation' },
  ];

  // Form state
  const [formData, setFormData] = useState({
    workOrder: '',
    invoiceDate: '2025-12-30',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerGstin: '',
    customerAddress: '',
    dueDate: '',
  });

  // Invoice items state
  const [items, setItems] = useState([
    {
      id: 1,
      description: '',
      qty: 1,
      unitPrice: 0,
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
    const taxRate = parseFloat(newItems[index].taxRate) || 0;

    const subtotal = qty * unitPrice;
    const tax = subtotal * (taxRate / 100);
    newItems[index].total = subtotal + tax;

    setItems(newItems);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: '',
      qty: 1,
      unitPrice: 0,
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
    console.log('Invoice Data:', { formData, items });
    alert('Invoice created successfully!');
    navigate('/dashboard/billing/invoice');
  };

  const handleCancel = () => {
    navigate('/dashboard/billing/invoice');
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
            Create New Invoice
          </h1>
          <nav style={{ fontSize: '13px', color: '#6B7280' }}>
            <span>Home</span> &gt; <span>Invoices</span> &gt; <span>Create</span>
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
          Back to Invoices
        </button>
      </div>

      {/* Invoice Details Section */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          padding: '28px',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 20px 0', color: '#000000' }}>Invoice Details</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Left Column */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '6px',
                  color: '#000000',
                }}
              >
                Work Order (Optional)
              </label>
              <select
                name="workOrder"
                value={formData.workOrder}
                onChange={handleChange}
                style={inputStyle()}
                onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              >
                <option value="">Select Work Order</option>
                {workOrders.map((wo) => (
                  <option key={wo.id} value={wo.id}>
                    {wo.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '6px',
                  color: '#000000',
                }}
              >
                Customer Name <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                style={inputStyle()}
                onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '6px',
                  color: '#000000',
                }}
              >
                Customer Phone
              </label>
              <input
                type="text"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                style={inputStyle()}
                onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
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
                Customer Address <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <textarea
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange}
                required
                rows={2}
                style={{
                  ...inputStyle(),
                  resize: 'vertical',
                  minHeight: '60px',
                }}
                onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '6px',
                  color: '#000000',
                }}
              >
                Invoice Date <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
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

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '6px',
                  color: '#000000',
                }}
              >
                Customer Email
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                style={inputStyle()}
                onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '6px',
                  color: '#000000',
                }}
              >
                Customer GSTIN
              </label>
              <input
                type="text"
                name="customerGstin"
                value={formData.customerGstin}
                onChange={handleChange}
                style={inputStyle()}
                onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                onBlur={(e) => (e.target.style.borderColor = borderColor)}
              />
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
                Due Date
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
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
        </div>
      </div>

      {/* Invoice Items Section */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          padding: '28px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#000000' }}>Invoice Items</h3>
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
                  'ITEM DESCRIPTION',
                  'QTY',
                  'UNIT PRICE',
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
                    <input
                      type="text"
                      placeholder="Item description"
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
            marginTop: '24px',
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
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
          Create Invoice
        </button>
      </div>
    </div>
  );
};

export default CreateInvoice;