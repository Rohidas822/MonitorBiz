// src/components/dashboard/Billing/Quote.jsx
import React, { useState } from 'react';
import jsPDF from 'jspdf';

const Quote = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [commodities, setCommodities] = useState([
    { id: 1, name: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const [gstRate, setGstRate] = useState(18);

  // Handlers
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleCommodityChange = (id, field, value) => {
    setCommodities(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            const qty = parseFloat(updated.quantity) || 0;
            const rate = parseFloat(updated.rate) || 0;
            updated.amount = (qty * rate).toFixed(2);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const addCommodity = () => {
    const newId = Math.max(...commodities.map(c => c.id)) + 1;
    setCommodities(prev => [...prev, { id: newId, name: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeCommodity = (id) => {
    if (commodities.length > 1) {
      setCommodities(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleGstRateChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setGstRate(value > 100 ? 100 : value);
  };

  // Calculations
  const subtotal = commodities.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const taxAmount = (subtotal * gstRate) / 100;
  const grandTotal = subtotal + taxAmount;

  // ✅ Generate PDF with Brand Colors
  const handleGeneratePDF = (e) => {
    e.preventDefault();

    if (!customer.name.trim()) {
      alert('Please enter customer name.');
      return;
    }

    const doc = new jsPDF();

    const pageWidth = 210; // A4 width in mm
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;

    // === HEADER ===
    // Logo: Use dark gray (or orange if it's a logo mark — here, text is fine in dark)
    doc.setFontSize(22);
    doc.setTextColor(31, 41, 55); // #1F2937
    doc.text('MonitorBiz', margin, 25);

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128); // #6B7280
    doc.text('Business Solutions', margin, 31);

    // Title
    doc.setFontSize(24);
    doc.setTextColor(31, 41, 55);
    doc.setFont(undefined, 'bold');
    doc.text('QUOTATION', pageWidth / 2, 25, { align: 'center' });

    // Quote info
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(`Quote #: Q-${Math.floor(Math.random() * 10000)}`, pageWidth - margin, 25, { align: 'right' });
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - margin, 31, { align: 'right' });

    // === BILLING INFO ===
    const startY = 45;
    const colWidth = (contentWidth - 10) / 2;

    // From
    doc.setFontSize(11);
    doc.setTextColor(31, 41, 55);
    doc.setFont(undefined, 'bold');
    doc.text('From', margin, startY);

    doc.setFont(undefined, 'normal');
    doc.setTextColor(75, 85, 99);
    const fromLines = [
      'MonitorBiz',
      '123 Tech Park, Goa',
      'Phone: +91 98989 89898',
      'Email: codechetan@gmail.com'
    ];
    fromLines.forEach((line, i) => {
      doc.text(line, margin, startY + 8 + i * 6);
    });

    // To
    doc.setFont(undefined, 'bold');
    doc.text('Bill To', margin + colWidth + 10, startY);

    doc.setFont(undefined, 'normal');
    const toLines = [
      customer.name || '—',
      ...(customer.address ? customer.address.split('\n') : ['—']),
      customer.email || '—',
      customer.phone || '—'
    ];
    toLines.forEach((line, i) => {
      doc.text(line.length > 40 ? line.substring(0, 40) + '...' : line, margin + colWidth + 10, startY + 8 + i * 6);
    });

    // === TABLE ===
    const tableTop = startY + 8 + Math.max(fromLines.length, toLines.length) * 6 + 10;

    // Table header
    doc.setFillColor(249, 250, 251); // #F9FAFB
    doc.rect(margin, tableTop, contentWidth, 8, 'F');

    doc.setFont(undefined, 'bold');
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(10);
    doc.text('Description', margin + 2, tableTop + 5);
    doc.text('Qty', margin + colWidth - 15, tableTop + 5, { align: 'center' });
    doc.text('Rate (₹)', margin + colWidth + 25, tableTop + 5, { align: 'right' });
    doc.text('Amount (₹)', pageWidth - margin - 2, tableTop + 5, { align: 'right' });

    // Table rows
    let currentY = tableTop + 12;
    doc.setFont(undefined, 'normal');
    commodities.forEach((item, index) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }

      if (index % 2 === 0) {
        doc.setFillColor(253, 254, 254); // #FDFEFE
        doc.rect(margin, currentY - 4, contentWidth, 8, 'F');
      }

      const desc = (item.name || '—').substring(0, 45);
      doc.text(desc, margin + 2, currentY);
      doc.text(item.quantity.toString(), margin + colWidth - 15, currentY, { align: 'center' });
      doc.text(parseFloat(item.rate).toFixed(2), margin + colWidth + 25, currentY, { align: 'right' });
      doc.text(parseFloat(item.amount).toFixed(2), pageWidth - margin - 2, currentY, { align: 'right' });

      currentY += 8;
    });

    // === TOTALS ===
    const totalStartY = currentY + 10;
    const totalBoxRight = pageWidth - margin;
    const totalBoxLeft = totalBoxRight - 70;

    // Subtotal
    doc.setFont(undefined, 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('Subtotal', totalBoxLeft, totalStartY);
    doc.text(subtotal.toFixed(2), totalBoxRight, totalStartY, { align: 'right' });

    // Tax
    doc.text(`GST (${gstRate}%)`, totalBoxLeft, totalStartY + 6);
    doc.text(taxAmount.toFixed(2), totalBoxRight, totalStartY + 6, { align: 'right' });

    // Divider
    doc.setDrawColor(229, 231, 235); // #E5E7EB
    doc.line(totalBoxLeft, totalStartY + 12, totalBoxRight, totalStartY + 12);

    // ✅ Grand Total in ORANGE (key data)
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 107, 0); // #FF6B00
    doc.text('GRAND TOTAL', totalBoxLeft, totalStartY + 18);
    doc.text(`₹ ${grandTotal.toFixed(2)}`, totalBoxRight, totalStartY + 18, { align: 'right' });

    // === FOOTER ===
    const footerY = totalStartY + 32;
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text('Thank you for your business! This quotation is valid for 15 days.', margin, footerY);

    // Save
    const timestamp = new Date().toISOString().slice(0, 10);
    doc.save(`MonitorBiz_Quote_${timestamp}.pdf`);
  };

  return (
    <div style={{
      padding: '24px',
      fontFamily: '"Inter", -apple-system, Segoe UI, Roboto, sans-serif',
      color: '#1F2937',
      backgroundColor: '#FFFFFF',
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1F2937', margin: '0' }}>
          Create New Quote
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', marginTop: '8px' }}>
          Fill customer details, add items, and generate a professional quotation.
        </p>
      </div>

      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid #E5E7EB',
        padding: '36px'
      }}>
        <form onSubmit={handleGeneratePDF}>
          {/* Customer Section */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              Client Information
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}>
              {[
                { label: 'Client Name *', name: 'name', type: 'text', placeholder: 'ABC Enterprises', required: true },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'contact@abc.com' },
                { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91 98765 43210' }
              ].map((field) => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={customer[field.name]}
                    onChange={handleCustomerChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      fontSize: '15px',
                      color: '#1F2937',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#FF6B00'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
                  Address
                </label>
                <textarea
                  name="address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  placeholder="123 Business Park, Sector 5, Mumbai"
                  rows="2"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: '#1F2937',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF6B00'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>
            </div>
          </section>

          {/* Items Section */}
          <section style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1F2937',
                paddingBottom: '10px',
                borderBottom: '1px solid #E5E7EB'
              }}>
                Items
              </h2>
              <button
                type="button"
                onClick={addCommodity}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#6B7280',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#D1D5DB';
                  e.target.style.color = '#4B5563';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.color = '#6B7280';
                }}
              >
                <span>+</span> Add Item
              </button>
            </div>

            <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '650px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Description</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Qty</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Rate ₹</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Amount ₹</th>
                    <th style={{ padding: '14px 16px', width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {commodities.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '16px' }}>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleCommodityChange(item.id, 'name', e.target.value)}
                          placeholder="Product or service name"
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '14px',
                            color: '#1F2937'
                          }}
                        />
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleCommodityChange(item.id, 'quantity', e.target.value)}
                          style={{
                            width: '80px',
                            padding: '8px 10px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '14px',
                            textAlign: 'center',
                            color: '#1F2937'
                          }}
                        />
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => handleCommodityChange(item.id, 'rate', e.target.value)}
                          style={{
                            width: '100px',
                            padding: '8px 10px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '14px',
                            textAlign: 'right',
                            color: '#1F2937'
                          }}
                        />
                      </td>
                      <td style={{ padding: '16px', fontWeight: '600', color: '#1F2937', textAlign: 'right' }}>
                        ₹ {parseFloat(item.amount).toFixed(2)}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => removeCommodity(item.id)}
                          disabled={commodities.length <= 1}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '20px',
                            cursor: commodities.length <= 1 ? 'not-allowed' : 'pointer',
                            opacity: commodities.length <= 1 ? 0.4 : 1
                          }}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Totals */}
          <section>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              Summary
            </h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: '320px', marginLeft: 'auto' }}>
              <div style={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '15px', color: '#6B7280' }}>Subtotal</span>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937' }}>₹ {subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', color: '#6B7280' }}>
                    GST (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={gstRate}
                      onChange={handleGstRateChange}
                      style={{
                        width: '60px',
                        padding: '2px 6px',
                        fontSize: '14px',
                        textAlign: 'right',
                        border: '1px solid #D1D5DB',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        color: '#1F2937'
                      }}
                    />
                    %)
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937' }}>₹ {taxAmount.toFixed(2)}</span>
                </div>
                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '12px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937' }}>Total</span>
                    {/* ✅ Key data → use brand orange */}
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#FF6B00' }}>₹ {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '40px' }}>
            <button
              type="button"
              onClick={() => window.history.back()}
              style={{
                padding: '12px 28px',
                fontSize: '16px',
                borderRadius: '12px',
                border: '1px solid #D1D5DB',
                backgroundColor: '#FFFFFF',
                color: '#1F2937',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#F9FAFB'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#FFFFFF'}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 28px',
                fontSize: '16px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#FF6B00', // ✅ Primary brand color
                color: '#FFFFFF',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#E05A00'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B00'}
            >
              Generate Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quote;