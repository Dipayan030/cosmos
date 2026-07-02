import React from 'react';

export default function BriefingSection() {
  return (
    <div className="p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 border-white/10 flex flex-col justify-between group">
      <div>
        <span className="text-[10px] tracking-[0.3em] text-white/40 font-mono block mb-12">
          02 / MISSION BRIEFING
        </span>
        
        <h3 className="text-xl sm:text-2xl tracking-[0.2em] uppercase mb-6 text-white font-normal leading-snug">
          Why choose COSMOS?
        </h3>
        
        <p className="text-xs sm:text-sm tracking-widest text-white/60 leading-relaxed font-light mb-12 max-w-md normal-case">
          Since the first commercial orbital settlement in 2088, we have guided over ten thousand explorers across the interstellar void. Safety is our baseline; transformation is our promise.
        </p>
      </div>

      {/* Engine Propulsion System Vector Placeholder Container */}
      <div className="w-full aspect-video flex items-center justify-center border border-white/5 bg-white/2 p-4 rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30 pointer-events-none"></div>
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" 
          alt="Starship thruster hardware machinery display sketch" 
          className="max-h-full max-w-full object-contain opacity-30 grayscale filter invert brightness-150 transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
}