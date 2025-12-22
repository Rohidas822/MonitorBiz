// src/components/dashboard/ExpenseTracking/Employee.jsx
import React, { useState, useRef } from 'react';

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
    { id: 2, date: '2025-12-15', category: 'meals', amount: 850, description: 'Client lunch', reimbursed: false },
    { id: 3, date: '2025-12-18', category: 'office', amount: 1200, description: 'Printer ink & paper', reimbursed: false }
  ]);

  const [filter, setFilter] = useState('all'); // 'all', 'reimbursed', 'pending'
  const fileInputRef = useRef(null);

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
    if (parseFloat(newExpense.amount) <= 0) {
      alert('Amount must be greater than zero.');
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
    if (fileInputRef.current) fileInputRef.current.value = '';
    alert('Expense added successfully!');
  };

  const filteredExpenses = expenses.filter(exp => {
    if (filter === 'reimbursed') return exp.reimbursed;
    if (filter === 'pending') return !exp.reimbursed;
    return true;
  });

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

  const handleResetForm = () => {
    setNewExpense({ date: '', category: 'travel', amount: '', description: '', receipt: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-dark">Employee Expense Tracker</h1>
        <p className="text-muted">
          Log, track, and manage your reimbursable expenses.
        </p>
      </div>

      <div className="row g-4">
        {/* Add Expense Form */}
        <div className="col-12">
          <div className="card border rounded-3 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="h5 fw-bold text-dark mb-4">Add New Expense</h2>
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold text-dark">Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={newExpense.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold text-dark">Category *</label>
                    <select
                      className="form-select"
                      name="category"
                      value={newExpense.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="travel">Travel</option>
                      <option value="meals">Meals & Entertainment</option>
                      <option value="office">Office Supplies</option>
                      <option value="software">Software Subscriptions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold text-dark">Amount (₹) *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      value={newExpense.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0.01"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Description *</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={newExpense.description}
                    onChange={handleInputChange}
                    placeholder="E.g. Train ticket to client site"
                    rows="2"
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">Receipt (Optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    name="receipt"
                    onChange={handleInputChange}
                    accept="image/*,.pdf"
                    ref={fileInputRef}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn fw-bold text-white"
                    style={{ backgroundColor: '#FF6B00' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#E05A00'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B00'}
                  >
                    Add Expense
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleResetForm}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="col-12">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="bg-light rounded-3 p-4 text-center h-100">
                <p className="text-muted mb-2">Total Expenses</p>
                <p className="h4 fw-bold mb-0 text-dark">₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-light rounded-3 p-4 text-center h-100">
                <p className="text-muted mb-2">Reimbursed</p>
                <p className="h4 fw-bold mb-0" style={{ color: '#10B981' }}>
                  ₹{reimbursedAmount.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-light rounded-3 p-4 text-center h-100">
                <p className="text-muted mb-2">Pending</p>
                <p className="h4 fw-bold mb-0" style={{ color: pendingAmount > 0 ? '#EF4444' : '#6B7280' }}>
                  ₹{pendingAmount.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expense History */}
        <div className="col-12">
          <div className="card border rounded-3 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold text-dark mb-0">Expense History</h2>
                <div className="d-flex align-items-center mt-2 mt-md-0">
                  <label className="form-label mb-0 me-2 fw-medium text-dark">Filter:</label>
                  <select
                    className="form-select form-select-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ width: 'auto', minWidth: '120px' }}
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="reimbursed">Reimbursed</option>
                  </select>
                </div>
              </div>

              {filteredExpenses.length === 0 ? (
                <p className="text-muted fst-italic">No expenses found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-borderless align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="text-start text-muted fw-semibold small text-uppercase">Date</th>
                        <th className="text-start text-muted fw-semibold small text-uppercase">Category</th>
                        <th className="text-start text-muted fw-semibold small text-uppercase">Description</th>
                        <th className="text-end text-muted fw-semibold small text-uppercase">Amount (₹)</th>
                        <th className="text-start text-muted fw-semibold small text-uppercase">Status</th>
                        <th className="text-start text-muted fw-semibold small text-uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpenses.map((exp) => (
                        <tr key={exp.id} className="border-bottom">
                          <td className="py-3">{new Date(exp.date).toLocaleDateString('en-GB')}</td>
                          <td className="py-3">{getCategoryLabel(exp.category)}</td>
                          <td className="py-3">{exp.description}</td>
                          <td className="py-3 text-end fw-bold text-dark">
                            ₹{exp.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3">
                            <span className={`badge rounded-pill px-2 py-1 ${
                              exp.reimbursed 
                                ? 'bg-success-subtle text-success' 
                                : 'bg-warning-subtle text-warning'
                            }`} style={{ fontSize: '0.8125rem', fontWeight: '600' }}>
                              {exp.reimbursed ? 'Reimbursed' : 'Pending'}
                            </span>
                          </td>
                          <td className="py-3">
                            {!exp.reimbursed && (
                              <button
                                type="button"
                                className="btn btn-sm"
                                onClick={() => handleReimburse(exp.id)}
                                style={{ 
                                  backgroundColor: '#FF6B00', 
                                  color: 'white',
                                  fontSize: '0.8125rem',
                                  padding: '4px 10px'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#E05A00'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B00'}
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
      </div>
    </div>
  );
};

export default Employee;