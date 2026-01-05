export interface TimelineProject {
    id: string;
    date: string;
    title: string;
    subtitle: string;
    description: string;
    image?: string;
    videoUrl?: string | null;
    stats: Array<{ label: string; value: string }>;
    techStack: string[];
    cta: Array<{ label: string; action: string }>;
    githubUrl?: string; // Centralized repository URL
    fullCaseStudy?: string;
    badge?: {
        text: string;
        type: 'winner' | 'tech';
    };
}

export interface SideQuest {
    id: string;
    title: string;
    category: 'court' | 'hackathon' | 'creative';
    description: string;
    techStack: string[];
    githubUrl: string;
}
