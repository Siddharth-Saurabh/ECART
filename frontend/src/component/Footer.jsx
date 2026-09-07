import React from 'react';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { RiGithubFill, RiTwitterXFill, RiInstagramLine, RiMailLine, RiPhoneLine } from 'react-icons/ri';

function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <img src={logo} alt="eCart" className="w-6 h-6 object-contain" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                eCart<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Your premier digital fashion hub, delivering designer outfits, seamless Razorpay checkouts, and AI-powered personalized styling.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com/Siddharth-Saurabh" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                <RiGithubFill className="text-base" />
              </a>
              <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer">
                <RiInstagramLine className="text-base" />
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer">
                <RiTwitterXFill className="text-base" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Storefront</Link></li>
              <li><Link to="/collection" className="hover:text-cyan-400 transition-colors">Explore Collections</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Our Brand</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Customer Support</Link></li>
              <li><Link to="/order" className="hover:text-cyan-400 transition-colors">Track Orders</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Get in Touch</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <RiPhoneLine className="text-cyan-400" />
                <span>+91 00000 00000 00</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <RiMailLine className="text-cyan-400" />
                <span>support@ecart.com</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2">
                Designed & Developed by <strong className="text-slate-300">Siddharth Saurabh</strong>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} eCart. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
