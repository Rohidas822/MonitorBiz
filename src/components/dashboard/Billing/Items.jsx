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
  const [message, setMessage] = useState({ text: '', type: '' }); // 'success', 'error', 'info'

  // Item list
  const [items, setItems] = useState([]);

  // Predefined data
  const goodsUnits = ['kg', 'g', 'L', 'mL', 'pcs', 'box', 'dozen', 'bundle', 'other'];
  const servicesUnits = ['sq.ft', 'hr', 'day', 'session', 'unit', 'km', 'mi', 'project', 'other'];
  
  const categories = {
    goods: ['Food', 'Beverages', 'Electronics', 'Clothing', 'Home & Kitchen', 'Other'],
    services: ['Home Cleaning', 'Deep Cleaning', 'Office Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Other']
  };

  const cleaningServices = ['Office Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Deep Cleaning', 'Post-Construction Cleaning'];

  // Auto-hide message
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Validate form
  const validateForm = () => {
    const finalUnit = unit === 'other' ? customUnit.trim() : unit;
    if (!itemName.trim()) {
      setMessage({ text: 'Item name is required.', type: 'error' });
      return false;
    }
    if (!finalUnit) {
      setMessage({ text: 'Please select or specify a unit.', type: 'error' });
      return false;
    }
    if (!category) {
      setMessage({ text: 'Please select a category.', type: 'error' });
      return false;
    }
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) < 0) {
      setMessage({ text: 'Please enter a valid price.', type: 'error' });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleAddItem = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const finalUnit = unit === 'other' ? customUnit.trim() : unit;
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
    setCategory(item.category);
    setPrice(item.price.toString());
    setDescription(item.description);

    // Set unit
    const unitsList = item.type === 'goods' ? goodsUnits : servicesUnits;
    if (unitsList.includes(item.unit)) {
      setUnit(item.unit);
      setCustomUnit('');
    } else {
      setUnit('other');
      setCustomUnit(item.unit);
    }

    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setMessage({ text: 'Now editing this item.', type: 'info' });
  };

  // Handle delete
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setMessage({ text: 'Item removed.', type: 'info' });
  };

  const isUnitOther = unit === 'other';

  // Message alert class mapping
  const getAlertClass = (type) => {
    switch (type) {
      case 'success': return 'alert-success';
      case 'error': return 'alert-danger';
      case 'info': return 'alert-info';
      default: return 'alert-secondary';
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-dark">Manage Items</h1>
        <p className="text-muted">
          Add, edit, or delete products and services
        </p>
      </div>

      {/* Notification Banner */}
      {message.text && (
        <div className="row mb-4">
          <div className="col-12">
            <div className={`alert ${getAlertClass(message.type)} alert-dismissible fade show mb-0`} role="alert">
              {message.text}
              <button
                type="button"
                className="btn-close"
                onClick={() => setMessage({ text: '', type: '' })}
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      )}

      <div className="row justify-content-center">
        {/* Form Section */}
        <div className="col-12 col-lg-7 mb-5 mb-lg-0">
          <div className="card border rounded-3 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleAddItem}>
                {/* Item Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Item Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Organic Sugar, Office Cleaning"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                  />
                </div>

                {/* Type */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Type *</label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="itemType"
                        id="typeGoods"
                        checked={itemType === 'goods'}
                        onChange={() => {
                          setItemType('goods');
                          setUnit('');
                          setCategory('');
                        }}
                        style={{ accentColor: '#FF6B00' }}
                      />
                      <label className="form-check-label text-dark" htmlFor="typeGoods">Goods</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="itemType"
                        id="typeServices"
                        checked={itemType === 'services'}
                        onChange={() => {
                          setItemType('services');
                          setUnit('');
                          setCategory('');
                        }}
                        style={{ accentColor: '#ff6b00ff' }}
                      />
                      <label className="form-check-label text-dark" htmlFor="typeServices">Services</label>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Category *</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    {categories[itemType]?.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Unit */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Unit *</label>
                  <select
                    className="form-select"
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value);
                      if (e.target.value !== 'other') setCustomUnit('');
                    }}
                    required
                  >
                    <option value="">Select unit</option>
                    {(itemType === 'goods' ? goodsUnits : servicesUnits).map((u) => (
                      <option key={u} value={u}>
                        {u === 'other' ? 'Other (specify)' : u}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Unit */}
                {isUnitOther && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Specify Unit *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. meter, sq.yd, batch..."
                      value={customUnit}
                      onChange={(e) => setCustomUnit(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">Rate/Price (₹) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="form-control"
                    placeholder="e.g. 120.50"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">Description</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Optional details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn w-100 fw-bold text-white"
                  style={{ backgroundColor: '#FF6B00' }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#E05A00'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B00'}
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
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setItemName(service)}
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

        {/* Item List */}
        <div className="col-12 col-lg-5">
          <div className="card border rounded-3 shadow-sm">
            <div className="card-header py-3 bg-light">
              <h2 className="h6 fw-semibold mb-0 text-dark">Your Items ({items.length})</h2>
            </div>
            <div className="card-body p-0">
              {items.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">No items added yet</p>
                </div>
              ) : (
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="fw-semibold text-dark">Name</th>
                        <th className="fw-semibold text-dark">Unit</th>
                        <th className="fw-semibold text-dark">₹</th>
                        <th className="fw-semibold text-dark">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="fw-medium text-dark">{item.name}</div>
                            <small className="text-muted">{item.category}</small>
                          </td>
                          <td>{item.unit}</td>
                          <td>₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(item)}
                                style={{ color: '#FF6B00', borderColor: '#FF6B00' }}
                                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 107, 0, 0.1)'}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(item.id)}
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
  );
};

export default Items;