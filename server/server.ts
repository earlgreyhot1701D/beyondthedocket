import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- 1. ENVIRONMENT RESOLUTION ---
// Check system process first (Cloud Run / Docker ENV)
if (process.env.GEMINI_API_KEY && process.env.GITHUB_TOKEN) {
    console.log('[Server] Environment variables detected in system process.');
} else {
    // Resiliently look for .env in local dev and production dist structures
    const envPaths = [
        path.join(__dirname, '.env'),
        path.join(__dirname, '..', '.env'),
        path.join(process.cwd(), '.env'),
        path.join(process.cwd(), 'server', '.env')
    ];

    for (const p of envPaths) {
        dotenv.config({ path: p });
        if (process.env.GEMINI_API_KEY) {
            console.log('[Server] Environment loaded successfully from:', p);
            break;
        }
    }
}

const app = express();
const port = process.env.PORT || 3000;

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// Serving Static Assets
const publicPath = path.join(__dirname, 'public');
const fallbackPath = path.join(__dirname, '..', 'dist'); // Local dev fallback
app.use(express.static(publicPath));
app.use(express.static(fallbackPath));

// --- 3. AI & API INITIALIZATION ---
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);
// gemini-2.0-flash-exp is the current high-performance benchmark for this stack
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

// --- 4. API ROUTES ---

// Health & Diagnostics
app.get('/api/health', (req, res) => {
    res.json({
        status: "ok",
        message: "Beyond the Docket Backend is Running",
        timestamp: new Date().toISOString(),
        keyPresent: apiKey ? (apiKey.length > 10 ? 'YES' : 'TOO_SHORT') : 'MISSING'
    });
});

// Case Study Generation
app.post('/api/generate-case-study', async (req, res) => {
    const { projectName, mode, problem, solution, technical, results, reportTitle } = req.body;

    if (!apiKey) {
        return res.status(500).json({ error: "Gemini API Key is not configured on the server." });
    }

    try {
        console.log(`[Gemini] Generating ${mode} for: ${projectName}`);

        const prompt = mode === 'blog' ?
            `Write a personal, narrative blog post for a developer portfolio.
             Title: ${reportTitle || projectName}
             Bio: ${problem}
             Tech Stack: ${technical}
             Focus on the journey and technical growth. Output in Markdown.` :
            `Write a professional, structural case study for a software architecture portfolio.
             Title: ${reportTitle || projectName}
             Challenge: ${problem}
             Solution: ${solution}
             Technical Highlights: ${technical}
             Metrics/Results: ${results}
             Focus on technical excellence and business impact. Output in Markdown.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        res.json({ content: text });
    } catch (error: any) {
        console.error('[Gemini Error]', error.message);
        res.status(500).json({
            error: "Gemini failed to generate content.",
            details: error.message
        });
    }
});

// GitHub Metadata Proxy
app.get('/api/github/metadata', async (req, res) => {
    const { url } = req.query;
    if (!url || typeof url !== 'string') return res.status(400).json({ error: "URL required" });

    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return res.status(400).json({ error: "Invalid GitHub URL" });

    const [, owner, repo] = match;
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
        });

        res.json({
            stars: response.data.stargazers_count,
            language: response.data.language,
            updatedAt: response.data.updated_at,
            forks: response.data.forks_count,
            topics: response.data.topics
        });
    } catch (error: any) {
        res.status(500).json({ error: "GitHub fetch failed", details: error.message });
    }
});

// --- 5. FALLBACK / SPA HANDLER ---
// Using middleware instead of wildcards to ensure Express 5 compatibility
app.use((req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'Endpoint not found' });
    }

    const possibleIndices = [
        path.join(publicPath, 'index.html'),
        path.join(fallbackPath, 'index.html'),
        path.join(__dirname, '..', 'public', 'index.html')
    ];

    // Try to send index.html if it exists to support client-side routing
    for (const loc of possibleIndices) {
        try {
            return res.sendFile(loc);
        } catch (e) {
            // Continue searching if file doesn't exist
        }
    }

    res.status(404).send('Not Found');
});

// --- 6. START ---
app.listen(port, () => {
    console.log(`🚀 Production-ready backend active on port ${port}`);
});
