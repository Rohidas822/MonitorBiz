// src/components/dashboard/DashboardHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { motion, useAnimation, useInView } from 'framer-motion';

const DashboardHome = () => {
  // === YOUR ORIGINAL DATA (unchanged) ===
  const billingData = {
    customer: {
      company: "TechNova Inc.",
      gst: "GST123456789",
      address: "123 Innovation Blvd, Silicon Valley",
      phone: "+1 (555) 123-4567"
    },
    quote: {
      commodity: "Cloud Hosting Package",
      pricing: "$299/month",
      grandTotal: "$299.00"
    },
    invoice: {
      grandTotal: "$299.00",
      taxPayment: "$29.90",
      total: "$328.90"
    },
    payment: {
      receipt: "#INV-2025-001",
      amountPaid: "$328.90",
      pending: "$0.00"
    }
  };

  const expenseData = {
    employee: {
      name: "Alex Rivera",
      expense: "$1,250.00"
    },
    companyClient: {
      client: "GlobalCorp Ltd.",
      amount: "$5,000.00"
    },
    credit: {
      description: "Vendor Credit Refund",
      amount: "-$300.00"
    },
    miscellaneous: {
      description: "Office Supplies",
      amount: "$185.50"
    },
    dynamic: {
      description: "Project Bonus",
      amount: "$750.00"
    }
  };

  // Chart Data
  const billingPieData = [
    { name: 'Grand Total', value: parseFloat(billingData.quote.grandTotal.replace('$', '')) },
    { name: 'Tax Payment', value: parseFloat(billingData.invoice.taxPayment.replace('$', '')) },
    { name: 'Pending', value: parseFloat(billingData.payment.pending.replace('$', '')) }
  ];

  const expenseBarData = [
    { name: 'Employee', amount: parseFloat(expenseData.employee.expense.replace('$', '')) },
    { name: 'Company Client', amount: parseFloat(expenseData.companyClient.amount.replace('$', '')) },
    { name: 'Credit', amount: parseFloat(expenseData.credit.amount.replace('$', '').replace('-', '')) },
    { name: 'Misc.', amount: parseFloat(expenseData.miscellaneous.amount.replace('$', '')) },
    { name: 'Dynamic', amount: parseFloat(expenseData.dynamic.amount.replace('$', '')) }
  ];

  const COLORS = ['#5C40FF', '#8B6DFF', '#C7B8FF', '#A78BFA', '#D8B4FE'];

  // === ANIMATED ICON COMPONENT ===
  const AnimatedIcon = ({ children, delay = 0 }) => (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  );

  // === ANIMATED CARD COMPONENT ===
  const SectionCard = ({ title, icon, children, bgColor = '#FFF', borderColor = '#E5E7EB', delay = 0 }) => {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    React.useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [isInView, controls]);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } }
        }}
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
        whileHover={{
          y: -6,
          boxShadow: '0 10px 25px rgba(92, 64, 255, 0.12)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <AnimatedIcon delay={delay}><span style={{ fontSize: '22px' }}>{icon}</span></AnimatedIcon>
          </motion.div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' }}>{title}</h3>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {children}
        </div>
      </motion.div>
    );
  };

  // === DATA ITEM COMPONENT ===
  const DataItem = ({ label, value, highlight = false }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
      <span style={{ color: '#6B7280', fontWeight: '500' }}>{label}:</span>
      <motion.span
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1, x: highlight ? 4 : 0 }}
        style={{
          color: highlight ? '#5C40FF' : '#111827',
          fontWeight: highlight ? '700' : '500',
          textAlign: 'right'
        }}
      >
        {value}
      </motion.span>
    </div>
  );

  // === CHART TOOLTIP CUSTOMIZATION ===
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            backgroundColor: '#fff',
            padding: '12px',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontSize: '13px'
          }}
        >
          <p style={{ margin: 0, fontWeight: '600', color: '#111827' }}>{label}</p>
          <p style={{ margin: 0, color: '#5C40FF' }}>${payload[0].value.toFixed(2)}</p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div style={{
      padding: '32px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#111827'
    }}>
      {/* === HEADER === */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          marginBottom: '32px'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px'
        }}>
          <AnimatedIcon delay={0}><span style={{ fontSize: '28px', color: '#5C40FF' }}>📊</span></AnimatedIcon>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            margin: 0,
            background: 'linear-gradient(90deg, #5C40FF, #8B6DFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            MonitorBiz Dashboard
          </h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            color: '#64748b',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          Manage Billing, Expenses & Accounting in one professional workspace.
        </motion.p>
      </motion.header>

      {/* === MAIN GRID === */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        marginBottom: '32px'
      }}>

        {/* === BILLING CARD === */}
        <SectionCard title="Billing" icon="💰" delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontWeight: '700', color: '#374151', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AnimatedIcon delay={0.15}>📋</AnimatedIcon> Customer Info
            </div>
            <DataItem label="Company" value={billingData.customer.company} />
            <DataItem label="G.S.T." value={billingData.customer.gst} />
            <DataItem label="Address" value={billingData.customer.address} />
            <DataItem label="Phone" value={billingData.customer.phone} />

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '12px 0' }} />

            <div style={{ fontWeight: '700', color: '#374151', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AnimatedIcon delay={0.2}>🔖</AnimatedIcon> Quote
            </div>
            <DataItem label="Commodity" value={billingData.quote.commodity} />
            <DataItem label="Pricing" value={billingData.quote.pricing} />
            <DataItem label="Grand Total" value={billingData.quote.grandTotal} highlight />

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '12px 0' }} />

            <div style={{ fontWeight: '700', color: '#374151', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AnimatedIcon delay={0.25}>🧾</AnimatedIcon> Invoice
            </div>
            <DataItem label="Grand Total" value={billingData.invoice.grandTotal} />
            <DataItem label="Tax Payment" value={billingData.invoice.taxPayment} />
            <DataItem label="Total" value={billingData.invoice.total} highlight />

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '12px 0' }} />

            <div style={{ fontWeight: '700', color: '#374151', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AnimatedIcon delay={0.3}>✅</AnimatedIcon> Payment Receipt
            </div>
            <DataItem label="Receipt #" value={billingData.payment.receipt} />
            <DataItem label="Amount Paid" value={billingData.payment.amountPaid} highlight />
            <DataItem label="Pending" value={billingData.payment.pending} />

            {/* === PIE CHART === */}
            <div style={{ height: '220px', marginTop: '16px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={billingPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {billingPieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SectionCard>

        {/* === EXPENSE TRACKING CARD === */}
        <SectionCard title="Expense Tracking" icon="📉" delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontWeight: '700', color: '#374151', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AnimatedIcon delay={0.25}>👤</AnimatedIcon> Employee Expense
            </div>
            <DataItem label="Employee" value={expenseData.employee.name} />
            <DataItem label="Expense" value={expenseData.employee.expense} highlight />

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '12px 0' }} />

            <div style={{ fontWeight: '700', color: '#374151', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AnimatedIcon delay={0.3}>🏢</AnimatedIcon> Company Client
            </div>
            <DataItem label="Client" value={expenseData.companyClient.client} />
            <DataItem label="Amount" value={expenseData.companyClient.amount} highlight />

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '12px 0' }} />

            <div style={{ fontWeight: '700', color: '#374151', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AnimatedIcon delay={0.35}>🔄</AnimatedIcon> Credit
            </div>
            <DataItem label="Description" value={expenseData.credit.description} />
            <DataItem label="Amount" value={expenseData.credit.amount} highlight />

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '12px 0' }} />

            <div style={{ fontWeight: '700', color: '#374151', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AnimatedIcon delay={0.4}>🛒</AnimatedIcon> Miscellaneous
            </div>
            <DataItem label="Description" value={expenseData.miscellaneous.description} />
            <DataItem label="Amount" value={expenseData.miscellaneous.amount} />

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '12px 0' }} />

            <div style={{ fontWeight: '700', color: '#374151', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AnimatedIcon delay={0.45}>⚡</AnimatedIcon> Dynamic
            </div>
            <DataItem label="Description" value={expenseData.dynamic.description} />
            <DataItem label="Amount" value={expenseData.dynamic.amount} highlight />

            {/* === BAR CHART === */}
            <div style={{ height: '220px', marginTop: '16px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseBarData}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {expenseBarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SectionCard>

        {/* === ACCOUNTING CARD === */}
        <SectionCard title="Accounting" icon="📊" bgColor="#fafafa" borderColor="#e2e8f0" delay={0.3}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', textAlign: 'center' }}>
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span style={{ fontSize: '48px', opacity: 0.3 }}>🧮</span>
            </motion.div>
            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.5, maxWidth: '280px' }}>
              Your financial overview, balance sheets, and reports will appear here.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/dashboard/accounting"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#5C40FF',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#4C32CC'}
                onMouseLeave={(e) => e.target.style.background = '#5C40FF'}
              >
                <AnimatedIcon>➡️</AnimatedIcon>
                Go to Accounting
              </Link>
            </motion.div>
          </div>
        </SectionCard>

      </div>

      {/* === FOOTER === */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          paddingTop: '24px',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '14px'
        }}
      >
        <p>
          Need help? Contact support or explore our{' '}
          <Link to="#" style={{ color: '#5C40FF', fontWeight: '600', textDecoration: 'none' }}>
            documentation
          </Link>.
        </p>
      </motion.footer>
    </div>
  );
};

export default DashboardHome;