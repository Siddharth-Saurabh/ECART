import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';
import { RiFireFill } from 'react-icons/ri';

function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter((item) => item.bestseller);
      setBestSeller(filtered.length > 0 ? filtered.slice(0, 4) : products.slice(0, 4));
    }
  }, [products]);

  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <RiFireFill className="text-xs" />
          Customer Favorites
        </div>
        <Title text1="BEST" text2="SELLERS" />
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Tried, tested, and highly rated — explore the most-loved pieces across our platform.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {bestSeller.map((item, index) => (
          <Card
            key={item._id || index}
            name={item.name}
            id={item._id}
            price={item.price}
            image={item.image1}
            category={item.category}
          />
        ))}
      </div>
    </section>
  );
}

export default BestSeller;
