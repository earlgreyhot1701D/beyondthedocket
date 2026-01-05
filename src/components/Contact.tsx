import React from 'react';

const Contact: React.FC = () => {
    return (
        <section className="bg-gradient-to-br from-[#0ea5e9] to-[#8b5cf6] py-32 relative overflow-hidden">
            {/* Animated background accent */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent)] pointer-events-none" />

            <div className="container mx-auto max-w-[1400px] px-8 text-center text-bg-main relative z-10">
                <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                    Let's Build<br />What's Next
                </h2>
                <p className="text-xl md:text-2xl font-bold mb-12 max-w-[700px] mx-auto opacity-90 leading-relaxed">
                    Bridging the gap between civic duty and technological innovation. Open for scale-ups, hackathon wins, and high-impact partnerships.
                </p>

                <ul className="flex flex-wrap justify-center gap-6 mb-16 text-[10px] font-black uppercase tracking-[0.3em]">
                    <li className="bg-bg-main/5 px-4 py-2 rounded-full border border-bg-main/10">⚖️ Civic Tech</li>
                    <li className="bg-bg-main/5 px-4 py-2 rounded-full border border-bg-main/10">🏛️ Public AI</li>
                    <li className="bg-bg-main/5 px-4 py-2 rounded-full border border-bg-main/10">🏆 Build Sprints</li>
                </ul>

                <a
                    href="mailto:lsjcordero@gmail.com"
                    className="inline-block text-2xl md:text-4xl font-black bg-bg-main text-white px-12 py-6 rounded-full hover:scale-105 active:scale-95 transition-all mb-16 shadow-2xl focus-ring"
                    aria-label="Send me an email"
                >
                    lsjcordero@gmail.com
                </a>

                <div className="flex flex-wrap justify-center gap-12">
                    {[
                        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/la-shara-cordero-a0017a11/' },
                        { label: 'GitHub', url: 'https://github.com/earlgreyhot1701D?tab=repositories' },
                        { label: 'Blog', url: 'https://theforumfiles.substack.com/' }
                    ].map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-black text-[10px] uppercase tracking-[0.4em] border-b-2 border-bg-main/20 hover:border-bg-main transition-all focus-ring rounded"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
