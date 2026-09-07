import React from 'react';
import Title from './Title';
import { RiExchangeFundsLine, RiShieldCheckLine, RiCustomerService2Line } from "react-icons/ri";

function OurPolicy() {
  const policies = [
    {
      icon: RiExchangeFundsLine,
      title: "Easy Exchange Policy",
      desc: "Fast, hassle-free exchanges with pickup from your doorstep.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-cyan-400"
    },
    {
      icon: RiShieldCheckLine,
      title: "7 Days Return Policy",
      desc: "100% money-back guarantee with zero questions asked.",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: RiCustomerService2Line,
      title: "24/7 Premium Support",
      desc: "Instant live assistance via our Claude AI and customer care team.",
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400"
    }
  ];

  return (
    <section className="py-16 bg-slate-950/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Title text1="OUR" text2="PROMISE" />
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Experience peace of mind with our dedicated buyer protection and support policies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {policies.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <Icon className={`text-2xl ${item.iconColor}`} />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OurPolicy;
