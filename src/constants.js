export const EXAMPLES = [
  {
    label: "Discharge note",
    text: "Patient presents with acute exacerbation of congestive heart failure with bilateral pleural effusions. Echocardiogram reveals an ejection fraction of 35%. Prescribed furosemide 40mg PO BID and lisinopril 10mg QD. Follow up with cardiology in 2 weeks.",
  },
  {
    label: "Lab result",
    text: "HbA1c: 9.2% indicating poor glycemic control. Fasting plasma glucose 210 mg/dL. Recommend intensification of antidiabetic regimen. Consider addition of GLP-1 receptor agonist.",
  },
  {
    label: "Radiology report",
    text: "CT thorax reveals a 1.2cm pulmonary nodule in the right lower lobe with spiculated margins, concerning for primary malignancy. No mediastinal lymphadenopathy identified. PET scan recommended for further characterization.",
  },
  {
    label: "Surgical note",
    text: "Patient underwent laparoscopic cholecystectomy for acute cholecystitis secondary to cholelithiasis. Intraoperative cholangiogram was negative for common bile duct stones. Estimated blood loss 50mL. Patient tolerated procedure well. NPO until bowel function returns.",
  },
];

export const SYSTEM_PROMPT = `You are a compassionate medical translator helping patients understand their health information. Convert medical text into plain English that a 7th-grader can understand. Be warm, clear, and reassuring — never alarm the patient unnecessarily. Do not omit important information.

Respond ONLY with a valid JSON object. No markdown, no preamble, no explanation outside the JSON.

JSON structure:
{
  "plain": "A warm 2–4 sentence summary in plain English",
  "keyPoints": ["3–5 short bullet points covering the main medical facts"],
  "actionItems": ["2–4 concrete things the patient should do or ask their doctor"],
  "readabilityScore": "e.g. Original: Grade 16 → Simplified: Grade 6",
  "glossary": [{"term": "medical word", "definition": "plain English meaning"}]
}`;

export const API_URL = "https://api.anthropic.com/v1/messages";
export const MODEL = "claude-sonnet-4-20250514";
export const MAX_TOKENS = 1200;

export const SQL_LOG_KEY = "clearrx_query_log";
export const MAX_LOG_ENTRIES = 100;
