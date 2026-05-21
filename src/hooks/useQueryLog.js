import { useState, useCallback } from "react";
import { SQL_LOG_KEY, MAX_LOG_ENTRIES } from "../constants";

function readLog() {
  try {
    return JSON.parse(localStorage.getItem(SQL_LOG_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useQueryLog() {
  const [log, setLog] = useState(readLog);

  const addEntry = useCallback((entry) => {
    const updated = [{ id: Date.now(), timestamp: new Date().toISOString(), ...entry }, ...readLog()].slice(
      0,
      MAX_LOG_ENTRIES
    );
    localStorage.setItem(SQL_LOG_KEY, JSON.stringify(updated));
    setLog(updated);
  }, []);

  const clearLog = useCallback(() => {
    localStorage.removeItem(SQL_LOG_KEY);
    setLog([]);
  }, []);

  // Derived analytics (mimics SQL aggregations)
  const analytics = {
    totalQueries: log.length,
    avgInputLength: log.length
      ? Math.round(log.reduce((a, b) => a + (b.inputLength || 0), 0) / log.length)
      : 0,
    avgKeyPoints: log.length
      ? (log.reduce((a, b) => a + (b.keyPointCount || 0), 0) / log.length).toFixed(1)
      : "0.0",
    avgGlossaryTerms: log.length
      ? (log.reduce((a, b) => a + (b.glossaryCount || 0), 0) / log.length).toFixed(1)
      : "0.0",
  };

  return { log, addEntry, clearLog, analytics };
}
