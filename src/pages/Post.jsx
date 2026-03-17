import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, User, Share2, Bookmark, Check } from 'lucide-react';
import postsData from '../data/posts.json';
import ReadingProgressBar from '../components/ReadingProgressBar';
import Reactions from '../components/Reactions';
import { useState, useEffect } from 'react';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Check both sources for the post
    const userPosts = JSON.parse(localStorage.getItem('user_posts') || '[]');
    const combined = [...userPosts, ...postsData];
    const foundPost = combined.find(p => p.id === id);
    setPost(foundPost);

    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(saved.includes(id));

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  const toggleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = saved.filter(b => b !== id);
    } else {
      newBookmarks = [...saved, id];
    }
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  if (!post) {
    return (
      <div className="reading-container py-32 text-center">
        <h2 className="text-4xl font-extrabold mb-8 tracking-tighter">Story not found</h2>
        <Link to="/" className="inline-block px-10 py-4 bg-black text-white font-black tracking-widest uppercase text-xs rounded-full">
          Back to the Archive
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative bg-white"
    >
      <ReadingProgressBar />
      
      <div className="reading-container pt-16">
        <motion.div
           initial={{ x: -10, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-tertiary hover:text-black mb-16 transition-all uppercase px-6 py-3 bg-gray-50 rounded-full border border-gray-100">
            <ArrowLeft size={14} />
            The Archive
          </Link>
        </motion.div>

        <header className="mb-24">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-4 text-[10px] font-black tracking-[0.2em] text-tertiary uppercase mb-10"
          >
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{post.readingTime} MIN READ</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-8xl font-black text-black mb-12 tracking-tighter leading-[1] font-sans"
          >
            {post.title}
          </motion.h1>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.7, duration: 1 }}
             className="flex items-center justify-between py-12 border-y border-gray-100 mb-16"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                <User size={28} className="text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-black tracking-[0.2em] uppercase">{post.author}</span>
                <span className="text-2xl text-secondary font-handwriting lowercase mt-1">Observer</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleBookmark}
                className={`p-5 rounded-3xl border transition-all duration-500 shadow-sm ${
                  isBookmarked 
                    ? 'bg-black border-black text-white scale-110 shadow-xl' 
                    : 'border-gray-200 text-tertiary hover:border-black bg-white hover:text-black hover:shadow-md'
                }`}
              >
                {isBookmarked ? <Check size={20} /> : <Bookmark size={20} />}
              </button>
              <button className="p-5 rounded-3xl border border-gray-200 text-tertiary hover:border-black bg-white hover:text-black transition-all duration-500 shadow-sm hover:shadow-md">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>

          {post.image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl mb-24 border border-gray-100"
            >
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </motion.div>
          )}
        </header>

        <article className="blog-content max-w-none mb-32 text-secondary">
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('###')) {
              return (
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={i} 
                  className="text-4xl font-extrabold mt-28 mb-12 text-black font-sans tracking-tighter"
                >
                   {para.replace('### ', '')}
                </motion.h3>
              );
            }
            if (para.startsWith('>')) {
              return (
                <motion.blockquote 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  key={i} 
                  className="border-l-[10px] border-black pl-12 py-10 my-24 italic text-3xl text-primary leading-relaxed font-serif bg-gray-50 rounded-r-[2rem] shadow-sm"
                >
                  {para.replace('> ', '').split('—').map((line, li) => (
                    <span key={li} className={li > 0 ? "block text-[10px] not-italic font-black tracking-[0.5em] uppercase mt-10 opacity-60 ml-1" : ""}>
                      {line}
                    </span>
                  ))}
                </motion.blockquote>
              );
            }
            return (
               <motion.p 
                 initial={{ opacity: 0, y: 15 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 key={i} 
                 className="mb-12 leading-[2] text-2xl font-medium first-letter:text-8xl first-letter:font-black first-letter:mr-6 first-letter:float-left first-letter:font-sans first-letter:leading-[0.8] first-letter:mt-4 text-[#0a0a0a]"
               >
                 {para}
               </motion.p>
            );
          })}
        </article>

        <Reactions postId={post.id} />

        <div className="mt-20 pt-20 border-t border-gray-100 pb-32">
          <div className="flex flex-wrap gap-4">
            {post.tags.map(tag => (
              <span key={tag} className="px-6 py-3 bg-white border border-gray-200 rounded-full text-[10px] font-black tracking-[0.2em] text-tertiary uppercase hover:bg-black hover:text-white transition-all cursor-default shadow-sm hover:shadow-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-12 right-12 p-6 bg-black text-white rounded-[2rem] shadow-2xl z-50 hover:scale-110 active:scale-95 transition-all"
          >
            <ArrowLeft size={28} className="rotate-90" strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Post;
