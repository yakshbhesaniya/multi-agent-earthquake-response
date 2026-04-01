# Multi-Agent Earthquake Disaster Response System

A Node.js-based prototype for a multi-agent system responding to earthquake scenarios. The system features three AI agents that collaborate using the Google Gemini LLM API.

## Agents

1. **Coordinator Agent**: Receives scenario data, delegates analysis tasks to sub-agents, and formulates a final decision.
2. **Infrastructure Agent**: Assesses expected structural and building damage risk.
3. **Transportation Agent**: Analyzes road blockage risks and suggests alternative evacuation routes.

## Prerequisites

- Node.js installed
- Google Gemini API Key (Available for free in Google AI Studio)

## Setup

1. Open the project folder (`earthquake-response-system`).
2. Run `npm install` to install dependencies if not already installed.
3. Open the `.env` file and replace `INSERT_YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key.

## How to Run

### Method 1: CLI (Fastest for testing)
Run the simple CLI script which automatically triggers the system with a sample payload (Magnitude 6.5 in Mumbai):
\`\`\`bash
npm run cli
\`\`\`

### Method 2: API Server
Start the Express server:
\`\`\`bash
npm start
\`\`\`

Then, send a POST request in another terminal using `curl`:
\`\`\`bash
curl -X POST http://localhost:3000/api/analyze \
-H "Content-Type: application/json" \
-d "{\"magnitude\": 6.5, \"location\": \"Mumbai\"}"
\`\`\`

## Architecture

- `/agents/` - Home to the 3 intelligence agents.
- `/services/` - LLM interaction (`llmService.js`) and Domain knowledge (`knowledgeBase.js`).
- `/controllers/` - API processing (`responseController.js`).
- `cli.js` - Standalone test script.
- `index.js` - Express API server entry point.
