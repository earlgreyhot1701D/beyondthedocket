import React from 'react';

const Hero: React.FC = () => {
    const metrics = [
        { number: '6', label: 'Months to Impact' },
        { number: '14+', label: 'Projects Shipped' },
        { number: '2x', label: 'Hackathon Winner' },
        { number: '∞', label: 'More to Come' }
    ];

    return (
        <section className="relative min-h-[95vh] flex items-center bg-gradient-to-b from-bg-main to-bg-secondary overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[-30%] right-[-20%] w-[60vw] h-[60vw] bg-innovation-purple rounded-full blur-[150px] opacity-5 animate-pulse-glow z-0" />

            <div className="container mx-auto max-w-[1400px] px-8 relative z-10 py-16">
                <div className="hero-kicker text-tech-blue uppercase tracking-[0.3em] font-black text-[10px] mb-8 inline-flex items-center gap-3 px-4 py-2 bg-tech-blue/5 border border-tech-blue/20 rounded-full animate-fade-in-down energy-text" aria-label="Professional background">
                    <span className="w-2 h-2 rounded-full bg-tech-blue animate-pulse" />
                    From Jury Services to AI Builder
                </div>

                <h1 className="hero-headline text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-10 tracking-tighter hero-gradient-text drop-shadow-2xl">
                    Six Months.<br />14+ Projects.<br />Two Wins.
                </h1>

                <p className="hero-subhead text-lg md:text-xl lg:text-2xl font-light text-text-secondary mb-12 max-w-[700px] border-l border-tech-blue pl-6">
                    Judicial Services Manager turned AI builder. Shipped production-ready applications using Claude, Gemini, and AWS. Now building in public to demonstrate the velocity of learning.
                </p>

                <div className="hero-metrics flex flex-wrap gap-12 mt-20 pt-10 border-t border-white/5 max-w-[800px]">
                    {metrics.map((metric, index) => (
                        <div key={index} className="metric text-left group cursor-default">
                            <div className="metric-number text-5xl md:text-7xl font-black mb-1 metric-number-gradient group-hover:scale-110 transition-transform duration-500 origin-left drop-shadow-lg">
                                {metric.number}
                            </div>
                            <div className="metric-label text-[10px] font-black text-text-muted uppercase tracking-[0.2em] energy-text">
                                {metric.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
