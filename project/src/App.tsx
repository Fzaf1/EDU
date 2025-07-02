import React, { useState, useEffect } from 'react';
import { useAppState } from './hooks/useAppState';
import { Header } from './components/navigation/Header';
import { HomePage } from './pages/HomePage';
import { EducationPage } from './pages/EducationPage';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { CelestialObjectModal } from './components/education/CelestialObjectModal';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { CelestialObject, User } from './types';
import celestialDataJson from './data/celestialData.json';

function App() {
  const { state, setCurrentPage, setSelectedObject, closeModal, setUser } = useAppState();
  const [isLoading, setIsLoading] = useState(true);
  const [celestialData] = useState(celestialDataJson);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (user: User) => {
    setUser(user);
    setCurrentPage('home');
  };

  const handleRegister = (user: User) => {
    setUser(user);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleObjectClick = (object: CelestialObject) => {
    setSelectedObject(object);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cosmic-950 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <LoadingSpinner size="lg" />
          </div>
          <h2 className="text-2xl font-bold font-orbitron text-white mb-4 glitch">
            <span>Loading Cosmos</span>
            <span>Loading Cosmos</span>
            <span>Loading Cosmos</span>
          </h2>
          <p className="text-cosmic-400">Preparing your journey through the universe...</p>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'home':
        return (
          <HomePage
            celestialData={celestialData}
            onObjectClick={handleObjectClick}
            onNavigateToEducation={() => setCurrentPage('education')}
          />
        );
      case 'education':
        return (
          <EducationPage
            celestialData={celestialData}
            onObjectClick={handleObjectClick}
          />
        );
      case 'login':
        return (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentPage('register')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentPage('login')}
          />
        );
      default:
        return (
          <HomePage
            celestialData={celestialData}
            onObjectClick={handleObjectClick}
            onNavigateToEducation={() => setCurrentPage('education')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-950">
      {/* Background stars */}
      <div className="stars-bg" />
      
      {/* Header */}
      <Header
        currentPage={state.currentPage}
        user={state.user}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {renderCurrentPage()}
      </main>

      {/* Modal */}
      <CelestialObjectModal
        object={state.selectedObject}
        isOpen={state.isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;