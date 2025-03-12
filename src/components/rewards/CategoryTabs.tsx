
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Tag, Star } from 'lucide-react';

interface CategoryTabsProps {
  categoryTab: string;
  onCategoryChange: (value: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categoryTab, onCategoryChange }) => {
  return (
    <div className="mb-8">
      <Tabs value={categoryTab} onValueChange={onCategoryChange} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto bg-[#e8eef8]">
          <TabsTrigger value="city" className="text-[#4a6fa1] flex items-center gap-2 data-[state=active]:bg-[#bdd0e8]">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">In Your City</span>
          </TabsTrigger>
          <TabsTrigger value="daily" className="text-[#4a6fa1] flex items-center gap-2 data-[state=active]:bg-[#bdd0e8]">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Daily Stuff</span>
          </TabsTrigger>
          <TabsTrigger value="brand" className="text-[#4a6fa1] flex items-center gap-2 data-[state=active]:bg-[#bdd0e8]">
            <Tag className="h-4 w-4" />
            <span className="hidden sm:inline">Brand Exclusives</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="text-[#4a6fa1] flex items-center gap-2 data-[state=active]:bg-[#bdd0e8]">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Experiences</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
