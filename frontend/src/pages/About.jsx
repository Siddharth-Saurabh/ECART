import React from 'react';
import Title from '../component/Title';
import aboutImg from '../assets/about.jpg';
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';
import { RiAwardLine, RiFlashlightLine, RiCustomerService2Line, RiSparkling2Fill } from 'react-icons/ri';

function About() {
  const pillars = [
    {
      icon: RiAwardLine,
      title: "Uncompromising Quality",
      desc: "Every garment is inspected for durability, premium fabric feel, and precise stitching."
    },
    {
      icon: RiFlashlightLine,
      title: "Seamless Convenience",
      desc: "Intuitive navigation, AI styling recommendations, fast fulfillment, and easy returns."
    },
    {
      icon: RiCustomerService2Line,
      title: "Dedicated Care",
      desc: "24/7 personalized customer support and instant assistance via eCart Claude AI."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-[88px] overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <RiSparkling2Fill />
            <span>Our Heritage</span>
          </div>
          <Title text1="ABOUT" text2="ECART" />
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Redefining modern fashion through design excellence, sustainability, and AI-assisted shopping.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src={aboutImg}
                alt="About eCart"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Crafting Contemporary Fashion for the Bold & Sophisticated
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Founded with the vision to blend high-end luxury aesthetics with effortless everyday comfort, <strong>eCart</strong> (created by <strong>Siddharth Saurabh</strong>) curates apparel that empowers self-expression.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Whether you are looking for versatile casual essentials, statement jackets, or seasonal collections, our platform delivers unmatched quality, authenticated sourcing, and intelligent sizing assistance.
            </p>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-cyan-400">Our Mission</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                To empower every shopper with confidence by delivering top-tier designer fashion, frictionless digital checkout, and intelligent personal styling powered by cutting-edge AI.
              </p>
            </div>
          </div>

        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <Title text1="WHY" text2="CHOOSE US" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 text-2xl border border-cyan-500/20">
                    <Icon />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <NewLetterBox />
      <Footer />
    </div>
  );
}

export default About;
