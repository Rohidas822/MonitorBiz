// src/components/dashboard/Billing/EditInvoice.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaSearch,
  FaUserCircle,
  FaFileAlt,
  FaArrowLeft,
  FaExclamationTriangle,
} from 'react-icons/fa';

const EditInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // e.g., 'c088'

  // Colors
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightYellowBg = '#FEF3C7';
  const lightRedBg = '#FFF0F0';

  // State
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    reasonForEdit: '',
    customerName: '',
    customerEmail: '',
    amount: '',
    dueDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch invoice by ID
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`http://localhost:3000/invoices/${id}`);
        if (!response.ok) throw new Error('Invoice not found');
        const data = await response.json();
        setInvoice(data);

        // Initialize form with current values
        setFormData({
          reasonForEdit: '',
          customerName: data.customerName || '',
          customerEmail: data.customerEmail || '',
          amount: (data.grandTotal || 0).toFixed(2),
          dueDate: data.dueDate || '',
        });
      } catch (err) {
        console.error('Error fetching invoice:', err);
        setError('Failed to load invoice. Please ensure JSON Server is running.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInvoice();
  }, [id]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reasonForEdit.trim()) {
      alert('Please provide a reason for editing this invoice.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare updated data (only update editable fields)
      const updatedData = {
        ...invoice,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        grandTotal: parseFloat(formData.amount) || 0,
        dueDate: formData.dueDate,
        // Optionally add audit log field
        lastEditedAt: new Date().toISOString(),
        editedBy: 'Rohidas Raghu Lakade', // or get from auth context
        editReason: formData.reasonForEdit,
      };

      const response = await fetch(`http://localhost:3000/invoices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update invoice');

      alert('Invoice updated successfully!');
      navigate(`/dashboard/billing/invoice/${id}`); // Redirect to detail page

    } catch (err) {
      console.error('Error updating invoice:', err);
      alert('Failed to update invoice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Responsive helper
  const isMobile = window.innerWidth < 768;

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
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

  if (error || !invoice) {
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
          {error || 'Invoice not found.'}
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
          Edit Invoice
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

      {/* Warning Banner */}
      <div
        style={{
          backgroundColor: lightYellowBg,
          border: `1px solid #F59E0B`,
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <FaExclamationTriangle size={20} color="#F59E0B" style={{ marginTop: '4px' }} />
        <div>
          <strong style={{ color: '#7C2D12', fontSize: '14px' }}>Warning: You are editing an invoice</strong>
          <ul style={{ margin: '8px 0 0 16px', padding: 0, fontSize: '13px', color: '#7C2D12' }}>
            <li>Only draft invoices can be edited</li>
            <li>All changes will be logged for audit purposes</li>
            <li>You must provide a reason for this edit</li>
            <li>Consider creating a new invoice instead if this has been sent to customer</li>
          </ul>
        </div>
      </div>

      {/* Edit Form */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          padding: isMobile ? '16px' : '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#000000' }}>
            Edit Invoice {invoice.id}
          </h2>
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
            Draft
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Reason for Edit */}
          <div
            style={{
              backgroundColor: lightRedBg,
              border: `1px solid #EF4444`,
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#7C2D12',
              }}
            >
              Reason for Edit *
            </label>
            <textarea
              name="reasonForEdit"
              value={formData.reasonForEdit}
              onChange={handleChange}
              placeholder="Please explain why you are editing this invoice (e.g., customer requested address change, amount correction, etc.)"
              required
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
            <p style={{ fontSize: '12px', color: '#7C2D12', marginTop: '8px' }}>
              This reason will be logged and cannot be changed later.
            </p>
          </div>

          {/* Form Fields */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '24px',
              marginBottom: '24px',
            }}
          >
            {/* Customer Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#000000',
                }}
              >
                Customer Name *
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
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

            {/* Customer Email */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
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

            {/* Amount */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
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
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
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
            </div>

            {/* Due Date */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#000000',
                }}
              >
                Due Date *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="date"
                  name="dueDate"
                  value={formatDateForInput(formData.dueDate)}
                  onChange={handleChange}
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
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
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
              ← Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                background: '#ee8551ff',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? 'Updating...' : 'Update Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInvoice;