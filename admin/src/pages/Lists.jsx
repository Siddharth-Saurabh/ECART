import React, { useContext, useEffect, useState } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line, RiFileList3Line } from 'react-icons/ri';

function Lists() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);
      setList(result.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load catalog products");
    } finally {
      setLoading(false);
    }
  };

  const removeList = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true });
      if (result.data) {
        toast.info("Product removed from catalog");
        fetchList();
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <Sidebar />

      <main className="pl-16 sm:pl-64 pt-[70px] p-6 sm:p-10 max-w-6xl mx-auto">
        
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Active Product Catalog</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Currently managing <strong className="text-cyan-400">{list.length}</strong> items in inventory.
            </p>
          </div>
        </div>

        {list.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {list.map((item) => (
              <div
                key={item._id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1">{item.name}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="font-bold text-cyan-400 text-sm">₹{item.price}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[11px] font-semibold text-slate-300">
                        {item.category} / {item.subCategory}
                      </span>
                      {item.bestseller && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-bold">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <span className="text-xs text-slate-400">
                    Sizes: <strong className="text-slate-200">{item.sizes?.join(', ')}</strong>
                  </span>
                  <button
                    onClick={() => removeList(item._id, item.name)}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all ml-4"
                    title="Delete product"
                  >
                    <RiDeleteBin6Line className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
            <RiFileList3Line className="text-4xl text-slate-500 mx-auto mb-3" />
            <p className="text-base font-bold text-white">No products currently listed</p>
            <p className="text-xs text-slate-400 mt-1">Click "Add Product" in the sidebar to publish items.</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default Lists;
