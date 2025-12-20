// src/components/dashboard/Billing/Invoice.jsx
import React, { useState } from 'react';

const Invoice = () => {
  // Mock invoice data (in real app, this comes from API)
  const [invoice] = useState({
    id: 'INV-2025-00123',
    date: 'Dec 15, 2025',
    dueDate: 'Jan 14, 2026',
    customer: {
      name: 'ABC Enterprises',
      email: 'contact@abc.com',
      address: '123 Business Park, Mumbai, Maharashtra 400001'
    },
    items: [
      { id: 1, description: 'Web Development Service', qty: 1, rate: 45000, amount: 45000 },
      { id: 2, description: 'UI/UX Design', qty: 1, rate: 20000, amount: 20000 },
      { id: 3, description: 'Hosting (1 year)', qty: 1, rate: 5000, amount: 5000 }
    ],
    subtotal: 70000,
    taxRate: 18,
    taxAmount: 12600,
    grandTotal: 82600
  });

  // Payment state
  const [payment, setPayment] = useState({
    method: 'upi',
    amount: '',
    reference: ''
  });

  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'error', or null

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment(prev => ({ ...prev, [name]: value }));
    // Clear status when user edits
    if (paymentStatus) setPaymentStatus(null);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(payment.amount);
    if (!payment.method || isNaN(amount) || amount <= 0) {
      setPaymentStatus('error');
      return;
    }

    if (amount > invoice.grandTotal) {
      alert('Amount cannot exceed invoice total.');
      return;
    }

    // Simulate API call
    setPaymentStatus('processing');
    setTimeout(() => {
      // In real app: call payment API here
      console.log('Payment processed:', { ...payment, invoiceId: invoice.id });
      setPaymentStatus('success');
      alert(`Payment of ₹${amount.toFixed(2)} received successfully!`);
    }, 800);
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', color: '#374151' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', margin: '0' }}>
          Invoice Details
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', marginTop: '8px' }}>
          View invoice and record payments.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', maxWidth: '1200px' }}>
        {/* Left: Invoice Summary */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1F2937', margin: '0' }}>Invoice</h2>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: '4px 0' }}>{invoice.id}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '4px 0', fontSize: '14px', color: '#6B7280' }}>Date</p>
              <p style={{ margin: '4px 0', fontWeight: '600' }}>{invoice.date}</p>
              <p style={{ margin: '4px 0', fontSize: '14px', color: '#6B7280' }}>Due Date</p>
              <p style={{ margin: '4px 0', fontWeight: '600' }}>{invoice.dueDate}</p>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>Bill To</h3>
            <p style={{ margin: '4px 0' }}>{invoice.customer.name}</p>
            <p style={{ margin: '4px 0', fontSize: '14px', color: '#6B7280' }}>{invoice.customer.email}</p>
            <p style={{ margin: '4px 0', fontSize: '14px', color: '#6B7280' }}>{invoice.customer.address}</p>
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB' }}>
                  <th style={tableHeaderStyle}>Description</th>
                  <th style={tableHeaderStyle}>Qty</th>
                  <th style={tableHeaderStyle}>Rate (₹)</th>
                  <th style={tableHeaderStyle}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={tableCellStyle}>{item.description}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.qty}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'right' }}>₹{item.rate.toLocaleString()}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'right', fontWeight: '600' }}>₹{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginLeft: 'auto', width: 'fit-content' }}>
            <div style={summaryRowStyle}>
              <span>Subtotal</span>
              <span>₹{invoice.subtotal.toLocaleString()}</span>
            </div>
            <div style={summaryRowStyle}>
              <span>GST ({invoice.taxRate}%)</span>
              <span>₹{invoice.taxAmount.toLocaleString()}</span>
            </div>
            <div style={{ ...summaryRowStyle, borderTop: '2px solid #E5E7EB', fontWeight: '700', fontSize: '18px', paddingTop: '8px', marginTop: '8px' }}>
              <span>Grand Total</span>
              <span style={{ color: '#5C40FF' }}>₹{invoice.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right: Take Payment */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '24px' }}>
            Take Payment
          </h2>

          <form onSubmit={handlePaymentSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Payment Method *</label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['upi', 'card', 'cash', 'bank'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPayment(prev => ({ ...prev, method }))}
                    style={{
                      padding: '10px 16px',
                      border: '1px solid',
                      borderRadius: '8px',
                      backgroundColor: payment.method === method ? '#5C40FF' : 'white',
                      borderColor: payment.method === method ? '#5C40FF' : '#D1D5DB',
                      color: payment.method === method ? 'white' : '#374151',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                  >
                    {method === 'upi' && 'UPI'}
                    {method === 'card' && 'Card'}
                    {method === 'cash' && 'Cash'}
                    {method === 'bank' && 'Bank Transfer'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Amount (₹) *</label>
              <input
                type="number"
                name="amount"
                value={payment.amount}
                onChange={handlePaymentChange}
                placeholder={`e.g. ${invoice.grandTotal}`}
                min="1"
                step="0.01"
                required
                style={inputStyle}
              />
              <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                Invoice total: ₹{invoice.grandTotal.toLocaleString()}
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Reference / TXN ID (Optional)</label>
              <input
                type="text"
                name="reference"
                value={payment.reference}
                onChange={handlePaymentChange}
                placeholder="e.g. UPI txn ID, card last 4 digits"
                style={inputStyle}
              />
            </div>

            {paymentStatus === 'error' && (
              <p style={{ color: '#EF4444', fontSize: '14px', marginBottom: '16px' }}>
                Please fill all required fields correctly.
              </p>
            )}

            <button
              type="submit"
              disabled={paymentStatus === 'processing'}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#5C40FF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: paymentStatus === 'processing' ? 'not-allowed' : 'pointer',
                opacity: paymentStatus === 'processing' ? 0.8 : 1
              }}
            >
              {paymentStatus === 'processing' ? 'Processing...' : 'Record Payment'}
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1F2937' }}>
              Payment Status
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: invoice.grandTotal > 0 ? '#10B981' : '#D1D5DB'
              }}></span>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>
                {invoice.grandTotal > 0 ? 'Pending payment' : 'Paid in full'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Styles
const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #D1D5DB',
  borderRadius: '8px',
  fontSize: '15px',
  color: '#374151',
  backgroundColor: '#F9FAFB',
  outline: 'none'
};

const tableHeaderStyle = {
  padding: '12px 10px',
  textAlign: 'left',
  fontSize: '14px',
  fontWeight: '600',
  color: '#4B5563',
  backgroundColor: '#F9FAFB'
};

const tableCellStyle = {
  padding: '14px 10px',
  fontSize: '15px',
  color: '#374151'
};

const summaryRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
  fontSize: '16px'
};

export default Invoice;