import React from 'react';
import Navbar from './components/Navbar';
import AntigravityHero from './components/AntigravityHero';
import Stats from './components/Stats';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
        <AntigravityHero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
