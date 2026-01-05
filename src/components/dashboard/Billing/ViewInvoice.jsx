// src/components/dashboard/Billing/ViewInvoice.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaSearch,
  FaUserCircle,
  FaFileAlt,
  FaPlus,
  FaCheck,
  FaClock,
  FaChartLine,
  FaList,
  FaArrowLeft,
  FaDownload,
  FaEdit,
  FaPlusCircle,
  FaEye,
  FaTimes,
} from 'react-icons/fa';

const ViewInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // e.g., c088

  // Colors
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightBlueBg = '#F0F7FF';
  const lightRedBg = '#FFF0F0';
  const lightGrayBg = '#F9FAFB';

  // State
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // New state for payment modal

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    referenceNumber: '',
    notes: '',
  });

  // Fetch invoice by ID
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`http://localhost:3000/invoices/${id}`);
        if (!response.ok) throw new Error('Invoice not found');
        const data = await response.json();
        setInvoice(data);
      } catch (err) {
        console.error('Error fetching invoice:', err);
        setError('Failed to load invoice. Please ensure JSON Server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  // Responsive helper
  const isMobile = window.innerWidth < 768;

  // Handle back
  const handleBack = () => navigate('/dashboard/billing/invoice');

  // Handle download PDF
  const handleDownloadPDF = () => {
    alert(`Downloading PDF for ${invoice.id || invoice.invoiceId}...`);
    // In real app: use jsPDF, react-pdf, or backend API
  };

  // Handle edit
  const handleEdit = () => navigate(`/dashboard/billing/invoice/edit/${invoice.id}`);

  // Handle record payment
  const handleRecordPayment = () => setShowPaymentModal(true);

  // Close payment modal
  const closePaymentModal = () => setShowPaymentModal(false);

  // Handle payment form change
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle payment submit
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const { amount, paymentDate, paymentMethod, referenceNumber, notes } = paymentForm;

    if (!amount || !paymentDate || !paymentMethod) {
      alert('Please fill in all required fields.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    const maxAmount = (invoice.grandTotal || 0) - (invoice.paidAmount || 0);

    if (parsedAmount <= 0 || parsedAmount > maxAmount) {
      alert(`Amount must be between ₹0.01 and ₹${maxAmount.toFixed(2)}.`);
      return;
    }

    try {
      // Simulate saving payment
      const updatedInvoice = {
        ...invoice,
        paidAmount: (invoice.paidAmount || 0) + parsedAmount,
        payments: [
          ...(invoice.payments || []),
          {
            amount: parsedAmount,
            date: paymentDate,
            method: paymentMethod,
            reference: referenceNumber,
            notes: notes,
          },
        ],
      };

      // Update in JSON Server
      const response = await fetch(`http://localhost:3000/invoices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInvoice),
      });

      if (!response.ok) throw new Error('Failed to save payment');

      // Update local state
      setInvoice(updatedInvoice);
      alert('Payment recorded successfully!');
      closePaymentModal();
      setPaymentForm({
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: '',
        referenceNumber: '',
        notes: '',
      });

    } catch (err) {
      console.error('Error recording payment:', err);
      alert('Failed to record payment. Please try again.');
    }
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-GB');
  };

  // Calculate totals
  const subtotal = invoice?.items?.reduce((sum, item) => {
    const qty = parseFloat(item.qty) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    return sum + qty * unitPrice;
  }, 0) || 0;

  const taxTotal = invoice?.items?.reduce((sum, item) => {
    const qty = parseFloat(item.qty) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    const taxRate = parseFloat(item.taxRate) || 0;
    return sum + (qty * unitPrice * taxRate) / 100;
  }, 0) || 0;

  const total = subtotal + taxTotal;
  const paid = parseFloat(invoice?.paidAmount) || 0;
  const balanceDue = total - paid;

  // Payment summary
  const paymentSummary = {
    totalAmount: total.toFixed(2),
    amountPaid: paid.toFixed(2),
    balance: balanceDue.toFixed(2),
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: backgroundColor,
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div style={{ fontSize: '18px', color: darkTextColor }}>Loading invoice...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '24px',
          backgroundColor: backgroundColor,
          minHeight: '100vh',
          fontFamily: '"Inter", sans-serif',
          color: darkTextColor,
        }}
      >
        <div
          style={{
            backgroundColor: '#FEF2F2',
            color: '#DC2626',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
        <button
          onClick={() => navigate('/dashboard/billing/invoice')}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: orangeColor,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Back to Invoices
        </button>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div
        style={{
          padding: '24px',
          backgroundColor: backgroundColor,
          minHeight: '100vh',
          fontFamily: '"Inter", sans-serif',
          color: darkTextColor,
        }}
      >
        <div style={{ fontSize: '18px', color: '#6B7280' }}>Invoice not found.</div>
        <button
          onClick={() => navigate('/dashboard/billing/invoice')}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: orangeColor,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Back to Invoices
        </button>
      </div>
    );
  }

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
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: '16px',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#000000' }}>
          Dashboard
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Search */}
          <div style={{ position: 'relative', width: isMobile ? '100%' : '220px' }}>
            <FaSearch
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6B7280',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              style={{
                width: '100%',
                paddingLeft: '36px',
                paddingRight: '12px',
                paddingTop: '8px',
                paddingBottom: '8px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                fontSize: '14px',
                color: darkTextColor,
                outline: 'none',
              }}
            />
          </div>

          {/* User Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <FaUserCircle size={20} color="#4B5563" />
            <span>Rohidas Raghu Lakade</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="#6B7280"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Invoice Detail Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: '16px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#000000' }}>
            {invoice.id || invoice.invoiceId || 'INV-000'}
          </h2>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: '0' }}>
            {invoice.customerName || 'Sample Client'}
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: invoice.status === 'Draft' ? '#F3F4F6' : '#FEF3C7',
                color: invoice.status === 'Draft' ? '#4B5563' : '#B45309',
              }}
            >
              {invoice.status || 'Draft'}
            </span>
            {invoice.status === 'Partial Payment' && (
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: '#FEF3C7',
                  color: '#B45309',
                }}
              >
                Partial Payment
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          <button
            onClick={handleBack}
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
          >
            <FaArrowLeft size={14} />
            Back
          </button>
          <button
            onClick={handleDownloadPDF}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#4B5563',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <FaDownload size={14} />
            Download PDF
          </button>
          <button
            onClick={handleEdit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#f86424ff',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <FaEdit size={14} />
            Edit
          </button>
          <button
            onClick={handleRecordPayment}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#28A745',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <FaPlusCircle size={14} />
            Record Payment
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: '24px',
        }}
      >
        {/* Left Column - Bill Details */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '24px',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: '#000000' }}>
            Bill Details
          </h3>

          <div
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                padding: '12px 16px',
                backgroundColor: '#F9FAFB',
                fontWeight: '600',
                fontSize: '14px',
                color: '#4B5563',
              }}
            >
              <div>Description</div>
              <div style={{ textAlign: 'right' }}>Qty</div>
              <div style={{ textAlign: 'right' }}>Unit Price</div>
              <div style={{ textAlign: 'right' }}>Tax</div>
              <div style={{ textAlign: 'right' }}>Total</div>
            </div>

            {invoice.items?.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                  padding: '12px 16px',
                  borderBottom: index === invoice.items.length - 1 ? 'none' : `1px solid ${borderColor}`,
                  fontSize: '14px',
                }}
              >
                <div>{item.description || '—'}</div>
                <div style={{ textAlign: 'right' }}>{parseFloat(item.qty).toFixed(2)}</div>
                <div style={{ textAlign: 'right' }}>₹{parseFloat(item.unitPrice).toFixed(2)}</div>
                <div style={{ textAlign: 'right' }}>{parseFloat(item.taxRate).toFixed(2)}%</div>
                <div style={{ textAlign: 'right', fontWeight: '600' }}>₹{item.total.toFixed(2)}</div>
              </div>
            ))}

            {/* Summary Rows */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                padding: '12px 16px',
                borderTop: `1px solid ${borderColor}`,
                fontWeight: '600',
                fontSize: '14px',
                color: '#000000',
              }}
            >
              <div></div>
              <div></div>
              <div style={{ textAlign: 'right' }}>Subtotal:</div>
              <div></div>
              <div style={{ textAlign: 'right' }}>₹{subtotal.toFixed(2)}</div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                padding: '12px 16px',
                fontWeight: '600',
                fontSize: '14px',
                color: '#000000',
              }}
            >
              <div></div>
              <div></div>
              <div style={{ textAlign: 'right' }}>Tax:</div>
              <div></div>
              <div style={{ textAlign: 'right' }}>₹{taxTotal.toFixed(2)}</div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                padding: '12px 16px',
                borderTop: `1px solid ${borderColor}`,
                fontWeight: '700',
                fontSize: '16px',
                color: '#000000',
                backgroundColor: '#F9FAFB',
              }}
            >
              <div></div>
              <div></div>
              <div style={{ textAlign: 'right' }}>Total:</div>
              <div></div>
              <div style={{ textAlign: 'right', color: orangeColor }}>₹{total.toFixed(2)}</div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                padding: '12px 16px',
                fontWeight: '600',
                fontSize: '14px',
                color: '#000000',
                backgroundColor: '#F9FAFB',
              }}
            >
              <div></div>
              <div></div>
              <div style={{ textAlign: 'right' }}>Paid:</div>
              <div></div>
              <div style={{ textAlign: 'right', color: '#28A745' }}>₹{paid.toFixed(2)}</div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                padding: '12px 16px',
                fontWeight: '700',
                fontSize: '16px',
                color: '#000000',
                backgroundColor: lightRedBg,
              }}
            >
              <div></div>
              <div></div>
              <div style={{ textAlign: 'right' }}>Balance Due:</div>
              <div></div>
              <div style={{ textAlign: 'right', color: '#DC2626' }}>₹{balanceDue.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Right Column - Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Payment Summary */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: '#000000' }}>
              Payment Summary
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <span style={{ fontSize: '14px', color: '#4B5563' }}>Total Amount</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>
                  ₹{paymentSummary.totalAmount}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <span style={{ fontSize: '14px', color: '#4B5563' }}>Amount Paid</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#28A745' }}>
                  ₹{paymentSummary.amountPaid}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                }}
              >
                <span style={{ fontSize: '14px', color: '#4B5563' }}>Balance</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626' }}>
                  ₹{paymentSummary.balance}
                </span>
              </div>
            </div>
          </div>

          {/* Invoice Dates */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: '#000000' }}>
              Invoice Dates
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '14px', color: '#6B7280', display: 'block' }}>Issue Date</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>
                  {formatDate(invoice.invoiceDate)}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '14px', color: '#6B7280', display: 'block' }}>Due Date</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>
                  {formatDate(invoice.dueDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: '#000000' }}>
              Customer Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '14px', color: '#6B7280', display: 'block' }}>Name</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>{invoice.customerName}</span>
              </div>
              <div>
                <span style={{ fontSize: '14px', color: '#6B7280', display: 'block' }}>Email</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>{invoice.customerEmail}</span>
              </div>
              <div>
                <span style={{ fontSize: '14px', color: '#6B7280', display: 'block' }}>Phone</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>{invoice.customerPhone}</span>
              </div>
              <div>
                <span style={{ fontSize: '14px', color: '#6B7280', display: 'block' }}>Address</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>{invoice.customerAddress}</span>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: '#000000' }}>
              Payment History
            </h3>
            {invoice.payments && invoice.payments.length > 0 ? (
              invoice.payments.map((payment, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: idx < invoice.payments.length - 1 ? `1px solid ${borderColor}` : 'none',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '600' }}>₹{payment.amount.toFixed(2)}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                      {formatDate(payment.date)} • {payment.method || 'UPI'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                      Ref: {payment.reference || '—'}
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Receipt download will be implemented soon.')}
                    style={{
                      fontSize: '12px',
                      color: '#3B82F6',
                      textDecoration: 'underline',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Download Receipt
                  </button>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center', padding: '16px' }}>
                No payments recorded.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              width: isMobile ? '90%' : '500px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closePaymentModal}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: '#6B7280',
                cursor: 'pointer',
              }}
            >
              <FaTimes />
            </button>

            <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0', color: '#000000' }}>
              Record Payment
            </h3>

            <form onSubmit={handlePaymentSubmit}>
              {/* Amount */}
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
                  Amount *
                </label>
                <div style={{ position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '14px',
                      color: '#6B7280',
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={paymentForm.amount}
                    onChange={handlePaymentChange}
                    required
                    min="0.01"
                    step="0.01"
                    max={balanceDue}
                    style={{
                      width: '100%',
                      paddingLeft: '36px',
                      paddingRight: '12px',
                      padding: '12px',
                      borderRadius: '6px',
                      border: `1px solid ${borderColor}`,
                      fontSize: '14px',
                      color: darkTextColor,
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                  Maximum: ₹{balanceDue.toFixed(2)}
                </p>
              </div>

              {/* Payment Date */}
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
                  Payment Date *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    name="paymentDate"
                    value={paymentForm.paymentDate}
                    onChange={handlePaymentChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: `1px solid ${borderColor}`,
                      fontSize: '14px',
                      color: darkTextColor,
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </div>
              </div>

              {/* Payment Method */}
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
                  Payment Method *
                </label>
                <select
                  name="paymentMethod"
                  value={paymentForm.paymentMethod}
                  onChange={handlePaymentChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    fontSize: '14px',
                    color: darkTextColor,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="">Select method</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              {/* Reference Number */}
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
                  Reference Number
                </label>
                <input
                  type="text"
                  name="referenceNumber"
                  value={paymentForm.referenceNumber}
                  onChange={handlePaymentChange}
                  placeholder="Transaction ID, Cheque No, etc."
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    fontSize: '14px',
                    color: darkTextColor,
                    backgroundColor: '#FFFFFF',
                  }}
                />
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
                  value={paymentForm.notes}
                  onChange={handlePaymentChange}
                  placeholder="Additional notes..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    fontSize: '14px',
                    color: darkTextColor,
                    backgroundColor: '#FFFFFF',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={closePaymentModal}
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
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    background: '#28A745',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInvoice;