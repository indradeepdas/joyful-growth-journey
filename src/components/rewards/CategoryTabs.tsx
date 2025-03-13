
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategory, onCategoryChange }) => {
  const handleTabChange = (value: string) => {
    onCategoryChange(value);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4 font-nunito text-center">
        Browse Reward Categories
      </h2>
      <Tabs 
        value={selectedCategory} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full h-auto bg-white/20 backdrop-blur-sm p-2 rounded-full">
          <TabsTrigger 
            value="city" 
            className="flex-1 py-3 rounded-full text-lg data-[state=active]:bg-[#FF85E2] data-[state=active]:text-white font-nunito"
          >
            City Rewards
          </TabsTrigger>
          <TabsTrigger 
            value="daily" 
            className="flex-1 py-3 rounded-full text-lg data-[state=active]:bg-[#FF85E2] data-[state=active]:text-white font-nunito"
          >
            Daily Stuff
          </TabsTrigger>
          <TabsTrigger 
            value="brand" 
            className="flex-1 py-3 rounded-full text-lg data-[state=active]:bg-[#FF85E2] data-[state=active]:text-white font-nunito"
          >
            Brand Exclusives
          </TabsTrigger>
          <TabsTrigger 
            value="experience" 
            className="flex-1 py-3 rounded-full text-lg data-[state=active]:bg-[#FF85E2] data-[state=active]:text-white font-nunito"
          >
            Experiences
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
