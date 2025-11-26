import React from 'react';
import PostCard from '../components/PostCard';
import { MOCK_POSTS, MOCK_USERS } from '../services/mockData';

const Home: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto pt-6 px-4 pb-20">
        {/* Stories / Quick Status Bar could go here */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-8 pb-2">
            <div className="flex flex-col items-center gap-1 min-w-[70px]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-red-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center">
                        <span className="text-2xl">+</span>
                    </div>
                </div>
                <span className="text-xs truncate w-full text-center">Your Story</span>
            </div>
            {MOCK_USERS.map(user => (
                <div key={user.id} className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                        <img src={user.avatar} className="w-full h-full rounded-full border-2 border-white dark:border-black object-cover" alt="" />
                    </div>
                    <span className="text-xs truncate w-full text-center">{user.username}</span>
                </div>
            ))}
        </div>

        {/* Posts Feed */}
        <div className="flex flex-col">
            {MOCK_POSTS.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
            {/* Infinite Scroll Loader Simulation */}
            <div className="p-4 text-center text-gray-400">
                <span className="animate-pulse">Loading more posts...</span>
            </div>
        </div>
    </div>
  );
};

export default Home;