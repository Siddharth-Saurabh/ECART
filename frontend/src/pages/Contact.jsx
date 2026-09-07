import React from 'react';
import Title from '../component/Title';
import contactImg from "../assets/contact.jpg";
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';
import { RiMapPinLine, RiPhoneLine, RiMailLine, RiCustomerService2Line, RiBriefcaseLine } from 'react-icons/ri';

function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-[88px] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="text-center mb-12">
          <Title text1="CONTACT" text2="US" />
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Have questions about an order, styling recommendations, or partnerships? Reach out to our concierge team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src={contactImg}
                alt="Contact eCart"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
                <RiCustomerService2Line className="text-lg" />
                <span>Headquarters & Customer Service</span>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <RiMapPinLine className="text-cyan-400 text-lg shrink-0" />
                  <span>eCart Fashion Hub, Tech Park, Bangalore, Karnataka, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <RiPhoneLine className="text-cyan-400 text-lg shrink-0" />
                  <span>+91 00000 00000 00 (Support / Concierge)</span>
                </div>
                <div className="flex items-center gap-3">
                  <RiMailLine className="text-cyan-400 text-lg shrink-0" />
                  <span>support@ecart.com / contact@ecart.com</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider">
                <RiBriefcaseLine className="text-lg" />
                <span>Careers & Creative Talent</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                We are constantly looking for visionary fashion curators, designers, and engineers. Join Siddharth Saurabh and our team in shaping the future of AI-powered commerce.
              </p>
              <button
                onClick={() => window.open("mailto:careers@ecart.com")}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
              >
                Send Your Portfolio / CV
              </button>
            </div>

          </div>

        </div>

      </div>

      <NewLetterBox />
      <Footer />
    </div>
  );
}

export default Contact;
