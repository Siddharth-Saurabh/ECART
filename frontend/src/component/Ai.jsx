import React, { useContext, useState, useRef, useEffect } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { 
  RiSparkling2Fill, 
  RiCloseLine, 
  RiMicFill, 
  RiSendPlane2Fill, 
  RiVolumeUpLine, 
  RiVolumeMuteLine,
  RiShoppingBag3Line,
  RiCustomerService2Fill,
  RiCompass3Line
} from 'react-icons/ri';
import aiLogo from "../assets/ai.png";
import openSound from "../assets/open.mp3";
import closeSound from "../assets/close.mp3";

function Ai() {
  const { showSearch, setShowSearch, products, currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechMuted, setSpeechMuted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hello! I'm eCart AI, your personal shopping stylist powered by Claude. Looking for outfit recommendations, size advice, or want to explore our collections? Ask me anything!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  const playSound = (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch {
      // Audio playback handling
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const speak = (text) => {
    if (speechMuted) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#`]/g, '').slice(0, 180);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis fallback
    }
  };

  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      playSound(openSound);
      toast.info("Listening for command...");
    };

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setIsListening(false);
      handleVoiceNavigationOrChat(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Could not capture voice. Try typing instead!");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleVoiceNavigationOrChat = (transcript) => {
    const lower = transcript.toLowerCase();

    // Voice shortcut navigation
    if (lower.includes("cart") || lower.includes("kaat") || lower.includes("bag")) {
      speak("Navigating to your shopping cart");
      navigate("/cart");
      toast.success("Opened Cart");
      return;
    }
    if (lower.includes("order") || lower.includes("tracking")) {
      speak("Opening your orders page");
      navigate("/order");
      toast.success("Opened Orders");
      return;
    }
    if (lower.includes("collection") || lower.includes("shop") || lower.includes("catalog")) {
      speak("Opening our latest collections");
      navigate("/collection");
      toast.success("Opened Collections");
      return;
    }
    if (lower.includes("about")) {
      speak("Opening about eCart page");
      navigate("/about");
      return;
    }
    if (lower.includes("contact")) {
      speak("Opening contact support page");
      navigate("/contact");
      return;
    }
    if (lower.includes("home")) {
      speak("Heading back to home page");
      navigate("/");
      return;
    }

    // Otherwise send as prompt to Claude AI chat
    setIsOpen(true);
    sendMessage(transcript);
  };

  const sendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newHistory = [
      ...messages,
      { role: 'user', content: query, time: userTime }
    ];

    setMessages(newHistory);
    setInputMessage('');
    setLoading(true);

    try {
      const apiPayload = {
        message: query,
        conversationHistory: newHistory.map(m => ({ role: m.role, content: m.content }))
      };

      const response = await axios.post(`${serverUrl}/api/ai/chat`, apiPayload);

      if (response.data && response.data.reply) {
        const replyText = response.data.reply;
        const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: replyText, time: aiTime }
        ]);

        speak(replyText);
      } else {
        throw new Error("No response from AI");
      }
    } catch (err) {
      console.error("Claude AI Chat Error:", err);
      // Fallback friendly reply if network or key issue
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having a little trouble reaching our stylist engine right now, but you can explore our latest collections directly or browse trending categories!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "🔥 Show trending bestseller clothes",
    "👗 Recommend stylish Women's wear",
    "👔 Best casual Men's jackets",
    "✨ What is your return policy?"
  ];

  return (
    <>
      {/* Floating Interactive AI Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Helper tooltip badge on initial load */}
        {!isOpen && (
          <div 
            onClick={() => { playSound(openSound); setIsOpen(true); }}
            className="hidden md:flex items-center gap-2 bg-slate-900/90 text-white text-xs px-3.5 py-2 rounded-full shadow-xl backdrop-blur-md border border-cyan-500/30 cursor-pointer hover:border-cyan-400 transition-all hover:scale-105"
          >
            <RiSparkling2Fill className="text-cyan-400 animate-pulse text-sm" />
            <span className="font-medium">Ask Claude AI Stylist</span>
          </div>
        )}

        <button
          onClick={() => {
            if (isOpen) {
              playSound(closeSound);
              setIsOpen(false);
            } else {
              playSound(openSound);
              setIsOpen(true);
            }
          }}
          className={`relative group p-1.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isOpen 
              ? 'bg-gradient-to-r from-red-500 to-pink-600 ring-4 ring-pink-500/30' 
              : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 ring-4 ring-cyan-500/30 hover:ring-cyan-400/50'
          }`}
          title="Open eCart Claude AI Assistant"
        >
          <div className="relative w-14 h-14 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
            {isOpen ? (
              <RiCloseLine className="text-white text-3xl transition-transform transform rotate-0 hover:rotate-90 duration-200" />
            ) : (
              <>
                <img 
                  src={aiLogo} 
                  alt="AI Assistant" 
                  className={`w-10 h-10 object-contain transition-transform duration-300 ${isListening ? 'scale-125 animate-spin' : 'group-hover:scale-110'}`} 
                />
                <span className="absolute top-1 right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Modern Slide-over / Modal Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[80vh] z-50 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <RiSparkling2Fill className="text-cyan-400 text-xl animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide text-white flex items-center gap-1.5">
                  eCart AI Stylist
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Claude 3.5</span>
                </h3>
                <p className="text-xs text-slate-400">Your 24/7 Smart Shopping Partner</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setSpeechMuted(!speechMuted)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                title={speechMuted ? "Unmute Voice Responses" : "Mute Voice Responses"}
              >
                {speechMuted ? <RiVolumeMuteLine className="text-lg" /> : <RiVolumeUpLine className="text-lg text-cyan-400" />}
              </button>
              <button 
                onClick={() => { playSound(closeSound); setIsOpen(false); }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <RiSparkling2Fill className="text-white text-xs" />
                  </div>
                )}
                
                <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm shadow-md leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none'
                }`}>
                  <p>{msg.content}</p>
                  <span className="block text-[10px] text-slate-400 mt-1 text-right">{msg.time}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center shrink-0 mt-1">
                  <RiSparkling2Fill className="text-white text-xs animate-spin" />
                </div>
                <div className="bg-slate-800/90 border border-slate-700/60 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex gap-2 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(prompt)}
                className="whitespace-nowrap text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-slate-700/80 transition-all hover:scale-105"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input & Voice Controls */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={handleVoiceCommand}
              className={`p-2.5 rounded-xl transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse ring-2 ring-red-400' 
                  : 'bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700'
              }`}
              title="Speak voice command"
            >
              <RiMicFill className="text-lg" />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask for advice, dresses, jackets, sizes..."
              className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />

            <button
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim() || loading}
              className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl shadow-lg transition-all"
            >
              <RiSendPlane2Fill className="text-lg" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default Ai;
