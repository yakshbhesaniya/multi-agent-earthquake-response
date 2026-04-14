import { queryLLM } from '../services/llmService.js';
import { getDomainKnowledge } from '../services/knowledgeBase.js';

export async function analyzeTransportation(earthquakeData) {
    const domainKnowledge = getDomainKnowledge('transportation') + ' ' + getDomainKnowledge('magnitude') + ' ' + getDomainKnowledge('uncertainty');
    
    const prompt = `
You are the Transportation Routing Agent for Mumbai's Disaster Response System.
Your job is to analyze transportation blockages and suggest alternate emergency routes.

Based on system magnitude classification and transportation vulnerability, if the earthquake magnitude is 6.5 or above, classify the risk_level as "High" or "Critical".

Earthquake Data: Magnitude ${earthquakeData.magnitude} at ${earthquakeData.location}
Domain Knowledge: ${domainKnowledge}

Respond strictly with a valid JSON document containing these exact keys:
{
  "reasoning": "Concise technical rationale for route suggestions (max 2 sentences, engineered tone)",
  "risk_level": "Low/Medium/High/Critical",
  "confidence": "Percentage (e.g., 85%)",
  "blocked_routes": ["Route1", "Route2"],
  "alternate_routes": ["Route3"],
  "final_output": "A 1-2 sentence final summary of the situation."
}
Only output the JSON object, do not include markdown formatting like \`\`\`json.
`;

    try {
        const response = await queryLLM(prompt);
        const jsonStr = response.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (e) {
        console.warn(`[Transportation Agent] System Warning: ${e.message}`);
        return { error: e.message || "Failed to parse JSON", raw: "N/A" };
    }
}
