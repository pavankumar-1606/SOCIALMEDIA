export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  email?: string;
  followers: number;
  following: number;
  postsCount: number;
  bio?: string;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  mediaUrl?: string; // Image or Video URL
  mediaType: 'image' | 'video' | 'none';
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  isLiked?: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'follow' | 'comment';
  fromUser: User;
  postId?: string; // If related to a post
  createdAt: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  EXPLORE = 'EXPLORE',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
  ADMIN = 'ADMIN'
}