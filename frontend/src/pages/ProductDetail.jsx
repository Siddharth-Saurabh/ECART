import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { RiShoppingBag3Line, RiShieldCheckLine, RiExchangeFundsLine, RiTruckLine } from 'react-icons/ri';
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';
import { toast } from 'react-toastify';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addtoCart, loading } = useContext(shopDataContext);
  const [productData, setProductData] = useState(null);

  const [activeImage, setActiveImage] = useState('');
  const [imagesList, setImagesList] = useState([]);
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find((item) => item._id === productId);
      if (found) {
        setProductData(found);
        const validImages = [found.image1, found.image2, found.image3, found.image4].filter(Boolean);
        setImagesList(validImages);
        setActiveImage(validImages[0] || '');
        if (found.sizes && found.sizes.length > 0) {
          setSize(found.sizes[0]);
        }
      }
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <Loading />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!size) {
      toast.warn("Please choose a size before adding to cart");
      return;
    }
    addtoCart(productData._id, size);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-[88px] pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Image Gallery (Thumbnails + Main) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Thumbnails */}
          {imagesList.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[500px] shrink-0 no-scrollbar">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 border-2 transition-all shrink-0 ${
                    activeImage === img ? 'border-cyan-400 ring-2 ring-cyan-400/30' : 'border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Display Image */}
          <div className="flex-1 aspect-[4/5] max-h-[580px] rounded-3xl overflow-hidden bg-slate-900/80 border border-slate-800 shadow-2xl relative group">
            <img
              src={activeImage}
              alt={productData.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {productData.category && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-xs font-bold text-cyan-300 border border-cyan-500/30">
                {productData.category}
              </span>
            )}
          </div>

        </div>

        {/* Right: Product Meta & Purchase Box */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Title & Ratings */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {productData.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400 text-sm">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
              </div>
              <span className="text-xs text-slate-400 font-medium">(148 Verified Reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {currency}{productData.price}
            </span>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
              In Stock & Ready to Ship
            </span>
          </div>

          {/* Short Description */}
          <p className="text-sm text-slate-300 leading-relaxed">
            {productData.description || "Crafted from breathable, high-grade fabric with precision tailoring for an effortless modern silhouette."}
          </p>

          {/* Size Selection */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Select Size</span>
              <span className="text-xs text-cyan-400 cursor-pointer hover:underline">Size Guide</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {productData.sizes?.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[48px] h-11 px-3.5 rounded-xl font-bold text-xs transition-all ${
                    size === s
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/50'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
            >
              {loading ? <Loading /> : (
                <>
                  <RiShoppingBag3Line className="text-lg" />
                  <span>ADD TO CART</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                handleAddToCart();
                navigate('/cart');
              }}
              className="px-6 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm rounded-2xl border border-slate-700 transition-all"
            >
              Buy Now
            </button>
          </div>

          {/* Guarantees & Perks */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 text-center">
            <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-800">
              <RiShieldCheckLine className="text-cyan-400 text-lg mx-auto mb-1" />
              <p className="text-[10px] text-slate-300 font-semibold">100% Original</p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-800">
              <RiExchangeFundsLine className="text-purple-400 text-lg mx-auto mb-1" />
              <p className="text-[10px] text-slate-300 font-semibold">7 Days Return</p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-800">
              <RiTruckLine className="text-emerald-400 text-lg mx-auto mb-1" />
              <p className="text-[10px] text-slate-300 font-semibold">Fast Shipping</p>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Description & Reviews */}
      <div className="mt-16 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('description')}
            className={`text-sm font-bold tracking-wide transition-colors ${
              activeTab === 'description' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-bold tracking-wide transition-colors ${
              activeTab === 'reviews' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            Verified Reviews (148)
          </button>
        </div>

        <div className="mt-6 text-sm text-slate-300 leading-relaxed space-y-3">
          {activeTab === 'description' ? (
            <>
              <p>
                Upgrade your seasonal wardrobe with the <strong>{productData.name}</strong>, exclusively available on eCart. Crafted from breathable, high-grade cotton blends, it offers all-day comfort and timeless fashion.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Premium breathable fabric with anti-pilling treatment.</li>
                <li>Tailored fit with precision stitching along stress points.</li>
                <li>Machine washable with color-lock technology.</li>
              </ul>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-xs">Arjun Sharma</span>
                  <span className="text-[10px] text-slate-500">2 days ago</span>
                </div>
                <div className="flex text-amber-400 text-xs mb-1.5"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                <p className="text-xs text-slate-300">Exceptional quality! The fit was spot-on and the fabric feels genuinely luxurious.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      <div className="mt-16">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>

    </div>
  );
}

export default ProductDetail;
