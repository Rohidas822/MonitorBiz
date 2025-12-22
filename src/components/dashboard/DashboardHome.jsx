// src/components/dashboard/DashboardHome.jsx
import React, { useState, useMemo } from 'react';
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
// Lucide React Icons
import {
  Wallet,
  TrendingDown,
  FileText,
  Calculator,
  Search,
  User,
  Building,
  CreditCard,
  Package,
  Plus,
  Clock
} from 'lucide-react';

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

  // === DERIVED METRICS ===
  const totalInvoiced = parseFloat(billingData.invoice.total.replace('$', ''));
  const pendingPayments = parseFloat(billingData.payment.pending.replace('$', ''));
  const totalExpenses =
    parseFloat(expenseData.employee.expense.replace('$', '').replace(',', '')) +
    parseFloat(expenseData.companyClient.amount.replace('$', '').replace(',', '')) +
    parseFloat(expenseData.miscellaneous.amount.replace('$', '').replace(',', '')) +
    parseFloat(expenseData.dynamic.amount.replace('$', '').replace(',', '')) -
    parseFloat(expenseData.credit.amount.replace('-$', '').replace(',', ''));
  const netCashFlow = totalInvoiced - totalExpenses;

  // === CHART DATA ===
  const billingPieData = [
    { name: 'Grand Total', value: parseFloat(billingData.quote.grandTotal.replace('$', '')) },
    { name: 'Tax Payment', value: parseFloat(billingData.invoice.taxPayment.replace('$', '')) },
    { name: 'Pending', value: parseFloat(billingData.payment.pending.replace('$', '')) }
  ];

  const expenseBarData = [
    { name: 'Employee', amount: parseFloat(expenseData.employee.expense.replace('$', '').replace(',', '')) },
    { name: 'Company Client', amount: parseFloat(expenseData.companyClient.amount.replace('$', '').replace(',', '')) },
    { name: 'Credit', amount: Math.abs(parseFloat(expenseData.credit.amount.replace('-$', '').replace(',', ''))) },
    { name: 'Misc.', amount: parseFloat(expenseData.miscellaneous.amount.replace('$', '').replace(',', '')) },
    { name: 'Dynamic', amount: parseFloat(expenseData.dynamic.amount.replace('$', '').replace(',', '')) }
  ];

  const COLORS = ['#FF6B00', '#FF8A3D', '#FFA772', '#FFC3A0', '#FFE0D1'];

  // === SEARCH STATE ===
  const [searchQuery, setSearchQuery] = useState('');

  // === FILTER DATA BASED ON SEARCH (simple keyword match) ===
  const filteredBilling = useMemo(() => {
    if (!searchQuery) return billingData;
    const q = searchQuery.toLowerCase();
    const matches = {};
    Object.keys(billingData).forEach(key => {
      const section = billingData[key];
      let hasMatch = false;
      const filteredSection = {};
      Object.keys(section).forEach(field => {
        const value = section[field]?.toString().toLowerCase();
        if (value?.includes(q)) {
          filteredSection[field] = billingData[key][field];
          hasMatch = true;
        }
      });
      if (hasMatch) matches[key] = filteredSection;
    });
    return matches;
  }, [searchQuery, billingData]);

  const filteredExpense = useMemo(() => {
    if (!searchQuery) return expenseData;
    const q = searchQuery.toLowerCase();
    const matches = {};
    Object.keys(expenseData).forEach(key => {
      const section = expenseData[key];
      let hasMatch = false;
      const filteredSection = {};
      Object.keys(section).forEach(field => {
        const value = section[field]?.toString().toLowerCase();
        if (value?.includes(q)) {
          filteredSection[field] = expenseData[key][field];
          hasMatch = true;
        }
      });
      if (hasMatch) matches[key] = filteredSection;
    });
    return matches;
  }, [searchQuery, expenseData]);

  // === ICON MAPPING ===
  const getIcon = (section) => {
    switch (section) {
      case 'customer': return <User size={16} />;
      case 'quote': return <Package size={16} />;
      case 'invoice': return <FileText size={16} />;
      case 'payment': return <CreditCard size={16} />;
      case 'employee': return <User size={16} />;
      case 'companyClient': return <Building size={16} />;
      case 'credit': return <CreditCard size={16} />;
      case 'miscellaneous': return <Package size={16} />;
      case 'dynamic': return <TrendingDown size={16} />;
      default: return null;
    }
  };

  // === COMPONENTS ===
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

  const SectionCard = ({ title, icon, children, bgColor = '#FFFFFF', borderColor = '#E5E7EB', delay = 0 }) => {
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
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
        whileHover={{
          y: -6,
          boxShadow: '0 8px 30px rgba(255, 107, 0, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span style={{ color: '#FF6B00', display: 'flex' }}>{icon}</span>
          </motion.div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1F2937' }}>{title}</h3>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {children}
        </div>
      </motion.div>
    );
  };

  const KpiCard = ({ title, value, trend, icon: Icon, color }) => (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          backgroundColor: `${color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color
        }}>
          <Icon size={18} />
        </div>
        <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600' }}>{title}</span>
      </div>
      <div style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937' }}>{value}</div>
      <div style={{
        fontSize: '12px',
        fontWeight: '600',
        color: trend.startsWith('✓') ? '#10B981' : trend.startsWith('⚠️') ? '#F59E0B' : trend.startsWith('+') ? '#10B981' : '#EF4444'
      }}>
        {trend}
      </div>
    </motion.div>
  );

  const DataItem = ({ label, value, highlight = false, icon = null }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {icon && <span style={{ color: '#9CA3AF' }}>{icon}</span>}
        <span style={{ color: '#6B7280', fontWeight: '500' }}>{label}:</span>
      </div>
      <motion.span
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1, x: highlight ? 4 : 0 }}
        style={{
          color: highlight ? '#FF6B00' : '#1F2937',
          fontWeight: highlight ? '700' : '500',
          textAlign: 'right'
        }}
      >
        {value}
      </motion.span>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const isCredit = label === 'Credit';
      return (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            backgroundColor: '#fff',
            padding: '12px',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            fontSize: '13px',
            minWidth: '100px'
          }}
        >
          <p style={{ margin: 0, fontWeight: '600', color: '#1F2937' }}>{label}</p>
          <p style={{
            margin: 0,
            color: isCredit ? '#EF4444' : '#FF6B00',
            fontWeight: '700'
          }}>
            {isCredit ? `-$${Math.abs(value).toFixed(2)}` : `$${value.toFixed(2)}`}
          </p>
        </motion.div>
      );
    }
    return null;
  };

  // Format currency helper
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(num);
  };

  return (
    <div style={{
      padding: '32px',
      backgroundColor: '#F9FAFB',
      minHeight: '100vh',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#1F2937'
    }}>
      {/* === HEADER === */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '24px' }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px'
        }}>
          <AnimatedIcon delay={0}>
            <div style={{ color: '#FF6B00' }}>
              <FileText size={28} />
            </div>
          </AnimatedIcon>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            margin: 0,
            background: 'linear-gradient(90deg, #FF6B00, #FF8A3D)',
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
            color: '#6B7280',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          Manage Billing, Expenses & Accounting in one professional workspace.
        </motion.p>
      </motion.header>

      {/* === SEARCH BAR === */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          maxWidth: '600px',
          marginBottom: '24px'
        }}
      >
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          padding: '8px 16px'
        }}>
          <Search size={18} style={{ color: '#9CA3AF', marginRight: '10px' }} />
          <input
            type="text"
            placeholder="Search billing or expense records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              background: 'transparent',
              padding: '8px 0'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: '#9CA3AF',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </motion.div>

      {/* === KPI CARDS === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <KpiCard
          title="Total Invoiced"
          value={formatCurrency(totalInvoiced)}
          trend="+12% from last month"
          icon={Wallet}
          color="#FF6B00"
        />
        <KpiCard
          title="Pending Payments"
          value={formatCurrency(pendingPayments)}
          trend={pendingPayments === 0 ? "✓ Fully Paid" : "⚠️ Overdue"}
          icon={Clock}
          color={pendingPayments === 0 ? "#10B981" : "#F59E0B"}
        />
        <KpiCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          trend="+5% from last month"
          icon={TrendingDown}
          color="#EF4444"
        />
        <KpiCard
          title="Net Cash Flow"
          value={formatCurrency(netCashFlow)}
          trend={netCashFlow >= 0 ? "✅ Positive" : "⚠️ Negative"}
          icon={Calculator}
          color={netCashFlow >= 0 ? "#10B981" : "#F59E0B"}
        />
      </motion.div>

      {/* === MAIN GRID === */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        marginBottom: '32px'
      }}>

        {/* === BILLING CARD === */}
        <SectionCard title="Billing" icon={<Wallet size={22} />} delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.keys(filteredBilling).length === 0 && searchQuery && (
              <div style={{ color: '#6B7280', fontStyle: 'italic' }}>No billing results for "{searchQuery}"</div>
            )}
            {(!searchQuery || filteredBilling.customer) && (
              <>
                <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={16} /> Customer Info
                </div>
                {filteredBilling.customer?.company && <DataItem label="Company" value={filteredBilling.customer.company} icon={<Building size={14} />} />}
                {filteredBilling.customer?.gst && <DataItem label="G.S.T." value={filteredBilling.customer.gst} />}
                {filteredBilling.customer?.address && <DataItem label="Address" value={filteredBilling.customer.address} />}
                {filteredBilling.customer?.phone && <DataItem label="Phone" value={filteredBilling.customer.phone} />}
                <Link to="/dashboard/billing" style={{ color: '#FF6B00', fontSize: '13px', fontWeight: '600', marginTop: '8px' }}>
                  View all billing →
                </Link>
              </>
            )}

            {(!searchQuery || filteredBilling.quote) && (
              <>
                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '12px 0' }} />
                <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Package size={16} /> Quote
                </div>
                {filteredBilling.quote?.commodity && <DataItem label="Commodity" value={filteredBilling.quote.commodity} />}
                {filteredBilling.quote?.pricing && <DataItem label="Pricing" value={filteredBilling.quote.pricing} />}
                {filteredBilling.quote?.grandTotal && <DataItem label="Grand Total" value={filteredBilling.quote.grandTotal} highlight />}
              </>
            )}

            {(!searchQuery || filteredBilling.invoice) && (
              <>
                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '12px 0' }} />
                <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={16} /> Invoice
                </div>
                {filteredBilling.invoice?.grandTotal && <DataItem label="Grand Total" value={filteredBilling.invoice.grandTotal} />}
                {filteredBilling.invoice?.taxPayment && <DataItem label="Tax Payment" value={filteredBilling.invoice.taxPayment} />}
                {filteredBilling.invoice?.total && <DataItem label="Total" value={filteredBilling.invoice.total} highlight />}
              </>
            )}

            {(!searchQuery || filteredBilling.payment) && (
              <>
                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '12px 0' }} />
                <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CreditCard size={16} /> Payment Receipt
                </div>
                {filteredBilling.payment?.receipt && <DataItem label="Receipt #" value={filteredBilling.payment.receipt} />}
                {filteredBilling.payment?.amountPaid && <DataItem label="Amount Paid" value={filteredBilling.payment.amountPaid} highlight />}
                {filteredBilling.payment?.pending && <DataItem label="Pending" value={filteredBilling.payment.pending} />}
              </>
            )}

            <div style={{ height: '220px', marginTop: '16px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={billingPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
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
        <SectionCard title="Expense Tracking" icon={<TrendingDown size={22} />} delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.keys(filteredExpense).length === 0 && searchQuery && (
              <div style={{ color: '#6B7280', fontStyle: 'italic' }}>No expense results for "{searchQuery}"</div>
            )}
            {(!searchQuery || filteredExpense.employee) && (
              <>
                <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={16} /> Employee Expense
                </div>
                {filteredExpense.employee?.name && <DataItem label="Employee" value={filteredExpense.employee.name} />}
                {filteredExpense.employee?.expense && <DataItem label="Expense" value={filteredExpense.employee.expense} highlight />}
                <Link to="/dashboard/expense" style={{ color: '#FF6B00', fontSize: '13px', fontWeight: '600', marginTop: '8px' }}>
                  View all expenses →
                </Link>
              </>
            )}

            {(!searchQuery || filteredExpense.companyClient) && (
              <>
                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '12px 0' }} />
                <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building size={16} /> Company Client
                </div>
                {filteredExpense.companyClient?.client && <DataItem label="Client" value={filteredExpense.companyClient.client} />}
                {filteredExpense.companyClient?.amount && <DataItem label="Amount" value={filteredExpense.companyClient.amount} highlight />}
              </>
            )}

            {(!searchQuery || filteredExpense.credit) && (
              <>
                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '12px 0' }} />
                <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CreditCard size={16} /> Credit
                </div>
                {filteredExpense.credit?.description && <DataItem label="Description" value={filteredExpense.credit.description} />}
                {filteredExpense.credit?.amount && <DataItem label="Amount" value={filteredExpense.credit.amount} highlight />}
              </>
            )}

            {(!searchQuery || filteredExpense.miscellaneous) && (
              <>
                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '12px 0' }} />
                <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Package size={16} /> Miscellaneous
                </div>
                {filteredExpense.miscellaneous?.description && <DataItem label="Description" value={filteredExpense.miscellaneous.description} />}
                {filteredExpense.miscellaneous?.amount && <DataItem label="Amount" value={filteredExpense.miscellaneous.amount} />}
              </>
            )}

            {(!searchQuery || filteredExpense.dynamic) && (
              <>
                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '12px 0' }} />
                <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingDown size={16} /> Dynamic
                </div>
                {filteredExpense.dynamic?.description && <DataItem label="Description" value={filteredExpense.dynamic.description} />}
                {filteredExpense.dynamic?.amount && <DataItem label="Amount" value={filteredExpense.dynamic.amount} highlight />}
              </>
            )}

            <div style={{ height: '220px', marginTop: '16px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseBarData}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    tickFormatter={(value) => `$${value}`}
                  />
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
        <SectionCard
          title="Accounting"
          icon={<Calculator size={22} />}
          bgColor="#FFF8F3"
          borderColor="#FFD9C3"
          delay={0.3}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', textAlign: 'center' }}>
            <motion.div
              animate={{ rotate: [0, 3, 0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Calculator size={48} style={{ opacity: 0.4, color: '#FF6B00' }} />
            </motion.div>
            <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.5, maxWidth: '280px' }}>
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
                  backgroundColor: '#FF6B00',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'background 0.3s ease',
                  boxShadow: '0 2px 8px rgba(255, 107, 0, 0.3)'
                }}
              >
                <Plus size={16} />
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
          borderTop: '1px solid #FFD9C3',
          textAlign: 'center',
          color: '#6B7280',
          fontSize: '14px'
        }}
      >
        <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center', gap: '6px', alignItems: 'center' }}>
          <Clock size={14} />
          <span>Last updated: Just now</span>
        </div>
        <p>
          Need help? Contact support or explore our{' '}
          <Link to="#" style={{ color: '#FF6B00', fontWeight: '600', textDecoration: 'none' }}>
            documentation
          </Link>.
        </p>
      </motion.footer>
    </div>
  );
};

export default DashboardHome;