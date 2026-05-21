import React from "react";

export default function AboutTab() {
  return (
    <div style={styles.panel}>
      <h2 style={styles.title}>Why I Built ClearRx</h2>
      <p style={styles.subtitle}>The 150-word pitch — and the thinking behind it</p>

      <div style={styles.card}>
        <div style={styles.section}>
          <div style={styles.sectionTag}>THE PROBLEM</div>
          <p style={styles.text}>
            9 in 10 patients leave their doctor's office confused about their own diagnosis.
            Discharge summaries, lab results, and prescription notes are written at a{" "}
            <strong>Grade 16 reading level</strong> — but the average patient reads at{" "}
            <strong>Grade 6</strong>. This gap causes missed medications, skipped follow-ups,
            and preventable hospital readmissions.
          </p>
        </div>

        <div style={styles.divider} />

        <div style={styles.section}>
          <div style={styles.sectionTag}>WHY THIS APPROACH</div>
          <p style={styles.text}>
            I built a single-purpose LLM wrapper with <strong>structured output</strong> (plain
            summary + key points + action items + glossary) rather than a chat interface —
            because patients don't want to ask follow-up questions. They want one clear answer
            they can screenshot and share with family. Structured JSON output also makes it
            easy to log analytics and identify which medical terms cause the most confusion.
          </p>
        </div>

        <div style={styles.divider} />

        <div style={styles.section}>
          <div style={styles.sectionTag}>WHAT I'D CHANGE TODAY</div>
          <p style={styles.text}>
            Add a <strong>reading-level selector</strong> (child / adult / elderly caregiver).
            Integrate directly into EHR discharge flows so doctors preview the simplified version
            before printing. Build a <strong>confusion heatmap</strong> from the query log —
            tracking which terms appear most often to build a dynamic medical glossary. Finally,
            add a feedback button so patients can flag explanations that still feel unclear,
            closing the loop between AI output and real user comprehension.
          </p>
        </div>

        <div style={styles.divider} />

        <div style={styles.statsRow}>
          {[
            {
              value: "~80%",
              label: "patients misunderstand discharge instructions",
              source: "JAMA Internal Medicine",
            },
            {
              value: "Grade 16",
              label: "average readability of clinical notes",
              source: "Health Literacy research",
            },
            {
              value: "Grade 6",
              label: "ClearRx target readability level",
              source: "Plain Language Guidelines",
            },
            {
              value: "$26B",
              label: "annual cost of medication non-adherence in the US",
              source: "NEHI Report",
            },
          ].map((s) => (
            <div key={s.label} style={styles.stat}>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={styles.statSource}>{s.source}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.techCard}>
        <div style={styles.techTitle}>Tech Stack</div>
        <div style={styles.techGrid}>
          {[
            { name: "React 18", desc: "UI framework" },
            { name: "Vite 5", desc: "Build tool" },
            { name: "Claude API", desc: "claude-sonnet-4" },
            { name: "Structured Output", desc: "JSON via system prompt" },
            { name: "localStorage", desc: "Query log persistence" },
            { name: "Zero dependencies", desc: "No UI library needed" },
          ].map((t) => (
            <div key={t.name} style={styles.techItem}>
              <span style={styles.techName}>{t.name}</span>
              <span style={styles.techDesc}>{t.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  panel: { maxWidth: 780, display: "flex", flexDirection: "column", gap: 20 },
  title: { fontSize: 26, fontWeight: 700, margin: 0 },
  subtitle: { fontSize: 14, color: "#556677", fontFamily: "sans-serif", margin: 0 },
  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 32,
    border: "2px solid #d0dce8",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  section: { display: "flex", flexDirection: "column", gap: 10 },
  sectionTag: {
    fontSize: 11,
    fontWeight: 800,
    color: "#00c48c",
    fontFamily: "sans-serif",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 15,
    lineHeight: 1.8,
    fontFamily: "sans-serif",
    color: "#334455",
  },
  divider: { height: 1, background: "#f0f4f8" },
  statsRow: { display: "flex", gap: 14, flexWrap: "wrap" },
  stat: {
    flex: "1 1 140px",
    background: "#f8fbfd",
    borderRadius: 10,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  statValue: { fontSize: 22, fontWeight: 700, color: "#0a1628" },
  statLabel: { fontSize: 12, color: "#334455", fontFamily: "sans-serif", lineHeight: 1.4 },
  statSource: { fontSize: 10, color: "#99aabb", fontFamily: "sans-serif", marginTop: 2 },
  techCard: {
    background: "#0a1628",
    borderRadius: 14,
    padding: 28,
  },
  techTitle: {
    color: "#00c48c",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "sans-serif",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },
  techItem: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    padding: "10px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  techName: { color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "sans-serif" },
  techDesc: { color: "#8899aa", fontSize: 12, fontFamily: "sans-serif" },
};
