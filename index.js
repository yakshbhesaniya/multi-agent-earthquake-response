import express from 'express';
import dotenv from 'dotenv';
import responseController from './controllers/responseController.js';

dotenv.config();

const app = express();
app.use(express.json());

// API endpoint for processing earthquake scenarios
app.post('/api/analyze', responseController.analyzeEarthquake);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`Multi-Agent Earthquake Response System running`);
    console.log(`Server is listening on http://localhost:${PORT}`);
    console.log(`To test, send a POST request to http://localhost:${PORT}/api/analyze`);
    console.log(`Example Payload: {"magnitude": 6.5, "location": "Mumbai"}`);
    console.log(`======================================================\n`);
});
