
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DevelopmentArea } from '@/types';
import { developmentAreas } from './constants';

interface ActivityFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedArea: string | null;
  setSelectedArea: (area: string | null) => void;
  handleClearFilters: () => void;
  showCreateForm: boolean;
  setShowCreateForm: (show: boolean) => void;
  isParent: boolean;
}

const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  selectedArea,
  setSelectedArea,
  handleClearFilters,
  showCreateForm,
  setShowCreateForm,
  isParent,
}) => {
  return (
    <>
      {/* Development areas filter tiles */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-goodchild-text-primary">Development Areas</h2>
          {selectedArea && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearFilters}
              className="text-sm"
            >
              Clear Filters
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {developmentAreas.map((area) => (
            <div 
              key={area.id} 
              className={`development-area-tile ${selectedArea === area.name ? 'active' : ''}`}
              onClick={() => setSelectedArea(selectedArea === area.name ? null : area.name)}
            >
              <div className={`development-area-icon ${area.bgColor} relative w-16 h-16 rounded-2xl shadow-sm`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {area.icon}
                </div>
                {/* Small icon at bottom right */}
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-${area.color}-500 flex items-center justify-center shadow-md border-2 border-white`}>
                  {area.icon && React.cloneElement(area.icon, { size: 12, className: "text-white" })}
                </div>
              </div>
              <h3 className="font-medium text-center mt-2 text-sm">{area.name}</h3>
            </div>
          ))}
        </div>
      </div>
      
      {/* Search & sort bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-goodchild-text-secondary h-4 w-4" />
        </div>
        
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Sort by Title</SelectItem>
              <SelectItem value="coins">Sort by Reward</SelectItem>
              <SelectItem value="area">Sort by Area</SelectItem>
            </SelectContent>
          </Select>
          
          {isParent && (
            <Button 
              className="whitespace-nowrap"
              onClick={() => setShowCreateForm(true)}
            >
              + Create Activity
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ActivityFilters;
