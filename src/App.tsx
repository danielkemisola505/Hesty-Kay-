import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { PlatformEstimator } from './components/PlatformEstimator';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Skills } from './components/Skills';
import { Testimonials } from './components/Testimonials';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ChatBot } from './components/ChatBot';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactSubject, setContactSubject] = useState<string>('');

  const scrollToContact = (subject?: string) => {
    if (subject) {
      setContactSubject(subject);
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <CustomCursor />
      <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-yellow-400 selection:bg-yellow-400 selection:text-black transition-colors duration-300">
        {/* Sticky Header Navigation */}
        <Navbar onContactClick={() => scrollToContact()} />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section */}
          <Hero
            onPortfolioClick={scrollToPortfolio}
            onContactClick={() => scrollToContact()}
          />

          {/* About Me Section */}
          <About />

          {/* Services Section */}
          <Services
            onInquireService={(title) => scrollToContact(`Inquiry regarding: ${title}`)}
          />

          {/* Interactive Platform Estimator Widget */}
          <PlatformEstimator
            onSelectEstimate={(details) => scrollToContact(details)}
          />

          {/* Featured Projects Showcase */}
          <Projects
            onSelectProject={(project) => setSelectedProject(project)}
          />

          {/* Technical Skills & Proficiency */}
          <Skills />

          {/* Testimonials & Reviews */}
          <Testimonials />

          {/* Process & Workflow */}
          <Process />

          {/* Contact Section */}
          <Contact initialSubject={contactSubject} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Case Study Lightbox Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onContactClick={() => scrollToContact(selectedProject ? `Project Inquiry: ${selectedProject.title}` : '')}
        />

        {/* AI Studio Chatbot Assistant */}
        <ChatBot onContactClick={(subject) => scrollToContact(subject)} />
      </div>
    </ThemeProvider>
  );
}
