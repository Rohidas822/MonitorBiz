// src/components/dashboard/Billing/EditExpense.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaSearch,
  FaUserCircle,
  FaArrowLeft,
  FaCalendar,
} from 'react-icons/fa';

const EditExpense = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Colors
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const lightGray = '#F3F4F6';
  const borderColor = '#D1D5DB';
  const backgroundColor = '#F9FAFB';

  // Mock data
  const categories = [
    { id: 1, name: 'Office Supplies' },
    { id: 2, name: 'Travel & Transport' },
    { id: 3, name: 'Marketing' },
    { id: 4, name: 'Software Subscriptions' },
    { id: 5, name: 'Utilities' },
  ];

  const paymentMethods = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Bank Transfer' },
    { id: 3, name: 'Credit Card' },
    { id: 4, name: 'UPI' },
  ];

  // State
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    payee: '',
    category: '',
    paymentMethod: '',
    reference: '',
    billableToCustomer: false,
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch expense
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(`http://localhost:3000/expenses/${id}`);
        if (!response.ok) throw new Error('Expense not found');
        const data = await response.json();
        setFormData({
          date: data.date || '',
          amount: data.amount?.toString() || '',
          payee: data.payee || '',
          category: data.category || '',
          paymentMethod: data.paymentMethod || '',
          reference: data.reference || '',
          billableToCustomer: data.billableToCustomer || false,
        });
      } catch (err) {
        console.error('Error fetching expense:', err);
        setError('Failed to load expense. Please ensure JSON Server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  const isMobile = window.innerWidth < 768;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.payee.trim()) {
      setError('Payee is required.');
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (!formData.category) {
      setError('Category is required.');
      return;
    }
    if (!formData.paymentMethod) {
      setError('Payment method is required.');
      return;
    }

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      // Keep existing audit fields if needed
    };

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) throw new Error('Failed to update expense');

      alert('Expense updated successfully!');
      navigate(`/dashboard/accounts/expenses/${id}`);
    } catch (err) {
      console.error('Error updating expense:', err);
      setError('Failed to update expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/dashboard/accounts/expenses/${id}`);
  };

  const inputStyle = (isFocused = false) => ({
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${isFocused ? orangeColor : borderColor}`,
    fontSize: '14px',
    color: darkTextColor,
    backgroundColor: '#FFFFFF',
    transition: 'border-color 0.2s',
    fontFamily: '"Inter", sans-serif',
  });

  if (loading) {
    return (
      <div
        style={{
          padding: isMobile ? '16px' : '24px',
          backgroundColor: backgroundColor,
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '18px', color: darkTextColor }}>Loading expense...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: isMobile ? '16px' : '24px',
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        fontFamily: '"Inter", sans-serif',
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
        <div>
          <h1 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#000000' }}>
            Edit Expense
          </h1>
          <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>
            Update expense details
          </p>
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
        >
          <FaArrowLeft size={14} />
          Back to Expense
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            color: '#DC2626',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '16px',
          }}
        >
          {error}
        </div>
      )}

      {/* Edit Form */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          padding: isMobile ? '16px' : '28px',
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '16px' : '24px',
              marginBottom: '24px',
            }}
          >
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
                  Date <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    style={{
                      ...inputStyle(),
                      paddingRight: '36px',
                      width: '100%',
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
                  Payee <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="payee"
                  placeholder="Vendor name or person paid"
                  value={formData.payee}
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
                  Category <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={inputStyle()}
                  onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                  onBlur={(e) => (e.target.style.borderColor = borderColor)}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
                  Reference
                </label>
                <input
                  type="text"
                  name="reference"
                  placeholder="Transaction ID, receipt number, etc."
                  value={formData.reference}
                  onChange={handleChange}
                  style={inputStyle()}
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
                  Amount <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
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
                  Payment Method <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  style={inputStyle()}
                  onFocus={(e) => (e.target.style.borderColor = orangeColor)}
                  onBlur={(e) => (e.target.style.borderColor = borderColor)}
                >
                  <option value="">Select method</option>
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.name}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: isMobile ? '16px' : '24px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: '#000000',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    name="billableToCustomer"
                    checked={formData.billableToCustomer}
                    onChange={handleChange}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: orangeColor,
                      cursor: 'pointer',
                    }}
                  />
                  Billable to customer
                </label>
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
              flexDirection: isMobile ? 'column-reverse' : 'row',
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
            >
              Cancel
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
                background: orangeColor,
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.8 : 1,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              {isSubmitting ? 'Updating...' : 'Update Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;