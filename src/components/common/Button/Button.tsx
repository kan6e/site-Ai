import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 border-2 shadow-sm hover:shadow-md active:scale-95';
  
  const variants = {
    primary: 'bg-[#9CAF88] hover:bg-[#8a9e76] text-white border-[#9CAF88] hover:border-[#8a9e76]',
    secondary: 'bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white border-[#2D2D2D] hover:border-[#1a1a1a]',
    accent: 'bg-[#D4A853] hover:bg-[#c49a48] text-white border-[#D4A853] hover:border-[#c49a48]',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 sm:px-7 py-2.5 sm:py-3.5 text-base sm:text-lg',
  };
  
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};