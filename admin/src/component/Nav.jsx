import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { RiAdminLine, RiLogoutBoxRLine } from 'react-icons/ri';

function Nav() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);

  const logOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      toast.success("Logged out of Admin Portal");
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 z-40 px-4 sm:px-8 flex items-center justify-between">
      
      {/* Brand */}
      <div 
        onClick={() => navigate("/")} 
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <img src={logo} alt="eCart" className="w-6 h-6 object-contain" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">
            eCart <span className="text-cyan-400 text-xs uppercase px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full font-bold ml-1">Admin</span>
          </h1>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold">
          <RiAdminLine className="text-cyan-400 text-sm" />
          <span>Super Admin</span>
        </div>

        <button
          onClick={logOut}
          className="px-4 py-2 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
        >
          <RiLogoutBoxRLine className="text-sm" />
          <span>Sign Out</span>
        </button>
      </div>

    </header>
  );
}

export default Nav;
