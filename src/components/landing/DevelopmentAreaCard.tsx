
import React from 'react';
import { DevelopmentAreaItem } from './types';

interface DevelopmentAreaCardProps {
  area: DevelopmentAreaItem;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

const DevelopmentAreaCard = ({ area, isSelected, onSelect }: DevelopmentAreaCardProps) => {
  return (
    <div 
      className={`development-area-tile ${isSelected ? 'active' : ''}`}
      onClick={() => onSelect(area.name)}
    >
      <div className={`development-area-icon ${area.bgColor} relative w-20 h-20 rounded-2xl shadow-sm`}>
        <div className="absolute inset-0 flex items-center justify-center">
          {area.icon}
        </div>
        {/* Small icon at bottom right */}
        <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-${area.color}-500 flex items-center justify-center shadow-md border-2 border-white`}>
          {area.smallIcon}
        </div>
      </div>
      <h3 className="font-medium text-gray-800 text-center mt-3">{area.name}</h3>
    </div>
  );
};

export default DevelopmentAreaCard;
