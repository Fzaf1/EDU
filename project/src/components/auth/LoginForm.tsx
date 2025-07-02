import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Rocket } from 'lucide-react';
import { Button } from '../common/Button';
import { useFormValidation } from '../../hooks/useFormValidation';
import { AuthFormData, User } from '../../types';

interface LoginFormProps {
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { errors, validateForm } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      const user: User = {
        id: '1',
        email: formData.email,
        name: formData.email.split('@')[0].charAt(0).toUpperCase() + formData.email.split('@')[0].slice(1)
      };
      onLogin(user);
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      {/* Background */}
      <div className="stars-bg" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cosmic-500 to-nebula-500 rounded-2xl flex items-center justify-center mb-6 cosmic-glow animate-pulse-glow">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-headline font-orbitron text-white glitch mb-3">
            <span>Welcome Back</span>
            <span>Welcome Back</span>
            <span>Welcome Back</span>
          </h1>
          <p className="text-body text-cosmic-400">
            Sign in to continue your cosmic journey
          </p>
        </div>

        {/* Enhanced Form */}
        <div className="glass-effect rounded-2xl p-8 cosmic-glow">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-caption font-semibold text-cosmic-200 mb-3">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-cosmic-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-12 pr-4 py-4 border rounded-xl bg-cosmic-800/50 text-white placeholder-cosmic-400 focus:ring-2 focus:ring-cosmic-500 focus:border-transparent transition-all duration-300 text-body ${
                    errors.email ? 'border-red-500' : 'border-cosmic-600'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-caption text-red-400 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-caption font-semibold text-cosmic-200 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-cosmic-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-12 pr-12 py-4 border rounded-xl bg-cosmic-800/50 text-white placeholder-cosmic-400 focus:ring-2 focus:ring-cosmic-500 focus:border-transparent transition-all duration-300 text-body ${
                    errors.password ? 'border-red-500' : 'border-cosmic-600'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-cosmic-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-cosmic-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-cosmic-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-caption text-red-400 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                className="w-full py-4 text-body font-semibold cosmic-glow-hover"
              >
                {isLoading ? 'Signing In...' : 'Sign In to Cosmos'}
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cosmic-700" />
              </div>
              <div className="relative flex justify-center text-caption">
                <span className="bg-cosmic-900 px-4 text-cosmic-400">New to Cosmos Explorer?</span>
              </div>
            </div>

            {/* Switch to Register */}
            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={onSwitchToRegister}
                className="text-cosmic-300 hover:text-white font-medium transition-colors duration-300 px-6 py-3"
              >
                Create your account and start exploring →
              </Button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-cosmic-800/30 rounded-xl border border-cosmic-700/50">
            <p className="text-xs text-cosmic-400 text-center mb-2">
              <strong>Demo Mode:</strong> Use any email and password to explore
            </p>
            <div className="text-xs text-cosmic-500 text-center space-y-1">
              <p>Example: demo@cosmos.space</p>
              <p>Password: any password (6+ characters)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};