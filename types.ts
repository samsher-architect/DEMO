import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Plus, Trash2, LogOut, Layout, Save, AlertCircle, Upload, RefreshCw, Pencil } from 'lucide-react';
import { Demo } from '../types';
import { MOCK_DEMOS } from '../lib/mockData';
import { supabase, hasSupabaseConfig } from '../lib/supabase';

export default function Admin() {
  const navigate = useNavigate();
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoSource, setVideoSource] = useState<'url' | 'file'>('url');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [tagsInput, setTagsInput] = useState('');
  const [pointsInput, setPointsInput] = useState('');

  useEffect(() => {
    fetchDemos();
  }, []);

  const fetchDemos = async () => {
    setLoading(true);
    if (hasSupabaseConfig) {
      try {
        const { data, error } = await supabase.from('demos').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setDemos(data || []);
      } catch (err) {
        console.error("Error fetching demos:", err);
        setDemos(MOCK_DEMOS); // Fallback
      }
    } else {
      setDemos(MOCK_DEMOS);
    }
    setLoading(false);
  };

  const handleEdit = (demo: Demo) => {
    setEditingId(demo.id);
    setTitle(demo.title);
    setDescription(demo.description);
    setVideoUrl(demo.video_url);
    setVideoSource('url'); // Always default to URL when editing, they can change to file if they want to replace it
    setVideoFile(null);
    setTagsInput(demo.tags.join(', '));
    setPointsInput(demo.points.join('\n'));
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalVideoUrl = videoUrl;

    if (hasSupabaseConfig) {
      setUploading(true);
      try {
        if (videoSource === 'file' && videoFile) {
          const fileExt = videoFile.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('videos')
            .upload(filePath, videoFile);

          if (uploadError) {
            throw uploadError;
          }

          const { data } = supabase.storage.from('videos').getPublicUrl(filePath);
          finalVideoUrl = data.publicUrl;
        }

        const newDemo = {
          title,
          description,
          video_url: finalVideoUrl,
          tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
          points: pointsInput.split('\n').map(p => p.trim()).filter(Boolean),
        };

        if (editingId) {
          const { data, error } = await supabase.from('demos').update(newDemo).eq('id', editingId).select();
          if (error) throw error;
          if (!data || data.length === 0) {
            throw new Error("Update failed. No rows were modified. This is usually because Row Level Security (RLS) is blocking the UPDATE operation. Please add an UPDATE policy to your 'demos' table in Supabase.");
          }
        } else {
          const { error } = await supabase.from('demos').insert([newDemo]);
          if (error) throw error;
        }
        
        fetchDemos();
        setIsAdding(false);
        resetForm();
      } catch (err: any) {
        console.error("Error saving demo:", err);
        alert(`Failed to save demo: ${err.message || err.error_description || 'Unknown error'}\n\nCommon fixes:\n1. Check if Row Level Security (RLS) is blocking operations on the 'demos' table.\n2. Ensure the 'videos' storage bucket exists and is public.\n3. Verify your table schema matches exactly.`);
      } finally {
        setUploading(false);
      }
    } else {
      // Mock add/edit
      if (videoSource === 'file' && videoFile) {
        finalVideoUrl = URL.createObjectURL(videoFile);
      }

      const newDemo = {
        title,
        description,
        video_url: finalVideoUrl,
        tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
        points: pointsInput.split('\n').map(p => p.trim()).filter(Boolean),
      };

      if (editingId) {
        setDemos(demos.map(d => d.id === editingId ? { ...d, ...newDemo } : d));
      } else {
        const mockDemo: Demo = {
          id: Math.random().toString(),
          ...newDemo,
          created_at: new Date().toISOString()
        };
        setDemos([mockDemo, ...demos]);
      }
      
      setIsAdding(false);
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this demo?')) return;

    if (hasSupabaseConfig) {
      try {
        const { data, error } = await supabase.from('demos').delete().eq('id', id).select();
        if (error) throw error;
        if (!data || data.length === 0) {
          throw new Error("Delete failed. No rows were deleted. This is usually because Row Level Security (RLS) is blocking the DELETE operation. Please add a DELETE policy to your 'demos' table in Supabase.");
        }
        fetchDemos();
      } catch (err: any) {
        console.error("Error deleting demo:", err);
        alert(`Failed to delete demo: ${err.message || 'Unknown error'}`);
      }
    } else {
      setDemos(demos.filter(d => d.id !== id));
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setVideoSource('url');
    setVideoUrl('');
    setVideoFile(null);
    setTagsInput('');
    setPointsInput('');
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <Shield size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-slate-500">OmniServe AI Content Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/showcase')}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <Layout size={18} />
              View Showcase
            </button>
            <div className="w-px h-6 bg-slate-200"></div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasSupabaseConfig && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-800">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold">Supabase Not Configured</h3>
              <p className="text-sm mt-1">
                You are currently viewing mock data. To make this dynamic, connect your Supabase project by adding <code className="bg-amber-100 px-1 rounded">VITE_SUPABASE_URL</code> and <code className="bg-amber-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to your environment variables.
              </p>
              <p className="text-sm mt-2 font-medium">
                Required Table Schema:
                <br/>
                Table Name: <code>demos</code>
                <br/>
                Columns: <code>id</code> (uuid), <code>title</code> (text), <code>description</code> (text), <code>video_url</code> (text), <code>tags</code> (text[]), <code>points</code> (text[]), <code>created_at</code> (timestamp)
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Manage Demos</h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchDemos}
              disabled={loading}
              className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button 
              onClick={() => {
                if (isAdding) {
                  setIsAdding(false);
                  resetForm();
                } else {
                  setIsAdding(true);
                }
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              {isAdding ? 'Cancel' : <><Plus size={18} /> Add New Demo</>}
            </button>
          </div>
        </div>

        {isAdding && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-bold mb-6">{editingId ? 'Edit Demo' : 'Create New Demo'}</h3>
            <form onSubmit={handleAddDemo} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Sales Agent Demo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Video Source</label>
                  <div className="flex gap-4 mb-3">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="videoSource" checked={videoSource === 'url'} onChange={() => setVideoSource('url')} className="text-indigo-600 focus:ring-indigo-500" />
                      External URL
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="videoSource" checked={videoSource === 'file'} onChange={() => setVideoSource('file')} className="text-indigo-600 focus:ring-indigo-500" />
                      Upload File
                    </label>
                  </div>
                  {videoSource === 'url' ? (
                    <input key="url-input" required type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://..." />
                  ) : (
                    <input key="file-input" required type="file" accept="video/*" onChange={e => setVideoFile(e.target.files?.[0] || null)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Brief overview of the demo..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
                  <input required type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Sales, NLP, Automation" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Key Points (one per line)</label>
                  <textarea required value={pointsInput} onChange={e => setPointsInput(e.target.value)} rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Point 1&#10;Point 2&#10;Point 3" />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button disabled={uploading} type="submit" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                  {uploading ? (
                    <span className="flex items-center gap-2"><Upload size={18} className="animate-bounce" /> Uploading...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Save size={18} /> {editingId ? 'Update Demo' : 'Save Demo'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading demos...</div>
          ) : demos.length === 0 ? (
            <div className="p-12 text-center text-slate-500">No demos found. Create one above!</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Demo Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {demos.map((demo) => (
                  <tr key={demo.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{demo.title}</div>
                      <div className="text-sm text-slate-500 mt-1 line-clamp-1 max-w-md">{demo.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {demo.tags.map((tag, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(demo)}
                          className="text-slate-400 hover:text-indigo-600 transition-colors p-2"
                          title="Edit Demo"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(demo.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-2"
                          title="Delete Demo"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
