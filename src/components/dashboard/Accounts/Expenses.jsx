// src/components/dashboard/Billing/Expenses.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaUserCircle,
  FaMoneyBillWave,
  FaPlus,
  FaCheck,
  FaClock,
  FaChartLine,
  FaWallet,
  FaFileAlt,
  FaEye,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

const Expenses = () => {
  const navigate = useNavigate();

  // Colors
  const orangeColor = '#FF6F00';
  const darkTextColor = '#111827';
  const borderColor = '#E5E7EB';
  const backgroundColor = '#F9FAFB';
  const lightGrayBg = '#F9FAFB';

  // State
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('Latest first');

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:3000/expenses');
        if (!response.ok) throw new Error('Failed to fetch expenses');
        const data = await response.json();
        setExpenses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching expenses:', err);
        setError('Failed to load expenses. Please ensure JSON Server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Derive stats
  const totalExpenses = expenses.length;
  const totalSpent = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

  // Get unique categories
  const categories = [...new Set(expenses.map(exp => exp.category).filter(Boolean))];

  // Filter & sort logic
  const filteredExpenses = expenses
    .filter(exp => {
      const matchesSearch =
        exp.payee?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = filterCategory === 'All' || exp.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'Latest first' ? dateB - dateA : dateA - dateB;
    });

  // Responsive helper
  const isMobile = window.innerWidth < 768;

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-GB');
  };

  // Handle view expense
  const handleViewExpense = (id) => {
    navigate(`/dashboard/accounts/expenses/${id}`);
  };

  // Handle edit expense
  const handleEditExpense = (id) => {
    navigate(`/dashboard/accounts/expenses/${id}/edit`);
  };

  // Handle delete expense
  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      await fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'DELETE',
      });
      setExpenses(expenses.filter(exp => exp.id !== id));
      alert('Expense deleted successfully!');
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('Failed to delete expense.');
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: isMobile ? '16px' : '24px',
          backgroundColor: backgroundColor,
          minHeight: '100vh',
          fontFamily: '"Inter", sans-serif',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '18px', color: darkTextColor }}>Loading expenses...</div>
      </div>
    );
  }

  if (error) {
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
          onClick={() => window.location.reload()}
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
          Retry
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
        <h1 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '700', margin: 0, color: '#000000' }}>
          Expenses
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
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Expenses Header Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          padding: isMobile ? '16px' : '24px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: '24px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0', color: '#000000' }}>
              Expenses
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                color: '#6B7280',
                marginBottom: '8px',
              }}
            >
              <FaFileAlt size={12} />
              <span>Home</span>
              <span> / </span>
              <span style={{ color: '#4B5563' }}>Expenses</span>
            </div>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              Track and manage your business expenses
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '16px',
                backgroundColor: `${orangeColor}20`,
                color: orangeColor,
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: orangeColor,
                }}
              ></span>
              {totalExpenses} Total
            </div>
            <button
              onClick={() => navigate('/dashboard/accounts/expenses/new')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: orangeColor,
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              <FaPlus size={14} />
              New Expense
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            borderLeft: `4px solid #495057`,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#49505720',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
            }}
          >
            <FaMoneyBillWave size={20} color="#495057" />
          </div>
          <div>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Total Expenses</p>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0', color: '#000000' }}>
              {totalExpenses}
            </h3>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>All time</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            borderLeft: `4px solid #28a745`,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#28a74520',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
            }}
          >
            <FaCheck size={20} color="#28a745" />
          </div>
          <div>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Paid Expenses</p>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0', color: '#000000' }}>
              {totalExpenses} {/* In real app, filter by status */}
            </h3>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Completed</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            borderLeft: `4px solid #6f42c1`,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#6f42c120',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
            }}
          >
            <FaChartLine size={20} color="#6f42c1" />
          </div>
          <div>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Total Spent</p>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0', color: '#000000' }}>
              ₹{totalSpent.toFixed(2)}
            </h3>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Expense value</p>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
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
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: '16px',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#000000' }}>
            Recent Expenses
          </h3>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ fontSize: '14px', color: '#6B7280' }}>Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: `1px solid ${borderColor}`,
                fontSize: '14px',
                color: darkTextColor,
                backgroundColor: '#FFFFFF',
              }}
            >
              <option value="All">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 6l4-4 4 4M8 18l4 4 4-4" />
              </svg>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '14px',
                  color: darkTextColor,
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value="Latest first">Latest first</option>
                <option value="Oldest first">Oldest first</option>
              </select>
            </div>
          </div>
        </div>

        {filteredExpenses.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '48px 32px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: `${orangeColor}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <FaWallet size={28} color={orangeColor} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 12px', color: '#000000' }}>
              No Expenses Found
            </h3>
            <p style={{ fontSize: '15px', color: '#6B7280', maxWidth: '500px', margin: '0 auto 28px' }}>
              {searchQuery || filterCategory !== 'All'
                ? 'No expenses match your current filters.'
                : 'Start tracking your business expenses by creating your first expense entry.'}
            </p>
            <button
              onClick={() => navigate('/dashboard/accounts/expenses/new')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: orangeColor,
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              <FaPlus size={14} />
              Create Expense
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '14px' }}>
              <thead>
                <tr style={{ backgroundColor: lightGrayBg, textAlign: 'left' }}>
                  {['DATE', 'PAYEE', 'CATEGORY', 'AMOUNT', 'METHOD', 'REFERENCE', 'ACTIONS'].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: isMobile ? '8px' : '10px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#6B7280',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((exp) => (
                  <tr
                    key={exp.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FCFCFD')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                  >
                    <td style={{ padding: isMobile ? '8px' : '12px', verticalAlign: 'top' }}>
                      <div>{formatDate(exp.date)}</div>
                    </td>
                    <td style={{ padding: isMobile ? '8px' : '12px', verticalAlign: 'top' }}>
                      <div>{exp.payee || '—'}</div>
                    </td>
                    <td style={{ padding: isMobile ? '8px' : '12px', verticalAlign: 'top' }}>
                      <div>{exp.category || '—'}</div>
                    </td>
                    <td style={{ padding: isMobile ? '8px' : '12px', verticalAlign: 'top', textAlign: 'right' }}>
                      <div style={{ fontWeight: '600', color: darkTextColor }}>₹{exp.amount?.toFixed(2) || '0.00'}</div>
                    </td>
                    <td style={{ padding: isMobile ? '8px' : '12px', verticalAlign: 'top' }}>
                      <div>{exp.paymentMethod || '—'}</div>
                    </td>
                    <td style={{ padding: isMobile ? '8px' : '12px', verticalAlign: 'top' }}>
                      <div>{exp.reference || '—'}</div>
                    </td>
                    <td style={{ padding: isMobile ? '8px' : '12px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => navigate(`/dashboard/accounts/expenses/view/${exp.id}`)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#DBEAFE',
                            color: '#2563EB',
                            border: 'none',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}
                        >
                          <FaEye size={10} />
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/dashboard/accounts/expenses/edit/${exp.id}`)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#FEF3C7',
                            color: '#B45309',
                            border: 'none',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}
                        >
                          <FaEdit size={10} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(exp.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#FEE2E2',
                            color: '#DC2626',
                            border: 'none',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}
                        >
                          <FaTrash size={10} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;