import React, { useState, useEffect } from 'react';
import type { TimelineProject } from '../types/portfolio';
import { Star, GitFork, Calendar, Github } from 'lucide-react';
import VideoEmbed from './VideoEmbed';

interface TimelineCardProps {
    project: TimelineProject;
    onOpenDetails: () => void;
    onOpenGenerator: () => void;
}

interface GithubMetadata {
    stars: number;
    language: string;
    updatedAt: string;
    forks: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ project, onOpenDetails, onOpenGenerator }) => {
    const [githubData, setGithubData] = useState<GithubMetadata | null>(null);
    const [isLoadingStats, setIsLoadingStats] = useState(false);

    useEffect(() => {
        const fetchGithubMeta = async () => {
            const url = project.githubUrl;

            if (!url || url.includes('example.com') || url.includes('example/')) return;

            setIsLoadingStats(true);
            try {
                const response = await fetch(`/api/github/metadata?url=${encodeURIComponent(url)}`);
                if (response.ok) {
                    const data = await response.json();
                    setGithubData(data);
                }
            } catch (err) {
                console.error('Failed to fetch github data:', err);
            } finally {
                setIsLoadingStats(false);
            }
        };

        fetchGithubMeta();
    }, [project.id]);

    return (
        <div
            className="timeline-content glass-card border-glow rounded-2xl p-8 transition-all duration-500 cursor-pointer relative hover:-translate-y-2 group cinematic-shadow"
            role="article"
            aria-labelledby={`title-${project.id}`}
        >
            <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                <div className="flex-1 min-w-0">
                    <div id={`title-${project.id}`} className="timeline-title text-4xl font-black text-text-primary tracking-tight group-hover:energy-text transition-colors">
                        {project.title}
                    </div>
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-[10px] font-bold text-tech-blue mt-2 opacity-80 uppercase tracking-widest leading-none hover:text-energy-cyan transition-colors w-fit relative z-20"
                        >
                            <Github className="w-3 h-3" />
                            <span className="break-all hover:underline decoration-tech-blue/30 underline-offset-4">{project.githubUrl.replace('https://github.com/', '')}</span>
                        </a>
                    )}
                </div>

                {isLoadingStats ? (
                    <div className="absolute top-4 right-4 animate-pulse flex space-x-2 items-center text-[10px] text-tech-blue font-bold px-3 py-1 bg-tech-blue/5 rounded-full border border-tech-blue/20 backdrop-blur-sm z-10">
                        <div className="w-1.5 h-1.5 bg-tech-blue rounded-full animate-ping" />
                        <span>Syncing GitHub...</span>
                    </div>
                ) : githubData ? (
                    <div className="absolute top-4 right-4 flex items-center gap-3 text-[10px] font-bold bg-bg-main/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-tech-blue/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] z-10 translate-y-0 hover:-translate-y-0.5 transition-transform">
                        <div className="flex items-center gap-1 text-tech-blue">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 shadow-[0_0_5px_rgba(74,222,128,0.5)]" />
                            LIVE
                        </div>
                        <div className="w-px h-3 bg-border-color" />
                        <div className="flex items-center gap-1.5 text-achievement-gold">
                            <Star className="w-3 h-3" /> {githubData.stars}
                        </div>
                        <div className="flex items-center gap-1.5 text-tech-blue">
                            <GitFork className="w-3 h-3" /> {githubData.forks}
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="timeline-subtitle text-tech-blue font-semibold mb-6 flex items-center gap-3">
                {project.subtitle}
                {project.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${project.badge.type === 'winner'
                        ? 'bg-achievement-gold/10 text-achievement-gold border-achievement-gold/30'
                        : 'bg-tech-blue/10 text-tech-blue border-tech-blue/30'
                        }`}>
                        {project.badge.text}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-6">
                    <p className="timeline-text text-text-secondary leading-relaxed text-lg">
                        {project.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4" role="list">
                        {project.stats.map((stat: { label: string; value: string }, i: number) => (
                            <div key={i} className="stat-mini bg-white/5 p-4 rounded-xl border border-white/5 group-hover:border-tech-blue/20 transition-all duration-500" role="listitem">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1 group-hover:energy-text transition-all">
                                    {stat.label}
                                </div>
                                <div className="text-2xl font-black text-text-primary tracking-tight">
                                    {stat.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech: string, i: number) => (
                            <span key={i} className="tech-tag text-xs px-3 py-1 bg-bg-tertiary text-text-secondary rounded border border-border-color">
                                {tech}
                            </span>
                        ))}
                        {githubData?.language && (
                            <span className="tech-tag text-xs px-3 py-1 bg-innovation-purple/10 text-innovation-purple rounded border border-innovation-purple/30">
                                {githubData.language}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {project.cta.map((cta: { label: string; action: string }, i: number) => (
                            <button
                                key={i}
                                onClick={cta.action === 'openDetailsModal' ? onOpenDetails : onOpenGenerator}
                                className={cta.label.includes('Details') ? 'btn btn-secondary' : 'btn btn-primary'}
                            >
                                {cta.label}
                            </button>
                        ))}
                    </div>

                    {githubData && (
                        <div className="flex items-center gap-2 text-[10px] text-text-muted mt-2 uppercase tracking-tighter">
                            <Calendar className="w-3 h-3" /> Last Active: {new Date(githubData.updatedAt).toLocaleDateString()}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-5 bg-bg-tertiary rounded-xl border border-border-color overflow-hidden group shadow-inner self-start">
                    <VideoEmbed url={project.videoUrl || null} title={project.title} />
                </div>
            </div>
        </div >
    );
};

export default TimelineCard;
