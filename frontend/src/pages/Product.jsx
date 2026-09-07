import React from 'react';
import LatestCollection from '../component/LatestCollection';
import BestSeller from '../component/BestSeller';

function Product() {
  return (
    <div className="w-full bg-slate-950 py-8 space-y-12">
      <LatestCollection />
      <BestSeller />
    </div>
  );
}

export default Product;
