import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t border-white/10 font-light tracking-widest uppercase text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 text-[10px] tracking-[0.25em]">
          
          {/* Left Column: Command System Status */}
          <div className="flex flex-col space-y-2 text-center md:text-left font-mono text-[#00FF66]">
            <p>
              System Status: <span className="animate-pulse">Nominal...</span>
            </p>
            <p className="text-white/40">
              Current Local Time: <span className="text-white/60">13:04 IST</span>
            </p>
          </div>

          {/* Right Column: Protocols & Actions */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-white/50">
            <Link 
              to="/protocols" 
              className="hover:text-white border border-transparent hover:border-white/20 px-3 py-1 transition-all"
            >
              [ Agency Protocols ]
            </Link>
            <Link 
              to="/frequency" 
              className="hover:text-white border border-transparent hover:border-white/20 px-3 py-1 transition-all"
            >
              [ Frequency Band ]
            </Link>
          </div>
        </div>

        {/* Copyright Note */}
        <div className="text-center mt-12 text-[9px] text-white/30 tracking-[0.3em]">
          © 2026 COSMOS TRAVEL INC. — ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}