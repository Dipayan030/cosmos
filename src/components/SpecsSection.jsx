import React from 'react';

export default function SpecsSection() {
  return (
    <div className="p-8 sm:p-12 lg:p-16 border-b border-white/10 lg:border-r lg:border-b-0 flex flex-col justify-between group">
      <div>
        <span className="text-[10px] tracking-[0.3em] text-white/40 font-mono block mb-12">
          01 / ENGINE SPECIFICATIONS
        </span>
        
        <h3 className="text-xl sm:text-2xl tracking-[0.2em] uppercase mb-6 text-white font-normal leading-snug">
          Cruise in unrivaled luxury
        </h3>
        
        <p className="text-xs sm:text-sm tracking-widest text-white/60 leading-relaxed font-light mb-12 max-w-md normal-case">
          Our fleet of Quantum-class starships redefines deep-space transit. Engineered with advanced artificial gravity matrices and radiation shielding, you won’t just endure the cosmos—you will conquer it in absolute comfort.
        </p>
      </div>

      {/* Blueprint Render Vector Placeholder Container */}
      <div className="w-full aspect-video flex items-center justify-center border border-white/5 bg-white/2 p-4 rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30 pointer-events-none"></div>
        <img 
          src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=600&auto=format&fit=crop" 
          alt="Space Shuttle schematic rendering frame" 
          className="max-h-full max-w-full object-contain opacity-30 grayscale filter invert brightness-200 contrast-200 transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
}