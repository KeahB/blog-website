import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postsData from '../data/posts.json';
import PostCard from '../components/PostCard';
import { motion } from 'framer-motion';
import { Bookmark, ArrowLeft } from 'lucide-react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(saved);
  }, []);

  const bookmarkedPosts = postsData.filter(post => bookmarks.includes(post.id));

  return (
    <div className="reading-container pt-16 bg-white">
      <Link to="/" className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-tertiary hover:text-black mb-20 transition-all uppercase px-6 py-3 bg-gray-50 rounded-full border border-gray-100">
        <ArrowLeft size={14} />
        The Library
      </Link>

      <header className="mb-24">
        <div className="flex items-center gap-5 mb-8">
          <span className="handwriting text-5xl text-tertiary">Curated</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-black font-sans uppercase leading-none">
          SAVED <span className="text-tertiary opacity-20">LINES</span>
        </h1>
        <p className="mt-12 text-secondary text-2xl leading-relaxed max-w-md font-medium">
          Your personal collection of curated stories and quiet observations.
        </p>
      </header>

      <div className="space-y-24">
        {bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 bg-gray-50 rounded-[4rem] px-10 border border-dashed border-gray-200"
          >
            <Bookmark size={56} className="mx-auto mb-10 text-tertiary/20" strokeWidth={1} />
            <p className="text-secondary text-3xl font-serif italic mb-12">No stories preserved in your collection yet.</p>
            <Link to="/" className="inline-block px-12 py-5 bg-black text-white font-black tracking-[0.3em] uppercase text-[10px] rounded-full hover:shadow-2xl transition-all hover:-translate-y-2">
              Browse the Archive
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
