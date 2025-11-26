import { User, Post, Notification, ChatConversation } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'alex_wave',
  fullName: 'Alex River',
  avatar: 'https://picsum.photos/200/200?random=1',
  followers: 1250,
  following: 450,
  postsCount: 32,
  bio: 'Digital nomad & reacting to life. 🌊',
  email: 'alex@example.com'
};

export const MOCK_USERS: User[] = [
  { id: 'u2', username: 'sarah_styles', fullName: 'Sarah Jenkins', avatar: 'https://picsum.photos/200/200?random=2', followers: 5000, following: 120, postsCount: 150, isVerified: true },
  { id: 'u3', username: 'tech_guru', fullName: 'Mike Chen', avatar: 'https://picsum.photos/200/200?random=3', followers: 890, following: 500, postsCount: 45 },
  { id: 'u4', username: 'nature_lover', fullName: 'Emma Green', avatar: 'https://picsum.photos/200/200?random=4', followers: 3200, following: 200, postsCount: 88 },
  { id: 'u5', username: 'fitness_jim', fullName: 'Jim Power', avatar: 'https://picsum.photos/200/200?random=5', followers: 12000, following: 50, postsCount: 300, isVerified: true },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    user: MOCK_USERS[0],
    content: 'Just arrived in Tokyo! The lights are amazing. 🇯🇵✨',
    mediaUrl: 'https://picsum.photos/800/600?random=10',
    mediaType: 'image',
    likes: 342,
    comments: 45,
    shares: 12,
    createdAt: '2 hours ago'
  },
  {
    id: 'p2',
    userId: 'u3',
    user: MOCK_USERS[1],
    content: 'Reviewing the latest Gemini API features. Mind blowing capabilities coming to the web.',
    mediaType: 'none',
    likes: 156,
    comments: 23,
    shares: 55,
    createdAt: '5 hours ago'
  },
  {
    id: 'p3',
    userId: 'u4',
    user: MOCK_USERS[2],
    content: 'Morning hike views 🏔️',
    mediaUrl: 'https://picsum.photos/800/1000?random=11',
    mediaType: 'image',
    likes: 890,
    comments: 112,
    shares: 5,
    createdAt: '1 day ago'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'like', fromUser: MOCK_USERS[0], postId: 'p1', createdAt: '10m ago', read: false },
  { id: 'n2', type: 'follow', fromUser: MOCK_USERS[2], createdAt: '1h ago', read: false },
  { id: 'n3', type: 'comment', fromUser: MOCK_USERS[1], postId: 'p1', createdAt: '2h ago', read: true },
];

export const MOCK_CHATS: ChatConversation[] = [
  { id: 'c1', participant: MOCK_USERS[0], lastMessage: 'See you tomorrow!', lastMessageTime: '10:30 AM', unreadCount: 2, isOnline: true },
  { id: 'c2', participant: MOCK_USERS[1], lastMessage: 'Did you check the code?', lastMessageTime: 'Yesterday', unreadCount: 0, isOnline: false },
  { id: 'c3', participant: MOCK_USERS[3], lastMessage: 'Great workout man.', lastMessageTime: 'Mon', unreadCount: 0, isOnline: true },
];