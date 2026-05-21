import React from "react";

export default function SqlTab({ log, analytics, onClear }) {
  const sampleQuery = `-- Real query that would run on a production DB
SELECT 
  DATE(timestamp)        AS date,
  COUNT(*)               AS total_queries,
  AVG(input_length)      AS avg_input_chars,
  AVG(key_point_count)   AS avg_key_points,
  AVG(glossary_count)    AS avg_glossary_terms
FROM simplification_events
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- Insight from ${analytics.totalQueries} queries logged:
-- Avg medical note length : ${analytics.avgInputLength} characters
-- Avg key points generated: ${analytics.avgKeyPoints} per query
-- Avg glossary terms added: ${analytics.avgGlossaryTerms} per query`;

  return (
    <div style={styles.panel}>
      <div style={styles.topRow}>
        <div>
          <h2 style={styles.title}>Query Analytics Log</h2>
          <p style={styles.subtitle}>
            Simulates a{" "}
            <code style={styles.code}>simplification_events</code> SQL table —
            every translation is logged with metadata.
          </p>
        </div>
        {log.length > 0 && (
          <button onClick={onClear} style={styles.clearBtn}>
            Clear log
          </button>
        )}
      </div>

      {/* Summary cards */}
      <div style={styles.statsRow}>
        {[
          { label: "Total queries", value: analytics.totalQueries },
          { label: "Avg input length", value: `${analytics.avgInputLength} chars` },
          { label: "Avg key points", value: analytics.avgKeyPoints },
          { label: "Avg glossary terms", value: analytics.avgGlossaryTerms },
        ].map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statValue}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      {log.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>
            No queries logged yet. Use the Simplifier tab first.
          </p>
        </div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["#", "Time", "Input Preview", "Input Chars", "Key Points", "Actions", "Glossary Terms", "Readability"].map(
                  (h) => (
                    <th key={h} style={styles.th}>
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {log.map((row, i) => (
                <tr key={row.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                  <td style={{ ...styles.td, color: "#99aabb" }}>{i + 1}</td>
                  <td style={styles.td}>
                    {new Date(row.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    style={{
                      ...styles.td,
                      maxWidth: 180,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.inputPreview}
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>{row.inputLength}</td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <span style={styles.badge}>{row.keyPointCount}</span>
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <span style={styles.badge}>{row.actionCount}</span>
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <span style={styles.badge}>{row.glossaryCount}</span>
                  </td>
                  <td style={{ ...styles.td, fontSize: 11, color: "#556677" }}>
                    {row.readability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SQL query block */}
      <div style={styles.sqlBlock}>
        <div style={styles.sqlBlockTitle}>
          <span style={styles.sqlDot} /> Sample Analytical SQL Query
        </div>
        <pre style={styles.pre}>{sampleQuery}</pre>
      </div>
    </div>
  );
}

const styles = {
  panel: { display: "flex", flexDirection: "column", gap: 24 },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: { fontSize: 22, fontWeight: 700, marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#556677", fontFamily: "sans-serif" },
  code: {
    background: "#e8f0fe",
    padding: "2px 6px",
    borderRadius: 4,
    fontFamily: "monospace",
    fontSize: 12,
  },
  clearBtn: {
    background: "transparent",
    border: "1px solid #d0dce8",
    borderRadius: 6,
    padding: "6px 14px",
    fontSize: 12,
    cursor: "pointer",
    color: "#778899",
    fontFamily: "sans-serif",
  },
  statsRow: { display: "flex", gap: 14 },
  statCard: {
    flex: 1,
    background: "#fff",
    border: "2px solid #d0dce8",
    borderRadius: 10,
    padding: "14px 18px",
    textAlign: "center",
  },
  statValue: { fontSize: 24, fontWeight: 700, color: "#0a1628" },
  statLabel: {
    fontSize: 12,
    color: "#556677",
    fontFamily: "sans-serif",
    marginTop: 4,
  },
  empty: {
    background: "#fff",
    border: "2px solid #d0dce8",
    borderRadius: 10,
    padding: 40,
    textAlign: "center",
  },
  emptyText: { color: "#778899", fontFamily: "sans-serif" },
  tableWrap: {
    overflowX: "auto",
    borderRadius: 10,
    border: "2px solid #d0dce8",
  },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff" },
  th: {
    background: "#0a1628",
    color: "#00c48c",
    padding: "10px 14px",
    textAlign: "left",
    fontSize: 11,
    fontFamily: "sans-serif",
    fontWeight: 700,
    letterSpacing: 0.5,
    whiteSpace: "nowrap",
  },
  td: {
    padding: "10px 14px",
    fontSize: 13,
    fontFamily: "sans-serif",
    color: "#334455",
    borderBottom: "1px solid #f0f4f8",
  },
  trEven: { background: "#f8fbfd" },
  trOdd: { background: "#fff" },
  badge: {
    background: "#e8f9f3",
    color: "#007755",
    padding: "2px 8px",
    borderRadius: 10,
    fontFamily: "monospace",
    fontSize: 12,
    fontWeight: 700,
  },
  sqlBlock: {
    background: "#0a1628",
    borderRadius: 12,
    padding: 24,
  },
  sqlBlockTitle: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#8899aa",
    fontSize: 12,
    fontFamily: "sans-serif",
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  sqlDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#00c48c",
    display: "inline-block",
  },
  pre: {
    color: "#c8d8e8",
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 1.75,
    overflowX: "auto",
    whiteSpace: "pre",
  },
};
