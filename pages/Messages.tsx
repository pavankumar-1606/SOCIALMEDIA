import React, { useState } from 'react';
import { MOCK_CHATS, CURRENT_USER } from '../services/mockData';
import { Edit, Phone, Video, Info, Send, Smile } from 'lucide-react';

const Messages: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');

  const activeChat = MOCK_CHATS.find(c => c.id === selectedChatId);

  return (
    <div className="flex h-full bg-white dark:bg-black">
      {/* Chat List (Left) */}
      <div className={`${selectedChatId ? 'hidden md:flex' : 'flex'} w-full md:w-96 flex-col border-r border-gray-200 dark:border-gray-800`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-xl">
                {CURRENT_USER.username} <span className="text-xs align-top text-red-500">▼</span>
            </div>
            <Edit size={24} />
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Messages</h3>
                <span className="text-gray-500 text-sm font-semibold">Requests</span>
             </div>
             
             {MOCK_CHATS.map(chat => (
                 <div 
                   key={chat.id} 
                   onClick={() => setSelectedChatId(chat.id)}
                   className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 ${selectedChatId === chat.id ? 'bg-gray-100 dark:bg-gray-900' : ''}`}
                 >
                    <div className="relative">
                        <img src={chat.participant.avatar} className="w-14 h-14 rounded-full" alt="" />
                        {chat.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-black rounded-full"></div>}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="font-semibold">{chat.participant.fullName}</div>
                        <div className="text-sm text-gray-500 truncate">
                            {chat.unreadCount > 0 ? <span className="font-bold text-black dark:text-white">{chat.lastMessage}</span> : chat.lastMessage}
                            <span className="mx-1">·</span>
                            {chat.lastMessageTime}
                        </div>
                    </div>
                    {chat.unreadCount > 0 && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                 </div>
             ))}
        </div>
      </div>

      {/* Conversation (Right) */}
      <div className={`${!selectedChatId ? 'hidden md:flex' : 'flex'} flex-1 flex-col h-full relative`}>
         {selectedChatId && activeChat ? (
             <>
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-black z-10">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden mr-2" onClick={() => setSelectedChatId(null)}>←</button>
                        <img src={activeChat.participant.avatar} className="w-8 h-8 rounded-full" alt="" />
                        <div>
                            <div className="font-bold text-sm">{activeChat.participant.fullName}</div>
                            <div className="text-xs text-gray-500">{activeChat.isOnline ? 'Active now' : 'Active 1h ago'}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-800 dark:text-white">
                        <Phone size={24}/>
                        <Video size={24}/>
                        <Info size={24}/>
                    </div>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    <div className="text-center text-xs text-gray-400 my-4">Today</div>
                    
                    {/* Mock Messages */}
                    <div className="self-start max-w-[70%] bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none">
                        Hey! How have you been?
                    </div>
                    <div className="self-end max-w-[70%] bg-primary text-white p-3 rounded-2xl rounded-br-none">
                        Pretty good! Just working on the new Stream Wave app.
                    </div>
                    <div className="self-start max-w-[70%] bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none">
                        That sounds awesome. Can't wait to see it.
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 m-4 mb-20 md:mb-4 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center gap-2">
                    <button className="p-2 bg-blue-500 rounded-full text-white"><Smile size={20}/></button>
                    <input 
                      type="text" 
                      placeholder="Message..." 
                      className="flex-1 bg-transparent outline-none"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                    />
                    {inputMessage && <button className="text-primary font-bold">Send</button>}
                    {!inputMessage && <button><ImageIcon size={24} className="text-gray-500"/></button>}
                </div>
             </>
         ) : (
             <div className="flex-1 flex flex-col items-center justify-center">
                 <div className="w-24 h-24 rounded-full border-2 border-black dark:border-white flex items-center justify-center mb-4">
                     <Send size={48} />
                 </div>
                 <h2 className="text-xl font-light">Your Messages</h2>
                 <p className="text-gray-500 text-sm mt-2">Send private photos and messages to a friend.</p>
                 <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg font-bold">Send Message</button>
             </div>
         )}
      </div>
    </div>
  );
};

// Helper for icon
const ImageIcon = ({size, className}: {size: number, className: string}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
)

export default Messages;