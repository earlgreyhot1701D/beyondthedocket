import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Swords } from 'lucide-react';
import SideQuestCard from './SideQuestCard';
import { sideQuests } from '../data/sideQuests';

const SideQuests: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const categories = ['court', 'hackathon', 'creative'] as const;

    return (
        <section className="section py-32 container mx-auto max-w-[1200px] px-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-innovation-purple/10 text-innovation-purple rounded-xl border border-innovation-purple/20">
                            <Swords className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Side Quests</h2>
                    </div>
                    <p className="text-lg text-text-secondary max-w-[600px]">
                        Smaller builds, experimental agents, and creative diversions. Validated through ship speed and technical curiosity.
                    </p>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn btn-secondary flex items-center gap-3 py-4 px-8 group self-start"
                >
                    {isOpen ? (
                        <>Hide Side Quests <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /></>
                    ) : (
                        <>View All Level-Ups <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" /></>
                    )}
                </button>
            </div>

            <div className={`grid grid-cols-1 gap-12 transition-all duration-700 overflow-hidden ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                {categories.map((category) => (
                    <div key={category} className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h3 className="text-sm font-bold text-innovation-purple uppercase tracking-[0.3em] flex-shrink-0">
                                {category === 'court' ? '⚖️ Court Tech' : category === 'hackathon' ? '🏆 Build Sprints' : '🎨 Creative'}
                            </h3>
                            <div className="h-px bg-innovation-purple/20 w-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sideQuests
                                .filter(q => q.category === category)
                                .map((quest) => (
                                    <SideQuestCard key={quest.id} quest={quest} />
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {!isOpen && (
                <div className="h-24 bg-gradient-to-t from-bg-main to-transparent -mt-24 relative z-10 pointer-events-none" />
            )}
        </section>
    );
};

export default SideQuests;
