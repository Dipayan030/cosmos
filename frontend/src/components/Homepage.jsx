import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../assets/hero.png';
import SpecsSection from './SpecsSection';
import BriefingSection from './BriefingSection';

export default function CosmosHome() {
  return (
    <div className="bg-black text-white min-h-screen font-light overflow-hidden">
      <div style={{ backgroundImage: `url(${Hero})` }} className='h-screen min-w-screen flex flex-col justify-center items-center bg-contain bg-no-repeat bg-center gap-6'>
        <h1 className='font-space-grotesk text-xl lg:text-3xl text-center mb-8 lg:mb-18'>SO, YOU WANT TO TRAVEL TO SPACE?</h1>
        <h1 className='font-syne text-7xl lg:text-9xl text-center font-semibold'>SPACE</h1>
        <p className='font-space-grotesk text-sm lg:text-xl w-5/6 lg:w-2/5 text-center'>Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover around the edge of it. 
        Well sit back, relax, and brace yourself. We’ll give you a truly out-of-this world experience!
        </p>
        <Link to={'/destinations'}><button className='text-md lg:text-md h-12 w-32 lg:h-16 lg:w-42 mt-12 border border-white/70 text-white/90 font-space-grotesk hover:bg-white hover:text-black transition-colors transition-discrete ease-in-out duration-200'>Explore</button></Link>
      </div>
      {/* <div className='max-w-screen p-6 sm:p-12 lg:p-28'>
        <div className='size-full border-r border-b border-white/35 grid grid-cols-1 xl:grid-cols-6'>
          <div className='font-space-grotesk p-6 col-span-4 flex flex-col gap-6'>
            <h3 className='mb-12 text-xl text-white/35'><span className='font-space-mono'>01</span> / ENGINE SPECIFICATIONS</h3>
            <h2 className='font-syne font-semibold text-5xl'>CRUISE IN UNRIVALED LUXURY</h2>
            <p className='text-lg text-white/70 w-4/5'>Our fleet of Quantum-class starships redefines deep-space transit. Engineered with advanced artificial gravity matrices and radiation shielding, you won't just endure the cosmos—you will conquer it in absolute comfort.</p>
          </div>
        </div>
        <div><Link><img src="" alt="" /></Link></div>
      </div> */}
    </div>
  );
}