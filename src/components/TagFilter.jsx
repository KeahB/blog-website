import { motion } from 'framer-motion';

const TagFilter = ({ tags, activeTag, setActiveTag }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      <button
        onClick={() => setActiveTag('All')}
        className={`px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${
          activeTag === 'All'
            ? 'bg-black text-white shadow-xl scale-105'
            : 'bg-gray-50 text-tertiary hover:bg-gray-100 hover:text-black border border-gray-100'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveTag(tag)}
          className={`px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${
            activeTag === tag
              ? 'bg-black text-white shadow-xl scale-105'
              : 'bg-gray-50 text-tertiary hover:bg-gray-100 hover:text-black border border-gray-100'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
