import React from 'react';
import { Mail, Phone, Globe, Sparkles } from 'lucide-react';
import { useCompanyDetails } from '../hooks/useCompanyDetails';

export default function Footer() {
  const { company } = useCompanyDetails();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3">
            {company.logo_url ? (
              <img src={company.logo_url} alt={`${company.name} Logo`} className="h-6 w-auto object-contain" referrerPolicy="no-referrer" />
            ) : (
              <Sparkles className="text-indigo-400 w-5 h-5" />
            )}
            <h3 className="text-white font-bold text-lg tracking-tight">{company.name}</h3>
          </div>
          <p className="text-slate-400 text-sm mt-1">{company.description.split('.')[0]}.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-slate-400">
          <a href={`mailto:${company.contact_email}`} className="flex items-center justify-center gap-2 hover:text-indigo-400 transition-colors">
            <Mail size={16} /> {company.contact_email}
          </a>
          <a href="tel:+919161562250" className="flex items-center justify-center gap-2 hover:text-indigo-400 transition-colors">
            <Phone size={16} /> +91 916-156-2250
          </a>
          <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 hover:text-indigo-400 transition-colors">
            <Globe size={16} /> {company.website.replace(/^https?:\/\//, '')}
          </a>
        </div>
      </div>
    </footer>
  );
}
