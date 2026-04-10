// src/components/Footer.js

export function Footer() {
  return (
    <footer className="w-full border-t border-purple-200/50 bg-white/30 backdrop-blur-md mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright */}
        <div className="text-gray-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} Lakindi Chathuprabha. All rights reserved.
        </div>

        {/* Social Links */}
        <div className="flex space-x-6">
          <a 
            href="https://www.facebook.com/profile.php?id=61585880361821" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-[#5C3A93] transition-colors p-2 hover:bg-white/50 rounded-full"
            aria-label="Facebook"
          >
            {/* Facebook Raw SVG */}
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a 
            href="https://www.instagram.com/lakindii_c" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-[#5C3A93] transition-colors p-2 hover:bg-white/50 rounded-full"
            aria-label="Instagram"
          >
            {/* Instagram Raw SVG */}
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
        </div>

        {/* Developer Credit */}
        <div className="text-gray-500 text-sm font-medium">
          Developed by <span className="font-bold text-[#5C3A93] tracking-wide">Chamathka Addarage</span>
        </div>

      </div>
    </footer>
  );
}