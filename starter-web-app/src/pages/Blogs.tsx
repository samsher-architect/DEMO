import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function Blogs() {
  const blogs = [
    { id: 1, title: 'The Future of AI in Customer Service', date: 'March 10, 2026', category: 'AI Trends' },
    { id: 2, title: 'How OmniServe Intelligence is Changing the Game', date: 'March 5, 2026', category: 'Company News' },
    { id: 3, title: '5 Ways to Automate Your Sales Funnel', date: 'February 28, 2026', category: 'Guides' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Latest Articles</h1>
          <p className="text-lg text-slate-400">Insights, news, and guides from the OmniServe Intelligence team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, idx) => (
            <motion.div 
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <div className="text-xs font-medium text-indigo-400 mb-2">{blog.category} • {blog.date}</div>
              <h2 className="text-xl font-semibold text-white mb-4 line-clamp-2">{blog.title}</h2>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-indigo-300 transition-colors mt-auto">
                Read Article <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
