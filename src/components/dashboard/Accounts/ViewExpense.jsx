// src/components/dashboard/Billing/ViewExpense.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaSearch,
  FaUserCircle,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaDownload,
  FaCalendar,
  FaWallet,
  FaTag,
  FaCreditCard,
  FaFileAlt,
} from 'react-icons/fa';

const ViewExpense = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Colors
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightGrayBg = '#F9FAFB';

  // State
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch expense
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(`http://localhost:3000/expenses/${id}`);
        if (!response.ok) throw new Error('Expense not found');
        const data = await response.json();
        setExpense(data);
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

  const handleBack = () => navigate('/dashboard/accounts/expenses');
  const handleEdit = () => navigate(`/dashboard/accounts/expenses/${id}/edit`);
  const handleDownloadPDF = () => alert(`Downloading PDF for expense ${id}...`);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      await fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'DELETE',
      });
      alert('Expense deleted successfully!');
      navigate('/dashboard/accounts/expenses');
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('Failed to delete expense.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-GB');
  };

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

  if (error || !expense) {
    return (
      <div
        style={{
          padding: isMobile ? '16px' : '24px',
          backgroundColor: backgroundColor,
          minHeight: '100vh',
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
          {error || 'Expense not found.'}
        </div>
        <button
          onClick={handleBack}
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
          Back to Expenses
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
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#000000' }}>
          View Expense
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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

      {/* Expense Header */}
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
            Expense #{expense.id}
          </h2>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: '#DBEAFE',
                color: '#2563EB',
              }}
            >
              {expense.category || 'Uncategorized'}
            </span>
            {expense.billableToCustomer && (
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: '#DCFCE7',
                  color: '#166534',
                }}
              >
                Billable
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
              background: '#6F42C1',
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
            onClick={handleDelete}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <FaTrash size={14} />
            Delete
          </button>
        </div>
      </div>

      {/* Expense Details Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '24px',
        }}
      >
        {/* Left Column */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '24px',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: '#000000' }}>
            Expense Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaCalendar size={14} />
                <span>Date</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginTop: '4px' }}>
                {formatDate(expense.date)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaWallet size={14} />
                <span>Payee</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginTop: '4px' }}>
                {expense.payee || '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaTag size={14} />
                <span>Category</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginTop: '4px' }}>
                {expense.category || '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaCreditCard size={14} />
                <span>Payment Method</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginTop: '4px' }}>
                {expense.paymentMethod || '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Amount & Reference */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: '#000000' }}>
              Financial Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#6B7280' }}>Amount</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: orangeColor, marginTop: '4px' }}>
                  ₹{expense.amount?.toFixed(2) || '0.00'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaFileAlt size={14} />
                  <span>Reference</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginTop: '4px' }}>
                  {expense.reference || '—'}
                </div>
              </div>
            </div>
          </div>

          {/* Audit Info */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: '#000000' }}>
              Audit Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Created At</span>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#000000', marginTop: '4px' }}>
                  {expense.createdAt ? new Date(expense.createdAt).toLocaleString('en-GB') : '—'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Created By</span>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#000000', marginTop: '4px' }}>
                  Rohidas Raghu Lakade
                </div>
              </div>
              <div>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Billable to Customer</span>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#000000', marginTop: '4px' }}>
                  {expense.billableToCustomer ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExpense;