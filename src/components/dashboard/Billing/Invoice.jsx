// src/components/dashboard/Billing/Invoice.jsx
import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';

const Invoice = () => {
  // Original data (for reset)
  const originalInvoice = {
    id: 'INV-2025-00123',
    date: '2025-12-15',
    dueDate: '2026-01-14',
    customer: {
      name: 'ABC Enterprises',
      email: 'contact@abc.com',
      address: '123 Business Park, Mumbai, Maharashtra 400001'
    },
    items: [
      { id: 1, description: 'Office Cleaning Service', qty: 1, rate: 5000, amount: 5000 },
      { id: 2, description: 'Deep Cleaning Service', qty: 1, rate: 2000, amount: 2000 },
      { id: 3, description: 'Hosting (1 year)', qty: 1, rate: 5000, amount: 5000 }
    ]
  };

  const [invoice, setInvoice] = useState(originalInvoice);
  const [taxRate, setTaxRate] = useState(18); // ✅ Now editable via state
  const [payment, setPayment] = useState({ method: 'upi', amount: '', reference: '' });
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error'
  const [isDirty, setIsDirty] = useState(false);

  // Derived values
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;
  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);
  const balanceDue = Math.max(0, grandTotal - totalPaid);

  // Refs for PDF
  const invoiceRef = useRef();

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!invoice.customer.name.trim()) newErrors.customerName = 'Customer name is required';
    if (!invoice.items.every(item => item.description.trim())) newErrors.items = 'All items must have a description';
    if (subtotal <= 0) newErrors.subtotal = 'Invoice must have a positive total';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleCustomerChange = (field, value) => {
    setIsDirty(true);
    setInvoice(prev => ({ ...prev, customer: { ...prev.customer, [field]: value } }));
  };

  const handleInvoiceFieldChange = (field, value) => {
    setIsDirty(true);
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setIsDirty(true);
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id
          ? {
              ...item,
              [field]: field === 'qty' || field === 'rate' ? (parseFloat(value) || 0) : value,
              amount: field === 'qty' || field === 'rate'
                ? (parseFloat(field === 'qty' ? value : item.qty) || 0) *
                  (parseFloat(field === 'rate' ? value : item.rate) || 0)
                : item.amount
            }
          : item
      )
    }));
  };

  const addItem = () => {
    setIsDirty(true);
    const newId = Math.max(...invoice.items.map(i => i.id)) + 1;
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, description: '', qty: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (id) => {
    if (invoice.items.length > 1) {
      setIsDirty(true);
      setInvoice(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(payment.amount);
    if (!payment.method || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (amount > balanceDue) {
      alert(`Amount cannot exceed balance due of ₹${balanceDue.toLocaleString('en-IN')}.`);
      return;
    }

    const newPayment = {
      id: Date.now(),
      method: payment.method,
      amount,
      reference: payment.reference || '—',
      timestamp: new Date().toISOString()
    };

    setPaymentHistory(prev => [...prev, newPayment]);
    setPayment({ method: 'upi', amount: '', reference: '' });
    setIsDirty(true);
    alert(`Payment of ₹${amount.toLocaleString('en-IN')} recorded successfully!`);
  };

  const handleReset = () => {
    setInvoice(originalInvoice);
    setTaxRate(18); // ✅ Reset GST rate too
    setPaymentHistory([]);
    setIsDirty(false);
    setErrors({});
    setSaveStatus(null);
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);
    setSaveStatus(null);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Saved invoice:', invoice, 'GST Rate:', taxRate);
      setIsDirty(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  // PDF Generation
  const handleDownloadPDF = () => {
    if (!validate()) {
      alert('Please fix validation errors before exporting.');
      return;
    }

    const doc = new jsPDF();
    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(31, 41, 55);
    doc.text('MonitorBiz', margin, 25);

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text('Business Solutions', margin, 31);

    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('INVOICE', pageWidth / 2, 25, { align: 'center' });

    doc.setFontSize(10);
    doc.text(invoice.id, pageWidth - margin, 25, { align: 'right' });
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString('en-GB')}`, pageWidth - margin, 31, { align: 'right' });

    // Bill To
    const startY = 45;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Bill To', margin, startY);
    doc.setFont(undefined, 'normal');
    const toLines = [
      invoice.customer.name,
      ...(invoice.customer.address.split('\n')),
      invoice.customer.email
    ];
    toLines.forEach((line, i) => {
      doc.text(line, margin, startY + 8 + i * 6);
    });

    // Items Table
    const tableTop = startY + 8 + toLines.length * 6 + 10;
    doc.setFillColor(249, 250, 251);
    doc.rect(margin, tableTop, contentWidth, 8, 'F');
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('Description', margin + 2, tableTop + 5);
    doc.text('Qty', margin + 40, tableTop + 5, { align: 'center' });
    doc.text('Rate (₹)', margin + 80, tableTop + 5, { align: 'right' });
    doc.text('Amount (₹)', pageWidth - margin - 2, tableTop + 5, { align: 'right' });

    let currentY = tableTop + 12;
    doc.setFont(undefined, 'normal');
    invoice.items.forEach(item => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(item.description.substring(0, 50), margin + 2, currentY);
      doc.text(item.qty.toString(), margin + 40, currentY, { align: 'center' });
      doc.text(item.rate.toLocaleString('en-IN'), margin + 80, currentY, { align: 'right' });
      doc.text((item.qty * item.rate).toLocaleString('en-IN'), pageWidth - margin - 2, currentY, { align: 'right' });
      currentY += 7;
    });

    // Totals
    const totalStartY = currentY + 10;
    const right = pageWidth - margin;
    doc.setFont(undefined, 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('Subtotal', right - 70, totalStartY);
    doc.text(subtotal.toLocaleString('en-IN'), right, totalStartY, { align: 'right' });

    // ✅ GST line in PDF now uses dynamic taxRate
    doc.text(`GST (${taxRate}%)`, right - 70, totalStartY + 6);
    doc.text(taxAmount.toLocaleString('en-IN'), right, totalStartY + 6, { align: 'right' });

    doc.setDrawColor(229, 231, 235);
    doc.line(right - 70, totalStartY + 12, right, totalStartY + 12);

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 107, 0); // #FF6B00
    doc.text('GRAND TOTAL', right - 70, totalStartY + 18);
    doc.text(`₹ ${grandTotal.toLocaleString('en-IN')}`, right, totalStartY + 18, { align: 'right' });

    // Save
    doc.save(`Invoice_${invoice.id}.pdf`);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold text-dark">Invoice Details</h1>
          <p className="text-muted">Edit invoice, record payments, and export as PDF.</p>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleReset}
            disabled={!isDirty}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-sm"
            style={{ backgroundColor: '#FF6B00', color: 'white' }}
            onClick={handleSave}
            disabled={isSaving || !isDirty}
          >
            {isSaving ? 'Saving...' : 'Save Invoice'}
          </button>
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={handleDownloadPDF}
          >
            PDF
          </button>
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Invoice saved successfully!
          <button type="button" className="btn-close" onClick={() => setSaveStatus(null)}></button>
        </div>
      )}
      {saveStatus === 'error' && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Failed to save invoice. Please try again.
          <button type="button" className="btn-close" onClick={() => setSaveStatus(null)}></button>
        </div>
      )}

      <div className="row g-4">
        {/* Left: Editable Invoice */}
        <div className="col-lg-8">
          <div className="card border rounded-3 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h2 className="h4 fw-bold text-dark mb-1">Invoice</h2>
                  <input
                    type="text"
                    className={`form-control form-control-sm border-0 bg-transparent p-0 fw-bold ${errors.customerName ? 'is-invalid' : ''}`}
                    value={invoice.id}
                    onChange={(e) => handleInvoiceFieldChange('id', e.target.value)}
                    style={{ width: '180px', color: '#1F2937' }}
                  />
                </div>
                <div className="text-end">
                  <div className="mb-2">
                    <label className="form-label text-muted mb-1 small">Date</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={invoice.date}
                      onChange={(e) => handleInvoiceFieldChange('date', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label text-muted mb-1 small">Due Date</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={invoice.dueDate}
                      onChange={(e) => handleInvoiceFieldChange('dueDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="h6 fw-bold text-dark mb-2">Bill To</h3>
                <input
                  type="text"
                  className={`form-control mb-2 ${errors.customerName ? 'is-invalid' : ''}`}
                  placeholder="Customer Name *"
                  value={invoice.customer.name}
                  onChange={(e) => handleCustomerChange('name', e.target.value)}
                />
                {errors.customerName && <div className="invalid-feedback d-block">{errors.customerName}</div>}
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={invoice.customer.email}
                  onChange={(e) => handleCustomerChange('email', e.target.value)}
                />
                <textarea
                  className="form-control"
                  placeholder="Address"
                  rows="2"
                  value={invoice.customer.address}
                  onChange={(e) => handleCustomerChange('address', e.target.value)}
                ></textarea>
              </div>

              <div className="table-responsive mb-3">
                <table className="table table-borderless align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-start text-dark fw-bold">Description</th>
                      <th className="text-center text-dark fw-bold" style={{ width: '100px' }}>Qty</th>
                      <th className="text-end text-dark fw-bold" style={{ width: '120px' }}>Rate (₹)</th>
                      <th className="text-end text-dark fw-bold" style={{ width: '120px' }}>Amount (₹)</th>
                      <th style={{ width: '40px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr key={item.id} className="border-bottom">
                        <td>
                          <input
                            type="text"
                            className={`form-control form-control-sm border-0 p-0 ${!item.description.trim() ? 'is-invalid' : ''}`}
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            placeholder="Item description"
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="number"
                            min="1"
                            className="form-control form-control-sm text-center"
                            value={item.qty}
                            onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                            style={{ width: '80px' }}
                          />
                        </td>
                        <td className="text-end">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="form-control form-control-sm text-end"
                            value={item.rate}
                            onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                            style={{ width: '100px' }}
                          />
                        </td>
                        <td className="text-end fw-semibold text-dark">
                          ₹{(item.qty * item.rate).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-link p-0 text-danger"
                            onClick={() => removeItem(item.id)}
                            disabled={invoice.items.length <= 1}
                            aria-label="Remove item"
                            style={{ opacity: invoice.items.length <= 1 ? 0.4 : 1, pointerEvents: invoice.items.length <= 1 ? 'none' : 'auto' }}
                          >
                            <span style={{ fontSize: '1.2rem' }}>×</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {errors.items && <div className="text-danger small mb-3">{errors.items}</div>}

              <div className="d-grid mb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
                  onClick={addItem}
                >
                  + Add Item
                </button>
              </div>

              <div className="ms-auto" style={{ maxWidth: '280px' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-dark">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {/* ✅ Editable GST % — inline, minimal, matches design */}
                <div className="d-flex justify-content-between mb-2 align-items-center">
                  <div className="text-muted d-flex align-items-center">
                    GST (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={taxRate}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setTaxRate(val);
                        setIsDirty(true);
                      }}
                      className="form-control form-control-sm border-0 p-0 text-muted bg-transparent"
                      style={{ width: '40px', textAlign: 'right', fontSize: '0.875rem' }}
                    />
                    %)
                  </div>
                  <span className="text-dark">₹{taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between pt-2 mt-2 border-top border-secondary fw-bold" style={{ fontSize: '1.1rem' }}>
                  <span className="text-dark">Grand Total</span>
                  <span style={{ color: '#FF6B00' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span className="text-success">Paid</span>
                  <span className="text-success">₹{totalPaid.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span className="text-danger">Balance Due</span>
                  <span className="text-danger">₹{balanceDue.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payment Section */}
        <div className="col-lg-4">
          <div className="card border rounded-3 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h5 fw-bold text-dark mb-4">Record Payment</h2>

              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Payment Method *</label>
                  <div className="d-flex flex-wrap gap-2">
                    {[
                      { key: 'upi', label: 'UPI' },
                      { key: 'card', label: 'Card' },
                      { key: 'cash', label: 'Cash' },
                      { key: 'bank', label: 'Bank' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        className={`btn btn-sm px-3 py-2 ${
                          payment.method === opt.key
                            ? 'text-white'
                            : 'btn-outline-secondary text-dark'
                        }`}
                        style={{
                          backgroundColor: payment.method === opt.key ? '#FF6B00' : '',
                          borderColor: payment.method === opt.key ? '#FF6B00' : '#D1D5DB'
                        }}
                        onClick={() => setPayment(prev => ({ ...prev, method: opt.key }))}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Amount (₹) *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={payment.amount}
                    onChange={handlePaymentChange}
                    placeholder={`e.g. ${balanceDue.toLocaleString('en-IN')}`}
                    min="1"
                    step="0.01"
                    required
                  />
                  <div className="form-text text-muted">
                    Balance due: ₹{balanceDue.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">Reference / TXN ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="reference"
                    value={payment.reference}
                    onChange={handlePaymentChange}
                    placeholder="e.g. UPI txn ID"
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100 fw-bold text-white"
                  style={{ backgroundColor: '#FF6B00' }}
                >
                  Record Payment
                </button>
              </form>

              {/* Payment History */}
              <div className="mt-5 pt-3 border-top border-secondary-subtle">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 className="h6 fw-bold text-dark">Payment History</h3>
                  <span className="badge bg-light text-dark">
                    {paymentHistory.length} payment{paymentHistory.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {paymentHistory.length === 0 ? (
                  <p className="text-muted small">No payments recorded yet.</p>
                ) : (
                  <ul className="list-group list-group-flush">
                    {paymentHistory.map(p => (
                      <li key={p.id} className="list-group-item p-2">
                        <div className="d-flex justify-content-between small">
                          <span>
                            {p.method.toUpperCase()} • {p.reference}
                          </span>
                          <span className="fw-semibold">₹{p.amount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-muted small">
                          {new Date(p.timestamp).toLocaleString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;