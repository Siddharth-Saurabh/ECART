import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { FaRegUser, FaUserCheck } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts, MdOutlineInfo } from "react-icons/md";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';

function Nav() {
  const { userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "COLLECTIONS", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-slate-900/85 backdrop-blur-md border-b border-slate-800/80 z-40 transition-all">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => navigate("/")} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <img src={logo} alt="eCart" className="w-7 h-7 object-contain" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                eCart<span className="text-cyan-400">.</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold -mt-1">
                Luxury Fashion
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 border border-slate-800 rounded-full px-3 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Toggle */}
            <button
              onClick={() => {
                setShowSearch(!showSearch);
                if (!showSearch) navigate("/collection");
              }}
              className={`p-2.5 rounded-xl transition-all ${
                showSearch 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" 
                  : "bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              title="Toggle Search"
            >
              <IoSearchOutline className="text-lg" />
            </button>

            {/* User Account / Profile Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center gap-2 border border-slate-700/50"
                title="Account Menu"
              >
                {userData ? (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold flex items-center justify-center uppercase shadow-sm">
                    {userData.name ? userData.name.charAt(0) : <FaUserCheck className="text-[10px]" />}
                  </div>
                ) : (
                  <FaRegUser className="text-base" />
                )}
              </button>

              {/* Account Dropdown Menu */}
              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {userData && (
                    <div className="px-3 py-2 border-b border-slate-800 mb-1">
                      <p className="text-xs font-semibold text-white truncate">{userData.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{userData.email}</p>
                    </div>
                  )}

                  <div className="space-y-1">
                    {!userData ? (
                      <button
                        onClick={() => { navigate("/login"); setShowProfile(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold rounded-xl text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                      >
                        Sign In / Register
                      </button>
                    ) : (
                      <button
                        onClick={() => { handleLogout(); setShowProfile(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Sign Out
                      </button>
                    )}

                    <button
                      onClick={() => { navigate("/order"); setShowProfile(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors flex items-center justify-between"
                    >
                      <span>My Orders</span>
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Tracking</span>
                    </button>

                    <button
                      onClick={() => { navigate("/about"); setShowProfile(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
                    >
                      About eCart
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Cart Button with Counter */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all"
              title="Shopping Cart"
            >
              <HiOutlineShoppingBag className="text-xl" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Search Bar Overlay */}
        {showSearch && (
          <div className="w-full bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 px-4 py-3 flex items-center justify-center transition-all animate-in slide-in-from-top duration-200">
            <div className="relative w-full max-w-2xl flex items-center">
              <IoSearchOutline className="absolute left-4 text-slate-400 text-lg" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, brands, jackets, shirts..."
                className="w-full pl-11 pr-10 py-2.5 bg-slate-900 border border-slate-700/80 rounded-full text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                autoFocus
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 text-slate-400 hover:text-white"
                >
                  <IoCloseOutline className="text-xl" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 flex items-center justify-around z-40 px-2">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <IoMdHome className="text-xl" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button
          onClick={() => navigate("/collection")}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <HiOutlineCollection className="text-xl" />
          <span className="text-[10px] font-medium">Catalog</span>
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="relative flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <HiOutlineShoppingBag className="text-xl" />
          {getCartCount() > 0 && (
            <span className="absolute -top-1 right-2 min-w-[15px] h-[15px] bg-cyan-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
          <span className="text-[10px] font-medium">Cart</span>
        </button>

        <button
          onClick={() => navigate("/order")}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <MdOutlineInfo className="text-xl" />
          <span className="text-[10px] font-medium">Orders</span>
        </button>

        <button
          onClick={() => navigate("/contact")}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <MdContacts className="text-xl" />
          <span className="text-[10px] font-medium">Support</span>
        </button>
      </div>
    </>
  );
}

export default Nav;
