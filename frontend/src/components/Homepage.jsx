import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../assets/hero.png';
import SpecsSection from './SpecsSection';
import BriefingSection from './BriefingSection';
import Rocket from '../assets/rocket.png';
import Deck from '../assets/deck.png'
import FadeContent from './react-bits/FadeContent';
import AnimatedContent from './react-bits/AnimatedContent';
import CountUp from './react-bits/CountUp';

export default function CosmosHome() {
  return (
    <div className="bg-black text-white min-h-screen font-light overflow-hidden">
      <div style={{ backgroundImage: `url(${Hero})` }} className='h-screen min-w-screen flex flex-col justify-center items-center bg-contain bg-no-repeat bg-center gap-6'>
        <AnimatedContent
                distance={100}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={0}
                className='flex flex-col justify-center items-center gap-6'
                >
          <h1 className='font-space-grotesk text-xl lg:text-3xl text-center mb-8 lg:mb-18'>SO, YOU WANT TO TRAVEL TO SPACE?</h1>
          <h1 className='font-syne text-7xl lg:text-9xl text-center font-semibold'>SPACE</h1>
          <p className='font-space-grotesk text-sm lg:text-xl w-5/6 lg:w-2/5 text-center'>Let's face it; if you want to go to space, you might as well genuinely go to outer space and not hover around the edge of it. 
          Well sit back, relax, and brace yourself. We'll give you a truly out-of-this world experience!
          </p>
          <Link to={'/destinations'}><button className='text-md lg:text-md h-14 w-36 lg:h-16 lg:w-42 mt-12 border border-white/50 text-white/90 font-space-grotesk hover:bg-white hover:text-black transition-colors transition-discrete ease-in-out duration-200'>Explore</button></Link>
        </AnimatedContent>
      </div>
      <div className='max-w-screen p-6 sm:p-12 lg:p-28'>
        <div className='size-full border-white/35 border-b border-r grid grid-cols-1 xl:grid-cols-6'>
          <div className='border-t border-l border-white/35 font-space-grotesk p-6 lg:p-12 col-span-4 flex flex-col gap-6 lg:justify-between'>
            <AnimatedContent
                distance={100}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={0}
                >
              <h3 className='mb-12 text-lg lg:text-xl text-white/35'><span className='font-space-mono'>01</span> / ENGINE SPECIFICATIONS</h3>
            </AnimatedContent>
            <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} className='flex flex-col gap-6'>
              <h2 className='font-syne font-semibold text-4xl lg:text-5xl'>CRUISE IN UNRIVALED LUXURY</h2>
              <p className='text-md lg:text-lg text-white/70 lg:w-4/5'>Our fleet of Quantum-class starships redefines deep-space transit. Engineered with advanced artificial gravity matrices and radiation shielding, you won't just endure the cosmos—you will conquer it in absolute comfort.</p>
            </FadeContent>
          </div>
          <div className='col-span-2 border-t border-l border-white/35 flex justify-center'>
            <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
              <Link><img src={Rocket} alt="" className='h-150 object-contain'/></Link>
            </FadeContent>   
          </div>
          <div className=' border-t border-l border-white/35 font-space-grotesk p-6 lg:p-12 col-span-4 flex flex-col gap-6 lg:justify-between'>
            <AnimatedContent
                distance={100}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={0}
                >
              <h3 className='mb-12 text-lg lg:text-xl text-white/35'><span className='font-space-mono'>02</span> / MISSION BRIEFING</h3>
            </AnimatedContent>
            <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} className='flex flex-col gap-6'>
              <h2 className='font-syne font-semibold text-4xl lg:text-5xl'>Why choose COSMOS?</h2>
              <p className='text-md lg:text-lg text-white/70 lg:w-4/5'>Since the first commercial orbital settlement in 2088, we have guided over ten thousand explorers across the interstellar void. Safety is our baseline; transformation is our promise.</p>
            </FadeContent>
          </div>
          <div className='col-span-2 border-t border-l border-white/35 flex lg:justify-center p-3'>
            <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
              <Link><img src={Deck} alt="" className='h-100 object-cover'/></Link>
            </FadeContent>
          </div>
          <div className='col-span-4 xl:col-span-6 py-24 lg:py-34 border-white/35 border-t border-r border-l flex flex-col xl:flex xl:flex-row xl:justify-center items-center gap-20 xl:gap-24'>
            <span className='text-center'>
              <CountUp
                  from={0}
                  to={12000}
                  separator=","
                  direction="up"
                  duration={0.05}
                  className="count-up-text"
                  delay={0}
                  className='text-5xl font-space-mono'
              /> <span className='text-5xl font-space-mono'> +</span>
              <p className='text-lg text-white/50 font-space-grotesk mt-5'>Spacers Launched</p>
            </span>
            <span className='text-center'>
              <CountUp
                  from={0}
                  to={0}
                  separator=","
                  direction="up"
                  duration={0.05}
                  className="count-up-text"
                  delay={0}
                  className='text-5xl font-space-mono'
              />
              <p className='text-lg text-white/50 font-space-grotesk mt-5'>Critical Hull Failures</p>
            </span>
            <span className='text-center'>
              <CountUp
                  from={0}
                  to={99.8}
                  separator=","
                  direction="up"
                  duration={0.05}
                  className="count-up-text"
                  delay={0}
                  className='text-5xl font-space-mono'
              /> <span className='text-5xl font-space-mono'>%</span>
              <p className='text-lg text-white/50 font-space-grotesk mt-5'>Orbital Precision Rate</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}