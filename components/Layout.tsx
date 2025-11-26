import React, { useState } from 'react';
import { 
  Home, Search, Compass, MessageCircle, Settings, 
  PlusSquare, Bell, User as UserIcon, LogOut, X, Sun, Moon,
  Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_USERS, MOCK_NOTIFICATIONS } from '../services/mockData';
import { User, ViewState } from '../types';
import CreatePostModal from './CreatePostModal';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, toggleTheme, isDarkMode }) => {
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['react js', 'gemini api', 'travel vlogs']);

  // Handle Search Logic
  const filteredUsers = searchQuery 
    ? MOCK_USERS.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setIsNotifOpen(false);
  };

  const handleNotifClick = () => {
    setIsNotifOpen(!isNotifOpen);
    setIsSearchOpen(false);
  };

  return (
    <div className={`flex h-screen w-full ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 overflow-hidden`}>
      {/* LEFT SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 z-20">
        <div className="flex items-center gap-2 mb-8 px-2 cursor-pointer" onClick={() => onNavigate(ViewState.HOME)}>
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">SW</div>
            <h1 className="text-xl font-bold tracking-tight">Stream Wave</h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <NavItem icon={<Home size={24}/>} label="Home" active={activeView === ViewState.HOME} onClick={() => onNavigate(ViewState.HOME)} />
          <NavItem icon={<Search size={24}/>} label="Search" active={false} onClick={handleSearchClick} />
          <NavItem icon={<Compass size={24}/>} label="Explore" active={activeView === ViewState.EXPLORE} onClick={() => onNavigate(ViewState.EXPLORE)} />
          <NavItem icon={<MessageCircle size={24}/>} label="Messages" active={activeView === ViewState.MESSAGES} onClick={() => onNavigate(ViewState.MESSAGES)} />
          <NavItem icon={<Bell size={24}/>} label="Notifications" active={false} onClick={handleNotifClick} badge={MOCK_NOTIFICATIONS.filter(n => !n.read).length} />
          <NavItem icon={<UserIcon size={24}/>} label="Profile" active={activeView === ViewState.PROFILE} onClick={() => onNavigate(ViewState.PROFILE)} />
          <NavItem icon={<Settings size={24}/>} label="Settings" active={activeView === ViewState.SETTINGS} onClick={() => onNavigate(ViewState.SETTINGS)} />
          
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all"
          >
            <PlusSquare size={20} />
            <span>Create</span>
          </button>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={logout} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500">
                <LogOut size={20} />
            </button>
        </div>
      </aside>

      {/* SEARCH DRAWER */}
      {isSearchOpen && (
        <div className="absolute left-64 top-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-2xl z-30 transform transition-transform duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <h2 className="font-bold text-xl">Search</h2>
            <button onClick={() => setIsSearchOpen(false)}><X size={24} /></button>
          </div>
          <div className="p-4">
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded-lg outline-none focus:ring-2 focus:ring-primary mb-6"
            />

            {searchQuery ? (
               <div className="space-y-4">
                 <h3 className="font-semibold text-gray-500 text-sm">Results</h3>
                 {filteredUsers.length > 0 ? filteredUsers.map(u => (
                   <div key={u.id} className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg cursor-pointer" onClick={() => onNavigate(ViewState.PROFILE)}>
                     <img src={u.avatar} alt={u.username} className="w-10 h-10 rounded-full object-cover" />
                     <div>
                       <div className="font-semibold text-sm">{u.username}</div>
                       <div className="text-xs text-gray-500">{u.fullName}</div>
                     </div>
                   </div>
                 )) : (
                   <div className="text-center text-gray-500 mt-4">No users found</div>
                 )}
               </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-500 text-sm">Recent</h3>
                  <button onClick={() => setRecentSearches([])} className="text-primary text-xs font-medium">Clear all</button>
                </div>
                {recentSearches.map(term => (
                  <div key={term} className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg cursor-pointer" onClick={() => setSearchQuery(term)}>
                    <span>{term}</span>
                    <X size={14} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* NOTIFICATIONS DRAWER (Right aligned usually or floating) */}
      {isNotifOpen && (
        <div className="absolute left-64 top-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-2xl z-30 transform transition-transform duration-300">
           <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <h2 className="font-bold text-xl">Notifications</h2>
            <button onClick={() => setIsNotifOpen(false)}><X size={24} /></button>
          </div>
          <div className="overflow-y-auto h-full pb-20">
            {MOCK_NOTIFICATIONS.map(notif => (
              <div key={notif.id} className={`p-4 border-b border-gray-100 dark:border-gray-800 flex gap-3 ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                <img src={notif.fromUser.avatar} className="w-10 h-10 rounded-full" alt="" />
                <div className="text-sm">
                  <span className="font-bold">{notif.fromUser.username}</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">
                    {notif.type === 'like' && 'liked your post.'}
                    {notif.type === 'comment' && 'commented: "Great shot!"'}
                    {notif.type === 'follow' && 'started following you.'}
                  </span>
                  <div className="text-xs text-gray-400 mt-1">{notif.createdAt}</div>
                </div>
                {notif.type === 'like' && <div className="ml-auto"><Heart size={16} fill="red" stroke="none"/></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CENTER CONTENT (FEED) */}
      <main className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <div className="font-bold text-lg">Stream Wave</div>
          <div className="flex gap-4">
             <Bell size={24} onClick={() => setIsNotifOpen(true)} />
             <MessageCircle size={24} onClick={() => onNavigate(ViewState.MESSAGES)} />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden flex justify-around items-center p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black sticky bottom-0 z-10">
           <Home size={24} onClick={() => onNavigate(ViewState.HOME)} className={activeView === ViewState.HOME ? 'text-primary' : ''}/>
           <Compass size={24} onClick={() => onNavigate(ViewState.EXPLORE)} className={activeView === ViewState.EXPLORE ? 'text-primary' : ''}/>
           <PlusSquare size={28} onClick={() => setIsCreateModalOpen(true)} className="text-secondary"/>
           <Search size={24} onClick={handleSearchClick} />
           <UserIcon size={24} onClick={() => onNavigate(ViewState.PROFILE)} className={activeView === ViewState.PROFILE ? 'text-primary' : ''}/>
        </div>
      </main>

      {/* RIGHT PANEL (Desktop) */}
      <aside className="hidden lg:block w-80 border-l border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black z-10">
         <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={user?.avatar} alt="Me" className="w-12 h-12 rounded-full border border-gray-200" />
              <div className="leading-tight">
                <div className="font-bold">{user?.username}</div>
                <div className="text-gray-500 text-sm">{user?.fullName}</div>
              </div>
            </div>
            <button className="text-xs font-bold text-primary" onClick={logout}>Switch</button>
         </div>

         <div className="flex justify-between items-center mb-4">
           <h3 className="text-gray-500 font-bold text-sm">Suggested for you</h3>
           <button className="text-xs font-bold">See All</button>
         </div>

         <div className="space-y-4">
            {MOCK_USERS.map(u => (
              <div key={u.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={u.avatar} className="w-10 h-10 rounded-full" alt={u.username} />
                  <div>
                    <div className="font-semibold text-sm hover:underline cursor-pointer">{u.username}</div>
                    <div className="text-xs text-gray-500">Suggested for you</div>
                  </div>
                </div>
                <button className="text-xs font-bold text-primary hover:text-blue-700">Follow</button>
              </div>
            ))}
         </div>
      </aside>

      {/* Floating Chat Button */}
      {activeView !== ViewState.MESSAGES && (
         <button 
           onClick={() => onNavigate(ViewState.MESSAGES)}
           className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
         >
           <MessageCircle size={28} />
           <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
         </button>
      )}

      {/* Modals */}
      {isCreateModalOpen && <CreatePostModal onClose={() => setIsCreateModalOpen(false)} />}
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: number }> = ({ icon, label, active, onClick, badge }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${active ? 'font-bold text-primary bg-gray-50 dark:bg-gray-900' : 'hover:bg-gray-50 dark:hover:bg-gray-900'}`}
  >
    <div className="relative">
      {icon}
      {badge ? <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">{badge}</span> : null}
    </div>
    <span className="hidden md:block text-lg">{label}</span>
  </div>
);

export default Layout;