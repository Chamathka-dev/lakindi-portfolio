// src/app/admin/page.js
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [artworks, setArtworks] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Portrait');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // Check auth and fetch artworks on load
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        fetchArtworks();
      }
    };
    checkAuth();
  }, [router]);

  const fetchArtworks = async () => {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: true }); // <-- Change this to true
      
    if (!error) setArtworks(data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert('Please provide a title and an image.');

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('artworks')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('artworks')
        .insert([
          {
            title: title,
            category: category,
            image_url: publicUrlData.publicUrl,
          }
        ]);

      if (dbError) throw dbError;

      setTitle('');
      setFile(null);
      alert('Artwork uploaded successfully!');
      fetchArtworks();

    } catch (error) {
      alert('Error uploading artwork: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    if (!confirm('Are you sure you want to delete this artwork?')) return;
    await supabase.from('artworks').delete().eq('id', id);
    fetchArtworks();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-[#2D1B42]">Portfolio Manager</h1>
          <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 font-medium transition-colors">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-8">
              <h2 className="text-2xl font-bold text-[#2D1B42] mb-6">Upload New Art</h2>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5C3A93] outline-none text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5C3A93] outline-none text-gray-900 bg-white"
                  >
                    <option value="Portrait">Portrait</option>
                    <option value="Couple">Couple</option>
                    <option value="Scenery">Scenery</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-[#5C3A93] hover:file:bg-purple-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full mt-4 bg-[#5C3A93] text-white py-3 rounded-lg font-medium hover:bg-[#4A2E76] transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload to Portfolio'}
                </button>
              </form>
            </div>
          </div>

          {/* Existing Artworks Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#2D1B42] mb-6">Current Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {artworks.map((art) => (
                <div key={art.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 group">
                  <div className="relative aspect-[4/5] bg-gray-100">
                    <img src={art.image_url} alt={art.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => handleDelete(art.id, art.image_url)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{art.title}</h3>
                    <p className="text-xs text-gray-500">{art.category}</p>
                  </div>
                </div>
              ))}
            </div>
            {artworks.length === 0 && (
              <div className="bg-white p-10 rounded-2xl border border-gray-200 text-center shadow-sm">
                <p className="text-gray-600 font-medium">No artworks uploaded yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}