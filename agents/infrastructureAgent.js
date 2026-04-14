import { queryLLM } from '../services/llmService.js';
import { getDomainKnowledge } from '../services/knowledgeBase.js';

export async function analyzeInfrastructure(earthquakeData) {
    const domainKnowledge = getDomainKnowledge('infrastructure') + ' ' + getDomainKnowledge('magnitude') + ' ' + getDomainKnowledge('uncertainty');
    
    const prompt = `
You are the Infrastructure Assessment Agent for Mumbai's Disaster Response System.
Your job is to analyze the structural risk based on the earthquake data and domain knowledge.

Based on magnitude classification and infrastructure vulnerability, if the earthquake magnitude is 6.5 or above, classify the risk_level as "High" or "Critical".

Earthquake Data: Magnitude ${earthquakeData.magnitude} at ${earthquakeData.location}
Domain Knowledge: ${domainKnowledge}

Respond strictly with a valid JSON document containing these exact keys:
{
  "reasoning": "Concise technical rationale for the risk assessment (max 2 sentences, engineered tone)",
  "risk_level": "Low/Medium/High/Critical",
  "confidence": "Percentage (e.g., 85%)",
  "critical_zones": ["Area1", "Area2"],
  "final_output": "A 1-2 sentence final summary of the situation."
}
Only output the JSON object, do not include markdown formatting like \`\`\`json.
`;

    try {
        const response = await queryLLM(prompt);
        const jsonStr = response.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (e) {
        console.warn(`[Infrastructure Agent] System Warning: ${e.message}`);
        return { error: e.message || "Failed to parse JSON", raw: "N/A" };
    }
}
