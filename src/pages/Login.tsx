import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, hasSupabaseConfig } from '../lib/supabase';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (hasSupabaseConfig) {
      try {
        // Query the custom 'profiles' table directly to check credentials
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .eq('password', password)
          .single();
        
        if (profileError || !profileData) {
          console.error("Login error:", profileError);
          throw new Error("Invalid username or password.");
        }

        // Store basic user info in localStorage to keep them "logged in"
        localStorage.setItem('currentUser', JSON.stringify({
          username: profileData.username,
          name: profileData.name,
          view: profileData.view
        }));

        const userView = profileData.view;
        if (userView === 'admin') {
          navigate('/admin');
        } else if (userView === 'demo') {
          navigate('/showcase');
        } else {
          throw new Error("Invalid view parameter in database. Must be 'admin' or 'demo'.");
        }
      } catch (err: any) {
        setError(err.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    } else {
      // --- MOCK AUTH FALLBACK (When Supabase is not connected) ---
      setTimeout(() => {
        if (username === 'admin' && password === 'admin123') {
          localStorage.setItem('currentUser', JSON.stringify({ username: 'admin', name: 'Admin User', view: 'admin' }));
          navigate('/admin');
        } else if (username === 'demo' && password === 'demo1234') {
          localStorage.setItem('currentUser', JSON.stringify({ username: 'demo', name: 'Demo User', view: 'demo' }));
          navigate('/showcase');
        } else {
          setError('Invalid mock credentials. Check the hint below.');
        }
        setLoading(false);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 mb-4 shadow-lg shadow-indigo-500/30">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">OmniServe AI</h1>
          <p className="text-slate-400 mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        {!hasSupabaseConfig && (
          <div className="mb-6 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-sm text-indigo-300">
            <p className="font-semibold mb-1">Mock Credentials (Supabase not connected):</p>
            <ul className="list-disc pl-4 space-y-1 text-indigo-400/80">
              <li>Demo View: <code>demo</code> / <code>demo1234</code></li>
              <li>Admin View: <code>admin</code> / <code>admin123</code></li>
            </ul>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2 text-red-400 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500 transition-colors"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/25 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}


