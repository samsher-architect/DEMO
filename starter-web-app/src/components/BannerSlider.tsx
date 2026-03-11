import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Cloud, Database, PhoneCall, Sparkles, Zap } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Next-Gen AI Agents",
    description: "Empower your customer service with intelligent, autonomous AI agents that resolve issues instantly.",
    icon: <Bot size={32} className="text-indigo-400" />,
    color: "from-indigo-500/20 to-blue-600/20"
  },
  {
    id: 2,
    title: "Amazon Connect Integration",
    description: "Seamlessly blend AI with Amazon Connect for a unified, cloud-based contact center experience.",
    icon: <Cloud size={32} className="text-cyan-400" />,
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: 3,
    title: "Salesforce CRM Sync",
    description: "Deep integration with Salesforce to provide your agents with 360-degree customer views in real-time.",
    icon: <Database size={32} className="text-sky-400" />,
    color: "from-sky-500/20 to-indigo-500/20"
  },
  {
    id: 4,
    title: "Modern CCaaS Solutions",
    description: "Transform your operations with Contact Center as a Service, scaling effortlessly with your business.",
    icon: <PhoneCall size={32} className="text-violet-400" />,
    color: "from-violet-500/20 to-fuchsia-500/20"
  },
  {
    id: 5,
    title: "Amazon Q in Connect",
    description: "Equip your human agents with generative AI-powered assistance, suggesting responses and actions instantly.",
    icon: <Zap size={32} className="text-amber-400" />,
    color: "from-amber-500/20 to-orange-500/20"
  }
];

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-md mb-8">
      <div className="absolute inset-0 bg-grid-slate-800/[0.04] bg-[size:20px_20px]" />
      
      <div className="relative h-48 sm:h-56 md:h-64 flex items-center justify-center px-6 md:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center max-w-3xl"
          >
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${slides[currentSlide].color} border border-white/5 mb-4 shadow-lg shadow-black/20`}>
              {slides[currentSlide].icon}
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
