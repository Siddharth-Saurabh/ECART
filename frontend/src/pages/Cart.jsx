import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line, RiShoppingBag3Line, RiArrowRightLine, RiAddLine, RiSubtractLine } from "react-icons/ri";
import CartTotal from '../component/CartTotal';
import { toast } from 'react-toastify';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-[88px] pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="text-center mb-8">
        <Title text1="YOUR" text2="SHOPPING CART" />
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review your selected items before proceeding to secure checkout.
        </p>
      </div>

      {cartData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={productData.image1}
                      alt={productData.name}
                      className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl bg-slate-950 border border-slate-800"
                    />
                    <div className="space-y-1.5">
                      <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                        {productData.name}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-bold text-sm sm:text-base">
                          {currency}{productData.price}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
                          Size: {item.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item._id, item.size, Math.max(0, item.quantity - 1))}
                        className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                      >
                        <RiSubtractLine className="text-sm" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                      >
                        <RiAddLine className="text-sm" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        updateQuantity(item._id, item.size, 0);
                        toast.info("Item removed from cart");
                      }}
                      className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
                      title="Remove item"
                    >
                      <RiDeleteBin6Line className="text-lg" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary & Checkout */}
          <div className="space-y-4">
            <CartTotal />
            <button
              onClick={() => navigate("/placeorder")}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
            >
              <span>PROCEED TO CHECKOUT</span>
              <RiArrowRightLine className="text-lg" />
            </button>
          </div>

        </div>
      ) : (
        <div className="py-24 text-center bg-slate-900/40 rounded-3xl border border-slate-800 p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
            <RiShoppingBag3Line className="text-3xl" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Your cart is currently empty</h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">Explore our curated collections to find your signature look.</p>
          <button
            onClick={() => navigate('/collection')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
          >
            Explore Collections
          </button>
        </div>
      )}

    </div>
  );
}

export default Cart;
