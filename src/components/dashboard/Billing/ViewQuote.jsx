import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaFilePdf,
  FaPaperPlane,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaBox
} from "react-icons/fa";

const API_URL = "http://localhost:3000/quotations";

const ViewQuote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);

  /* ---------------- FETCH QUOTE ---------------- */
  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setQuote(data))
      .catch(() => setQuote(null));
  }, [id]);

  /* ---------------- TOTAL CALCULATION ---------------- */
  const totals = useMemo(() => {
    if (!quote || !Array.isArray(quote.items)) {
      return { subtotal: 0, tax: 0, total: 0 };
    }

    let subtotal = 0;
    let tax = 0;

    quote.items.forEach((item) => {
      const base = item.qty * item.unitPrice;
      const discount = (base * (item.discount || 0)) / 100;
      const taxable = base - discount;
      const taxAmount = (taxable * (item.taxRate || 0)) / 100;

      subtotal += taxable;
      tax += taxAmount;
    });

    return {
      subtotal,
      tax,
      total: subtotal + tax
    };
  }, [quote]);

  if (!quote) {
    return <div style={{ padding: 20 }}>Loading quotation...</div>;
  }

  return (
    <div style={styles.page}>
      {/* ================= HEADER ================= */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.quoteNo}>{quote.quoteNo}</h2>
          <p style={styles.breadcrumb}>
            Home / Quotations / {quote.quoteNo}
          </p>

          <div style={styles.clientRow}>
            <strong>{quote.customerName}</strong>
            <span style={styles.status}>{quote.status}</span>
          </div>
        </div>

        <div style={styles.headerActions}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>

          <button style={styles.sendBtn}>
            <FaPaperPlane /> Mark as Sent
          </button>

          <button style={styles.pdfBtn}>
            <FaFilePdf /> Download PDF
          </button>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div style={styles.grid}>
        {/* -------- LEFT COLUMN -------- */}
        <div>
          {/* ITEMS */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3>Quotation Items</h3>
              <span>{quote.items?.length || 0} items</span>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Unit Price</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {quote.items?.map((item) => {
                    const base = item.qty * item.unitPrice;
                    const discount = (base * item.discount) / 100;
                    const tax =
                      ((base - discount) * item.taxRate) / 100;
                    const total = base - discount + tax;

                    return (
                      <tr key={item.id}>
                        <td>
                          <div style={styles.itemCell}>
                            <FaBox />
                            <div>
                              <strong>{item.commodity}</strong>
                              <div style={styles.muted}>
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item.qty}</td>
                        <td>
                          <span style={styles.unitBadge}>{item.unit}</span>
                        </td>
                        <td>₹{item.unitPrice.toFixed(2)}</td>
                        <td>{item.discount}%</td>
                        <td>{item.taxRate}%</td>
                        <td>₹{total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* TOTALS */}
            <div style={styles.totals}>
              <div>
                Subtotal: <strong>₹{totals.subtotal.toFixed(2)}</strong>
              </div>
              <div>
                Tax Amount: <strong>₹{totals.tax.toFixed(2)}</strong>
              </div>
              <div style={styles.grandTotal}>
                Total Amount: ₹{totals.total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* -------- RIGHT COLUMN -------- */}
        <div>
          {/* DETAILS */}
          <div style={styles.card}>
            <h4>
              Details <FaInfoCircle />
            </h4>

            <p>
              <strong>Valid Until:</strong> {quote.validUntil}
            </p>
            <p>
              <strong>Created Date:</strong> {quote.createdAt}
            </p>
            <p>
              <strong>Items Count:</strong>{" "}
              {quote.items?.length || 0}
            </p>

            <div style={styles.amountBox}>
              <span>Total Amount</span>
              <strong>₹{totals.total.toFixed(2)}</strong>
            </div>
          </div>

          {/* CUSTOMER */}
          <div style={styles.card}>
            <h4>
              Customer <FaUser />
            </h4>

            <p>
              <strong>{quote.customerName}</strong>
            </p>
            <p>
              <FaPhone /> {quote.customerPhone}
            </p>
            <p>
              <FaEnvelope /> {quote.customerEmail}
            </p>
            <p>
              <FaMapMarkerAlt /> {quote.customerAddress}
            </p>
          </div>

          {/* NOTES */}
          <div style={styles.card}>
            <h4>Notes</h4>
            <textarea
              style={styles.notes}
              value={quote.notes || ""}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= STYLES (BLACK + ORANGE) ================= */
const styles = {
  page: {
    padding: 20,
    background: "#fff7ed",
    minHeight: "100vh"
  },
  header: {
    background: "#fff",
    borderRadius: 14,
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    marginBottom: 24
  },
  quoteNo: { margin: 0 },
  breadcrumb: { fontSize: 13, color: "#777" },
  clientRow: {
    display: "flex",
    gap: 12,
    marginTop: 6,
    alignItems: "center"
  },
  status: {
    background: "#000",
    color: "#fff",
    padding: "2px 10px",
    borderRadius: 20,
    fontSize: 12
  },
  headerActions: {
    display: "flex",
    gap: 10,
    alignItems: "center"
  },
  backBtn: {
    background: "#f3f4f6",
    border: "none",
    padding: "8px 12px",
    borderRadiusnce: 8,
    borderRadius: 8,
    cursor: "pointer"
  },
  sendBtn: {
    background: "#f97316",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8
  },
  pdfBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 20
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 16,
    boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
    marginBottom: 20
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  itemCell: {
    display: "flex",
    gap: 10,
    alignItems: "center"
  },
  muted: {
    fontSize: 12,
    color: "#777"
  },
  unitBadge: {
    background: "#fff7ed",
    border: "1px solid #f97316",
    color: "#f97316",
    padding: "2px 8px",
    borderRadius: 6,
    fontSize: 12
  },
  totals: {
    marginTop: 14,
    textAlign: "right"
  },
  grandTotal: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#f97316"
  },
  amountBox: {
    marginTop: 12,
    background: "#fff7ed",
    padding: 12,
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    color: "#f97316"
  },
  notes: {
    width: "100%",
    minHeight: 80,
    borderRadius: 8,
    border: "1px solid #ddd",
    padding: 8
  }
};

export default ViewQuote;
