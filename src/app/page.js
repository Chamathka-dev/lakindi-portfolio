// src/app/page.js
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Gallery } from '../components/Gallery';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen relative bg-gradient-to-b from-[#FAFAFA] to-[#EAE6F5] text-gray-800 font-sans selection:bg-[#5C3A93] selection:text-white">
      
      {/* Visible Artistic Sketchpad Pattern Overlay */}
      {/* Increased opacity and tightened the grid for a richer texture */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-multiply" 
        style={{ 
          backgroundImage: 'radial-gradient(#2D1B42 2px, transparent 2px)', 
          backgroundSize: '30px 30px' 
        }}
      ></div>

      {/* Main Content Wrapper (Ensures content sits above the pattern) */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="portfolio">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#3B2A50]">
            Selected Works
          </h2>
          <Gallery />
        </div>

        <Footer />
      </div>
    </main>
  );
}