
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
  return (
    <div className="mb-8">
      <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full">
        <TabsList className="bg-[#D3E4FD] w-full grid grid-cols-4 h-14 rounded-xl p-1">
          <TabsTrigger 
            value="city" 
            className="text-[#4a6fa1] font-medium text-base rounded-lg data-[state=active]:bg-[#E5DEFF] data-[state=active]:text-[#8B5CF6] data-[state=active]:shadow-md transition-all"
          >
            In Your City
          </TabsTrigger>
          <TabsTrigger 
            value="daily" 
            className="text-[#4a6fa1] font-medium text-base rounded-lg data-[state=active]:bg-[#FEF7CD] data-[state=active]:text-[#F97316] data-[state=active]:shadow-md transition-all"
          >
            Daily Stuff
          </TabsTrigger>
          <TabsTrigger 
            value="brand" 
            className="text-[#4a6fa1] font-medium text-base rounded-lg data-[state=active]:bg-[#FEC6A1] data-[state=active]:text-[#D946EF] data-[state=active]:shadow-md transition-all"
          >
            Brand Exclusives
          </TabsTrigger>
          <TabsTrigger 
            value="experience" 
            className="text-[#4a6fa1] font-medium text-base rounded-lg data-[state=active]:bg-[#F2FCE2] data-[state=active]:text-[#0EA5E9] data-[state=active]:shadow-md transition-all"
          >
            Experiences
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
