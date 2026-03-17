import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search the archive..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-16 pr-8 py-5 bg-black border-none rounded-full focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all text-sm font-bold text-white placeholder:text-gray-500 shadow-2xl"
      />
    </div>
  );
};

export default SearchBar;
