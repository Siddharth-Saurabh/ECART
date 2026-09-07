import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { RiMailSendLine } from 'react-icons/ri';

function NewLetterBox() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("🎉 Thank you for subscribing! Check your inbox for your 20% discount code.");
      setEmail('');
    }
  };

  return (
    <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Subscribe Now & Unlock <span className="text-cyan-400">20% Off</span>
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Get VIP access to exclusive product drops, seasonal promotions, and curated fashion looks.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <RiMailSendLine className="text-base" />
            <span>Join VIP</span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewLetterBox;
