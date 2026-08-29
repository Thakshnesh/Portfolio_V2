import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { NetflixAutoLoader } from './components/ui/NetflixAutoLoader';
import { CircuitMatrix3D } from './components/3d/CircuitMatrix3D';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { EducationSection } from './components/sections/EducationSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { AIChatSection } from './components/sections/AIChatSection';
import { ContactSection } from './components/sections/ContactSection';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Guarantee page stays at top on load and prevent hash jumping to chatbot
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleEnterPortfolio = () => {
    setIsLoading(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <ThemeProvider>
      <AudioProvider>
        {/* Netflix Style Auto Entry Loader */}
        {isLoading && <NetflixAutoLoader onComplete={handleEnterPortfolio} />}

        <div className="relative min-h-screen bg-[#060a14] text-slate-100 overflow-x-hidden selection:bg-blue-600 selection:text-white">
          {/* 3D WebGL Background Canvas */}
          <CircuitMatrix3D />

          {/* Fixed Glassmorphism Navbar */}
          <Navbar />

          {/* Main Portfolio Sections */}
          <main className="relative z-10 space-y-8">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <EducationSection />
            <AchievementsSection />
            <AIChatSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </AudioProvider>
    </ThemeProvider>
  );
};

export default App;
