import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cosmic-500 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cosmic-500 to-nebula-500 hover:from-cosmic-600 hover:to-nebula-600 text-white shadow-lg hover:shadow-xl cosmic-glow-hover',
    secondary: 'bg-cosmic-800 hover:bg-cosmic-700 text-white border border-cosmic-600 hover:border-cosmic-500',
    outline: 'border-2 border-cosmic-500 text-cosmic-400 hover:bg-cosmic-500 hover:text-white',
    ghost: 'text-cosmic-400 hover:text-white hover:bg-cosmic-800/50'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="loading-cosmos mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};