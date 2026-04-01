import { queryLLM } from '../services/llmService.js';
import { getDomainKnowledge } from '../services/knowledgeBase.js';

/**
 * The Infrastructure Agent analyzes building and structural damage risk based on earthquake data.
 * @param {Object} earthquakeData Earthquake details like magnitude and location
 * @returns {Promise<string>} Agent's reasoning and result
 */
export async function analyzeInfrastructure(earthquakeData) {
    const domainKnowledge = getDomainKnowledge('infrastructure');
    
    const prompt = `
You are the Infrastructure Agent responding to an earthquake scenario.
Analyze the expected structural and building damage risk based on the following data:
- Magnitude: ${earthquakeData.magnitude}
- Location: ${earthquakeData.location}

Here is some domain knowledge you should use:
"${domainKnowledge}"

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
