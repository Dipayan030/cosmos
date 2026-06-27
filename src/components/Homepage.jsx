import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import SpecsSection from './SpecsSection';
import BriefingSection from './BriefingSection';

export default function CosmosHome() {
  return (
    <main className="bg-black text-white min-h-screen font-light overflow-hidden">
      {/* 1. Hero / Header Banner Section */}
      <Hero />

      {/* Grid Content Wrapper */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-x border-white/10">
          
          {/* 2. Engine Specifications Section */}
          <SpecsSection />

          {/* 3. Mission Briefing Section */}
          <BriefingSection />

        </div>
      </div>
    </main>
  );
}