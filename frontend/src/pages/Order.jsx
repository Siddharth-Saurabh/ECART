import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { RiShoppingBag3Line, RiRefreshLine, RiCheckboxCircleLine, RiTruckLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

function Order() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/order/userorder`, {}, { withCredentials: true });
      if (result.data) {
        const allOrdersItem = [];
        result.data.forEach((order) => {
          order.items?.forEach((item) => {
            allOrdersItem.push({
              ...item,
              orderId: order._id,
              status: order.status || 'Order Placed',
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not fetch order tracking info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'shipped':
      case 'out for delivery':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'packing':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-[88px] pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <Title text1="ORDER" text2="HISTORY & TRACKING" />
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your deliveries and view past invoices.
          </p>
        </div>

        <button
          onClick={loadOrderData}
          disabled={loading}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-all"
        >
          <RiRefreshLine className={`text-base ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Tracking</span>
        </button>
      </div>

      {orderData.length > 0 ? (
        <div className="space-y-4">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl bg-slate-950 border border-slate-800"
                />
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-white line-clamp-1">{item.name}</h4>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
                    <span className="font-bold text-cyan-400 text-sm">{currency}{item.price}</span>
                    <span>•</span>
                    <span>Qty: <strong className="text-white">{item.quantity}</strong></span>
                    <span>•</span>
                    <span>Size: <strong className="text-white">{item.size}</strong></span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Ordered on: {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Payment: <span className="text-slate-300 uppercase font-semibold">{item.paymentMethod}</span> ({item.payment ? "Paid" : "Pending"})
                  </p>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getStatusColor(item.status)}`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                  <span>{item.status}</span>
                </div>

                <button
                  onClick={loadOrderData}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 rounded-xl text-xs font-bold border border-cyan-500/30 flex items-center gap-1.5 transition-all"
                >
                  <RiTruckLine className="text-sm" />
                  <span>Track Status</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-slate-900/30 rounded-3xl border border-slate-800 p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
            <RiShoppingBag3Line className="text-3xl" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No Orders Found</h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">Looks like you haven't placed an order yet.</p>
        </div>
      )}

    </div>
  );
}

export default Order;
