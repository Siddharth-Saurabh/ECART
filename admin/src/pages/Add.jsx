import React, { useContext, useState } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import uploadPlaceholder from '../assets/upload image.jpg';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';
import { RiImageAddLine, RiPriceTag3Line, RiCheckLine, RiTShirtLine } from 'react-icons/ri';

function Add() {
  const [images, setImages] = useState({ image1: null, image2: null, image3: null, image4: null });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [price, setPrice] = useState("");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState(["M", "L"]);
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);

  const handleImageChange = (key, file) => {
    setImages(prev => ({ ...prev, [key]: file }));
  };

  const toggleSize = (sizeOption) => {
    setSizes(prev => 
      prev.includes(sizeOption) 
        ? prev.filter(s => s !== sizeOption) 
        : [...prev, sizeOption]
    );
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!images.image1) {
      toast.warn("Please upload at least the primary product image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      if (images.image1) formData.append("image1", images.image1);
      if (images.image2) formData.append("image2", images.image2);
      if (images.image3) formData.append("image3", images.image3);
      if (images.image4) formData.append("image4", images.image4);

      const result = await axios.post(`${serverUrl}/api/product/addproduct`, formData, { withCredentials: true });

      if (result.data) {
        toast.success("🎉 Product published to catalog!");
        setName("");
        setDescription("");
        setPrice("");
        setBestSeller(false);
        setImages({ image1: null, image2: null, image3: null, image4: null });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <Sidebar />

      <main className="pl-16 sm:pl-64 pt-[70px] p-6 sm:p-10 max-w-5xl mx-auto">
        
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Add New Product</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Upload images, define variations, and publish to the live storefront catalog.
          </p>
        </div>

        <form onSubmit={handleAddProduct} className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Image Upload Area */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <RiImageAddLine className="text-cyan-400 text-sm" />
              <span>Product Image Slots (Up to 4)</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['image1', 'image2', 'image3', 'image4'].map((imgKey, idx) => (
                <label
                  key={imgKey}
                  className="relative aspect-[3/4] rounded-2xl bg-slate-950 border-2 border-dashed border-slate-800 hover:border-cyan-400/60 transition-all cursor-pointer flex flex-col items-center justify-center p-2 group overflow-hidden"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(imgKey, e.target.files[0])}
                  />
                  {images[imgKey] ? (
                    <img
                      src={URL.createObjectURL(images[imgKey])}
                      alt={`Slot ${idx + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center p-2">
                      <img src={uploadPlaceholder} alt="Upload" className="w-12 h-12 object-contain mx-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="block text-[11px] text-slate-400 font-medium mt-2">
                        {idx === 0 ? "Main Photo *" : `Slot ${idx + 1}`}
                      </span>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Product Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vintage Denim Oversized Jacket"
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Product Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe material, fit, features, and styling advice..."
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          {/* Categories and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Sub-Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Price (₹ INR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 1999"
                required
                min={1}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Size Multi-Select */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <RiTShirtLine className="text-cyan-400 text-sm" />
              <span>Available Sizes</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    sizes.includes(s)
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Bestseller Switch */}
          <div className="flex items-center gap-3 pt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={(e) => setBestSeller(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              Highlight as Bestseller on Storefront
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
          >
            {loading ? <Loading /> : "Publish Product to Store"}
          </button>

        </form>

      </main>
    </div>
  );
}

export default Add;
