import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Building2, Clipboard, Download, RotateCcw } from 'lucide-react';
import type { TimelineProject } from '../types/portfolio';

interface CaseStudyGeneratorProps {
    project?: TimelineProject;
}

type Mode = 'blog' | 'professional';

const CaseStudyGenerator: React.FC<CaseStudyGeneratorProps> = ({ project }) => {
    const [mode, setMode] = useState<Mode>('professional');
    const [formData, setFormData] = useState({
        projectName: project?.title || '',
        reportTitle: project?.title || '',
        githubUrl: '',
        problem: '',
        decisions: '',
        impact: '', // for blog
        solution: '', // for professional
        technical: '', // for professional
        results: '', // for professional
    });

    // Auto-fill logic
    useEffect(() => {
        if (project) {
            const githubUrl = project.githubUrl || '';

            // Helper to strip HTML tags for simple text areas
            const stripHtml = (html: string) => {
                const tmp = document.createElement("DIV");
                tmp.innerHTML = html;
                return tmp.textContent || tmp.innerText || "";
            };

            const fullContent = project.fullCaseStudy ? stripHtml(project.fullCaseStudy) : '';

            setFormData(prev => ({
                ...prev,
                projectName: project.title,
                reportTitle: project.title,
                githubUrl: githubUrl,
                problem: project.description,
                decisions: 'Built using ' + project.techStack.join(', '),
                impact: 'Successfully delivered ' + project.subtitle,
                solution: fullContent.substring(0, 300) + '...', // Grab first chunk as summary
                technical: project.techStack.join(', '),
                results: project.stats.map(s => `${s.label}: ${s.value}`).join(', ')
            }));
        }
    }, [project]);

    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [showAdvanced, setShowAdvanced] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setError(null);

        try {
            const response = await fetch('/api/generate-case-study', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    mode
                }),
            });

            if (!response.ok) {
                const clonedResponse = response.clone();
                let errorMsg = 'Failed to generate content';
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.details || errorData.error || errorMsg;
                } catch (e) {
                    const text = await clonedResponse.text();
                    errorMsg = text || errorMsg;
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            setGeneratedContent(data.content);
        } catch (err: any) {
            console.error('Generation error:', err);
            setError(err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        if (generatedContent) {
            navigator.clipboard.writeText(generatedContent);
            alert('Copied to clipboard!');
        }
    };

    const downloadMarkdown = () => {
        if (generatedContent) {
            const element = document.createElement('a');
            const file = new Blob([generatedContent], { type: 'text/markdown' });
            element.href = URL.createObjectURL(file);
            element.download = `${formData.projectName.toLowerCase().replace(/\s+/g, '-')}-case-study.md`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    };

    if (generatedContent) {
        return (
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-text-primary">Generated {mode === 'blog' ? 'Blog Post' : 'Case Study'}</h3>
                    <div className="flex gap-2">
                        <button onClick={copyToClipboard} className="p-2 hover:bg-white/5 rounded-lg text-tech-blue title='Copy'">
                            <Clipboard className="w-5 h-5" />
                        </button>
                        <button onClick={downloadMarkdown} className="p-2 hover:bg-white/5 rounded-lg text-tech-blue title='Download'">
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="prose prose-invert max-w-none bg-bg-tertiary/50 p-8 rounded-xl border border-border-color shadow-inner">
                    <pre className="whitespace-pre-wrap font-inter text-text-secondary text-base leading-relaxed">
                        {generatedContent}
                    </pre>
                </div>
                <div className="flex justify-center pt-4">
                    <button onClick={() => setGeneratedContent(null)} className="btn btn-secondary flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" /> Start Over
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-bg-tertiary/30 p-8 rounded-2xl border border-border-color flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-tech-blue/10 rounded-full flex items-center justify-center text-tech-blue mb-6 border border-tech-blue/20">
                    <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Automated Case Study Generator</h3>

                {formData.githubUrl && (
                    <div className="flex items-center gap-2 text-[10px] font-bold text-tech-blue bg-tech-blue/5 px-3 py-1 rounded-full border border-tech-blue/20 mb-6 w-max">
                        <Sparkles className="w-3 h-3 text-energy-cyan" />
                        Source: {formData.githubUrl.replace('https://github.com/', '')}
                    </div>
                )}

                <p className="text-text-secondary max-w-[500px] mb-8">
                    Choose your desired output style and let Gemini transform your project data into a professional {mode === 'blog' ? 'narrative' : 'report'}.
                </p>

                <div className="flex bg-bg-tertiary p-1.5 rounded-2xl border border-border-color mb-8">
                    <button
                        onClick={() => setMode('blog')}
                        className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'blog' ? 'bg-tech-blue text-bg-main shadow-[0_0_20px_rgba(14,165,233,0.3)]' : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        <BookOpen className="w-5 h-5" /> Blog Style
                    </button>
                    <button
                        onClick={() => setMode('professional')}
                        className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'professional' ? 'bg-tech-blue text-bg-main shadow-[0_0_20px_rgba(14,165,233,0.3)]' : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        <Building2 className="w-5 h-5" /> Professional
                    </button>
                </div>

                {/* Custom Title Input */}
                <div className="w-full max-w-[500px] mb-8 text-left space-y-2">
                    <label className="text-[10px] font-bold text-tech-blue uppercase tracking-[0.2em] ml-1">Report Title / Headline</label>
                    <input
                        name="reportTitle"
                        value={formData.reportTitle}
                        onChange={handleInputChange}
                        placeholder="Enter a catchy title..."
                        className="w-full bg-bg-tertiary/50 border border-border-color rounded-xl px-4 py-3 text-text-primary focus:border-tech-blue outline-none transition-all text-center font-bold"
                    />
                    <p className="text-[10px] text-text-muted text-center italic mt-1">Leave as is for a project-based title, or get creative!</p>
                </div>

                <div className="w-full max-w-[400px]">
                    <button
                        onClick={handleSubmit}
                        disabled={isGenerating}
                        className={`btn btn-primary w-full py-4 text-lg justify-center shadow-xl ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-6 h-6 border-3 border-bg-main border-t-transparent rounded-full animate-spin" />
                                Analyzing project data...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-6 h-6" />
                                Generate Report Now
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="mt-6 text-xs font-bold text-text-muted hover:text-tech-blue uppercase tracking-widest transition-colors block mx-auto"
                    >
                        {showAdvanced ? 'Hide Advanced Data' : 'Review/Edit Input Data'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3 animate-pulse">
                    <span>⚠️</span>
                    <div>
                        <p className="font-bold">Error Encountered</p>
                        <p className="opacity-80">{error}</p>
                        {error.includes('{') || error.length > 50 ? null : (
                            <p className="text-[10px] opacity-60 mt-1 font-mono break-all">{error}</p>
                        )}
                    </div>
                </div>
            )}

            {showAdvanced && (
                <div className="animate-fade-in-up space-y-6 pt-6 border-t border-border-color">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-1">
                            <label className="text-xs font-bold text-tech-blue uppercase tracking-widest">Project Name</label>
                            <input
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleInputChange}
                                className="w-full bg-bg-tertiary border border-border-color rounded-lg px-4 py-3 text-text-primary focus:border-tech-blue outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2 md:col-span-1">
                            <label className="text-xs font-bold text-tech-blue uppercase tracking-widest">GitHub URL</label>
                            <input
                                name="githubUrl"
                                type="url"
                                value={formData.githubUrl}
                                onChange={handleInputChange}
                                placeholder="https://github.com/..."
                                className="w-full bg-bg-tertiary border border-border-color rounded-lg px-4 py-3 text-text-primary focus:border-tech-blue outline-none transition-all"
                                required
                            />
                        </div>

                        {mode === 'blog' ? (
                            <>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-tech-blue uppercase tracking-widest">What Problem Did It Solve?</label>
                                    <textarea
                                        name="problem"
                                        value={formData.problem}
                                        onChange={handleInputChange}
                                        className="w-full bg-bg-tertiary border border-border-color rounded-lg px-4 py-3 text-text-primary focus:border-tech-blue outline-none transition-all min-h-[100px]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-tech-blue uppercase tracking-widest">Key Technical Decisions</label>
                                    <textarea
                                        name="decisions"
                                        value={formData.decisions}
                                        onChange={handleInputChange}
                                        className="w-full bg-bg-tertiary border border-border-color rounded-lg px-4 py-3 text-text-primary focus:border-tech-blue outline-none transition-all min-h-[100px]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-tech-blue uppercase tracking-widest">Impact & Learnings</label>
                                    <textarea
                                        name="impact"
                                        value={formData.impact}
                                        onChange={handleInputChange}
                                        className="w-full bg-bg-tertiary border border-border-color rounded-lg px-4 py-3 text-text-primary focus:border-tech-blue outline-none transition-all min-h-[100px]"
                                        required
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-tech-blue uppercase tracking-widest">Problem/Challenge</label>
                                    <textarea
                                        name="problem"
                                        value={formData.problem}
                                        onChange={handleInputChange}
                                        className="w-full bg-bg-tertiary border border-border-color rounded-lg px-4 py-3 text-text-primary focus:border-tech-blue outline-none transition-all min-h-[80px]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-tech-blue uppercase tracking-widest">Solution Overview</label>
                                    <textarea
                                        name="solution"
                                        value={formData.solution}
                                        onChange={handleInputChange}
                                        className="w-full bg-bg-tertiary border border-border-color rounded-lg px-4 py-3 text-text-primary focus:border-tech-blue outline-none transition-all min-h-[80px]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-tech-blue uppercase tracking-widest">Technical Highlights</label>
                                    <textarea
                                        name="technical"
                                        value={formData.technical}
                                        onChange={handleInputChange}
                                        className="w-full bg-bg-tertiary border border-border-color rounded-lg px-4 py-3 text-text-primary focus:border-tech-blue outline-none transition-all min-h-[80px]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-tech-blue uppercase tracking-widest">Impact & Results</label>
                                    <textarea
                                        name="results"
                                        value={formData.results}
                                        onChange={handleInputChange}
                                        className="w-full bg-bg-tertiary border border-border-color rounded-lg px-4 py-3 text-text-primary focus:border-tech-blue outline-none transition-all min-h-[80px]"
                                        required
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaseStudyGenerator;
