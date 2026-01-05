import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-bg-main mesh-gradient relative overflow-x-hidden">
            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;
