import React, { useState } from 'react';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import StatsSection from '../components/StatsSection';
import SideQuests from '../components/SideQuests';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import ProjectDetails from '../components/ProjectDetails';
import CaseStudyGenerator from '../components/CaseStudyGenerator';
import type { TimelineProject } from '../types/portfolio';

const Home: React.FC = () => {
    const [modalType, setModalType] = useState<'details' | 'generator' | null>(null);
    const [selectedProject, setSelectedProject] = useState<TimelineProject | null>(null);

    const openDetails = (project: TimelineProject) => {
        setSelectedProject(project);
        setModalType('details');
    };

    const openGenerator = (project: TimelineProject) => {
        setSelectedProject(project);
        setModalType('generator');
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedProject(null);
    };

    return (
        <>
            <Hero />
            <StatsSection />
            <Timeline onOpenDetails={openDetails} onOpenGenerator={openGenerator} />
            <SideQuests />
            <Contact />
            <Footer />

            <Modal
                isOpen={!!modalType}
                onClose={closeModal}
                title={
                    modalType === 'details'
                        ? `${selectedProject?.title} - Full Case Study`
                        : `✨ Generate Case Study: ${selectedProject?.title}`
                }
            >
                {modalType === 'details' && selectedProject && (
                    <ProjectDetails project={selectedProject} />
                )}
                {modalType === 'generator' && selectedProject && (
                    <CaseStudyGenerator project={selectedProject} />
                )}
            </Modal>
        </>
    );
};

export default Home;
