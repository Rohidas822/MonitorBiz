// src/components/dashboard/Billing/Items.jsx
import React, { useState, useEffect } from 'react';

const Items = () => {
  // Form states
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('goods');
  const [unit, setUnit] = useState('');
  const [customUnit, setCustomUnit] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // Notification state
  const [message, setMessage] = useState({ text: '', type: '' }); // 'success' or 'error'

  // Item list (simulated DB)
  const [items, setItems] = useState([]);

  // Predefined data
  const goodsUnits = ['kg', 'g', 'L', 'mL', 'pcs', 'box', 'dozen', 'bundle', 'other'];
  const servicesUnits = ['sq.ft', 'hr', 'day', 'session', 'unit', 'km', 'mi', 'project', 'other'];
  
  const categories = {
    goods: ['Food', 'Beverages', 'Electronics', 'Clothing', 'Home & Kitchen', 'Other'],
    services: ['Home Cleaning', 'Deep Cleaning', 'Office Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Other']
  };

  const cleaningServices = ['Office Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Deep Cleaning', 'Post-Construction Cleaning'];

  // Auto-hide message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle form submission
  const handleAddItem = (e) => {
    e.preventDefault();

    const finalUnit = unit === 'other' ? customUnit.trim() : unit;
    if (!itemName.trim() || !finalUnit || !category || !price) {
      setMessage({ text: 'Please fill all required fields.', type: 'error' });
      return;
    }

    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      type: itemType,
      unit: finalUnit,
      category,
      price: parseFloat(price),
      description: description.trim()
    };

    setItems((prev) => [newItem, ...prev]);
    setMessage({ text: 'Item added to catalog!', type: 'success' });
    
    // Reset form
    setItemName('');
    setUnit('');
    setCustomUnit('');
    setCategory('');
    setPrice('');
    setDescription('');
  };

  // Handle edit
  const handleEdit = (item) => {
    setItemName(item.name);
    setItemType(item.type);
    setUnit(item.unit);
    if (!goodsUnits.includes(item.unit) && !servicesUnits.includes(item.unit)) {
      setCustomUnit(item.unit);
      setUnit('other');
    }
    setCategory(item.category);
    setPrice(item.price.toString());
    setDescription(item.description);
    
    // Remove from list
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setMessage({ text: 'Now editing this item.', type: 'info' });
  };

  // Handle delete
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setMessage({ text: 'Item removed.', type: 'info' });
  };

  const isUnitOther = unit === 'other';

  return (
    <div className="p-4 p-md-6 bg-gray-50 min-vh-100" style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>Manage Items</h1>
            <p style={{ color: '#6B7280', fontSize: '14px' }}>
              Add, edit, or delete products and services
            </p>
          </div>
        </div>

        {/* Notification Banner */}
        {message.text && (
          <div className="row mb-4">
            <div className="col-12">
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: message.type === 'success' ? '#166534' : message.type === 'error' ? '#b91c1c' : '#0891b2',
                  backgroundColor: message.type === 'success' ? '#dcfce7' : message.type === 'error' ? '#fee2e2' : '#cffafe',
                  border: `1px solid ${
                    message.type === 'success' ? '#bbf7d0' : message.type === 'error' ? '#fca5a5' : '#a5f3fc'
                  }`
                }}
              >
                {message.text}
              </div>
            </div>
          </div>
        )}

        <div className="row justify-content-center">
          {/* Form Section */}
          <div className="col-12 col-lg-7 mb-5 mb-lg-0">
            <div className="card border-0 shadow-sm rounded-3" style={{ border: '1px solid #e5e7eb' }}>
              <div className="card-body p-5">
                <form onSubmit={handleAddItem}>
                  {/* Item Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#1F2937' }}>Item Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Organic Sugar, Office Cleaning"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      style={{
                        padding: '10px 14px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '15px'
                      }}
                    />
                  </div>

                  {/* Type */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#1F2937' }}>Type *</label>
                    <div className="d-flex gap-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="itemType"
                          checked={itemType === 'goods'}
                          onChange={() => {
                            setItemType('goods');
                            setUnit('');
                            setCategory('');
                          }}
                          style={{ width: '18px', height: '18px', accentColor: '#5C40FF' }}
                        />
                        <label className="form-check-label" style={{ color: '#374151' }}>Goods</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="itemType"
                          checked={itemType === 'services'}
                          onChange={() => {
                            setItemType('services');
                            setUnit('');
                            setCategory('');
                          }}
                          style={{ width: '18px', height: '18px', accentColor: '#5C40FF' }}
                        />
                        <label className="form-check-label" style={{ color: '#374151' }}>Services</label>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#1F2937' }}>Category *</label>
                    <select
                      className="form-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{
                        padding: '10px 14px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '15px'
                      }}
                    >
                      <option value="">Select category</option>
                      {categories[itemType]?.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Unit */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#1F2937' }}>Unit *</label>
                    <select
                      className="form-select"
                      value={unit}
                      onChange={(e) => {
                        setUnit(e.target.value);
                        if (e.target.value !== 'other') setCustomUnit('');
                      }}
                      style={{
                        padding: '10px 14px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '15px'
                      }}
                    >
                      <option value="">Select unit</option>
                      {(itemType === 'goods' ? goodsUnits : servicesUnits).map((u) => (
                        <option key={u} value={u}>
                          {u === 'other' ? 'Other (specify)' : u}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Unit (if "Other" selected) */}
                  {isUnitOther && (
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: '#1F2937' }}>
                        Specify Unit *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. meter, sq.yd, batch..."
                        value={customUnit}
                        onChange={(e) => setCustomUnit(e.target.value)}
                        style={{
                          padding: '10px 14px',
                          border: '1px solid #D1D5DB',
                          borderRadius: '8px',
                          fontSize: '15px'
                        }}
                      />
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#1F2937' }}>Rate/Price (₹) *</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-control"
                      placeholder="e.g. 120.50"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      style={{
                        padding: '10px 14px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '15px'
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold" style={{ color: '#1F2937' }}>Description</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Optional details..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{
                        padding: '10px 14px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '15px',
                        resize: 'none'
                      }}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn w-100 fw-bold"
                    style={{
                      backgroundColor: '#5C40FF',
                      color: 'white',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '16px',
                      border: 'none'
                    }}
                  >
                    {itemName ? 'Update Item' : 'Add Item to Catalog'}
                  </button>
                </form>

                {/* Service Suggestions */}
                {itemType === 'services' && (
                  <div className="mt-4">
                    <small className="text-muted">Popular services:</small>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {cleaningServices.map((service) => (
                        <button
                          key={service}
                          type="button"
                          className="btn btn-sm"
                          onClick={() => setItemName(service)}
                          style={{
                            backgroundColor: '#F3F4F6',
                            color: '#4B5563',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '13px'
                          }}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Item List Table */}
          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm rounded-3" style={{ border: '1px solid #e5e7eb' }}>
              <div className="card-header py-3" style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <h2 className="h6 fw-semibold mb-0" style={{ color: '#1F2937' }}>Your Items ({items.length})</h2>
              </div>
              <div className="card-body p-0">
                {items.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted mb-0">No items added yet</p>
                  </div>
                ) : (
                  <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <table className="table table-hover mb-0">
                      <thead style={{ backgroundColor: '#f9fafb' }}>
                        <tr>
                          <th style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Name</th>
                          <th style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Unit</th>
                          <th style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>₹</th>
                          <th style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td style={{ fontSize: '14px' }}>
                              <div className="fw-medium">{item.name}</div>
                              <small className="text-muted">{item.category}</small>
                            </td>
                            <td style={{ fontSize: '14px' }}>{item.unit}</td>
                            <td style={{ fontSize: '14px' }}>₹{item.price.toFixed(2)}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm"
                                  onClick={() => handleEdit(item)}
                                  style={{ color: '#5C40FF', padding: '4px 8px' }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-sm"
                                  onClick={() => handleDelete(item.id)}
                                  style={{ color: '#EF4444', padding: '4px 8px' }}
                                >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;