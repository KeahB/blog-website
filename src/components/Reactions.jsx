import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Heart, Star, Zap } from 'lucide-react';

const Reactions = ({ postId }) => {
  const [reactions, setReactions] = useState({
    like: 0,
    love: 0,
    wow: 0,
    insightful: 0
  });
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`reactions_${postId}`) || 'null');
    const userSaved = localStorage.getItem(`user_reaction_${postId}`);
    
    if (saved) {
      setReactions(saved);
    } else {
      // Default counts for mock posts
      setReactions({
        like: Math.floor(Math.random() * 20) + 5,
        love: Math.floor(Math.random() * 15) + 3,
        wow: Math.floor(Math.random() * 10) + 2,
        insightful: Math.floor(Math.random() * 25) + 10
      });
    }
    setUserReaction(userSaved);
  }, [postId]);

  const handleReaction = (type) => {
    let newReactions = { ...reactions };
    let newType = type;

    if (userReaction === type) {
      newReactions[type] -= 1;
      newType = null;
    } else {
      if (userReaction) {
        newReactions[userReaction] -= 1;
      }
      newReactions[type] += 1;
    }

    setReactions(newReactions);
    setUserReaction(newType);
    localStorage.setItem(`reactions_${postId}`, JSON.stringify(newReactions));
    if (newType) {
      localStorage.setItem(`user_reaction_${postId}`, newType);
    } else {
      localStorage.removeItem(`user_reaction_${postId}`);
    }
  };

  const reactionTypes = [
    { type: 'like', icon: ThumbsUp, label: 'Appreciate', color: 'text-blue-500' },
    { type: 'love', icon: Heart, label: 'Love', color: 'text-rose-500' },
    { type: 'insightful', icon: Star, label: 'Insightful', color: 'text-amber-500' },
    { type: 'wow', icon: Zap, label: 'Modern', color: 'text-purple-500' }
  ];

  return (
    <div className="py-12 border-y border-gray-100 mt-20">
      <div className="flex flex-col items-center gap-8">
        <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-tertiary">How did this story resonate?</h4>
        
        <div className="flex flex-wrap justify-center gap-4">
          {reactionTypes.map(({ type, icon: Icon, label, color }) => (
            <button
              key={type}
              onClick={() => handleReaction(type)}
              className={`flex flex-col items-center gap-3 px-8 py-6 rounded-[2rem] transition-all duration-300 border ${
                userReaction === type 
                  ? `${color} bg-gray-50 border-gray-200 scale-105 shadow-inner` 
                  : 'text-tertiary hover:text-black hover:bg-gray-50 border-transparent'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: userReaction === type ? 0 : 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={28} fill={userReaction === type ? 'currentColor' : 'none'} />
              </motion.div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                <span className="text-xs font-bold mt-1 opacity-60">{reactions[type]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reactions;
