import { queryLLM } from '../services/llmService.js';
import { getDomainKnowledge } from '../services/knowledgeBase.js';

/**
 * The Transportation Agent suggests evacuation routes and evaluates road blockage risks.
 * @param {Object} earthquakeData Earthquake details like magnitude and location
 * @returns {Promise<string>} Agent's reasoning and result
 */
export async function analyzeTransportation(earthquakeData) {
    const domainKnowledge = getDomainKnowledge('transportation');
    
    const prompt = `
You are the Transportation Agent responding to an earthquake scenario.
Analyze the expected road blockage risk and suggest evacuation routes based on the following data:
- Magnitude: ${earthquakeData.magnitude}
- Location: ${earthquakeData.location}

Here is some domain knowledge you should use:
"${domainKnowledge}"

Respond strictly with a valid JSON document containing these exact keys:
{
  "reasoning": "Brief explanation of why you suggest these routes and identified risks",
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
