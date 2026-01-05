import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-bg-secondary border-t border-border-color py-12">
            <div className="container mx-auto max-w-[1400px] px-8 text-center text-text-muted text-sm">
                <p>
                    Built with Gemini 3 & Antigravity, deployed to Google Cloud Run.
                    Participating in the New Year, New You Portfolio Challenge.
                    © 2026 La Shara Cordero.
                    Follow along at <a href="https://theforumfiles.substack.com/" target="_blank" rel="noopener noreferrer" className="text-tech-blue hover:text-energy-cyan transition-colors">The Forum Files</a>.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
