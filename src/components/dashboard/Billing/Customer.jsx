// src/components/dashboard/Billing/Customer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaUser, FaEnvelope, FaChevronDown, FaUsers, FaCheckCircle, FaFileAlt, FaBuilding, FaEye, FaEdit, FaPlus, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Customer = () => {
  const navigate = useNavigate();

  const sampleCustomerId = "213"; // Static sample row ID (will be dynamic later)

  return (
    <div style={{
      fontFamily: '"Inter", -apple-system, Segoe UI, Roboto, sans-serif',
      backgroundColor: '#F9FAFB',
      minHeight: '100vh',
      padding: '20px'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#000000' }}>Customers</h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <FaSearch style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6B7280'
            }} />
            <input
              type="text"
              placeholder="Search..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '14px',
                color: '#1F2937',
                outline: 'none'
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #E5E7EB',
            backgroundColor: '#FFFFFF'
          }}>
            <span style={{ fontSize: '14px', color: '#1F2937' }}>Rohidas Raghu Lakade</span>
            <FaChevronDown size={12} color="#6B7280" />
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        padding: '24px',
        marginBottom: '24px'
      }}>

        {/* Title + Total + New Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#000000', margin: 0 }}>Customers</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <FaHome color="#6B7280" size={14} />
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Home &gt; Customers</span>
            </div>
            <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>
              Manage your customer relationships and contacts
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: '#F3F4F6',
              fontSize: '14px',
              color: '#1F2937'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10B981'
              }}></div>
              1 Total
            </div>

            {/* New Customer Navigation */}
            <button
              onClick={() => navigate("/dashboard/billing/customer/create")}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#FF6B00',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}>
              <FaPlus size={14} />
              New Customer
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { title: 'Total Customers', value: '1', icon: <FaUsers color="#3B82F6" />, linkText: 'All contacts', linkColor: '#3B82F6' },
            { title: 'Active Customers', value: '1', icon: <FaCheckCircle color="#10B981" />, linkText: 'Currently active', linkColor: '#10B981' },
            { title: 'With GST', value: '0', icon: <FaFileAlt color="#8B5CF6" />, linkText: 'GST registered', linkColor: '#8B5CF6' },
            { title: 'Business Type', value: '1', icon: <FaBuilding color="#F59E0B" />, linkText: 'B2B customers', linkColor: '#F59E0B' }
          ].map((card, index) => (
            <div key={index} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E5E7EB',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>{card.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#000000' }}>{card.value}</span>
                  {card.icon}
                </div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <span style={{
                  fontSize: '12px',
                  color: card.linkColor,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}>
                  {card.linkText}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Directory Table */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
          overflow: 'hidden'
        }}>

          {/* Table Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#F9FAFB'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000000', margin: 0 }}>Customer Directory</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ cursor: 'pointer', fontSize: '14px', color: '#6B7280' }}>
                <FaUser size={14} className="me-1"/> All customers
              </div>
              <div style={{ cursor: 'pointer', fontSize: '14px', color: '#6B7280' }}>
                <FaChevronDown size={12} className="me-1"/> A-Z
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div style={{ padding: '16px 20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', color: '#1F2937' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  {['CUSTOMER', 'CONTACT INFO', 'LOCATION', 'BUSINESS', 'STATUS', 'ACTIONS'].map((header) => (
                    <th key={header} style={{
                      textAlign: 'left',
                      padding: '12px 16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#6B7280',
                      textTransform: 'uppercase'
                    }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '16px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#F3F4F6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#FF6B00'
                      }}>
                        Sa
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#000000' }}>Sample Client</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>ID: {sampleCustomerId}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '16px 16px' }}>
                    <FaPhone size={12} className="me-1 text-secondary"/> 9876543210 <br/>
                    <FaEnvelope size={12} className="me-1 text-secondary"/> client@example.com
                  </td>

                  <td style={{ padding: '16px 16px' }}>
                    <FaMapMarkerAlt size={12} className="me-1 text-secondary"/> Mumbai <br/>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>Maharashtra</span>
                  </td>

                  <td style={{ padding: '16px 16px' }}>
                    <FaBuilding size={12} className="me-1 text-secondary"/> Business <br/>
                    <div style={{
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: '#F3F4F6',
                      display: 'inline-block',
                      color: '#6B7280'
                    }}>
                      No GST
                    </div>
                  </td>

                  <td style={{ padding: '16px 16px' }}>
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: '16px',
                      backgroundColor: '#ECFDF5',
                      color: '#059669',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      Active
                    </div>
                  </td>

                  <td style={{ padding: '16px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {/* View Navigation */}
                      <button
                        onClick={() => navigate(`/dashboard/billing/customer/view/${sampleCustomerId}`)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #E5E7EB',
                          backgroundColor: '#FFFFFF',
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}>
                        <FaEye size={14} />
                        View
                      </button>

                      {/* Edit Navigation */}
                      <button
                        onClick={() => navigate(`/dashboard/billing/customer/edit/${sampleCustomerId}`)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #E5E7EB',
                          backgroundColor: '#FFFFFF',
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}>
                        <FaEdit size={14} />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Customer;
