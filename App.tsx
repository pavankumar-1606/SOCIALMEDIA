import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import { ViewState } from './types';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <AuthPage />
        </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME: return <Home />;
      case ViewState.PROFILE: return <Profile />;
      case ViewState.EXPLORE: return <Explore />;
      case ViewState.MESSAGES: return <Messages />;
      case ViewState.SETTINGS: return <Settings />;
      default: return <Home />;
    }
  };

  return (
    <Layout 
      activeView={currentView} 
      onNavigate={setCurrentView}
      toggleTheme={() => setIsDarkMode(!isDarkMode)}
      isDarkMode={isDarkMode}
    >
        {renderView()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;