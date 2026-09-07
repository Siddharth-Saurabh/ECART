import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';

function Card({ name, image, id, price, category }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/productdetail/${id}`)}
      className="group relative bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 hover:border-cyan-500/50 p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1.5 cursor-pointer overflow-hidden"
    >
      {/* Image Container with Hover Zoom */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-950/80 mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {category && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-cyan-300 rounded-full border border-cyan-500/30">
            {category}
          </span>
        )}

        {/* Quick View Pill */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="p-2 bg-cyan-500 text-white rounded-full shadow-lg flex items-center justify-center">
            <HiOutlineArrowRight className="text-sm" />
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5 px-1">
        <h4 className="text-sm font-semibold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {name}
        </h4>
        <div className="flex items-center justify-between mt-1">
          <span className="text-base font-bold text-white tracking-tight">
            {currency}{price}
          </span>
          <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-800/40">
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
