import type { TimelineProject } from '../types/portfolio';

export const timelineProjects: TimelineProject[] = [
    {
        id: 'jury-chatbot',
        date: 'July 2025',
        title: 'The Beginning',
        subtitle: 'First AWS Bedrock Call',
        description: "A weekend warrior's first dive into AI. Built the jury eligibility chatbot, proving that government tech could be modern and user-centric.",
        videoUrl: 'https://www.loom.com/share/189bf95c6e8643da9188f85413daf56f',
        stats: [
            { label: 'Build Time', value: '48hrs' },
            { label: 'Impact', value: 'Pilot' }
        ],
        techStack: ['AWS Bedrock', 'Claude', 'RAG / FAISS', 'Python', 'Streamlit'],
        githubUrl: 'https://github.com/earlgreyhot1701D/your-honor-i-object-to-jury-duty-v9',
        cta: [
            { label: '📋 Details', action: 'openDetailsModal' },
            { label: '✨ Generate Case Study', action: 'openGeneratorModal' }
        ],
        fullCaseStudy: `
      <h3>The Challenge</h3>
      <p>The Santa Barbara Superior Court receives hundreds of jury eligibility inquiries annually. Many can be answered through the California legal code, but the current system requires court staff to manually respond to each inquiry. This creates bottlenecks, delays responses, and limits accessibility.</p>

      <h3>The Solution</h3>
      <p>Built a RAG (Retrieval-Augmented Generation) chatbot that ingests California jury service code and uses Claude AI to provide accurate, consistent responses. Users can ask questions in natural language and receive immediate answers grounded in actual legal requirements.</p>

      <h3>Technical Highlights</h3>
      <p><strong>Architecture:</strong> AWS Bedrock (Claude inference), FAISS vector database for document retrieval, Python backend, Streamlit frontend.</p>
      <p><strong>Key Innovation:</strong> Implemented retrieval-augmented generation so answers are cited directly from legal code—no hallucinations, full auditability.</p>
    `,
        badge: {
            text: 'Public Service AI',
            type: 'tech'
        }
    },
    {
        id: 'pdf-extractor',
        date: 'August 2025',
        title: 'Cal Poly DxHub: AI Accessibility',
        subtitle: 'Selected Fellow & AI Lead',
        badge: { text: '🏆 2nd Place Winner (out of 14 teams)', type: 'winner' },
        description: 'Selected as 1 of 100 from 1,300 applicants for the DxHub Fellowship. Focused on building the core PDF extraction engine that powered institutional accessibility innovations.',
        videoUrl: 'https://youtu.be/fUj6u3S_Hsg',
        stats: [
            { label: 'Selected', value: '1 of 100' },
            { label: 'Applicants', value: '1,300' }
        ],
        techStack: ['Python', 'PyPDF2', 'FastAPI', 'AWS S3', 'OCR Integration'],
        githubUrl: 'https://github.com/earlgreyhot1701D/ccc-ai-pdf-project',
        cta: [
            { label: '📋 View Evidence', action: 'openDetailsModal' },
            { label: '✨ Analysis', action: 'openGeneratorModal' }
        ],
        fullCaseStudy: `
# Cal Poly DxHub: Automated PDF Extraction

## The Challenge
Institutional accessibility often fails at the document level. Manually tagging thousands of PDFs for screen readers is a multi-year, multi-million dollar problem.

## What I Built
As one of 100 selected fellows from an applicant pool of 1,300, I was tasked with solving the extraction layer of a larger accessibility suite. I built a Python-based engine that identifies structural elements (headings, tables, lists) within complex academic PDFs with high precision.

## The Result
My team secured **2nd Place out of 14 high-performance teams**. The system reduced the manual effort for document tagging by approximately 85%, providing a scalable path for institutional compliance.
        `
    },
    {
        id: 'janus-clew',
        date: 'December 2025',
        title: 'Janus Clew: Narrative Evidence',
        subtitle: 'Autonomous Growth Tracking for Indie Builders',
        badge: { text: '🏆 AWS Vibe Hackathon Winner', type: 'winner' },
        description: "Janus turns your code into measurable evidence. It analyzes your complexity progression (e.g., 6.2 → 8.1) using AWS AgentCore to prove technical mastery across projects.",
        videoUrl: 'https://youtu.be/hIGzf3F6F1A',
        stats: [
            { label: 'Complexity Velocity', value: '2.5x' },
            { label: 'AgentCore', value: 'Guided' }
        ],
        techStack: ['AWS AgentCore', 'AWS Bedrock', 'Python 3.11', 'React', 'Git Analysis'],
        githubUrl: 'https://github.com/earlgreyhot1701D/janus-clew',
        cta: [
            { label: '📋 View Journey', action: 'openDetailsModal' },
            { label: '✨ Generate Report', action: 'openGeneratorModal' }
        ],
        fullCaseStudy: `
# Janus Clew: Evidence-backed growth tracking for indie builders

## The Problem
You're shipping faster than ever, but your growth is invisible. GitHub doesn't show mastery, and LinkedIn isn't measurable.

## The Solution: Evidence + Intelligent Guidance
Janus Clew analyzes your actual code across projects and provides both backward-looking evidence and forward-looking career guidance.

### What it built (Evidence):
* **Timeline**: Complexity progression (6.2 → 7.5 → 8.1 means you leveled up 2.5x in 8 weeks).
* **Skills Detected**: Technologies you actually used (with proof).
* **Complexity Breakdown**: Factors including files, functions, classes, and nesting depth.

### Intelligent Guidance (AWS AgentCore):
Using AWS AgentCore to read your complete project history, Janus detects patterns and generates recommendations rooted in your actual code—not generic advice. It knows if you prefer async patterns or avoid databases, and tells you exactly what you're ready for next.
        `
    },
    {
        id: 'athena-clew',
        date: 'January 2026',
        title: 'Athena Clew: Unified Ecosystem',
        subtitle: 'The World\'s First Autonomous Debugging Agent',
        badge: { text: '🚀 Gemini 3 Hackathon', type: 'tech' },
        description: "Featuring Theseus Clew: an autonomous agent that detects 'déjà vu' patterns across your projects. It connects past fixes to current errors using Gemini 3 Deep Thinking.",
        videoUrl: 'https://youtu.be/vKHIfoEc800',
        stats: [
            { label: 'Reasoning', value: 'Gemini 3' },
            { label: 'Sync', value: 'Cross-Project' }
        ],
        techStack: ['Gemini 3 Flash', 'Deep Thinking', 'Firebase', 'Autonomous Agents'],
        githubUrl: 'https://github.com/earlgreyhot1701D/Athena-Clew',
        cta: [
            { label: '📋 View Suite', action: 'openDetailsModal' },
            { label: '✨ Debug Analysis', action: 'openGeneratorModal' }
        ],
        fullCaseStudy: `
# Athena Clew Platform: The Unified Developer Ecosystem

## Theseus Clew — Autonomous Debugging Agent (Gemini 3 Deep Thinking)
Theseus Clew isn’t a chatbot; it’s an autonomous debugging agent. It solves the problem of "Knowledge Decay" during debugging.

### The Pipeline
1. **Deep Thinking Analysis**: Uses Gemini 3 (5000 token budget) to reason about the underlying cause of an error.
2. **Cross-Project Déjà Vu**: Detects if you solved a similar pattern in Project B three days ago using Jaccard Similarity matching.
3. **Principle Extraction**: Converts a single fix into a transferable "When X, then Y" principle.
4. **Autonomous Learning**: Every successful fix automatically grows the underlying knowledge base without manual retraining.

## The Athena Clew Suite
Athena unifies **The Clew Suite**: Theseus (Debugging), Lumen (Health), Metis (Understanding), Janus (Growth), and Ariadne (Memory).
        `
    }
];
