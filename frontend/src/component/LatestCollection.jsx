import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';
import { RiSparklingFill } from 'react-icons/ri';

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 8));
    }
  }, [products]);

  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <RiSparklingFill className="text-xs" />
          Fresh Arrivals
        </div>
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Elevate your wardrobe with the newest seasonal styles curated for modern elegance.
        </p>
      </div>

      {latestProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {latestProducts.map((item, index) => (
            <Card
              key={item._id || index}
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
              category={item.category}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-400">
          <p className="text-sm">Loading latest fashion drops...</p>
        </div>
      )}
    </section>
  );
}

export default LatestCollection;
