import React from 'react';
import { Target, Zap, Clock, Code2 } from 'lucide-react';
import Counter from './Counter';

const stats = [
    { label: 'Jury Inquiries Automated', value: '150+', icon: Target, color: 'text-tech-blue' },
    { label: 'AI Build Sprints', value: '14', icon: Zap, color: 'text-innovation-purple' },
    { label: 'Promotion Path', value: '18 Mos', icon: Clock, color: 'text-achievement-gold' },
    { label: 'Hackathon Wins', value: '2', icon: Code2, color: 'text-energy-cyan' },
];

const StatsSection: React.FC = () => {
    return (
        <section className="py-24 container mx-auto px-8 relative z-10" role="region" aria-label="Key metrics">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="group p-10 glass-card border-glow rounded-3xl transition-all duration-500 hover:-translate-y-2 cinematic-shadow"
                    >
                        <div className="relative z-10">
                            <div className={`${stat.color} mb-8 transform group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon className="w-12 h-12" />
                            </div>
                            <div className="text-5xl font-black text-text-primary mb-3 tracking-tighter group-hover:energy-text transition-colors">
                                <Counter value={stat.value} />
                            </div>
                            <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] leading-tight">
                                {stat.label}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
