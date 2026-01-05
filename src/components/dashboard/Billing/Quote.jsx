import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaEye, FaExchangeAlt, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/quotations";

const STATUS_COLORS = {
  Draft: "#f59e0b",
  Sent: "#2563eb",
  Accepted: "#10b981",
  Converted: "#16a34a",
};

const Quote = () => {
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState("All");

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setQuotes(Array.isArray(data) ? data : []))
      .catch(() => setQuotes([]));
  }, []);

  /* ---------------- STATS ---------------- */
  const stats = useMemo(() => {
    return {
      total: quotes.length,
      draft: quotes.filter((q) => q.status === "Draft").length,
      sent: quotes.filter((q) => q.status === "Sent").length,
      converted: quotes.filter((q) => q.status === "Converted").length,
    };
  }, [quotes]);

  /* ---------------- FILTER ---------------- */
  const filteredQuotes = useMemo(() => {
    if (filter === "All") return quotes;
    return quotes.filter((q) => q.status === filter);
  }, [filter, quotes]);

  /* ---------------- ACTIONS ---------------- */
  const convertQuote = async (id) => {
    const quote = quotes.find((q) => q.id === id);
    if (!quote) return;

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...quote, status: "Converted" }),
    });

    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Converted" } : q))
    );
  };

  const viewQuote = (id) => {
    navigate(`/dashboard/billing/quote/${id}`);
  };

  const createQuote = () => {
    navigate("/dashboard/billing/quote/new");
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2>Quotations</h2>
          <p style={styles.subText}>Manage customer quotes and proposals</p>
        </div>

        <button style={styles.newBtn} onClick={createQuote}>
          <FaPlus /> New Quotation
        </button>
      </div>

      {/* STATS */}
      <div style={styles.statsGrid}>
        <StatCard title="Total Quotations" value={stats.total} />
        <StatCard title="Draft" value={stats.draft} />
        <StatCard title="Sent" value={stats.sent} />
        <StatCard title="Converted" value={stats.converted} />
      </div>

      {/* TABLE */}
      <div style={styles.card}>
        <div style={styles.tableHeader}>
          <h3>Recent Quotations</h3>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.select}
          >
            <option value="All">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Accepted">Accepted</option>
            <option value="Converted">Converted</option>
          </select>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Quotation</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Valid Until</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredQuotes.length === 0 && (
                <tr>
                  <td colSpan="6" style={styles.empty}>
                    No quotations found
                  </td>
                </tr>
              )}

              {filteredQuotes.map((q) => (
                <tr key={q.id}>
                  <td>
                    <div style={styles.rowFlex}>
                      <FaFileAlt />
                      <div>
                        <strong>{q.quoteNo}</strong>
                        <div style={styles.muted}>{q.createdAt}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong>{q.customerName}</strong>
                    <div style={styles.muted}>{q.customerPhone}</div>
                  </td>

                  <td>
                    <span
                      style={{
                        ...styles.status,
                        color: STATUS_COLORS[q.status],
                        borderColor: STATUS_COLORS[q.status],
                      }}
                    >
                      {q.status}
                    </span>
                  </td>

                  <td>
                    <strong>{q.validUntil}</strong>
                    <div style={styles.muted}>{q.validText}</div>
                  </td>

                  <td>
                    <strong>₹{q.amount}</strong>
                    <div style={styles.muted}>
                      {Array.isArray(q.items) ? q.items.length : 0} items
                    </div>
                  </td>

                  <td>
                    {q.status === "Draft" ? (
                      <button
                        style={styles.actionBtn}
                        onClick={() => convertQuote(q.id)}
                      >
                        <FaExchangeAlt /> Convert
                      </button>
                    ) : (
                      <button
                        style={styles.viewBtn}
                        onClick={() =>
                          navigate(`/dashboard/billing/quote/view/${q.id}`)
                        }
                      >
                        <FaEye /> View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ---------------- STAT CARD ---------------- */
const StatCard = ({ title, value }) => (
  <div style={styles.statCard}>
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);

/* ---------------- STYLES ---------------- */
const styles = {
  page: {
    padding: 20,
    background: "#fff7ed",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  subText: {
    color: "#555",
    marginTop: 4,
  },
  newBtn: {
    background: "#f97316",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 16,
    boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
  },
  select: {
    padding: 8,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  status: {
    padding: "4px 10px",
    borderRadius: 20,
    border: "1px solid",
    fontSize: 13,
  },
  rowFlex: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  muted: {
    fontSize: 12,
    color: "#777",
  },
  actionBtn: {
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  viewBtn: {
    background: "#f97316",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    padding: 20,
    color: "#777",
  },
};

export default Quote;
