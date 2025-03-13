
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        <TabsList className={`bg-[${colors.background}] w-full grid grid-cols-4 h-16 rounded-xl p-2`}>
          <TabsTrigger 
            value="city" 
            className={`text-[${colors.baseText}] font-medium text-lg rounded-lg data-[state=active]:bg-[${colors.tab1Bg}] data-[state=active]:text-[${colors.tab1Text}] data-[state=active]:shadow-md transition-all`}
          >
            In Your City
          </TabsTrigger>
          <TabsTrigger 
            value="daily" 
            className={`text-[${colors.baseText}] font-medium text-lg rounded-lg data-[state=active]:bg-[${colors.tab2Bg}] data-[state=active]:text-[${colors.tab2Text}] data-[state=active]:shadow-md transition-all`}
          >
            Daily Stuff
          </TabsTrigger>
          <TabsTrigger 
            value="brand" 
            className={`text-[${colors.baseText}] font-medium text-lg rounded-lg data-[state=active]:bg-[${colors.tab3Bg}] data-[state=active]:text-[${colors.tab3Text}] data-[state=active]:shadow-md transition-all`}
          >
            Brand Exclusives
          </TabsTrigger>
          <TabsTrigger 
            value="experience" 
            className={`text-[${colors.baseText}] font-medium text-lg rounded-lg data-[state=active]:bg-[${colors.tab4Bg}] data-[state=active]:text-[${colors.tab4Text}] data-[state=active]:shadow-md transition-all`}
          >
            Experiences
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
