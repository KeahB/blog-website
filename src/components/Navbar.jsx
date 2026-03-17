import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="reading-container flex justify-between items-center py-6">
        <Link to="/" className="text-2xl font-black tracking-tighter text-black hover:opacity-70 transition-opacity">
          SOFT<span className="text-gray-400 font-light ml-1">LINES</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/create" className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-500 hover:text-black transition-colors">
            New Post
          </Link>
          <Link to="/" className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-500 hover:text-black transition-colors hidden sm:block">
            Archive
          </Link>
          <Link to="/bookmarks" className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all group">
            <Bookmark size={18} className="text-gray-600 group-hover:text-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
