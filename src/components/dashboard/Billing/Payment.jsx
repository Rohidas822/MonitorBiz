// src/components/dashboard/Billing/Payment.jsx
import React, { useState } from 'react';

const Payment = () => {
  // Mock invoice & payment data (replace with API in real app)
  const [invoice] = useState({
    id: 'INV-2025-00123',
    date: 'Dec 15, 2025',
    customer: 'ABC Enterprises',
    grandTotal: 82600
  });

  const [payments] = useState([
    { id: 1, date: 'Dec 16, 2025', amount: 30000, method: 'UPI', reference: 'TXN987654321' },
    { id: 2, date: 'Dec 20, 2025', amount: 20000, method: 'Card', reference: '****1234' }
  ]);

  // Calculate totals
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const pending = Math.max(0, invoice.grandTotal - totalPaid);
  const isPaid = pending === 0;

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', color: '#374151' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', margin: '0' }}>
          Payment Receipt
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', marginTop: '8px' }}>
          View payment history and outstanding balance for invoice <strong>{invoice.id}</strong>.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '32px' }}>
        {/* Invoice Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0', color: '#1F2937' }}>
              Invoice: {invoice.id}
            </h2>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0' }}>
              Date: {invoice.date}
            </p>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0' }}>
              Customer: {invoice.customer}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: isPaid ? '#ECFDF5' : '#FEF3C7',
              color: isPaid ? '#067647' : '#92400E',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isPaid ? '#10B981' : '#F59E0B',
                marginRight: '6px'
              }}></span>
              {isPaid ? 'Paid in Full' : 'Partially Paid'}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {/* Grand Total */}
          <div style={summaryCardStyle}>
            <p style={summaryLabelStyle}>Invoice Total</p>
            <p style={{ ...summaryAmountStyle, color: '#374151' }}>₹{invoice.grandTotal.toLocaleString()}</p>
          </div>

          {/* Amount Paid */}
          <div style={summaryCardStyle}>
            <p style={summaryLabelStyle}>Amount Paid</p>
            <p style={{ ...summaryAmountStyle, color: '#10B981' }}>₹{totalPaid.toLocaleString()}</p>
          </div>

          {/* Pending Amount */}
          <div style={summaryCardStyle}>
            <p style={summaryLabelStyle}>Pending</p>
            <p style={{ ...summaryAmountStyle, color: isPaid ? '#6B7280' : '#EF4444' }}>
              ₹{pending.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Payment History */}
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1F2937' }}>
            Payment History
          </h3>
          {payments.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB' }}>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Amount (₹)</th>
                    <th style={tableHeaderStyle}>Method</th>
                    <th style={tableHeaderStyle}>Reference</th>
                    <th style={tableHeaderStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td style={tableCellStyle}>{payment.date}</td>
                      <td style={{ ...tableCellStyle, fontWeight: '600', color: '#10B981' }}>
                        ₹{payment.amount.toLocaleString()}
                      </td>
                      <td style={tableCellStyle}>
                        {payment.method === 'UPI' && 'UPI'}
                        {payment.method === 'Card' && 'Card'}
                        {payment.method === 'Cash' && 'Cash'}
                        {payment.method === 'Bank' && 'Bank Transfer'}
                      </td>
                      <td style={tableCellStyle}>{payment.reference}</td>
                      <td style={tableCellStyle}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '20px',
                          backgroundColor: '#ECFDF5',
                          color: '#067647',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          Success
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#6B7280', fontStyle: 'italic' }}>No payments recorded yet.</p>
          )}
        </div>

        {/* Action Button */}
        {!isPaid && (
          <div style={{ marginTop: '32px', textAlign: 'right' }}>
            <button
              onClick={() => alert('Redirecting to payment form...')}
              style={{
                padding: '10px 24px',
                backgroundColor: '#5C40FF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4A32E0'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#5C40FF'}
            >
              Record New Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Styles
const summaryCardStyle = {
  padding: '20px',
  backgroundColor: '#F9FAFB',
  borderRadius: '10px',
  textAlign: 'center'
};

const summaryLabelStyle = {
  fontSize: '14px',
  color: '#6B7280',
  margin: '0 0 8px 0'
};

const summaryAmountStyle = {
  fontSize: '24px',
  fontWeight: '700',
  margin: '0'
};

const tableHeaderStyle = {
  padding: '12px 10px',
  textAlign: 'left',
  fontSize: '13px',
  fontWeight: '600',
  color: '#4B5563',
  backgroundColor: '#F9FAFB',
  textTransform: 'uppercase'
};

const tableCellStyle = {
  padding: '14px 10px',
  fontSize: '15px',
  color: '#374151'
};

export default Payment;