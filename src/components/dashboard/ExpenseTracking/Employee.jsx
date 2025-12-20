// src/components/dashboard/ExpenseTracking/Employee.jsx
import React, { useState } from 'react';

const Employee = () => {
  const [newExpense, setNewExpense] = useState({
    date: '',
    category: 'travel',
    amount: '',
    description: '',
    receipt: null
  });

  const [expenses, setExpenses] = useState([
    { id: 1, date: '2025-12-10', category: 'travel', amount: 2400, description: 'Train ticket to Pune', reimbursed: true },
    { id: 2, date: '2025-12-12', category: 'meals', amount: 850, description: 'Client lunch', reimbursed: false },
    { id: 3, date: '2025-12-15', category: 'office', amount: 1200, description: 'Printer ink & paper', reimbursed: false }
  ]);

  const [filter, setFilter] = useState('all'); // 'all', 'reimbursed', 'pending'

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'receipt') {
      setNewExpense(prev => ({ ...prev, receipt: files[0] || null }));
    } else {
      setNewExpense(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newExpense.date || !newExpense.amount || !newExpense.description) {
      alert('Please fill all required fields.');
      return;
    }

    const expense = {
      id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1,
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      reimbursed: false
    };

    setExpenses(prev => [expense, ...prev]);
    setNewExpense({ date: '', category: 'travel', amount: '', description: '', receipt: null });
    alert('Expense added successfully!');
  };

  // Filter expenses
  const filteredExpenses = expenses.filter(exp => {
    if (filter === 'reimbursed') return exp.reimbursed;
    if (filter === 'pending') return !exp.reimbursed;
    return true;
  });

  // Calculate totals
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const reimbursedAmount = expenses.filter(e => e.reimbursed).reduce((sum, e) => sum + e.amount, 0);
  const pendingAmount = totalAmount - reimbursedAmount;

  const getCategoryLabel = (cat) => {
    const labels = {
      travel: 'Travel',
      meals: 'Meals & Entertainment',
      office: 'Office Supplies',
      software: 'Software Subscriptions',
      other: 'Other'
    };
    return labels[cat] || cat;
  };

  const handleReimburse = (id) => {
    setExpenses(prev =>
      prev.map(exp =>
        exp.id === id ? { ...exp, reimbursed: true } : exp
      )
    );
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', color: '#374151' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', margin: '0' }}>
          Employee Expense Tracker
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', marginTop: '8px' }}>
          Log, track, and manage your reimbursable expenses.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', maxWidth: '1000px' }}>
        {/* Add Expense Form */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#1F2937' }}>
            Add New Expense
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Category *</label>
                <select
                  name="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                  style={inputStyle}
                >
                  <option value="travel">Travel</option>
                  <option value="meals">Meals & Entertainment</option>
                  <option value="office">Office Supplies</option>
                  <option value="software">Software Subscriptions</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Amount (₹) *</label>
                <input
                  type="number"
                  name="amount"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  required
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Description *</label>
              <textarea
                name="description"
                value={newExpense.description}
                onChange={handleInputChange}
                placeholder="E.g. Train ticket to client site"
                rows="2"
                required
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Receipt (Optional)</label>
              <input
                type="file"
                name="receipt"
                onChange={handleInputChange}
                accept="image/*,.pdf"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px dashed #D1D5DB',
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB',
                  fontSize: '14px'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
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
              Add Expense
            </button>
          </form>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={summaryCardStyle}>
            <p style={summaryLabelStyle}>Total Expenses</p>
            <p style={{ ...summaryAmountStyle, color: '#374151' }}>₹{totalAmount.toLocaleString()}</p>
          </div>
          <div style={summaryCardStyle}>
            <p style={summaryLabelStyle}>Reimbursed</p>
            <p style={{ ...summaryAmountStyle, color: '#10B981' }}>₹{reimbursedAmount.toLocaleString()}</p>
          </div>
          <div style={summaryCardStyle}>
            <p style={summaryLabelStyle}>Pending</p>
            <p style={{ ...summaryAmountStyle, color: pendingAmount > 0 ? '#EF4444' : '#6B7280' }}>
              ₹{pendingAmount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Expense History */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', margin: '0' }}>
              Expense History
            </h2>
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', marginRight: '8px' }}>Filter:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="reimbursed">Reimbursed</option>
              </select>
            </div>
          </div>

          {filteredExpenses.length === 0 ? (
            <p style={{ color: '#6B7280', fontStyle: 'italic' }}>No expenses found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB' }}>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Category</th>
                    <th style={tableHeaderStyle}>Description</th>
                    <th style={tableHeaderStyle}>Amount (₹)</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((exp) => (
                    <tr key={exp.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td style={tableCellStyle}>{new Date(exp.date).toLocaleDateString()}</td>
                      <td style={tableCellStyle}>{getCategoryLabel(exp.category)}</td>
                      <td style={tableCellStyle}>{exp.description}</td>
                      <td style={{ ...tableCellStyle, fontWeight: '600' }}>₹{exp.amount.toLocaleString()}</td>
                      <td style={tableCellStyle}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '20px',
                          backgroundColor: exp.reimbursed ? '#ECFDF5' : '#FEF3C7',
                          color: exp.reimbursed ? '#067647' : '#92400E',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {exp.reimbursed ? 'Reimbursed' : 'Pending'}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        {!exp.reimbursed && (
                          <button
                            onClick={() => handleReimburse(exp.id)}
                            style={{
                              padding: '4px 12px',
                              backgroundColor: '#5C40FF',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Mark as Reimbursed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
  padding: '10px 12px',
  border: '1px solid #D1D5DB',
  borderRadius: '8px',
  fontSize: '15px',
  color: '#374151',
  backgroundColor: '#F9FAFB',
  outline: 'none'
};

const summaryCardStyle = {
  padding: '16px',
  backgroundColor: '#F9FAFB',
  borderRadius: '10px',
  textAlign: 'center'
};

const summaryLabelStyle = {
  fontSize: '13px',
  color: '#6B7280',
  margin: '0 0 6px 0'
};

const summaryAmountStyle = {
  fontSize: '20px',
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

export default Employee;