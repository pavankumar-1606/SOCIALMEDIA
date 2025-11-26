import React, { useState } from 'react';
import { Post } from '../types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(p => p - 1);
    } else {
      setLikesCount(p => p + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 md:border md:rounded-lg mb-4 md:mb-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img src={post.user.avatar} alt={post.user.username} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
          <div className="leading-tight">
             <div className="font-semibold text-sm flex items-center gap-1">
               {post.user.username} 
               {post.user.isVerified && <span className="text-blue-500">✓</span>}
               <span className="text-gray-400 font-normal text-xs">• {post.createdAt}</span>
             </div>
             {post.mediaUrl && post.mediaType !== 'none' && <div className="text-xs text-gray-500">Original Audio</div>}
          </div>
        </div>
        <button><MoreHorizontal size={20}/></button>
      </div>

      {/* Content */}
      <div className="px-3 pb-2 text-sm md:text-base">
        {post.content}
      </div>

      {/* Media */}
      {post.mediaType === 'image' && post.mediaUrl && (
        <div className="w-full aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden">
          <img src={post.mediaUrl} alt="Post content" className="w-full h-full object-cover" />
        </div>
      )}
       {post.mediaType === 'video' && post.mediaUrl && (
        <div className="w-full aspect-video bg-black flex items-center justify-center text-white">
          Video Player Placeholder
        </div>
      )}

      {/* Actions */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className="hover:opacity-70 transition-opacity">
              <Heart size={26} className={liked ? 'fill-red-500 text-red-500' : ''} />
            </button>
            <button className="hover:opacity-70 transition-opacity"><MessageCircle size={26} /></button>
            <button className="hover:opacity-70 transition-opacity"><Send size={26} /></button>
          </div>
          <button><Bookmark size={26} /></button>
        </div>
        <div className="font-bold text-sm mb-1">{likesCount.toLocaleString()} likes</div>
        {post.comments > 0 && (
          <div className="text-gray-500 text-sm cursor-pointer">View all {post.comments} comments</div>
        )}
        <div className="flex items-center gap-2 mt-2">
           <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
           <input type="text" placeholder="Add a comment..." className="bg-transparent text-sm w-full outline-none" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;