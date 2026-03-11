import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, CheckCircle2, Sparkles, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Demo } from '../types';
import { MOCK_DEMOS } from '../lib/mockData';
import { supabase, hasSupabaseConfig } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomVideoPlayer from '../components/CustomVideoPlayer';

export default function Showcase() {
  const navigate = useNavigate();
  const [demos, setDemos] = useState<Demo[]>([]);
  const [activeDemo, setActiveDemo] = useState<Demo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDemos();
  }, []);

  const fetchDemos = async () => {
    setLoading(true);
    if (hasSupabaseConfig) {
      try {
        const { data, error } = await supabase.from('demos').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          setDemos(data);
          setActiveDemo(data[0]);
        } else {
          // Fallback to mock if DB is empty
          setDemos(MOCK_DEMOS);
          setActiveDemo(MOCK_DEMOS[0]);
        }
      } catch (err) {
        console.error("Error fetching demos:", err);
        setDemos(MOCK_DEMOS);
        setActiveDemo(MOCK_DEMOS[0]);
      }
    } else {
      // Use mock data if Supabase isn't configured yet
      setDemos(MOCK_DEMOS);
      setActiveDemo(MOCK_DEMOS[0]);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-indigo-400"><Sparkles className="animate-pulse w-8 h-8" /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-indigo-500/30">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-80 bg-slate-900/80 border-r border-slate-800 flex flex-col overflow-y-auto backdrop-blur-xl hidden md:flex">
          <div className="p-4 space-y-2 mt-4">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Available Demos</h2>
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 group flex items-start gap-3 ${
                  activeDemo?.id === demo.id 
                    ? 'bg-indigo-500/10 border border-indigo-500/30 shadow-inner' 
                    : 'hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className={`mt-0.5 p-1.5 rounded-md ${activeDemo?.id === demo.id ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'}`}>
                  <Video size={16} />
                </div>
                <div>
                  <h3 className={`font-medium text-sm ${activeDemo?.id === demo.id ? 'text-indigo-300' : 'text-slate-200'}`}>
                    {demo.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{demo.description}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative flex flex-col">
          {/* Ambient background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="flex-1">
            <div className="max-w-5xl mx-auto p-6 md:p-10 lg:p-12 relative z-10">
              {activeDemo && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDemo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Custom Video Player Component */}
                    <div className="mb-8">
                      <CustomVideoPlayer 
                        url={activeDemo.video_url} 
                        poster="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80" 
                      />
                    </div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                            {activeDemo.title}
                          </h2>
                          <p className="text-lg text-slate-300 leading-relaxed">
                            {activeDemo.description}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="pt-4 border-t border-slate-800/50">
                          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-slate-400">
                            <Tag size={16} />
                            <span>Capabilities & Technologies</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {activeDemo.tags.map((tag, idx) => (
                              <span 
                                key={idx} 
                                className="px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-300 text-sm font-medium shadow-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Key Points Sidebar */}
                      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-fit backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                          <Sparkles className="text-indigo-400" size={20} />
                          Key Highlights
                        </h3>
                        <ul className="space-y-4">
                          {activeDemo.points.map((point, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + (idx * 0.1) }}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2 className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                              <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
          
          <Footer />
        </main>
      </div>
    </div>
  );
}
