import React from 'react';
import { User, Lock, Heart, Bookmark, Video, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6">
       <h1 className="text-2xl font-bold mb-6">Settings</h1>

       <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <Section icon={<User size={20}/>} label="Edit Profile" />
          <Section icon={<Lock size={20}/>} label="Account Privacy" />
          <Section icon={<Heart size={20}/>} label="Liked Posts" />
          <Section icon={<Bookmark size={20}/>} label="Saved Posts" />
          <Section icon={<Video size={20}/>} label="Watched Videos" />
          
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 text-red-500 transition-colors text-left"
          >
             <LogOut size={20} />
             <span className="font-medium">Log Out</span>
          </button>
       </div>

       <div className="mt-8 text-center text-xs text-gray-400">
          Stream Wave v1.0.0
          <br/>
          &copy; 2024 Stream Wave Inc.
       </div>
    </div>
  );
};

const Section: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
            {icon}
            <span className="font-medium">{label}</span>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
    </div>
);

export default Settings;