import React from 'react';
import { Settings, Grid, Bookmark, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_POSTS } from '../services/mockData';

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const userPosts = [...MOCK_POSTS, ...MOCK_POSTS]; // Duplicate to fill grid

  return (
    <div className="max-w-4xl mx-auto pt-8 px-4 pb-20">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-100 dark:border-gray-800">
            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <h2 className="text-xl md:text-2xl font-light">{user.username}</h2>
                <div className="flex gap-2">
                    <button className="bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-lg font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Edit Profile</button>
                    <button className="bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-lg font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700">View Archive</button>
                    <button className="p-1.5"><Settings size={20}/></button>
                </div>
            </div>

            <div className="flex justify-center md:justify-start gap-8 mb-4">
                <div className="text-center md:text-left"><span className="font-bold">{user.postsCount}</span> posts</div>
                <div className="text-center md:text-left"><span className="font-bold">{user.followers}</span> followers</div>
                <div className="text-center md:text-left"><span className="font-bold">{user.following}</span> following</div>
            </div>

            <div className="text-sm">
                <div className="font-bold">{user.fullName}</div>
                <div className="whitespace-pre-line">{user.bio}</div>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200 dark:border-gray-800 flex justify-center gap-12 mb-4">
         <button className="flex items-center gap-2 py-4 border-t border-black dark:border-white text-xs font-bold uppercase tracking-widest">
            <Grid size={12} /> Posts
         </button>
         <button className="flex items-center gap-2 py-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <Bookmark size={12} /> Saved
         </button>
         <button className="flex items-center gap-2 py-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <UserIcon size={12} /> Tagged
         </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {userPosts.map((post, idx) => (
             <div key={`${post.id}-${idx}`} className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden relative group cursor-pointer">
                 {post.mediaUrl ? (
                    <img src={post.mediaUrl} alt="" className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 p-2 text-xs text-center">{post.content.substring(0, 30)}...</div>
                 )}
                 
                 {/* Hover Overlay */}
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-6 text-white font-bold">
                    <span>♥ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                 </div>
             </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;