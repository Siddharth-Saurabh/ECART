import React, { useContext, useEffect, useState } from 'react';
import { FaChevronRight, FaChevronDown, FaFilter } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const val = e.target.value;
    if (category.includes(val)) {
      setCategory(prev => prev.filter(item => item !== val));
    } else {
      setCategory(prev => [...prev, val]);
    }
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    if (subCategory.includes(val)) {
      setSubCategory(prev => prev.filter(item => item !== val));
    } else {
      setSubCategory(prev => [...prev, val]);
    }
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  const applyFilter = () => {
    let productCopy = products ? [...products] : [];

    if (showSearch && search) {
      productCopy = productCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }

    // Apply sorting
    if (sortType === 'low-high') {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      productCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProduct(productCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, sortType, products]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-[88px] pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filter Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0">
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 sticky top-24 space-y-6">
            
            {/* Filter Toggle Header */}
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowFilter(!showFilter)}
            >
              <div className="flex items-center gap-2">
                <FaFilter className="text-cyan-400 text-sm" />
                <h3 className="font-bold text-sm tracking-wider uppercase text-white">Filters</h3>
                {(category.length > 0 || subCategory.length > 0) && (
                  <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[11px] font-bold flex items-center justify-center">
                    {category.length + subCategory.length}
                  </span>
                )}
              </div>
              <div className="md:hidden text-slate-400">
                {showFilter ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>

            {/* Collapsible Filter Body */}
            <div className={`space-y-6 ${showFilter ? "block" : "hidden"} md:block`}>
              
              {/* Category Filter */}
              <div className="border-t border-slate-800/80 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Categories</h4>
                <div className="space-y-2.5">
                  {['Men', 'Women', 'Kids'].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 hover:text-white cursor-pointer group">
                      <input
                        type="checkbox"
                        value={cat}
                        checked={category.includes(cat)}
                        onChange={toggleCategory}
                        className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-slate-900 cursor-pointer"
                      />
                      <span className="group-hover:translate-x-0.5 transition-transform">{cat} Wear</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sub-Category Filter */}
              <div className="border-t border-slate-800/80 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Type & Fit</h4>
                <div className="space-y-2.5">
                  {['TopWear', 'BottomWear', 'WinterWear'].map((sub) => (
                    <label key={sub} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 hover:text-white cursor-pointer group">
                      <input
                        type="checkbox"
                        value={sub}
                        checked={subCategory.includes(sub)}
                        onChange={toggleSubCategory}
                        className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-slate-900 cursor-pointer"
                      />
                      <span className="group-hover:translate-x-0.5 transition-transform">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filter Button */}
              {(category.length > 0 || subCategory.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                >
                  <IoCloseCircleOutline className="text-base" />
                  <span>Reset Filters</span>
                </button>
              )}

            </div>

          </div>
        </aside>

        {/* Product Catalog Grid & Top Controls */}
        <main className="flex-1">
          
          {/* Header & Sorting Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
            <div>
              <Title text1="ALL" text2="COLLECTIONS" />
              <p className="text-xs text-slate-400 mt-0.5">
                Showing <strong className="text-cyan-400">{filterProduct.length}</strong> available items
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs text-slate-400 whitespace-nowrap hidden sm:inline">Sort By:</span>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="w-full sm:w-auto bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="relevant">Featured / Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filterProduct.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filterProduct.map((item, index) => (
                <Card
                  key={item._id || index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image1}
                  category={item.category}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-slate-900/30 rounded-3xl border border-slate-800 p-8">
              <p className="text-lg font-bold text-slate-200">No products match your current filters</p>
              <p className="text-xs text-slate-400 mt-1">Try resetting your category or search parameters</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}

export default Collections;