import React, { useState, useContext, useEffect } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiShoppingBag3Line, RiFileList3Line, RiMoneyDollarCircleLine, RiTruckLine, RiAddLine } from 'react-icons/ri';

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const fetchCounts = async () => {
    try {
      const productsRes = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true });
      setTotalProducts(productsRes.data?.length || 0);

      const ordersRes = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
      const orders = ordersRes.data || [];
      setTotalOrders(orders.length);

      const revenue = orders.reduce((acc, curr) => acc + (curr.amount || 0), 0);
      setTotalRevenue(revenue);

      const delivered = orders.filter(o => o.status === 'Delivered').length;
      setCompletedOrders(delivered);
    } catch (err) {
      console.error("Failed to fetch admin metrics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      subtitle: "Gross sales across platform",
      icon: RiMoneyDollarCircleLine,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-400"
    },
    {
      title: "Active Catalog",
      value: totalProducts,
      subtitle: "Live fashion items",
      icon: RiFileList3Line,
      color: "from-cyan-500 to-blue-600",
      textColor: "text-cyan-400"
    },
    {
      title: "Total Orders",
      value: totalOrders,
      subtitle: "Processed customer orders",
      icon: RiShoppingBag3Line,
      color: "from-purple-500 to-indigo-600",
      textColor: "text-purple-400"
    },
    {
      title: "Fulfilled Deliveries",
      value: completedOrders,
      subtitle: "Successfully delivered",
      icon: RiTruckLine,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-400"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <Sidebar />

      <main className="pl-16 sm:pl-64 pt-[70px] p-6 sm:p-10 max-w-7xl mx-auto">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Platform Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Real-time monitoring of catalog inventory, customer orders, and revenue.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/add")}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all hover:scale-105"
            >
              <RiAddLine className="text-base" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {stat.title}
                  </span>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-lg shadow-md`}>
                    <Icon />
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
                  {loading ? "..." : stat.value}
                </div>
                <p className="text-[11px] text-slate-400">{stat.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Management Links */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => navigate("/lists")}
            className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all hover:shadow-xl group"
          >
            <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
              <RiFileList3Line /> Manage Inventory Catalog
            </h3>
            <p className="text-xs text-slate-400 mt-1">View, edit, or delete existing fashion products and adjust pricing.</p>
          </div>

          <div 
            onClick={() => navigate("/orders")}
            className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all hover:shadow-xl group"
          >
            <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">
              <RiShoppingBag3Line /> Manage Customer Orders
            </h3>
            <p className="text-xs text-slate-400 mt-1">Update shipment progression, verify delivery addresses, and track COD / Razorpay payments.</p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Home;
