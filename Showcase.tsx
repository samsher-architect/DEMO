import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import { Sparkles, Users, Target, ShieldCheck } from 'lucide-react';
import { useCompanyDetails } from '../hooks/useCompanyDetails';

export default function About() {
  const { company } = useCompanyDetails();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-50">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 mb-6 shadow-lg shadow-indigo-500/30 overflow-hidden">
            {company.logo_url ? (
              <img src={company.logo_url} alt={`${company.name} Logo`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <Sparkles className="text-white w-8 h-8" />
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">About {company.name}</h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {company.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
            <Target className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Our Mission</h3>
            <p className="text-slate-400 text-sm">To democratize enterprise-grade AI for businesses of all sizes.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
            <Users className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Our Team</h3>
            <p className="text-slate-400 text-sm">World-class engineers and researchers dedicated to AI innovation.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Our Promise</h3>
            <p className="text-slate-400 text-sm">Secure, reliable, and transparent AI systems you can trust.</p>
          </div>
        </div>

        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Interested in learning more about how {company.name} can transform your business? Reach out to our team today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`mailto:${company.contact_email}`} className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl transition-colors">
              Email Us
            </a>
            <a href="tel:+919161562250" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors border border-slate-700">
              Call +91 916-156-2250
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
