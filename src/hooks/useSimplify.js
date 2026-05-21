import { useState, useCallback } from "react";
import { API_URL, MODEL, MAX_TOKENS, SYSTEM_PROMPT } from "../constants";

export function useSimplify() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const simplify = useCallback(async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: text }],
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const raw = data.content?.map((i) => i.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      return parsed;
    } catch (e) {
      const msg =
        e.message?.includes("API key")
          ? "Invalid or missing API key. Add VITE_ANTHROPIC_API_KEY to your .env file."
          : e.message?.includes("JSON")
          ? "Unexpected response format. Please try again."
          : e.message || "Something went wrong. Please try again.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, simplify, reset };
}
