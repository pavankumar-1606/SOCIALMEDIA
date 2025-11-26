import React, { useState } from 'react';
import { MOCK_POSTS } from '../services/mockData';

type Tab = 'Posts' | 'Videos' | 'Music' | 'Blogs';

const Explore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Posts');

  // Generate more dummy content for grid effect
  const exploreContent = Array(12).fill(MOCK_POSTS[0]).map((p, i) => ({
      ...p, 
      id: `exp-${i}`, 
      mediaUrl: `https://picsum.photos/400/400?random=${i + 20}`
  }));

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Search is handled in sidebar drawer, but we can add tabs here */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
        {['Posts', 'Videos', 'Music', 'Blogs'].map((tab) => (
             <button
                key={tab}
                onClick={() => setActiveTab(tab as Tab)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
             >
                {tab}
             </button>
        ))}
      </div>

      <div className="masonry-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
         {exploreContent.map((post, idx) => (
             <div 
               key={post.id} 
               className={`relative group overflow-hidden bg-gray-200 dark:bg-gray-800 ${idx % 3 === 0 ? 'row-span-2 col-span-2' : 'aspect-square'}`}
             >
               <img src={post.mediaUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                   <p className="text-white text-sm font-bold truncate">{post.content}</p>
               </div>
             </div>
         ))}
      </div>
    </div>
  );
};

export default Explore;