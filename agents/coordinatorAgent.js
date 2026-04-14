import { queryLLM, delay } from '../services/llmService.js';
import { getDomainKnowledge } from '../services/knowledgeBase.js';
import { analyzeInfrastructure } from './infrastructureAgent.js';
import { analyzeTransportation } from './transportationAgent.js';

export async function runCoordinator(earthquakeData) {
    console.log(`[Coordinator] Received earthquake data: Magnitude ${earthquakeData.magnitude} at ${earthquakeData.location}`);
    
    // Trigger sub-agents 
    console.log(`[Coordinator] Assigned task to Infrastructure agent...`);
    const infraResponse = await analyzeInfrastructure(earthquakeData);
    
    await delay(1200); 

    console.log(`[Coordinator] Assigned task to Transportation agent...`);
    const transportResponse = await analyzeTransportation(earthquakeData);

    await delay(1200); 

    // Combine responses 
    console.log(`[Coordinator] Received sub-agent reports. Formulating final decision...`);
    const domainKnowledge = getDomainKnowledge('general') + ' ' + getDomainKnowledge('response') + ' ' + getDomainKnowledge('uncertainty');

    const prompt = `
You are the Coordinator Agent for an Earthquake Response System.
An earthquake of magnitude ${earthquakeData.magnitude} has struck ${earthquakeData.location}.

General knowledge:
"${domainKnowledge}"

Here are the reports from your specialized sub-agents:
--- INFRASTRUCTURE REPORT ---
${JSON.stringify(infraResponse)}
-----------------------------

--- TRANSPORTATION REPORT ---
${JSON.stringify(transportResponse)}
-----------------------------

Based on these reports, provide a final strategic decision.
Respond strictly with a valid JSON document containing these exact keys:
{
  "reasoning": "Concise technical rationale based on sub-agents' data (max 2 sentences, engineered tone)",
  "priority": "Low/Medium/High/Critical",
  "confidence": "Percentage (e.g., 90%)",
  "recommended_actions": ["Action1", "Action2"],
  "final_decision": "A 1-2 sentence final tactical decision.",
  "summary_action": "A very short, 1-line phrase summarizing the primary action and reason (e.g., 'Structural inspection + clearance (due to high collapse risk)')"
}
Only output the JSON object, do not include markdown formatting like \`\`\`json.
`;

    let responseText = "N/A";
    let finalDecision;
    try {
        responseText = await queryLLM(prompt);
        const jsonStr = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
        finalDecision = JSON.parse(jsonStr);
    } catch (e) {
        console.warn(`[Coordinator Agent] System Warning: ${e.message}`);
        finalDecision = { error: e.message || "Failed to parse JSON", raw: responseText };
    }

    return {
        event: `Earthquake detected: Magnitude ${earthquakeData.magnitude} at ${earthquakeData.location}`,
        infrastructureAgentDetails: infraResponse,
        transportationAgentDetails: transportResponse,
        coordinatorDecision: finalDecision
    };
}
