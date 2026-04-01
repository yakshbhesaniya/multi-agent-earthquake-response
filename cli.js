import { runCoordinator } from './agents/coordinatorAgent.js';
import dotenv from 'dotenv';

dotenv.config();

async function runCLI() {
    console.log(`\n======================================================`);
    console.log(`Multi-Agent Earthquake Response System (CLI Mode)`);
    console.log(`======================================================\n`);

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'INSERT_YOUR_GEMINI_API_KEY_HERE') {
        console.error("ERROR: Please set your valid GEMINI_API_KEY in the .env file.");
        process.exit(1);
    }

    const sampleInput = {
        magnitude: 6.5,
        location: "Mumbai"
    };

    console.log(`--- Input Data ---`);
    console.log(`Magnitude: ${sampleInput.magnitude}`);
    console.log(`Location: ${sampleInput.location}\n`);

    console.log(`[System] Initializing Agents...\n`);

    try {
        const result = await runCoordinator(sampleInput);

        const finalJSON = {
            event: result.event,
            orchestration: "Coordinator assigned tasks to Infrastructure and Transportation agents",
            infrastructure: {
                risk_level: result.infrastructureAgentDetails.risk_level || "N/A",
                confidence: result.infrastructureAgentDetails.confidence || "N/A",
                critical_zones: result.infrastructureAgentDetails.critical_zones || [],
                reasoning: result.infrastructureAgentDetails.reasoning || "N/A",
                final_output: result.infrastructureAgentDetails.final_output || "N/A"
            },
            transportation: {
                risk_level: result.transportationAgentDetails.risk_level || "N/A",
                confidence: result.transportationAgentDetails.confidence || "N/A",
                blocked_routes: result.transportationAgentDetails.blocked_routes || [],
                alternate_routes: result.transportationAgentDetails.alternate_routes || [],
                reasoning: result.transportationAgentDetails.reasoning || "N/A",
                final_output: result.transportationAgentDetails.final_output || "N/A"
            },
            coordinator_decision: {
                priority: result.coordinatorDecision.priority || "N/A",
                confidence: result.coordinatorDecision.confidence || "N/A",
                recommended_actions: result.coordinatorDecision.recommended_actions || [],
                reasoning: result.coordinatorDecision.reasoning || "N/A",
                final_decision: result.coordinatorDecision.final_decision || "N/A"
            }
        };

        const formatAgent = (name, data) => {
            const riskOrPriority = data.risk_level || data.priority || "N/A";
            let out = `${name}:\n- Reasoning: ${data.reasoning || "N/A"}\n- Risk Level: ${riskOrPriority}\n- Confidence: ${data.confidence || "N/A"}\n- Final Output: ${data.final_output || data.final_decision || "N/A"}`;
            
            if (name === "Infrastructure Agent") {
                out += `\n- Critical Zones: ${(data.critical_zones || []).join(", ") || "None specified"}`;
            } else if (name === "Transportation Agent") {
                out += `\n- Blocked Routes: ${(data.blocked_routes || []).join(", ") || "None specified"}`;
                out += `\n- Alternate Routes: ${(data.alternate_routes || []).join(", ") || "None specified"}`;
            } else if (name === "Coordinator Decision") {
                out += `\n- Recommended Actions: ${(data.recommended_actions || []).join(", ") || "None specified"}`;
            }
            return out;
        };

        const terminalOutput = `
--- Final Output ---
${result.event}

[Orchestration] Coordinator assigned tasks to Infrastructure and Transportation agents...

${formatAgent("Infrastructure Agent", result.infrastructureAgentDetails)}

${formatAgent("Transportation Agent", result.transportationAgentDetails)}

${formatAgent("Coordinator Decision", result.coordinatorDecision)}
--------------------

=== FINAL RESPONSE SUMMARY ===
Risk: ${result.coordinatorDecision.priority || "High"}
Priority Zone: ${(result.infrastructureAgentDetails.critical_zones || [])[0] || "South Mumbai"}
Primary Action: ${result.coordinatorDecision.summary_action || "Structural inspection + route clearance"}
`.trim();

        console.log(`\n${terminalOutput}\n`);

    } catch (error) {
        console.error("Failed to execute scenario:", error);
    }
}

runCLI();
