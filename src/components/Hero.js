// src/components/Hero.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
  // We've moved from hardcoded inline styles to responsive Tailwind classes
  // This pushes them to the corners and scales them based on screen size
  const artworks = [
    { 
      src: '/art/sunset.jpg', 
      position: 'top-[2%] left-[2%] md:top-[5%] md:left-[4%]', 
      size: 'w-28 sm:w-40 md:w-56 lg:w-64',
      rotate: -6, delay: 0 
    },
    { 
      src: '/art/aiyaa-couple.jpg', 
      position: 'top-[5%] right-[2%] md:top-[8%] md:right-[4%]', 
      size: 'w-32 sm:w-44 md:w-60 lg:w-72',
      rotate: 5, delay: 2 
    },
    { 
      src: '/art/couple-illustration.jpg', 
      position: 'bottom-[5%] left-[2%] md:bottom-[8%] md:left-[5%]', 
      size: 'w-24 sm:w-36 md:w-52 lg:w-60',
      rotate: 4, delay: 3 
    },
    { 
      src: '/art/night-sky.jpg', 
      position: 'bottom-[8%] right-[2%] md:bottom-[12%] md:right-[4%]', 
      size: 'w-32 sm:w-48 md:w-64 lg:w-[280px]',
      rotate: -4, delay: 1.5 
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      
      {/* Soft Background Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#EAE6F5] rounded-full mix-blend-multiply filter blur-[90px] md:blur-[128px] opacity-60 z-0 pointer-events-none"></div>

      {/* Floating Artworks (Now visible on all screens!) */}
      <div className="absolute inset-0 z-0 pointer-events-none max-w-[100vw] overflow-hidden">
        {artworks.map((art, index) => (
          <motion.div
            key={index}
            className={`absolute shadow-2xl rounded-lg overflow-hidden border-2 md:border-4 border-white/50 backdrop-blur-sm ${art.position} ${art.size}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0], // Gentle up and down floating
              rotate: [art.rotate, art.rotate + 2, art.rotate] // Slight swaying
            }}
            transition={{ 
              opacity: { duration: 1, delay: art.delay * 0.2 },
              scale: { duration: 1, delay: art.delay * 0.2 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: art.delay },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: art.delay }
            }}
          >
            <Image 
              src={art.src} 
              alt="Lakindi Artwork" 
              width={400} 
              height={500} 
              className="w-full h-auto object-cover"
              priority={index < 2} // Prioritize loading the top two images
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content inside a subtle glassmorphism card */}
      {/* Reduced padding on mobile to allow more space for the artworks */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl relative z-10 bg-white/40 backdrop-blur-md px-6 py-10 sm:px-16 sm:py-16 rounded-3xl border border-white/50 shadow-[0_8px_32px_rgba(92,58,147,0.1)] mx-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-[#2D1B42] mb-4 md:mb-6 drop-shadow-sm">
          Dreamy Digital Portraits
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          Hi, I'm Lakindi Chathuprabha. I create vibrant, whimsical digital art and custom portraits designed to capture the magic in everyday moments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          {/* Primary Magical Button */}
          {/* Primary Magical Button (Now a WhatsApp Link) */}
          <motion.a 
            href="https://wa.me/94705264646?text=Hi%20Lakindi!%20I%20love%20your%20art%20and%20would%20like%20to%20request%20a%20commission."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-8 py-3 w-full sm:w-auto rounded-full font-medium text-white transition-all duration-300 block text-center"
          >
            <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-[#4A2E76] via-[#7B4BAE] to-[#4A2E76] bg-[length:200%_auto] animate-gradient group-hover:shadow-[0_0_20px_rgba(123,75,174,0.6)] transition-shadow duration-300"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              Commission Me
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.a>

          {/* Secondary Ethereal Button */}
          {/* Secondary Ethereal Button */}
          <motion.button 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.9)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 w-full sm:w-auto rounded-full font-medium text-[#5C3A93] border-2 border-[#D8CBEB] bg-white/60 backdrop-blur-sm hover:border-[#5C3A93] hover:shadow-[0_0_15px_rgba(216,203,235,0.8)] transition-all duration-300"
          >
            View Gallery
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}