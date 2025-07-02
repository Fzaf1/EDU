import React from 'react';
import { Rocket, Home, BookOpen, LogIn, UserPlus, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../common/Button';
import { AppState } from '../../types';

interface HeaderProps {
  currentPage: AppState['currentPage'];
  user: AppState['user'];
  onNavigate: (page: AppState['currentPage']) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  user,
  onNavigate,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', page: 'home' as const, icon: Home },
    { id: 'education', label: 'Education', page: 'education' as const, icon: BookOpen }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-cosmic-800/50">
        <div className="content-container">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Rocket className="w-10 h-10 text-cosmic-400 animate-float" />
                <div className="absolute inset-0 w-10 h-10 bg-cosmic-500 rounded-full opacity-20 animate-pulse-glow" />
              </div>
              <div>
                <h1 className="text-title font-orbitron text-white glitch">
                  <span>Cosmos Explorer</span>
                  <span>Cosmos Explorer</span>
                  <span>Cosmos Explorer</span>
                </h1>
                <p className="text-caption text-cosmic-400 hidden sm:block">
                  Interactive Universe Education Platform
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.page ? 'primary' : 'ghost'}
                    size="md"
                    onClick={() => onNavigate(item.page)}
                    className="flex items-center space-x-2 px-6 py-3"
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                );
              })}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 text-cosmic-300 bg-cosmic-900/50 px-4 py-2 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-cosmic-500 to-nebula-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-caption font-medium text-white">{user.name}</p>
                      <p className="text-xs text-cosmic-400">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onLogout}
                    className="flex items-center space-x-2 px-4 py-2"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate('login')}
                    className="flex items-center space-x-2 px-4 py-2"
                  >
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onNavigate('register')}
                    className="flex items-center space-x-2 px-4 py-2"
                  >
                    <UserPlus size={16} />
                    <span>Get Started</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="lg:hidden p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="modal-backdrop" onClick={toggleMobileMenu} />
          <div className="fixed top-20 left-0 right-0 glass-effect border-b border-cosmic-800/50 animate-entrance">
            <div className="content-container py-6">
              {/* Mobile Navigation */}
              <div className="space-y-4 mb-6">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentPage === item.page ? 'primary' : 'ghost'}
                      size="lg"
                      onClick={() => {
                        onNavigate(item.page);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 justify-start px-6 py-4"
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Mobile Auth Section */}
              <div className="border-t border-cosmic-800/50 pt-6">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-cosmic-300 bg-cosmic-900/50 px-4 py-3 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-cosmic-500 to-nebula-500 rounded-full flex items-center justify-center">
                        <User size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-body font-medium text-white">{user.name}</p>
                        <p className="text-caption text-cosmic-400">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 justify-center px-6 py-4"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => {
                        onNavigate('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 justify-center px-6 py-4"
                    >
                      <LogIn size={18} />
                      <span>Sign In</span>
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        onNavigate('register');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 justify-center px-6 py-4"
                    >
                      <UserPlus size={18} />
                      <span>Get Started</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};