import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowUpRight, Image as ImageIcon } from 'lucide-react';

const PostCard = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="group"
    >
      <Link to={`/post/${post.id}`} className="block">
        <div className="flex flex-col md:flex-row gap-10 p-10 rounded-[3rem] bg-transparent hover:bg-gray-50 transition-all duration-500 border border-transparent hover:border-gray-100">
          
          {post.image && (
            <div className="md:w-1/3 aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100 relative group-hover:shadow-2xl transition-all duration-500">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          )}

          <div className={`flex flex-col justify-center gap-6 ${post.image ? 'md:w-2/3' : 'w-full'}`}>
            <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-tertiary uppercase">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <div className="flex items-center gap-1">
                <Clock size={10} />
                <span>{post.readingTime} MIN</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-primary group-hover:text-black transition-colors duration-300 leading-[1.1] font-sans tracking-tighter">
              {post.title}
            </h2>

            <p className="text-secondary leading-[1.8] text-xl font-serif font-medium opacity-90 group-hover:opacity-100 transition-opacity line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center p-2 transition-transform duration-500 group-hover:scale-110">
                  <User size={16} className="text-primary" />
                </div>
                <span className="text-[10px] font-black text-primary tracking-widest uppercase">{post.author}</span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-white bg-black px-8 py-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 uppercase">
                <span>Open Story</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
