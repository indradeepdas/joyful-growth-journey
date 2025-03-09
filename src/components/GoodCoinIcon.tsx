
import React from 'react';
import { cn } from '@/lib/utils';

interface GoodCoinIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
  value?: number;
}

const GoodCoinIcon: React.FC<GoodCoinIconProps> = ({ 
  size = 'md', 
  className,
  animated = false,
  value
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 text-sm',
    md: 'w-6 h-6 text-base',
    lg: 'w-8 h-8 text-lg',
    xl: 'w-10 h-10 text-xl'
  };
  
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className={cn(
        "rounded-full flex items-center justify-center bg-goodchild-yellow text-goodchild-text-primary font-bold shadow-glow-yellow",
        sizeClasses[size],
        animated && "animate-coin-spin"
      )}>
        <span>G</span>
      </div>
      {typeof value !== 'undefined' && (
        <span className="font-bold text-goodchild-text-primary">{value}</span>
      )}
    </div>
  );
};

export default GoodCoinIcon;
