import React, { useState, useContext, useEffect } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RiShoppingBag3Line, RiTruckLine, RiMapPinLine, RiPhoneLine } from 'react-icons/ri';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
      setOrders((result.data || []).reverse());
    } catch (error) {
      console.error(error);
      toast.error("Failed to load customer orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (newStatus, orderId) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status: newStatus },
        { withCredentials: true }
      );
      if (result.data) {
        toast.success(`Order status updated to "${newStatus}"`);
        fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not update order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <Sidebar />

      <main className="pl-16 sm:pl-64 pt-[70px] p-6 sm:p-10 max-w-6xl mx-auto">
        
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Customer Order Pipeline</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review buyer details, ordered items, payment verification, and dispatch status.
          </p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-6 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                {/* Left: Items & Buyer */}
                <div className="space-y-3 flex-1">
                  
                  {/* Items list */}
                  <div className="space-y-1">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                        <span className="font-bold text-white">{item.name}</span>
                        <span className="text-xs text-cyan-400 font-semibold">× {item.quantity}</span>
                        <span className="text-xs bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">
                          [{item.size}]
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Customer Info */}
                  <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800/80">
                    <p className="font-bold text-slate-200 flex items-center gap-1.5">
                      <span>{order.address?.firstName} {order.address?.lastName}</span>
                      <span className="text-[11px] text-slate-500 font-normal">({order.address?.email})</span>
                    </p>
                    <p className="flex items-center gap-1 text-slate-400">
                      <RiMapPinLine className="text-cyan-400 shrink-0" />
                      <span>{order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.pinCode}</span>
                    </p>
                    <p className="flex items-center gap-1 text-slate-400">
                      <RiPhoneLine className="text-cyan-400 shrink-0" />
                      <span>{order.address?.phone}</span>
                    </p>
                  </div>

                </div>

                {/* Middle: Payment Info */}
                <div className="text-xs space-y-1 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 shrink-0 min-w-[200px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Order Date:</span>
                    <span className="text-white">{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Payment Method:</span>
                    <span className="font-bold text-white uppercase">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Payment Status:</span>
                    <span className={`font-bold ${order.payment ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {order.payment ? 'Paid' : 'Pending (COD)'}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                    <span className="font-bold">Total Amount:</span>
                    <span className="text-base font-extrabold text-cyan-400">₹{order.amount}</span>
                  </div>
                </div>

                {/* Right: Status Dropdown */}
                <div className="flex flex-col gap-2 shrink-0">
                  <label className="text-[11px] font-bold uppercase text-slate-400">Shipment Status</label>
                  <select
                    value={order.status || 'Order Placed'}
                    onChange={(e) => statusHandler(e.target.value, order._id)}
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
            <RiTruckLine className="text-4xl text-slate-500 mx-auto mb-3" />
            <p className="text-base font-bold text-white">No customer orders placed yet</p>
            <p className="text-xs text-slate-400 mt-1">Orders will appear here in real time when placed by users.</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default Orders;
