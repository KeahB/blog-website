import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    author: 'You',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      readingTime: Math.max(1, Math.ceil(formData.content.split(' ').length / 200)),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      reactions: { like: 0, love: 0, wow: 0, insightful: 0 }
    };

    const existingPosts = JSON.parse(localStorage.getItem('user_posts') || '[]');
    localStorage.setItem('user_posts', JSON.stringify([newPost, ...existingPosts]));
    navigate('/');
  };

  return (
    <div className="reading-container pt-16">
      <motion.button 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-tertiary hover:text-black mb-16 transition-all uppercase px-6 py-3 bg-gray-50 rounded-full border border-gray-100"
      >
        <ArrowLeft size={14} />
        Discard
      </motion.button>

      <header className="mb-16">
        <div className="flex items-center gap-4 mb-6">
           <span className="handwriting text-4xl text-tertiary">Express your</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-black font-sans uppercase leading-none">
          NEW <span className="text-tertiary opacity-20">STORY</span>
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12 pb-32">
        <div className="space-y-4">
          <label className="text-[10px] font-black tracking-[0.3em] uppercase text-tertiary ml-6">Story Title</label>
          <input 
            required
            type="text"
            placeholder="Give your thoughts a name..."
            className="w-full text-4xl md:text-5xl font-extrabold tracking-tighter border-none focus:ring-0 placeholder:text-gray-100 p-6 rounded-[2rem] bg-gray-50/50"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black tracking-[0.3em] uppercase text-tertiary ml-6">Featured Image URL (Optional)</label>
          <div className="relative">
            <input 
              type="text"
              placeholder="Paste a photo URL from Unsplash or similar..."
              className="w-full text-lg font-medium border-none focus:ring-0 placeholder:text-gray-200 p-6 pl-14 rounded-full bg-gray-50/50"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
            <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-tertiary" size={20} />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black tracking-[0.3em] uppercase text-tertiary ml-6">The Hook (Excerpt)</label>
          <textarea 
            required
            placeholder="A brief glimpse into the story..."
            className="w-full text-xl font-medium border-none focus:ring-0 placeholder:text-gray-200 p-8 rounded-[2.5rem] bg-gray-50/30 h-32 resize-none"
            value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black tracking-[0.3em] uppercase text-tertiary ml-6">Content</label>
          <textarea 
            required
            placeholder="Write your story here... Use ### for headings and > for quotes."
            className="w-full text-2xl font-serif border-none focus:ring-0 placeholder:text-gray-100 p-10 rounded-[3rem] bg-white border border-gray-100 h-[500px] shadow-sm"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black tracking-[0.3em] uppercase text-tertiary ml-6">Tags</label>
            <input 
              type="text"
              placeholder="Design, Life (comma separated)"
              className="w-full text-sm font-bold border-none focus:ring-0 p-5 rounded-full bg-gray-50"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black tracking-[0.3em] uppercase text-tertiary ml-6">Author</label>
            <input 
              type="text"
              className="w-full text-sm font-bold border-none focus:ring-0 p-5 rounded-full bg-gray-50"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
            />
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-8 bg-black text-white rounded-[2rem] font-black tracking-[0.5em] uppercase text-xs flex items-center justify-center gap-4 shadow-2xl hover:shadow-black/20 transition-all"
        >
          <Save size={18} />
          Publish to Archive
        </motion.button>
      </form>
    </div>
  );
};

export default CreatePost;
