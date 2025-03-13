
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dispatch, SetStateAction } from 'react';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  // Dreamy Skies palette colors
  const colors = {
    background: '#C1E8F7', // Light blue
    tab1Bg: '#E5DEFF',     // Soft purple
    tab1Text: '#8B5CF6',   // Vibrant purple
    tab2Bg: '#FEF7CD',     // Soft yellow
    tab2Text: '#F97316',   // Orange
    tab3Bg: '#FEC6A1',     // Soft coral
    tab3Text: '#D946EF',   // Pink
    tab4Bg: '#F2FCE2',     // Soft mint
    tab4Text: '#0EA5E9',   // Bright blue
    baseText: '#4a6fa1'    // Base text color
  };

  return (
    <div className="mb-8">
      <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full">
        <TabsList className="bg-[#C1E8F7] w-full grid grid-cols-4 h-20 rounded-xl p-2">
          <TabsTrigger 
            value="city" 
            className="text-[#4a6fa1] font-bold text-lg md:text-xl rounded-lg data-[state=active]:bg-[#E5DEFF] data-[state=active]:text-[#8B5CF6] data-[state=active]:shadow-md transition-all"
          >
            In Your City
          </TabsTrigger>
          <TabsTrigger 
            value="daily" 
            className="text-[#4a6fa1] font-bold text-lg md:text-xl rounded-lg data-[state=active]:bg-[#FEF7CD] data-[state=active]:text-[#F97316] data-[state=active]:shadow-md transition-all"
          >
            Daily Stuff
          </TabsTrigger>
          <TabsTrigger 
            value="brand" 
            className="text-[#4a6fa1] font-bold text-lg md:text-xl rounded-lg data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-[#D946EF] data-[state=active]:shadow-md transition-all"
          >
            Brand Exclusives
          </TabsTrigger>
          <TabsTrigger 
            value="experience" 
            className="text-[#4a6fa1] font-bold text-lg md:text-xl rounded-lg data-[state=active]:bg-[#F2FCE2] data-[state=active]:text-[#0EA5E9] data-[state=active]:shadow-md transition-all"
          >
            Experiences
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
