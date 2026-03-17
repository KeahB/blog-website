import { useState, useMemo, useEffect } from 'react';
import postsData from '../data/posts.json';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import { PostSkeleton } from '../components/Skeleton';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from '../assets/hero-bg.png';
import { ChevronDown } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    // Combine JSON posts with local storage posts
    const userPosts = JSON.parse(localStorage.getItem('user_posts') || '[]');
    setAllPosts([...userPosts, ...postsData]);

    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set();
    allPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = activeTag === 'All' || post.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, activeTag, allPosts]);

  return (
    <div className="w-full">
      {/* Full-Width Hero Section */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full h-screen mb-32 relative overflow-hidden group flex items-center justify-center pt-24"
      >
        {/* Background Image Layer with Parallax */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[3000ms] ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${heroImage})`, y: y1 }}
        />
        
        {/* Advanced Overlay with Gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/20 via-white/40 to-white backdrop-blur-[0.5px]" />

        <div className="container mx-auto px-8 max-w-7xl relative z-20 text-center">
          <motion.div
             initial={{ y: 40, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="handwriting text-5xl md:text-7xl text-black block mb-12 drop-shadow-sm opacity-80"
            >
              Curated Stories & Soft Lines
            </motion.span>
            
            <h1 className="text-[12vw] md:text-[14rem] font-black mb-12 tracking-[-0.04em] text-black font-sans uppercase leading-[0.85] flex flex-col items-center">
              <span className="relative">
                SOFT
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
                  className="absolute -bottom-2 left-0 h-[2px] bg-black opacity-10"
                />
              </span>
              <span className="text-gray-400 opacity-20 font-thin italic -mt-4 md:-mt-8">LINES</span>
            </h1>


            <motion.div 
              style={{ opacity }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-4 text-tertiary"
            >
              <span className="text-[10px] font-black tracking-[0.5em] uppercase ml-2 opacity-40">Begin Exploration</span>
              <ChevronDown size={24} className="opacity-40" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <div className="reading-container">
        <div className="mb-24" id="archive">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <TagFilter tags={allTags} activeTag={activeTag} setActiveTag={setActiveTag} />
        </div>

        <div className="space-y-24 pb-48">
          {isLoading ? (
            [...Array(3)].map((_, i) => <PostSkeleton key={i} />)
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-gray-50 rounded-[4rem] border border-gray-100 shadow-inner"
            >
              <p className="text-secondary text-2xl font-serif italic mb-12 opacity-60">Your search didn't reveal any stories in the archive.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveTag('All');}}
                className="text-[11px] font-black tracking-[0.5em] text-white bg-black uppercase px-20 py-6 rounded-full hover:shadow-2xl transition-all shadow-xl active:scale-95"
              >
                Reset Archive
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
