import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Target, Lightbulb, Zap, Rocket, ChevronRight } from 'lucide-react';
import type { TimelineProject } from '../types/portfolio';

interface ProjectDetailsProps {
    project: TimelineProject;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
    return (
        <div className="space-y-10 animate-fade-in-up pb-10">
            <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }: { children?: React.ReactNode }) => (
                            <h1 className="text-3xl font-black text-text-primary mb-8 mt-0 flex items-center gap-3 border-b border-border-color pb-4">
                                <Rocket className="w-8 h-8 text-tech-blue" />
                                {children}
                            </h1>
                        ),
                        h2: ({ children }: { children?: React.ReactNode }) => {
                            const text = String(children || '').toLowerCase();
                            let Icon = Zap;
                            if (text.includes('challenge') || text.includes('problem')) Icon = Target;
                            if (text.includes('built') || text.includes('solution')) Icon = Lightbulb;

                            return (
                                <h2 className="text-xl font-bold text-tech-blue mt-12 mb-6 flex items-center gap-2 uppercase tracking-widest">
                                    <Icon className="w-5 h-5 text-energy-cyan" />
                                    {children}
                                </h2>
                            );
                        },
                        p: ({ children }: { children?: React.ReactNode }) => (
                            <p className="text-text-secondary leading-[1.8] text-lg mb-6">
                                {children}
                            </p>
                        ),
                        li: ({ children }: { children?: React.ReactNode }) => (
                            <li className="flex items-start gap-3 text-text-secondary text-lg mb-4 list-none">
                                <ChevronRight className="w-5 h-5 text-tech-blue mt-1 shrink-0" />
                                <span>{children}</span>
                            </li>
                        ),
                        ul: ({ children }: { children?: React.ReactNode }) => (
                            <ul className="pl-0 my-8 space-y-2">
                                {children}
                            </ul>
                        ),
                        strong: ({ children }: { children?: React.ReactNode }) => (
                            <strong className="text-energy-cyan font-bold">
                                {children}
                            </strong>
                        ),
                    }}
                >
                    {project.fullCaseStudy || 'Detailed case study coming soon...'}
                </ReactMarkdown>
            </div>

            <div className="flex flex-col gap-6 pt-10 border-t border-border-color bg-bg-tertiary/20 -mx-8 px-8 pb-4">
                <h4 className="text-[10px] font-black text-tech-blue uppercase tracking-[0.3em]">Core Technologies</h4>
                <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-bg-tertiary border border-border-color text-text-secondary rounded-full hover:border-tech-blue hover:text-text-primary transition-all">
                            <span className="w-1.5 h-1.5 rounded-full bg-tech-blue" />
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
