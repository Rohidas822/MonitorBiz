// src/components/dashboard/Billing/CreateQuote.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTrash, FaCalendar } from 'react-icons/fa';

const API_URL = 'http://localhost:3000/quotations';

const ORANGE = '#FF6F00';
const BLACK = '#111111';
const BORDER = '#D1D5DB';
const BG = '#F9FAFB';

const COMMODITIES = [
  'Consulting Hour',
  'Software License',
  'Hardware Setup',
  'AMC Service',
  'Training Session',
];

const CUSTOMERS = [
  { id: 1, name: 'Sample Client', email: 'client@example.com' },
  { id: 2, name: 'Tech Solutions Ltd.', email: 'tech@example.com' },
];

const CreateQuote = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerId: '',
    validUntil: '',
    notes: '',
  });

  const [items, setItems] = useState([
    {
      id: Date.now(),
      commodity: '',
      description: '',
      qty: 1,
      unit: 'Piece',
      unitPrice: 0,
      discount: 0,
      taxRate: 18,
    },
  ]);

  const inputStyle = {
    width: '100%',
    padding: '8px 10px',
    borderRadius: 6,
    border: `1px solid ${BORDER}`,
    fontSize: 14,
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        commodity: '',
        description: '',
        qty: 1,
        unit: 'Piece',
        unitPrice: 0,
        discount: 0,
        taxRate: 18,
      },
    ]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const totals = useMemo(() => {
    let sub = 0;
    let tax = 0;

    items.forEach((i) => {
      const base = i.qty * i.unitPrice;
      const discountAmt = base * (i.discount / 100);
      const taxable = base - discountAmt;
      const taxAmt = taxable * (i.taxRate / 100);
      sub += taxable;
      tax += taxAmt;
    });

    return {
      subtotal: sub.toFixed(2),
      tax: tax.toFixed(2),
      total: (sub + tax).toFixed(2),
    };
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customerId || !form.validUntil) {
      alert('Please fill required fields');
      return;
    }

    const payload = {
      id: Date.now(),
      customerId: form.customerId,
      validUntil: form.validUntil,
      notes: form.notes,
      items,
      totals,
      createdAt: new Date().toISOString(),
      status: 'Draft',
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save quotation');

      alert('Quotation created successfully');
      navigate('/dashboard/billing/quote');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ background: BG, minHeight: '100vh', padding: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 20 }}>
        <h2 style={{ color: BLACK }}>Create Quotation</h2>
        <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'transparent', color: ORANGE }}>
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      >
        {/* Customer Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
          <div>
            <label>Customer *</label>
            <select name="customerId" value={form.customerId} onChange={handleFormChange} style={inputStyle}>
              <option value="">Select Customer</option>
              {CUSTOMERS.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Valid Until *</label>
            <div style={{ position: 'relative' }}>
              <input type="date" name="validUntil" value={form.validUntil} onChange={handleFormChange} style={inputStyle} />
              <FaCalendar style={{ position: 'absolute', right: 10, top: 10, color: '#666' }} />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginTop: 16 }}>
          <label>Notes</label>
          <textarea name="notes" rows={3} value={form.notes} onChange={handleFormChange} style={inputStyle} />
        </div>

        {/* Items */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <h4>Quotation Items</h4>
            <button type="button" onClick={addItem} style={{ background: ORANGE, color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 6 }}>
              <FaPlus /> Add
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead style={{ background: '#F3F4F6' }}>
                <tr>
                  <th>Commodity</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Disc %</th>
                  <th>Tax %</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.id}>
                    <td>
                      <select value={item.commodity} onChange={(e) => handleItemChange(i, 'commodity', e.target.value)} style={inputStyle}>
                        <option value="">Select</option>
                        {COMMODITIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </td>
                    <td><input value={item.description} onChange={(e) => handleItemChange(i, 'description', e.target.value)} style={inputStyle} /></td>
                    <td><input type="number" value={item.qty} onChange={(e) => handleItemChange(i, 'qty', +e.target.value)} style={inputStyle} /></td>
                    <td>
                      <select value={item.unit} onChange={(e) => handleItemChange(i, 'unit', e.target.value)} style={inputStyle}>
                        <option>Piece</option><option>Hour</option><option>Kg</option>
                      </select>
                    </td>
                    <td><input type="number" value={item.unitPrice} onChange={(e) => handleItemChange(i, 'unitPrice', +e.target.value)} style={inputStyle} /></td>
                    <td><input type="number" value={item.discount} onChange={(e) => handleItemChange(i, 'discount', +e.target.value)} style={inputStyle} /></td>
                    <td><input type="number" value={item.taxRate} onChange={(e) => handleItemChange(i, 'taxRate', +e.target.value)} style={inputStyle} /></td>
                    <td>
                      <button type="button" onClick={() => removeItem(i)} style={{ background: 'none', border: 'none', color: 'red' }}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div style={{ marginTop: 20, maxWidth: 300, marginLeft: 'auto' }}>
          <div>Subtotal: ₹{totals.subtotal}</div>
          <div>Tax: ₹{totals.tax}</div>
          <hr />
          <strong style={{ color: ORANGE }}>Total: ₹{totals.total}</strong>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="button" onClick={() => navigate(-1)} style={{ padding: '8px 14px' }}>Cancel</button>
          <button type="submit" style={{ background: ORANGE, color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
            Create Quotation
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuote;
