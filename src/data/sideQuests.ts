import type { SideQuest } from '../types/portfolio';

export const sideQuests: SideQuest[] = [
    {
        id: 'your-honor',
        title: 'Your Honor, I Object to Jury Duty',
        category: 'court',
        description: 'RAG-powered chatbot for jury eligibility inquiries. Weekend build. Uses California legal code with Claude AI.',
        techStack: ['AWS Bedrock', 'Claude', 'RAG/FAISS', 'Python'],
        githubUrl: 'https://github.com/earlgreyhot1701D/your-honor-i-object-to-jury-duty-v9'
    },
    {
        id: 'lumen-clew',
        title: 'Lumen Clew',
        category: 'court',
        description: '✨ LIVE: High-fidelity code health scanner. Measures complexity growth and technical debt purely from code analysis.',
        techStack: ['Python', 'AST Analysis', 'React'],
        githubUrl: 'https://github.com/earlgreyhot1701D/lumen-clew'
    },
    {
        id: 'metis-clew',
        title: 'Metis Clew',
        category: 'court',
        description: '✨ LIVE: AI-powered code understanding. Explains what complex AI-generated code is actually doing underneath.',
        techStack: ['Gemini 2.0', 'React', 'TypeScript'],
        githubUrl: 'https://github.com/earlgreyhot1701D/metis-clew'
    },
    {
        id: 'ariadne-clew',
        title: 'Ariadne Clew',
        category: 'court',
        description: '🔮 COMING: Memory artifacts for LLMs. Preserves developer reasoning and intent across disparate chat sessions.',
        techStack: ['Agentic Memory', 'VectorDB'],
        githubUrl: 'https://github.com/earlgreyhot1701D/ariadne-clew'
    },
    {
        id: 'ticketglass',
        title: 'TicketGlass',
        category: 'hackathon',
        description: 'Event ticketing platform built during a 48-hour sprint. Focused on transparency.',
        techStack: ['React', 'Events'],
        githubUrl: 'https://github.com/earlgreyhot1701D/ticketglass'
    },
    {
        id: 'panoptes-scout',
        title: 'Panoptes Scout',
        category: 'hackathon',
        description: 'Pattern detection and monitoring system for real-time data streams.',
        techStack: ['Python', 'Analytics'],
        githubUrl: 'https://github.com/earlgreyhot1701D/Panoptes-Scout'
    },
    {
        id: 'sprint-kit',
        title: 'Sprint Kit',
        category: 'hackathon',
        description: 'Agile sprint planning tool for rapid development cycles.',
        techStack: ['React', 'Agile'],
        githubUrl: 'https://github.com/earlgreyhot1701D/Sprint-Kit'
    },
    {
        id: 'scoville-collective',
        title: 'Scoville Collective',
        category: 'creative',
        description: 'AI-powered hot sauce and condiment analyzer using Gemini to rate spice level and flavor.',
        techStack: ['React', 'Claude AI', 'Supabase'],
        githubUrl: 'https://github.com/earlgreyhot1701D/the-burn-book-main'
    },
    {
        id: 'le-voyage',
        title: 'Le Voyage',
        category: 'creative',
        description: 'Collaborative trip planning platform with real-time editing and team features.',
        techStack: ['React', 'Supabase', 'TypeScript'],
        githubUrl: 'https://github.com/earlgreyhot1701D/le-voyage-main'
    },
    {
        id: 'office-keys',
        title: 'Office Keys',
        category: 'creative',
        description: 'Typing game designed to build digital fluency for court staff. First solo hack submission.',
        techStack: ['React', 'Game Design'],
        githubUrl: 'https://github.com/earlgreyhot1701D/office-keys'
    }
];
