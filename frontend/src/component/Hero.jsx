import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowRightLine, RiSparklingFill } from 'react-icons/ri';

function Hero({ heroData, heroCount, setHeroCount }) {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 z-20 max-w-4xl">
      
      {/* Promotional Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider w-fit mb-4 animate-in fade-in slide-in-from-left duration-300">
        <RiSparklingFill className="text-cyan-400 animate-spin" />
        <span>New Season Collection</span>
      </div>

      {/* Hero Headline */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-lg">
          {heroData?.text1}
        </h1>
        <p className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow">
          {heroData?.text2}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-4 mt-8">
        <button
          onClick={() => navigate('/collection')}
          className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-cyan-500/30 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
        >
          <span>Shop Collections</span>
          <RiArrowRightLine className="text-lg" />
        </button>
        <button
          onClick={() => navigate('/about')}
          className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm rounded-2xl border border-slate-700/80 backdrop-blur-md transition-all hover:scale-105"
        >
          Learn More
        </button>
      </div>

      {/* Carousel Navigation Dots */}
      <div className="flex items-center gap-2.5 mt-10">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => setHeroCount(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              heroCount === index 
                ? 'w-8 bg-cyan-400 shadow-md shadow-cyan-400/50' 
                : 'w-2.5 bg-slate-500/60 hover:bg-slate-400'
            }`}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}

export default Hero;
