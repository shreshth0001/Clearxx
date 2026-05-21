# ⚕ ClearRx — Medical Jargon Simplifier

> **Turn complex clinical notes into plain English, instantly.**  
> Built as a portfolio project for a clinical product manager role.


---

## What It Does
When a doctor writes "Patient presents with acute exacerbation of congestive heart failure with bilateral pleural effusions" — a normal person has no idea what that means.
ClearRx takes that sentence and turns it into: "Your heart is having trouble pumping blood properly, which is causing fluid to build up around your lungs."
That's it. That's the whole product.

---

## Features

| Feature | Details |
|---|---|
| AI Translation | Powered by Claude Sonnet via Anthropic API |
| Structured Output | JSON response with summary, key points, actions, glossary |
| Query Log | localStorage-backed analytics log with SQL query display |
| Readability Score | Shows grade-level improvement for each translation |
| Glossary | Auto-extracts and defines medical terms |
| 4 Example Inputs | Discharge note, lab result, radiology, surgical note |

---

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/clearrx.git
cd clearrx

# 2. Install dependencies
npm install

# 3. Set up your API key
cp .env.example .env
# Edit .env and add your key: VITE_ANTHROPIC_API_KEY=sk-ant-...

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
clearrx/
├── src/
│   ├── App.jsx                    # Root component, state wiring
│   ├── main.jsx                   # React entry point
│   ├── index.css                  # Global styles & CSS variables
│   ├── constants.js               # API config, example prompts
│   ├── hooks/
│   │   ├── useSimplify.js         # Anthropic API call + state
│   │   └── useQueryLog.js         # localStorage log + analytics
│   └── components/
│       ├── Header.jsx             # Nav + branding
│       ├── SimplifierTab.jsx      # Main tool UI
│       ├── SqlTab.jsx             # Analytics log + SQL display
│       └── AboutTab.jsx           # Project pitch + tech stack
├── public/
│   └── favicon.svg
├── index.html
├── vite.config.js
├── package.json
├── .env.example
└── .gitignore
```

---

## Design Decisions

**Why structured JSON output instead of a chat interface?**  
Patients don't want a conversation. They want one clear, shareable answer. Structured output also enables the analytics layer — tracking which terms appear most, where comprehension drops, and what action items get surfaced most often.

**Why log queries to localStorage?**  
Demonstrates the SQL analytics angle required for the PM role. In production, this would write to a database (Postgres) and drive a product dashboard showing which medical specialties generate the most confusion.

**Why no UI library?**  
Keeps the bundle small and shows CSS-in-JS competency. The entire UI is ~350 lines of inline styles with a clear design system using CSS variables.

---

## The SQL Insight

The Query Log tab shows simulated analytics over real session data:

```sql
SELECT 
  DATE(timestamp)        AS date,
  COUNT(*)               AS total_queries,
  AVG(input_length)      AS avg_input_chars,
  AVG(key_point_count)   AS avg_key_points
FROM simplification_events
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

**Real insight this surfaces:** Average discharge note is ~400 characters but generates only 3.2 key points — suggesting patients receive a lot of filler text and very little actionable information.

---

## What I'd Change in v2

1. **Reading-level selector** — Child / Adult / Elderly caregiver modes
2. **EHR integration** — Embed in discharge flow so doctors preview simplified version before printing
3. **Confusion heatmap** — Mine the glossary log to find which terms appear most → build a dynamic medical dictionary
4. **Patient feedback loop** — Thumbs up/down on each simplified output to measure actual comprehension
5. **Multi-language support** — Translate to patient's preferred language in the same step

---

## Disclaimer

ClearRx is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always follow your healthcare provider's guidance.

---

## License

MIT — feel free to use, fork, and build on this.

---

*Built by Kulshreshth Chikara · shreshth0001@gmail.com · [LinkedIn](https://linkedin.com/in/yourhandle](https://www.linkedin.com/in/kulshreshth-chikara-6a8b4a282/)*
