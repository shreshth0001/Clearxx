import React from "react";

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "tool", label: "🩺 Simplifier" },
    { id: "sql", label: "🗄 Query Log" },
    { id: "about", label: "📋 About" },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <div style={styles.brand}>
          <span style={styles.icon}>⚕</span>
          <span style={styles.name}>ClearRx</span>
          <span style={styles.badge}>AI</span>
        </div>
        <p style={styles.tagline}>
          Medical jargon → plain English, instantly
        </p>
      </div>
      <nav style={styles.nav}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    background: "#0a1628",
    borderBottom: "3px solid #00c48c",
  },
  inner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px 24px 0",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  icon: { fontSize: 26 },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: "-0.5px",
  },
  badge: {
    background: "#00c48c",
    color: "#0a1628",
    fontSize: 10,
    fontWeight: 800,
    padding: "2px 7px",
    borderRadius: 4,
    letterSpacing: 1,
    fontFamily: "monospace",
  },
  tagline: {
    color: "#8899aa",
    fontSize: 13,
    fontFamily: "sans-serif",
    marginBottom: 16,
  },
  nav: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    gap: 2,
  },
  tab: {
    background: "transparent",
    border: "none",
    color: "#8899aa",
    padding: "10px 18px",
    cursor: "pointer",
    fontSize: 13,
    fontFamily: "sans-serif",
    borderBottom: "3px solid transparent",
    marginBottom: -3,
    fontWeight: 500,
  },
  tabActive: {
    color: "#00c48c",
    borderBottom: "3px solid #00c48c",
  },
};
