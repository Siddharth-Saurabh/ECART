import React, { useState, useContext } from 'react';
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import google from '../assets/google.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import Loading from '../component/Loading';
import { toast } from 'react-toastify';
import { RiLockPasswordLine, RiMailLine, RiUser3Line } from 'react-icons/ri';

function Registration() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );
      if (result.data) {
        toast.success("🎉 Account created successfully!");
        getCurrentUser();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const userName = user.displayName;
      const userEmail = user.email;

      await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name: userName, email: userEmail },
        { withCredentials: true }
      );
      toast.success("🎉 Account linked with Google!");
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in was interrupted");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div 
        onClick={() => navigate("/")} 
        className="flex items-center gap-2.5 cursor-pointer mb-6 group"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <img src={Logo} alt="eCart" className="w-6 h-6 object-contain" />
          </div>
        </div>
        <span className="text-2xl font-black text-white tracking-tight">
          eCart<span className="text-cyan-400">.</span>
        </span>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-black text-white">Create New Account</h2>
          <p className="text-xs text-slate-400 mt-1">Join eCart for personalized fashion recommendations</p>
        </div>

        {/* Google OAuth */}
        <button
          onClick={googleSignup}
          type="button"
          className="w-full py-3 px-4 bg-slate-950/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-3 transition-all hover:scale-102"
        >
          <img src={google} alt="Google" className="w-5 h-5 object-contain" />
          <span>Sign up with Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-[11px] text-slate-500 uppercase font-semibold">Or with email</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <div className="relative">
              <RiUser3Line className="absolute left-4 top-3.5 text-slate-400 text-base" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Siddharth Saurabh"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <RiMailLine className="absolute left-4 top-3.5 text-slate-400 text-base" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <RiLockPasswordLine className="absolute left-4 top-3.5 text-slate-400 text-base" />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                required
                minLength={8}
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
            {loading ? <Loading /> : "Create Account"}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center">
          Already have an account?{' '}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 font-bold hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>

      </div>
    </div>
  );
}

export default Registration;
