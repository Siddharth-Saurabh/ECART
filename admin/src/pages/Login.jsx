import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';
import { RiLockPasswordLine, RiMailLine, RiShieldUserLine } from 'react-icons/ri';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const AdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );
      if (result.data) {
        toast.success("🔐 Admin access granted!");
        getAdmin();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <img src={logo} alt="eCart" className="w-6 h-6 object-contain" />
          </div>
        </div>
        <span className="text-2xl font-black text-white tracking-tight">
          eCart<span className="text-cyan-400 font-bold ml-1 text-xs uppercase px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full">Admin Portal</span>
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto mb-3 text-2xl">
            <RiShieldUserLine />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Administrator Sign In</h2>
          <p className="text-xs text-slate-400 mt-1">Authorized personnel only</p>
        </div>

        <form onSubmit={AdminLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Admin Email</label>
            <div className="relative">
              <RiMailLine className="absolute left-4 top-3.5 text-slate-400 text-base" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ecart.com"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Admin Password</label>
            <div className="relative">
              <RiLockPasswordLine className="absolute left-4 top-3.5 text-slate-400 text-base" />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full pl-11 pr-11 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
              >
                {show ? <IoEye className="text-lg" /> : <IoEyeOutline className="text-lg" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-102 active:scale-98 flex items-center justify-center"
          >
            {loading ? <Loading /> : "Access Dashboard"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
