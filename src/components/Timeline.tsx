import React from 'react';
import TimelineCard from './TimelineCard';
import { timelineProjects } from '../data/timeline';
import type { TimelineProject } from '../types/portfolio';

interface TimelineProps {
    onOpenDetails: (project: TimelineProject) => void;
    onOpenGenerator: (project: TimelineProject) => void;
}

const Timeline: React.FC<TimelineProps> = ({ onOpenDetails, onOpenGenerator }) => {
    return (
        <section className="section py-32 container mx-auto max-w-[1400px] px-8 bg-gradient-to-br from-bg-main to-innovation-purple/5">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">The Journey</h2>
            <p className="text-lg text-text-secondary mb-16 max-w-[600px]">
                Each milestone represents growth, learning, and shipped products. Explore the projects behind each moment.
            </p>

            <div className="relative">
                <div className="flex flex-col gap-12">
                    {timelineProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`flex flex-col gap-8 animate-fade-in-up`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-4 h-4 bg-bg-main border-4 border-tech-blue rounded-full shadow-[0_0_15px_rgba(14,165,233,0.2)] flex-shrink-0" />
                                <div className="text-sm font-semibold text-text-secondary uppercase tracking-widest min-w-[120px]">
                                    {project.date}
                                </div>
                            </div>
                            <TimelineCard
                                project={project}
                                onOpenDetails={() => onOpenDetails(project)}
                                onOpenGenerator={() => onOpenGenerator(project)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
