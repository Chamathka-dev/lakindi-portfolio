// src/components/Navbar.js
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-purple-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - Matching your updated screenshot */}
          <Link href="/" className="font-bold text-xl tracking-wide uppercase">
            <span className="text-[#2D1B42]">LAKINDI</span> <span className="text-[#5C3A93]">CHATHUPRABHA</span>
          </Link>
          
          {/* Social Media Icons Menu */}
          <div className="flex space-x-2 sm:space-x-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61585880361821" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-[#5C3A93] transition-colors p-2 hover:bg-purple-50 rounded-full"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/lakindii_c" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-[#5C3A93] transition-colors p-2 hover:bg-purple-50 rounded-full"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}