import React, { useEffect, useState } from 'react';
import Backgound from '../component/Backgound';
import Hero from '../component/Hero';
import Product from './Product';
import OurPolicy from '../component/OurPolicy';
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';

function Home() {
  const heroData = [
    { text1: "30% OFF Special Drop", text2: "Elevate Your Aesthetic" },
    { text1: "Bold Designer Fits", text2: "Limited Time Release" },
    { text1: "Discover Premium Wear", text2: "Handcrafted Luxury" },
    { text1: "Find Your Signature Style", text2: "Exclusive Seasonal Sale" }
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev === 3 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-[72px] overflow-x-hidden">
      {/* Hero Banner Container */}
      <section className="relative w-full h-[75vh] min-h-[500px] max-h-[720px] bg-slate-950 overflow-hidden">
        <Backgound heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </section>

      {/* Product Sections */}
      <Product />

      {/* Value Propositions */}
      <OurPolicy />

      {/* VIP Newsletter */}
      <NewLetterBox />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
