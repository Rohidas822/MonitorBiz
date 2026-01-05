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

  // Colors
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const lightGray = '#F3F4F6';
  const borderColor = '#D1D5DB';
  const backgroundColor = '#F9FAFB';

  // Mock work orders
  const workOrders = [
    { id: 1, name: 'Project Alpha - Setup' },
    { id: 2, name: 'Consulting Package B' },
    { id: 3, name: 'Hardware Installation' },
  ];

  const [formData, setFormData] = useState({
    workOrder: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerGstin: '',
    customerAddress: '',
    dueDate: '',
  });

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

    const qty = parseFloat(newItems[index].qty) || 0;
    const unitPrice = parseFloat(newItems[index].unitPrice) || 0;
    const taxRate = parseFloat(newItems[index].taxRate) || 0;

    const subtotal = qty * unitPrice;
    const tax = subtotal * (taxRate / 100);
    newItems[index].total = parseFloat((subtotal + tax).toFixed(2));

    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        description: '',
        qty: 1,
        unitPrice: 0,
        taxRate: 18,
        total: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const subtotal = items.reduce((sum, item) => {
    const qty = parseFloat(item.qty) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    return sum + qty * unitPrice;
  }, 0);

  const taxTotal = items.reduce((sum, item) => {
    const qty = parseFloat(item.qty) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    const taxRate = parseFloat(item.taxRate) || 0;
    return sum + (qty * unitPrice * taxRate) / 100;
  }, 0);

  const grandTotal = subtotal + taxTotal;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.customerAddress.trim()) {
      alert('Please fill in required fields: Customer Name and Address.');
      return;
    }

    const invoiceData = {
      ...formData,
      items,
      subtotal: parseFloat(subtotal.toFixed(2)),
      taxTotal: parseFloat(taxTotal.toFixed(2)),
      grandTotal: parseFloat(grandTotal.toFixed(2)),
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:3000/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      if (response.ok) {
        alert('Invoice created successfully!');
        navigate('/dashboard/billing/invoice');
      } else {
        throw new Error('Failed to save invoice');
      }
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('Failed to create invoice. Please ensure JSON Server is running.');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/billing/invoice');
  };

  const inputStyle = (isFocused = false) => ({
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${isFocused ? orangeColor : borderColor}`,
    fontSize: '14px',
    color: darkTextColor,
    backgroundColor: '#FFFFFF',
    transition: 'border-color 0.2s',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  });

  // Responsive helper
  const getGridColumns = () => {
    return window.innerWidth < 768 ? '1fr' : '1fr 1fr';
  };

  // Since we can't use useEffect for window resize without hooks complexity,
  // we use a simple dynamic check per render (acceptable for this use case)
  const isMobile = window.innerWidth < 768;

  return (
    <div
      style={{
        padding: isMobile ? '16px' : '24px',
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
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          marginBottom: '24px',
          gap: '12px',
        }}
      >
        <div>
          <h1 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#000000' }}>
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
            alignSelf: isMobile ? 'flex-start' : 'auto',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5E7EB')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
        >
          <FaArrowLeft size={14} />
          Back to Invoices
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Invoice Details */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: isMobile ? '16px' : '28px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 20px 0', color: '#000000' }}>
            Invoice Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: getGridColumns(), gap: isMobile ? '16px' : '24px' }}>
            {/* Left Column */}
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
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
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
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
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
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
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Customer Address <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <textarea
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleChange}
                  required
                  rows={isMobile ? 3 : 2}
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
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Invoice Date <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle(), paddingRight: '36px', width: '100%' }}
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
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
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
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
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
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Due Date
                </label>
                <div style={{ position: ' relative' }}>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    style={{ ...inputStyle(), paddingRight: '36px', width: '100%' }}
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

        {/* Items Section */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: isMobile ? '16px' : '28px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: isMobile ? 'flex-start' : 'space-between',
              alignItems: isMobile ? 'flex-start' : 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Invoice Items</h3>
            <button
              type="button"
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
                alignSelf: isMobile ? 'flex-start' : 'auto',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E05A00')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = orangeColor)}
            >
              <FaPlus size={12} />
              Add Item
            </button>
          </div>

          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '14px' }}>
              <thead>
                <tr style={{ backgroundColor: lightGray, textAlign: 'left' }}>
                  {['ITEM DESCRIPTION', 'QTY', 'UNIT PRICE', 'TAX %', 'TOTAL', 'ACTION'].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: isMobile ? '8px 6px' : '10px 12px',
                        fontSize: isMobile ? '11px' : '12px',
                        fontWeight: '600',
                        color: '#6B7280',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
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
                    style={{ borderBottom: `1px solid ${borderColor}` }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FCFCFD')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                  >
                    <td style={{ padding: isMobile ? '8px 6px' : '12px' }}>
                      <input
                        type="text"
                        placeholder="Item"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: isMobile ? '4px 8px' : '6px 10px',
                          fontSize: isMobile ? '12px' : '14px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      />
                    </td>
                    <td style={{ padding: isMobile ? '8px 6px' : '12px' }}>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: isMobile ? '4px 8px' : '6px 10px',
                          fontSize: isMobile ? '12px' : '14px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      />
                    </td>
                    <td style={{ padding: isMobile ? '8px 6px' : '12px' }}>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: isMobile ? '4px 8px' : '6px 10px',
                          fontSize: isMobile ? '12px' : '14px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      />
                    </td>
                    <td style={{ padding: isMobile ? '8px 6px' : '12px' }}>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.taxRate}
                        onChange={(e) => handleItemChange(index, 'taxRate', e.target.value)}
                        style={{
                          ...inputStyle(),
                          width: '100%',
                          padding: isMobile ? '4px 8px' : '6px 10px',
                          fontSize: isMobile ? '12px' : '14px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                        onBlur={(e) => (e.target.style.borderColor = borderColor)}
                      />
                    </td>
                    <td style={{ padding: isMobile ? '8px 6px' : '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                      ₹{item.total.toFixed(2)}
                    </td>
                    <td style={{ padding: isMobile ? '8px 6px' : '12px' }}>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#EF4444',
                          fontSize: isMobile ? '14px' : '16px',
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
              backgroundColor: lightGray,
              borderRadius: '8px',
              fontSize: isMobile ? '13px' : '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#4B5563' }}>Subtotal:</span>
              <span style={{ fontWeight: '600' }}>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#4B5563' }}>Tax:</span>
              <span style={{ fontWeight: '600' }}>₹{taxTotal.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: `1px solid ${borderColor}`,
                paddingTop: '8px',
                marginTop: '8px',
              }}
            >
              <span style={{ fontWeight: '700' }}>Total:</span>
              <span style={{ fontWeight: '700', color: orangeColor }}>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            justifyContent: 'flex-end',
            gap: isMobile ? '12px' : '12px',
            marginTop: '24px',
          }}
        >
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
              width: isMobile ? '100%' : 'auto',
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
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              background: orangeColor,
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              width: isMobile ? '100%' : 'auto',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E05A00')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = orangeColor)}
          >
            <FaPlus size={14} />
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoice;