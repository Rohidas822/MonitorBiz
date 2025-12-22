// src/components/dashboard/Billing/Payment.jsx
import React, { useState } from 'react';
import jsPDF from 'jspdf';


const Payment = () => {
  // Mock data (replace with API)
  const [invoice] = useState({
    id: 'INV-2025-00123',
    date: 'Dec 15, 2025',
    dueDate: 'Jan 14, 2026',
    customer: 'ABC Enterprises',
    email: 'contact@abc.com',
    address: '123 Business Park, Mumbai, Maharashtra 400001',
    grandTotal: 82600
  });

  const [payments] = useState([
    { id: 1, date: 'Dec 16, 2025', amount: 30000, method: 'UPI', reference: 'TXN987654321' },
    { id: 2, date: 'Dec 20, 2025', amount: 20000, method: 'Card', reference: '****1234' }
  ]);

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const pending = Math.max(0, invoice.grandTotal - totalPaid);
  const isPaid = pending === 0;

  const getMethodLabel = (method) => {
    switch (method) {
      case 'UPI': return 'UPI';
      case 'Card': return 'Card';
      case 'Cash': return 'Cash';
      case 'Bank': return 'Bank Transfer';
      default: return method;
    }
  };

  // ✅ PDF Receipt Generation
  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(31, 41, 55); // #1F2937
    doc.text('MonitorBiz', margin, 25);

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128); // #6B7280
    doc.text('Business Solutions', margin, 31);

    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('PAYMENT RECEIPT', pageWidth / 2, 25, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Receipt #: REC-${invoice.id.split('-')[2]}`, pageWidth - margin, 25, { align: 'right' });
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - margin, 31, { align: 'right' });

    // Bill To
    const startY = 45;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Received from', margin, startY);
    doc.setFont(undefined, 'normal');
    const toLines = [
      invoice.customer,
      invoice.address,
      invoice.email
    ];
    toLines.forEach((line, i) => {
      doc.text(line.substring(0, 60), margin, startY + 8 + i * 6);
    });

    // Invoice Reference
    const refY = startY + 8 + toLines.length * 6 + 8;
    doc.setFont(undefined, 'bold');
    doc.text('For Invoice', margin, refY);
    doc.setFont(undefined, 'normal');
    doc.text(invoice.id, margin, refY + 6);

    // Payment Summary
    const summaryY = refY + 14;
    doc.setFont(undefined, 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('Invoice Total', margin, summaryY);
    doc.text(`₹ ${invoice.grandTotal.toLocaleString('en-IN')}`, pageWidth - margin, summaryY, { align: 'right' });

    doc.text('Total Paid', margin, summaryY + 6);
    doc.text(`₹ ${totalPaid.toLocaleString('en-IN')}`, pageWidth - margin, summaryY + 6, { align: 'right' });

    doc.text('Balance Due', margin, summaryY + 12);
    doc.text(`₹ ${pending.toLocaleString('en-IN')}`, pageWidth - margin, summaryY + 12, { align: 'right' });

    // Divider
    doc.setDrawColor(229, 231, 235);
    doc.line(margin, summaryY + 18, pageWidth - margin, summaryY + 18);

    // Status
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(isPaid ? "16, 185, 129" : "239, 68, 68"); // success/error
    doc.text(isPaid ? 'FULLY PAID' : 'PARTIALLY PAID', margin, summaryY + 24);

    // Payment History
    if (payments.length > 0) {
      const tableTop = summaryY + 34;
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text('Payment History', margin, tableTop);

      let currentY = tableTop + 8;
      doc.setFont(undefined, 'normal');
      doc.setTextColor(75, 85, 99);
      payments.forEach(p => {
        doc.text(p.date, margin, currentY);
        doc.text(getMethodLabel(p.method), margin + 40, currentY);
        doc.text(p.reference, margin + 80, currentY);
        doc.text(`₹ ${p.amount.toLocaleString('en-IN')}`, pageWidth - margin, currentY, { align: 'right' });
        currentY += 6;
      });
    }

    // Footer
    const footerY = currentY + 12;
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text('Thank you for your business!', margin, footerY);

    doc.save(`Receipt_${invoice.id}.pdf`);
  };

  // ✅ CSV Export
  const handleExportCSV = () => {
    if (payments.length === 0) return alert('No payment data to export.');
    const headers = ['Date', 'Amount (₹)', 'Method', 'Reference', 'Status'];
    const rows = payments.map(p => [
      p.date,
      p.amount.toLocaleString('en-IN'),
      getMethodLabel(p.method),
      p.reference,
      'Success'
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob(['\uFEFF', csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Payments_${invoice.id}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Send Reminder (mock)
  const handleSendReminder = () => {
    if (isPaid) return alert('Invoice is already paid.');
    alert(`Payment reminder sent to ${invoice.email}!`);
  };

  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold text-dark">Payment Receipt</h1>
          <p className="text-muted">
            View payment history for{' '}
            <a
              href={`/dashboard/billing/invoices/${invoice.id}`}
              className="text-decoration-none fw-medium"
              style={{ color: '#FF6B00' }}
            >
              invoice {invoice.id}
            </a>
            .
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-md-0">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center"
            onClick={handleExportCSV}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-file-earmark-spreadsheet me-1" viewBox="0 0 16 16">
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
              <path d="M9 9h2v2H9V9zm0 3h2v2H9v-2zm-4-4h2v2H5V9zm0 3h2v2H5v-2zm0 3h2v2H5v-2zm4-8h2v2H9V5zm3 0h2v2h-2V5z"/>
            </svg>
            CSV
          </button>
          <button
            type="button"
            className="btn btn-outline-dark btn-sm d-flex align-items-center"
            onClick={handleDownloadReceipt}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-download me-1" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            PDF
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="card border rounded-3 shadow-sm">
        <div className="card-body p-4 p-md-5">
          {/* Invoice Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
            <div>
              <h2 className="h5 fw-bold text-dark mb-1">Invoice: {invoice.id}</h2>
              <p className="text-muted mb-1">Date: {invoice.date}</p>
              <p className="text-muted mb-0">Due: {invoice.dueDate}</p>
              <p className="text-muted mb-0 mt-1">Customer: {invoice.customer}</p>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
              {!isPaid && (
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                  onClick={handleSendReminder}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-envelope me-1" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 10.223l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                  </svg>
                  Send Reminder
                </button>
              )}
              <span className={`badge rounded-pill px-3 py-2 ${
                isPaid ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'
              }`} style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                <span
                  className="rounded-circle me-2"
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    backgroundColor: isPaid ? '#10B981' : '#F59E0B'
                  }}
                ></span>
                {isPaid ? 'Paid in Full' : 'Partially Paid'}
              </span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="bg-light rounded-3 p-4 text-center h-100">
                <p className="text-muted mb-2">Invoice Total</p>
                <p className="h4 fw-bold mb-0 text-dark">₹{invoice.grandTotal.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className ="col-md-4">
              <div className="bg-light rounded-3 p-4 text-center h-100">
                <p className="text-muted mb-2">Amount Paid</p>
                <p className="h4 fw-bold mb-0" style={{ color: '#10B981' }}>
                  ₹{totalPaid.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-light rounded-3 p-4 text-center h-100">
                <p className="text-muted mb-2">Pending</p>
                <p className="h4 fw-bold mb-0" style={{ color: isPaid ? '#6B7280' : '#EF4444' }}>
                  ₹{pending.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h5 fw-bold text-dark">Payment History</h3>
              <span className="badge bg-light text-dark">
                {payments.length} payment{payments.length !== 1 ? 's' : ''}
              </span>
            </div>
            {payments.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-start text-muted fw-semibold small text-uppercase">Date</th>
                      <th className="text-end text-muted fw-semibold small text-uppercase">Amount (₹)</th>
                      <th className="text-start text-muted fw-semibold small text-uppercase">Method</th>
                      <th className="text-start text-muted fw-semibold small text-uppercase">Reference</th>
                      <th className="text-start text-muted fw-semibold small text-uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-bottom">
                        <td className="py-3 text-nowrap">{payment.date}</td>
                        <td className="py-3 text-end fw-bold" style={{ color: '#10B981' }}>
                          ₹{payment.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3">{getMethodLabel(payment.method)}</td>
                        <td className="py-3 text-muted">{payment.reference}</td>
                        <td className="py-3">
                          <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1 small fw-semibold">
                            Success
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted fst-italic">No payments recorded yet.</p>
            )}
          </div>

          {/* Action Button */}
          {!isPaid && (
            <div className="d-flex justify-content-end mt-4 pt-3 border-top border-secondary-subtle">
              <button
                type="button"
                className="btn fw-bold text-white"
                style={{ backgroundColor: '#FF6B00' }}
                onClick={() => {
                  // In real app: navigate to payment form
                  alert('Redirecting to payment form...');
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#E05A00'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B00'}
              >
                Record New Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;