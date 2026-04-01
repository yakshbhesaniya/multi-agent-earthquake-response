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

/**
 * Sends a prompt to the Gemini LLM and returns the text response
 * @param {string} prompt Prompt string to send to the LLM 
 * @returns {Promise<string>} LLM response text
 */
export async function queryLLM(prompt) {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        throw new Error(error.message);
    }
}
