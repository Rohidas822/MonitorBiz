// src/components/dashboard/Billing/Quote.jsx
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

// Predefined services with fixed rates
const SERVICES = [
  { name: 'Deep Cleaning', rate: 1600 },
  { name: 'Home Cleaning', rate: 2000 },
  { name: 'Office Cleaning', rate: 1500 },
  { name: 'Floor Cleaning', rate: 4000 },
  { name: 'Carpet cleaning', rate: 2000 },
  { name: 'Furniture Cleaning', rate: 1800 },
  { name: 'Bathroom Cleaning', rate: 1000 },
];

// Helper: Generate next quote number (simple local sequence)
const getNextQuoteNumber = () => {
  const prefix = `Q-${new Date().getFullYear()}-`;
  const lastNumber = localStorage.getItem('lastQuoteNumber') || '00122';
  const nextNum = (parseInt(lastNumber) + 1).toString().padStart(5, '0');
  localStorage.setItem('lastQuoteNumber', nextNum);
  return prefix + nextNum;
};

// Helper: Save draft to localStorage
const saveDraft = (data) => {
  try {
    localStorage.setItem('quoteDraft', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save draft:', e);
  }
};

// Helper: Load draft from localStorage
const loadDraft = () => {
  try {
    const draft = localStorage.getItem('quoteDraft');
    return draft ? JSON.parse(draft) : null;
  } catch (e) {
    console.error('Failed to load draft:', e);
    return null;
  }
};

const Quote = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [items, setItems] = useState([
    { id: 1, type: 'product', name: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const [gstRate, setGstRate] = useState(18);
  const [validUntil, setValidUntil] = useState(
    new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('This quotation is valid for 15 days. 50% advance payment required for confirmation.');
  const [isGenerating, setIsGenerating] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setCustomer(draft.customer || customer);
      setItems(draft.items || items);
      setGstRate(draft.gstRate || gstRate);
      setValidUntil(draft.validUntil || validUntil);
      setNotes(draft.notes || notes);
    }

    const firstInput = document.querySelector('input[name="name"]');
    if (firstInput) firstInput.focus();
  }, []);

  // ✅ AUTO-SAVE DRAFT every 2 seconds
  useEffect(() => {
    if (isGenerating) return;

    const timer = setTimeout(() => {
      saveDraft({ customer, items, gstRate, validUntil, notes });
    }, 2000);

    return () => clearTimeout(timer);
  }, [customer, items, gstRate, validUntil, notes, isGenerating]);

  // Handlers
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          let updated = { ...item, [field]: value };

          // If changing service, auto-set rate
          if (field === 'name' && item.type === 'service') {
            const service = SERVICES.find(s => s.name === value);
            if (service) {
              updated.rate = service.rate;
            }
          }

          // Recalculate amount if quantity or rate changed
          if (field === 'quantity' || field === 'rate' || (field === 'name' && item.type === 'service')) {
            const qty = parseFloat(updated.quantity) || 0;
            const rate = parseFloat(updated.rate) || 0;
            updated.amount = (qty * rate).toFixed(2);
          }

          // If switching type to service, auto-fill first service
          if (field === 'type') {
            if (value === 'service' && SERVICES.length > 0) {
              updated.name = SERVICES[0].name;
              updated.rate = SERVICES[0].rate;
              updated.amount = (parseFloat(updated.quantity || 1) * SERVICES[0].rate).toFixed(2);
            } else {
              updated.name = '';
              updated.rate = 0;
              updated.amount = '0.00';
            }
          }

          return updated;
        }
        return item;
      })
    );
  };

  const addItem = () => {
    const newId = items.length ? Math.max(...items.map(c => c.id)) + 1 : 1;
    setItems(prev => [...prev, { id: newId, type: 'product', name: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleGstRateChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setGstRate(Math.min(Math.max(value, 0), 100));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const taxAmount = (subtotal * gstRate) / 100;
  const grandTotal = subtotal + taxAmount;

  const validateForm = () => {
    if (!customer.name.trim()) {
      alert('Please enter customer name.');
      return false;
    }
    const hasValidItem = items.some(item =>
      (item.type === 'product' && item.name.trim() && parseFloat(item.rate) > 0) ||
      (item.type === 'service' && SERVICES.some(s => s.name === item.name))
    );
    if (!hasValidItem) {
      alert('Please add at least one valid item with description and rate.');
      return false;
    }
    return true;
  };

  const handleGeneratePDF = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const doc = new jsPDF();
      const quoteNumber = getNextQuoteNumber();

      const pageWidth = 210;
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      const colWidth = (contentWidth - 20) / 2;

      // === HEADER ===
      doc.setFontSize(22);
      doc.setTextColor(31, 41, 55);
      doc.text('MonitorBiz', margin, 20);

      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128);
      doc.text('Business Solutions', margin, 26);

      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text('QUOTATION', pageWidth / 2, 20, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(107, 114, 128);
      doc.text(quoteNumber, pageWidth - margin, 20, { align: 'right' });
      doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - margin, 26, { align: 'right' });
      doc.text(`Valid Until: ${new Date(validUntil).toLocaleDateString('en-GB')}`, pageWidth - margin, 32, { align: 'right' });

      // === FROM & TO SECTION ===
      let currentY = 45;

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text('From', margin, currentY);

      doc.setFont(undefined, 'normal');
      doc.setTextColor(75, 85, 99);
      const fromLines = [
        'MonitorBiz',
        'Suvarnaraj Group, Office No. 12, 1st floor,',
        'Balaji Nagar, Pune - 411037',
        'GSTIN: 27AABCCDDEEFFG',
        'PAN: AABCC1234D',
        'Phone: +91 98989 89898',
        'Email: suvarnaraj@gmail.com'
      ];
      fromLines.forEach((line, i) => {
        doc.text(line, margin, currentY + 6 + i * 6);
      });

      const toStartX = margin + colWidth + 20;
      doc.setFont(undefined, 'bold');
      doc.text('Bill To', toStartX, currentY);

      doc.setFont(undefined, 'normal');
      const toLines = [
        customer.name || '—',
        ...(customer.address ? customer.address.split('\n') : ['—']),
        customer.email || '—',
        customer.phone || '—'
      ].map(line => (line.length > 45 ? line.substring(0, 45) + '...' : line));

      toLines.forEach((line, i) => {
        doc.text(line, toStartX, currentY + 6 + i * 6);
      });

      const maxLines = Math.max(fromLines.length, toLines.length);
      currentY += 10 + maxLines * 6;

      // === TABLE HEADER ===
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, currentY, contentWidth, 8, 'F');

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text('Description', margin + 2, currentY + 5);
      doc.text('Qty', margin + colWidth - 15, currentY + 5, { align: 'center' });
      doc.text('Rate (₹)', margin + colWidth + 25, currentY + 5, { align: 'right' });
      doc.text('Amount (₹)', pageWidth - margin - 2, currentY + 5, { align: 'right' });

      currentY += 12;

      // === TABLE ROWS ===
      items.forEach((item, index) => {
        if (currentY > 270) {
          doc.addPage();
          currentY = 20;
        }

        if (index % 2 === 0) {
          doc.setFillColor(253, 254, 254);
          doc.rect(margin, currentY - 2, contentWidth, 7, 'F');
        }

        const descText = item.name || '—';
        const descLines = doc.splitTextToSize(descText, colWidth - 10);
        const lineHeight = 6;
        const descHeight = descLines.length * lineHeight;

        descLines.forEach((line, i) => {
          doc.text(line, margin + 2, currentY + i * lineHeight);
        });

        doc.text(item.quantity.toString(), margin + colWidth - 15, currentY, { align: 'center' });

        doc.text(
          parseFloat(item.rate).toLocaleString('en-IN', { minimumFractionDigits: 2 }),
          margin + colWidth + 25,
          currentY,
          { align: 'right' }
        );

        doc.text(
          parseFloat(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 }),
          pageWidth - margin - 2,
          currentY,
          { align: 'right' }
        );

        currentY += Math.max(descHeight, 7) + 2;
      });

      // === TOTALS ===
      currentY += 8;
      const totalBoxRight = pageWidth - margin;
      const totalBoxLeft = totalBoxRight - 75;

      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(75, 85, 99);

      doc.text('Subtotal', totalBoxLeft, currentY);
      doc.text(
        subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
        totalBoxRight,
        currentY,
        { align: 'right' }
      );

      currentY += 6;
      doc.text(`GST (${gstRate}%)`, totalBoxLeft, currentY);
      doc.text(
        taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
        totalBoxRight,
        currentY,
        { align: 'right' }
      );

      doc.setDrawColor(229, 231, 235);
      doc.line(totalBoxLeft, currentY + 3, totalBoxRight, currentY + 3);

      currentY += 10;
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(255, 107, 0);
      doc.text('GRAND TOTAL', totalBoxLeft, currentY);
      doc.text(
        `₹ ${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
        totalBoxRight,
        currentY,
        { align: 'right' }
      );

      // === NOTES ===
      currentY += 15;
      const notesLines = doc.splitTextToSize(notes, contentWidth - 10);
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(75, 85, 99);
      notesLines.forEach((line, i) => {
        if (currentY + i * 5 > 280) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(line, margin, currentY + i * 5);
      });

      // === PAGE FOOTER ===
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(156, 163, 175);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 290, { align: 'center' });
      }

      doc.save(`MonitorBiz_Quote_${quoteNumber}.pdf`);
      setIsGenerating(false);
    }, 300);
  };

  const handleSaveDraft = () => {
    saveDraft({ customer, items, gstRate, validUntil, notes });
    alert('Draft saved successfully!');
  };

  const handleSend = () => {
    if (!validateForm()) return;
    alert('Quote ready to send! (Integrate with email API or backend)');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      localStorage.removeItem('quoteDraft');
      setCustomer({ name: '', email: '', phone: '', address: '' });
      setItems([{ id: 1, type: 'product', name: '', quantity: 1, rate: 0, amount: 0 }]);
      setGstRate(18);
      setValidUntil(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      setNotes('This quotation is valid for 15 days. 50% advance payment required for confirmation.');
    }
  };

  // Reusable button styles
  const buttonBase = {
    padding: '12px 28px',
    fontSize: '16px',
    borderRadius: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: '1px solid transparent'
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
                onClick={addItem}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#6B7280',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
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
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Type</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Description</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Qty</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Rate ₹</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '700', color: '#1F2937' }}>Amount ₹</th>
                    <th style={{ padding: '14px 16px', width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      {/* Type Selector */}
                      <td style={{ padding: '16px', width: '120px' }}>
                        <select
                          value={item.type}
                          onChange={(e) => handleItemChange(item.id, 'type', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '14px',
                            color: '#1F2937',
                            backgroundColor: '#FFFFFF'
                          }}
                        >
                          <option value="product">Product</option>
                          <option value="service">Service</option>
                        </select>
                      </td>

                      {/* Description */}
                      <td style={{ padding: '16px' }}>
                        {item.type === 'service' ? (
                          <select
                            value={item.name}
                            onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              fontSize: '14px',
                              color: '#1F2937',
                              backgroundColor: '#FFFFFF'
                            }}
                          >
                            {SERVICES.map((service) => (
                              <option key={service.name} value={service.name}>
                                {service.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                            placeholder="Enter product name"
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              fontSize: '14px',
                              color: '#1F2937'
                            }}
                          />
                        )}
                      </td>

                      {/* Quantity */}
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
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

                      {/* Rate */}
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                          readOnly={item.type === 'service'} // Auto-filled for services
                          style={{
                            width: '100px',
                            padding: '8px 10px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '14px',
                            textAlign: 'right',
                            color: '#1F2937',
                            backgroundColor: item.type === 'service' ? '#F9FAFB' : '#FFFFFF'
                          }}
                        />
                      </td>

                      {/* Amount */}
                      <td style={{ padding: '16px', fontWeight: '600', color: '#1F2937', textAlign: 'right' }}>
                        ₹ {parseFloat(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>

                      {/* Remove */}
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length <= 1}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '20px',
                            cursor: items.length <= 1 ? 'not-allowed' : 'pointer',
                            opacity: items.length <= 1 ? 0.4 : 1
                          }}
                          aria-label="Remove item"
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

          {/* Summary */}
          <section style={{ marginBottom: '32px' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>Valid Until</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: '#1F2937',
                    backgroundColor: '#FFFFFF',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: '320px', marginLeft: 'auto' }}>
              <div style={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '15px', color: '#6B7280' }}>Subtotal</span>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937' }}>
                    ₹ {subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
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
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937' }}>
                    ₹ {taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '12px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937' }}>Total</span>
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#FF6B00' }}>
                      ₹ {grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>Notes / Terms & Conditions</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
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
              />
            </div>
          </section>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '40px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleReset}
              style={{
                ...buttonBase,
                border: '1px solid #D1D5DB',
                backgroundColor: '#FFFFFF',
                color: '#1F2937'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#F9FAFB'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#FFFFFF'}
              aria-label="Reset form"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              style={{
                ...buttonBase,
                backgroundColor: '#f9fafbff',
                color: '#060606ff',
                border: '1px solid #d1d5dbff'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#fafafaff'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ffffffff'}
              aria-label="Save draft"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={isGenerating}
              style={{
                ...buttonBase,
                backgroundColor: '#f7faf9ff',
                color: '#040404ff',
                border: '1px solid #9da4a2ff',
                opacity: isGenerating ? 0.7 : 1
              }}
              onMouseOver={(e) => !isGenerating && (e.target.style.backgroundColor = '#fdfdfdff')}
              onMouseOut={(e) => !isGenerating && (e.target.style.backgroundColor = '#ffffffff')}
              aria-label="Send quote"
            >
              {isGenerating ? 'Sending...' : 'Send'}
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              style={{
                ...buttonBase,
                backgroundColor: isGenerating ? '#D95E00' : '#FF6B00',
                color: '#FFFFFF'
              }}
              onMouseOver={(e) => !isGenerating && (e.target.style.backgroundColor = '#E05A00')}
              onMouseOut={(e) => !isGenerating && (e.target.style.backgroundColor = '#FF6B00')}
              aria-label="Generate PDF quote"
            >
              {isGenerating ? 'Generating...' : 'Generate Quote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quote;