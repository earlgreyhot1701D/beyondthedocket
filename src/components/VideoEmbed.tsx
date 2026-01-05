import React, { useState } from 'react';
import { Play, Video, Loader2, MonitorCheck } from 'lucide-react';

interface VideoEmbedProps {
    url: string | null;
    title: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ url, title }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isStarted, setIsStarted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const getEmbedUrl = (rawUrl: string | null) => {
        if (!rawUrl) return null;

        // YouTube handling
        if (rawUrl.includes('youtu.be/')) {
            const id = rawUrl.split('youtu.be/')[1].split('?')[0];
            return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&enablejsapi=1`;
        }
        if (rawUrl.includes('youtube.com/watch')) {
            const id = new URL(rawUrl).searchParams.get('v');
            return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&enablejsapi=1`;
        }

        // Loom handling
        if (rawUrl.includes('loom.com/share/')) {
            const id = rawUrl.split('loom.com/share/')[1].split('?')[0];
            return `https://www.loom.com/embed/${id}?autoplay=1&muted=1`;
        }

        return rawUrl;
    };

    const embedUrl = getEmbedUrl(url);

    if (!embedUrl) {
        return (
            <div className="relative w-full aspect-video bg-bg-tertiary/50 overflow-hidden group">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 bg-tech-blue/10 rounded-full flex items-center justify-center text-tech-blue mb-4 border border-tech-blue/20 group-hover:scale-110 transition-transform duration-500">
                        <Video className="w-8 h-8 opacity-50" />
                    </div>
                    <h4 className="text-sm font-bold text-text-primary mb-1 uppercase tracking-widest">Technical Preview</h4>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-energy-cyan animate-pulse" />
                        Recording in Progress
                    </p>
                </div>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>
        );
    }

    if (!isStarted) {
        return (
            <div
                ref={containerRef}
                className="relative w-full aspect-video bg-bg-tertiary overflow-hidden group cursor-pointer"
                onClick={() => setIsStarted(true)}
            >
                <div className="absolute inset-0 bg-tech-blue/5 group-hover:bg-tech-blue/10 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-bg-main/80 rounded-full flex items-center justify-center text-tech-blue border border-tech-blue/30 shadow-[0_0_30px_rgba(14,165,233,0.3)] group-hover:scale-110 transition-all duration-300">
                        <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                    <span className="mt-4 text-[10px] font-black text-tech-blue uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                        Watch Technical Walkthrough
                    </span>
                </div>
                <div className="absolute inset-0 border border-tech-blue/20 group-hover:border-tech-blue/40 transition-colors pointer-events-none" />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative w-full aspect-video bg-black overflow-hidden shadow-2xl">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-tertiary">
                    <Loader2 className="w-8 h-8 text-tech-blue animate-spin" />
                </div>
            )}
            {isVisible && (
                <iframe
                    src={embedUrl}
                    title={title}
                    className={`w-full h-full border-0 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                />
            )}

            {/* Live Indicator */}
            {!isLoading && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2 py-1 bg-black/60 rounded-md backdrop-blur-md border border-white/10 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
                        <MonitorCheck className="w-2 h-2" /> Technical Sync
                    </span>
                </div>
            )}
        </div>
    );
};

export default VideoEmbed;
