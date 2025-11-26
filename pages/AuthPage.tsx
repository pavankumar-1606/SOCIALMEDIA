import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  // Login State
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  // Signup State
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Backend API Call
    if (loginId && password) {
      login('dummy_jwt_token');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Backend Creation
    const newUser: User = {
        id: 'new_user',
        username: email.split('@')[0],
        fullName: fullName,
        avatar: 'https://picsum.photos/200',
        followers: 0,
        following: 0,
        postsCount: 0
    };
    login('dummy_jwt_token', newUser);
  };

  const handleOAuth = (provider: 'Google' | 'Facebook') => {
    // Simulate OAuth Redirect & Callback
    alert(`Redirecting to ${provider} OAuth...`);
    setTimeout(() => {
        // Assume success
        login('oauth_jwt_token');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl shadow-xl">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">Stream Wave</h1>
            <p className="text-gray-500">{isLogin ? 'Login to continue creating' : 'Sign up to see photos and videos from your friends.'}</p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <button 
            onClick={() => handleOAuth('Google')}
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2.5 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
             <span className="font-bold text-blue-600">G</span> Continue with Google
          </button>
          <button 
             onClick={() => handleOAuth('Facebook')}
             className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white p-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
             <span>f</span> Continue with Facebook
          </button>
        </div>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase">Or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        {/* Forms */}
        {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Phone number, username, or email" 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  required
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Log in
                </button>
            </form>
        ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
                 <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 text-center">
                    By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
                </p>
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Sign Up
                </button>
            </form>
        )}

        {/* Toggle */}
        <div className="mt-8 text-center border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-sm">
                {isLogin ? "Don't have an account?" : "Have an account?"} 
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-primary font-bold ml-1 hover:underline"
                >
                    {isLogin ? 'Sign up' : 'Log in'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;