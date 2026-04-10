// src/components/Gallery.js
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

export function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArt, setSelectedArt] = useState(null); // State for the Lightbox

  useEffect(() => {
    async function fetchArtworks() {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching artworks:', error);
      } else {
        setArtworks(data);
      }
      setLoading(false);
    }

    fetchArtworks();
  }, []);

  // Prevent scrolling when the lightbox is open
  useEffect(() => {
    if (selectedArt) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedArt]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5C3A93]"></div>
      </div>
    );
  }

  if (artworks.length === 0) {
    return <p className="text-center text-gray-500 py-10">No artworks uploaded yet.</p>;
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {artworks.map((art, index) => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer"
            onClick={() => setSelectedArt(art)} // Open Lightbox on Click
          >
            <div className="relative w-full h-auto">
              <img 
                src={art.image_url} 
                alt={art.title} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-6">
                <h3 className="text-white font-medium text-lg">{art.title}</h3>
                <p className="text-purple-200 text-sm">{art.category}</p>
                <p className="text-white/70 text-xs mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  Click to view
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Post-Gallery Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 flex flex-col items-center justify-center text-center space-y-6"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-[#2D1B42]">Ready to bring your idea to life?</h3>
        <motion.a 
          href="https://wa.me/94705264646?text=Hi%20Lakindi!%20I%20love%20your%20art%20and%20would%20like%20to%20request%20a%20commission."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-10 py-4 w-full sm:w-auto rounded-full font-medium text-white transition-all duration-300 block text-center shadow-lg"
        >
          <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-[#4A2E76] via-[#7B4BAE] to-[#4A2E76] bg-[length:200%_auto] animate-gradient group-hover:shadow-[0_0_25px_rgba(123,75,174,0.7)] transition-shadow duration-300"></span>
          <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
            Commission an Artwork
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </motion.a>
      </motion.div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArt(null)} // Close when clicking the background
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArt(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
                aria-label="Close"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* High-Res Image */}
              <img 
                src={selectedArt.image_url} 
                alt={selectedArt.title} 
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image Details */}
              <div className="mt-6 text-center">
                <h3 className="text-white font-medium text-2xl tracking-wide">{selectedArt.title}</h3>
                <p className="text-[#D8CBEB] text-sm mt-1 uppercase tracking-widest">{selectedArt.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}