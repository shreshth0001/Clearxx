import React, { useRef, useState } from "react";
import { EXAMPLES } from "../constants";

export default function SimplifierTab({ onSimplify, result, loading, error }) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  function loadExample(text) {
    setInput(text);
    setTimeout(() => textareaRef.current?.focus(), 100);
  }

  function handleSubmit() {
    onSimplify(input);
  }

  function copyResult() {
    if (!result) return;
    const text = [
      "PLAIN ENGLISH SUMMARY",
      result.plain,
      "",
      "KEY POINTS",
      ...(result.keyPoints || []).map((p) => `• ${p}`),
      "",
      "WHAT YOU SHOULD DO",
      ...(result.actionItems || []).map((a) => `→ ${a}`),
      "",
      result.glossary?.length
        ? ["GLOSSARY", ...result.glossary.map((g) => `${g.term}: ${g.definition}`)].join("\n")
        : "",
    ]
      .filter((l) => l !== undefined)
      .join("\n");

    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div style={styles.layout}>
      {/* INPUT */}
      <div style={styles.inputPanel}>
        <label style={styles.label}>Paste medical text</label>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste a discharge summary, lab result, prescription note, or any clinical text here…"
          style={styles.textarea}
          rows={10}
        />

        <div style={styles.examplesRow}>
          <span style={styles.examplesLabel}>Try an example:</span>
          {EXAMPLES.map((ex) => (
            <button key={ex.label} onClick={() => loadExample(ex.text)} style={styles.exBtn}>
              {ex.label}
            </button>
          ))}
        </div>

        <div style={styles.charCount}>
          {input.length > 0 && (
            <span style={{ color: input.length > 3000 ? "#cc3333" : "#99aabb" }}>
              {input.length} characters
            </span>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          style={{
            ...styles.primaryBtn,
            ...(loading || !input.trim() ? styles.primaryBtnDisabled : {}),
          }}
        >
          {loading ? (
            <span style={styles.loadingRow}>
              <span style={styles.spinner}>⟳</span> Translating…
            </span>
          ) : (
            "Translate to Plain English →"
          )}
        </button>

        <p style={styles.disclaimer}>
          ⚠️ For informational use only. Always follow your doctor's advice.
        </p>
      </div>

      {/* OUTPUT */}
      <div style={styles.outputPanel}>
        {!result && !error && !loading && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>💊</div>
            <p style={styles.emptyTitle}>Your plain-English summary will appear here</p>
            <p style={styles.emptySubtitle}>No medical degree required to understand it</p>
          </div>
        )}

        {loading && (
          <div style={styles.emptyState}>
            <div style={{ fontSize: 40, animation: "spin 1.2s linear infinite" }}>⟳</div>
            <p style={styles.emptyTitle}>Translating…</p>
            <p style={styles.emptySubtitle}>Claude is reading your medical text</p>
          </div>
        )}

        {error && <div style={styles.errorBox}>{error}</div>}

        {result && !loading && (
          <div className="fade-in" style={styles.resultCard}>
            <div style={styles.resultHeader}>
              <span style={styles.resultTitle}>Plain English Summary</span>
              <button onClick={copyResult} style={styles.copyBtn}>
                {copied ? "✓ Copied!" : "Copy all"}
              </button>
            </div>

            <p style={styles.plainText}>{result.plain}</p>

            {result.keyPoints?.length > 0 && (
              <Section title="🔑 Key Points">
                <ul style={styles.list}>
                  {result.keyPoints.map((pt, i) => (
                    <li key={i} style={styles.listItem}>
                      <span style={styles.bulletGreen}>•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {result.actionItems?.length > 0 && (
              <Section title="✅ What You Should Do">
                <ul style={styles.list}>
                  {result.actionItems.map((a, i) => (
                    <li key={i} style={styles.listItem}>
                      <span style={styles.bulletBlue}>→</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {result.glossary?.length > 0 && (
              <Section title="📖 Medical Terms Explained">
                <div style={styles.glossaryGrid}>
                  {result.glossary.map((g, i) => (
                    <div key={i} style={styles.glossaryItem}>
                      <span style={styles.glossaryTerm}>{g.term}</span>
                      <span style={styles.glossaryDef}>{g.definition}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {result.readabilityScore && (
              <div style={styles.readabilityBadge}>
                📊 {result.readabilityScore}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628", fontFamily: "sans-serif" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

const styles = {
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    alignItems: "start",
  },
  inputPanel: { display: "flex", flexDirection: "column", gap: 12 },
  label: {
    fontSize: 12,
    fontWeight: 700,
    color: "#445566",
    fontFamily: "sans-serif",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  textarea: {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #d0dce8",
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "sans-serif",
    lineHeight: 1.65,
    resize: "vertical",
    background: "#fff",
    color: "#1a2332",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
  },
  examplesRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  examplesLabel: { fontSize: 12, color: "#778899", fontFamily: "sans-serif" },
  exBtn: {
    background: "#e8f0fe",
    border: "1px solid #c5d5f0",
    borderRadius: 6,
    padding: "4px 11px",
    fontSize: 12,
    cursor: "pointer",
    color: "#2255aa",
    fontFamily: "sans-serif",
  },
  charCount: { height: 16, fontFamily: "sans-serif", fontSize: 12 },
  primaryBtn: {
    background: "#0a1628",
    color: "#00c48c",
    border: "2px solid transparent",
    borderRadius: 10,
    padding: "14px 24px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "sans-serif",
    letterSpacing: 0.3,
  },
  primaryBtnDisabled: { opacity: 0.38, cursor: "not-allowed", transform: "none !important" },
  loadingRow: { display: "flex", alignItems: "center", gap: 8, justifyContent: "center" },
  spinner: { display: "inline-block", animation: "spin 0.9s linear infinite" },
  disclaimer: {
    fontSize: 11,
    color: "#99aabb",
    fontFamily: "sans-serif",
    lineHeight: 1.5,
  },
  outputPanel: {
    background: "#fff",
    borderRadius: 12,
    border: "2px solid #d0dce8",
    padding: 24,
    minHeight: 320,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 280,
    gap: 8,
    textAlign: "center",
  },
  emptyIcon: { fontSize: 48, marginBottom: 8 },
  emptyTitle: { color: "#556677", fontSize: 15, fontFamily: "sans-serif" },
  emptySubtitle: { color: "#99aabb", fontSize: 13, fontFamily: "sans-serif" },
  errorBox: {
    background: "#fff0f0",
    border: "1px solid #ffcccc",
    borderRadius: 8,
    padding: 16,
    color: "#cc3333",
    fontFamily: "sans-serif",
    fontSize: 14,
    lineHeight: 1.6,
  },
  resultCard: { display: "flex", flexDirection: "column", gap: 18 },
  resultHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  resultTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#445566",
    fontFamily: "sans-serif",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  copyBtn: {
    background: "#f0f4f8",
    border: "1px solid #d0dce8",
    borderRadius: 6,
    padding: "5px 14px",
    fontSize: 12,
    cursor: "pointer",
    color: "#445566",
    fontFamily: "sans-serif",
    fontWeight: 600,
  },
  plainText: {
    fontSize: 16,
    lineHeight: 1.75,
    color: "#1a2332",
    background: "#f8fbfd",
    padding: "14px 18px",
    borderRadius: 8,
    borderLeft: "4px solid #00c48c",
  },
  list: { listStyle: "none", display: "flex", flexDirection: "column", gap: 7 },
  listItem: {
    fontSize: 14,
    color: "#334455",
    fontFamily: "sans-serif",
    lineHeight: 1.55,
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  bulletGreen: { color: "#00c48c", fontWeight: 700, flexShrink: 0, marginTop: 1 },
  bulletBlue: { color: "#2255aa", fontWeight: 700, flexShrink: 0, marginTop: 1 },
  glossaryGrid: { display: "flex", flexDirection: "column", gap: 8 },
  glossaryItem: {
    background: "#f8fbfd",
    borderRadius: 8,
    padding: "10px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  glossaryTerm: {
    fontSize: 13,
    fontWeight: 700,
    color: "#0a1628",
    fontFamily: "sans-serif",
  },
  glossaryDef: {
    fontSize: 13,
    color: "#445566",
    fontFamily: "sans-serif",
    lineHeight: 1.5,
  },
  readabilityBadge: {
    background: "#e8f9f3",
    border: "1px solid #b0ead4",
    borderRadius: 8,
    padding: "9px 14px",
    fontSize: 12,
    color: "#007755",
    fontFamily: "monospace",
    fontWeight: 600,
  },
};
