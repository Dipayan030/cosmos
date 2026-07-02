import React from 'react';
import heroBg from '../assets/hero.png'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col items-center text-center px-4">
      {/* Sub-heading text */}
      <h2 className="font-space-grotesk text-sm md:text-base tracking-[0.35em] text-white/90 uppercase mb-4 font-normal">
        So, you want to travel to space?
      </h2>
      
      {/* Main Title Heading */}
      <h1 className="font-syne text-6xl sm:text-7xl md:text-8xl font-bold tracking-[0.2em] uppercase select-none text-white pl-[0.2em]">
        Space
      </h1>

      {/* Hero Moon Image and Context Wrapper */}
      <div style={{ backgroundImage: `url(${heroBg})` }}  className="relative w-full max-w-4xl mt-6 aspect-2/1 overflow-hidden flex justify-center bg-contain bg-center">
        {/* Absolute Floating Description Block Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/40 to-transparent pt-12 pb-4 px-6 md:px-16 max-w-2xl mx-auto flex flex-col items-center">
          <p className="font-space-grotesk text-sm sm:text-sm tracking-widest text-white/70 leading-relaxed font-light mb-8 lowercase first-letter:uppercase">
            Let's face it; if you want to go to space, you might as well genuinely go to outer space and not hover around the edge of it. Well sit back, relax, and brace yourself. We'll give you a truly out-of-this-world experience!
          </p>
          
          <button className="font-space-grotesk border border-white/40 hover:border-white text-white tracking-[0.3em] uppercase text-xs px-10 py-4 bg-transparent transition-all duration-300 hover:bg-white hover:text-black">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}