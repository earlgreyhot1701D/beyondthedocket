import React from 'react';
import type { SideQuest } from '../types/portfolio';

interface SideQuestCardProps {
    quest: SideQuest;
}

const SideQuestCard: React.FC<SideQuestCardProps> = ({ quest }) => {
    return (
        <div
            className="glass-card border-glow rounded-xl p-6 transition-all duration-500 hover:-translate-y-2 group cinematic-shadow flex flex-col h-full"
            role="article"
            aria-labelledby={`side-title-${quest.id}`}
        >
            <h4 id={`side-title-${quest.id}`} className="text-xl font-black mb-3 text-text-primary tracking-tight group-hover:energy-text transition-colors">
                {quest.title}
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-grow">
                {quest.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
                {quest.techStack.map((tech, i) => (
                    <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 font-black bg-white/5 text-innovation-purple rounded border border-innovation-purple/20 uppercase tracking-widest"
                    >
                        {tech}
                    </span>
                ))}
            </div>
            <a
                href={quest.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-tech-blue font-black uppercase tracking-[0.2em] hover:text-energy-cyan inline-flex items-center gap-2 group/link transition-colors focus-ring rounded"
                aria-label={`View ${quest.title} on GitHub`}
            >
                Source Code
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </a>
        </div>
    );
};

export default SideQuestCard;
