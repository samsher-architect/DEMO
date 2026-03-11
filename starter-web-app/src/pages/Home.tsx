import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Demo } from '../types';
import { MOCK_DEMOS } from '../lib/mockData';
import { supabase, hasSupabaseConfig } from '../lib/supabase';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
    badge: "Welcome to OmniServe Intelligence",
    title: "Transforming Customer Service with",
    highlight: "AI Agents",
    description: "Explore our cutting-edge demonstrations showcasing the power of Generative AI, Amazon Connect, Salesforce integration, and modern CCaaS solutions."
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
    badge: "Next-Gen Automation",
    title: "Automate Your Workflow with",
    highlight: "Smart AI",
    description: "Reduce manual tasks and increase efficiency with our intelligent automation platform designed for modern enterprises."
  },
  {
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80",
    badge: "Seamless Integration",
    title: "Connect Your Tools with",
    highlight: "OmniServe",
    description: "Integrate seamlessly with your existing CRM, helpdesk, and communication tools to create a unified support ecosystem."
  },
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1920&q=80",
    badge: "Data-Driven Insights",
    title: "Unlock Actionable Insights with",
    highlight: "Analytics",
    description: "Gain deep visibility into your customer interactions and agent performance with our advanced analytics dashboard."
  },
  {
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80",
    badge: "24/7 Availability",
    title: "Provide Round-the-Clock",
    highlight: "Support",
    description: "Ensure your customers always get the help they need, anytime, anywhere, with our always-on AI agents."
  },
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
    badge: "Enterprise Security",
    title: "Secure and Compliant AI",
    highlight: "Solutions",
    description: "Rest easy knowing your data is protected with our enterprise-grade security and compliance standards."
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    fetchDemos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchDemos = async () => {
    setLoading(true);
    if (hasSupabaseConfig) {
      try {
        const { data, error } = await supabase.from('demos').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setDemos(data && data.length > 0 ? data : MOCK_DEMOS);
      } catch (err) {
        console.error("Error fetching demos:", err);
        setDemos(MOCK_DEMOS);
      }
    } else {
      setDemos(MOCK_DEMOS);
    }
    setLoading(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % demos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + demos.length) % demos.length);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-indigo-500/30">
      <Header />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
        
        {/* Hero Banner */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6 w-full text-center z-10 min-h-[600px] flex flex-col justify-center items-center overflow-hidden">
          {/* Hero Background Slider */}
          <div className="absolute inset-0 z-0 bg-slate-950">
            {HERO_SLIDES.map((slide, idx) => (
              <motion.img
                key={idx}
                src={slide.image}
                initial={false}
                animate={{ 
                  opacity: idx === currentHeroSlide ? 0.3 : 0,
                  scale: idx === currentHeroSlide ? 1 : 1.05,
                  zIndex: idx === currentHeroSlide ? 1 : 0
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                alt={`Hero Background ${idx + 1}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950 z-10" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto w-full min-h-[350px] flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
                  <Sparkles size={16} />
                  <span>{HERO_SLIDES[currentHeroSlide].badge}</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
                  {HERO_SLIDES[currentHeroSlide].title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{HERO_SLIDES[currentHeroSlide].highlight}</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
                  {HERO_SLIDES[currentHeroSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 mt-4"
            >
              <Link 
                to="/showcase" 
                className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all shadow-lg shadow-indigo-500/25"
              >
                View All Demos <ArrowRight size={18} />
              </Link>
              <Link 
                to="/about" 
                className="flex items-center gap-2 px-8 py-4 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 text-white rounded-full font-medium transition-all border border-slate-700"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Hero Slider Indicators */}
            <div className="flex justify-center gap-2 mt-12">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentHeroSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Demos Slider Section */}
        <section className="relative py-16 md:py-24 bg-slate-900/50 border-t border-slate-800/50 z-10 flex-1">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Featured Demos</h2>
                <p className="text-slate-400">Get a glimpse of our latest AI capabilities</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Sparkles className="animate-pulse text-indigo-400 w-8 h-8" />
              </div>
            ) : demos.length > 0 ? (
              <div className="relative overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {demos.map((demo) => (
                    <div key={demo.id} className="w-full flex-shrink-0 px-2 md:px-4">
                      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden flex flex-col md:flex-row">
                        {/* Video Thumbnail Placeholder */}
                        <div className="w-full md:w-1/2 bg-slate-900 relative aspect-video md:aspect-auto flex items-center justify-center group cursor-pointer" onClick={() => navigate('/showcase')}>
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 z-10" />
                          <img 
                            src={demo.image_url || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80"} 
                            alt={demo.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                          />
                          <div className="relative z-20 w-16 h-16 rounded-full bg-indigo-600/90 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                            <Video size={24} className="ml-1" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {demo.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/20">
                                {tag}
                              </span>
                            ))}
                            {demo.tags.length > 3 && (
                              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700">
                                +{demo.tags.length - 3}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{demo.title}</h3>
                          <p className="text-slate-300 mb-8 line-clamp-3 leading-relaxed">
                            {demo.description}
                          </p>
                          
                          <button 
                            onClick={() => navigate('/showcase')}
                            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors w-fit group"
                          >
                            Watch Full Demo 
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Mobile Navigation Dots */}
                <div className="flex md:hidden justify-center gap-2 mt-6">
                  {demos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500">
                No demos available at the moment.
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
