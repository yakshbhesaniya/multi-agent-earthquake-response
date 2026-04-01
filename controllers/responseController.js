import { runCoordinator } from '../agents/coordinatorAgent.js';

const responseController = {
    /**
     * API Endpoint Handler to analyze earthquake scenarios
     */
    async analyzeEarthquake(req, res) {
        try {
            const { magnitude, location } = req.body;

            if (magnitude === undefined || !location) {
                return res.status(400).json({ 
                    error: "Invalid input. Please provide 'magnitude' and 'location'." 
                });
            }

            console.log(`\n--- New Request ---`);
            console.log(`Input: Magnitude ${magnitude}, Location: ${location}`);

            // Invoke the Coordinator Agent (Main controller)
            const result = await runCoordinator({ magnitude, location });

            // Structure response strictly as JSON requested by the user
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
                },
                final_response_summary: {
                    risk: result.coordinatorDecision.priority || "High",
                    priority_zone: (result.infrastructureAgentDetails.critical_zones || [])[0] || "South Mumbai",
                    primary_action: "Structural inspection + route clearance (due to high collapse risk and blocked major routes)"
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
Primary Action: Structural inspection + route clearance (due to high collapse risk and blocked major routes)
`.trim();

            console.log(`\n${terminalOutput}\n`);

            // Return strict JSON structure
            return res.status(200).json(finalJSON);

        } catch (error) {
            console.error("Error in analyzeEarthquake:", error);
            return res.status(500).json({
                success: false,
                error: "Failed to process the earthquake response scenario."
            });
        }
    }
};

export default responseController;
