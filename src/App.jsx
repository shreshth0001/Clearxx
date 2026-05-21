import React, { useState } from "react";
import Header from "./components/Header.jsx";
import SimplifierTab from "./components/SimplifierTab.jsx";
import SqlTab from "./components/SqlTab.jsx";
import AboutTab from "./components/AboutTab.jsx";
import { useSimplify } from "./hooks/useSimplify.js";
import { useQueryLog } from "./hooks/useQueryLog.js";

export default function App() {
  const [activeTab, setActiveTab] = useState("tool");
  const { result, loading, error, simplify } = useSimplify();
  const { log, addEntry, clearLog, analytics } = useQueryLog();

  async function handleSimplify(text) {
    const parsed = await simplify(text);
    if (parsed) {
      addEntry({
        inputLength: text.length,
        inputPreview: text.slice(0, 90) + (text.length > 90 ? "…" : ""),
        keyPointCount: parsed.keyPoints?.length || 0,
        actionCount: parsed.actionItems?.length || 0,
        glossaryCount: parsed.glossary?.length || 0,
        readability: parsed.readabilityScore || "—",
      });
    }
  }

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={styles.main}>
        {activeTab === "tool" && (
          <SimplifierTab
            onSimplify={handleSimplify}
            result={result}
            loading={loading}
            error={error}
          />
        )}
        {activeTab === "sql" && (
          <SqlTab log={log} analytics={analytics} onClear={clearLog} />
        )}
        {activeTab === "about" && <AboutTab />}
      </main>
    </div>
  );
}

const styles = {
  main: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "32px 24px 60px",
  },
};
