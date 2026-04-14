import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY is not defined in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });

export const delay = (ms) => new Promise(res => setTimeout(res, ms));

export async function queryLLM(prompt) {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        throw new Error(error.message);
    }
}
