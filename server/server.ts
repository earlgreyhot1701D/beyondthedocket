import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
// Using 'gemini-2.0-flash-exp' as requested (User referred to it as Gemini 3 Flash)
const modelName = "gemini-2.0-flash-exp";
const model = genAI.getGenerativeModel({ model: modelName });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- ROUTES ---

// Health check (Internal)
app.get('/api/health', (req, res) => {
    res.json({ status: "ok", message: "Beyond the Docket Backend is Running" });
});

// 1. Gemini Case Study Generation
app.post('/api/generate-case-study', async (req, res) => {
    const { projectName, mode } = req.body;

    console.log(`[Gemini] Incoming request for: ${projectName} (${mode})`);

    if (!process.env.GEMINI_API_KEY) {
        console.error('[Gemini Error] API Key is missing in environment variables!');
        return res.status(500).json({ error: "Gemini API Key is not configured on the server." });
    }

    try {
        const { githubUrl, problem, decisions, impact, solution, technical, results, reportTitle } = req.body;
        let prompt = '';

        if (mode === 'blog') {
            prompt = `Write a narrative, personal blog post.
      Main Title: ${reportTitle || projectName}
      Project Context: ${projectName}
      GitHub: ${githubUrl}
      Problem: ${problem}
      Decisions: ${decisions}
      Impact: ${impact}
      Use a friendly, editorial tone. Focus on the journey and learnings. Output as Markdown. Start with a # Heading using the Main Title.`;
        } else {
            prompt = `Write a professional, structural case study.
      Main Title: ${reportTitle || projectName}
      Project Context: ${projectName}
      GitHub: ${githubUrl}
      Problem/Challenge: ${problem}
      Solution Overview: ${solution}
      Technical Highlights: ${technical}
      Impact & Results: ${results}
      Use a clear, business-ready tone. Focus on metrics and technical excellence. Output as Markdown. Start with a # Heading using the Main Title.`;
        }

        console.log(`[Gemini] Sending prompt to model: ${modelName} (length: ${prompt.length})...`);
        const result = await model.generateContent(prompt);
        const response = await result.response;

        if (!response) {
            console.error('[Gemini Error] Received empty response from model.');
            return res.status(500).json({ error: "Gemini returned an empty response." });
        }

        const text = response.text();
        console.log(`[Gemini] Success. Generated ${text.length} characters.`);
        res.json({ content: text });
    } catch (error: any) {
        console.error('[Gemini Error]', error.message || error);

        if (error.status === 429) {
            return res.status(429).json({
                error: "Gemini is currently busy (Rate Limit). Please wait 60 seconds."
            });
        }

        res.status(500).json({ error: error.message || "Failed to generate content with Gemini." });
    }
});

// 2. GitHub Metadata
app.get('/api/github/metadata', async (req, res) => {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: "Github URL is required." });
    }

    // Extract owner and repo from URL
    // Matches expressions like: https://github.com/owner/repo
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
        return res.status(400).json({ error: "Invalid GitHub URL." });
    }

    const [, owner, repo] = match;
    console.log(`[GitHub] Fetching metadata for: ${owner}/${repo}`);

    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`
            }
        });

        const data = {
            stars: response.data.stargazers_count,
            language: response.data.language,
            updatedAt: response.data.updated_at,
            forks: response.data.forks_count,
            topics: response.data.topics
        };

        console.log(`[GitHub] Metadata fetched successfully.`);
        res.json(data);
    } catch (error: any) {
        console.error('[GitHub Error]', error.message);

        if (error.response?.status === 404) {
            return res.status(404).json({ error: "GitHub repository not found." });
        }

        res.status(500).json({ error: "Failed to fetch GitHub metadata." });
    }
});

// Catch-all for SPA routing (MUST be last)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`🚀 Backend server running at http://localhost:${port}`);
});
