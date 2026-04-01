import { queryLLM } from '../services/llmService.js';
import { getDomainKnowledge } from '../services/knowledgeBase.js';

/**
 * The Infrastructure Agent analyzes building and structural damage risk based on earthquake data.
 * @param {Object} earthquakeData Earthquake details like magnitude and location
 * @returns {Promise<string>} Agent's reasoning and result
 */
export async function analyzeInfrastructure(earthquakeData) {
    // Fetch background domain knowledge for the infrastructure and magnitude arrays
    const domainKnowledge = getDomainKnowledge('infrastructure') + ' ' + getDomainKnowledge('magnitude') + ' ' + getDomainKnowledge('uncertainty');
    
    const prompt = `
You are the Infrastructure Assessment Agent for Mumbai's Disaster Response System.
Your job is to analyze the structural risk based on the earthquake data and domain knowledge.

MANDATORY RULE: If the earthquake magnitude is 6.5 or above, you MUST classify the risk_level as "High" or "Critical".

Earthquake Data: Magnitude ${earthquakeData.magnitude} at ${earthquakeData.location}
Domain Knowledge: ${domainKnowledge}

Respond strictly with a valid JSON document containing these exact keys:
{
  "reasoning": "Brief explanation of why you made these conclusions",
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
