
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
        <TabsList className="bg-[#e8f0fe] w-full justify-start overflow-x-auto flex-wrap">
          <TabsTrigger value="city" className="text-[#4a6fa1] data-[state=active]:bg-[#aed6f1]">
            In Your City
          </TabsTrigger>
          <TabsTrigger value="daily" className="text-[#4a6fa1] data-[state=active]:bg-[#aed6f1]">
            Daily Stuff
          </TabsTrigger>
          <TabsTrigger value="brand" className="text-[#4a6fa1] data-[state=active]:bg-[#aed6f1]">
            Brand Exclusives
          </TabsTrigger>
          <TabsTrigger value="experience" className="text-[#4a6fa1] data-[state=active]:bg-[#aed6f1]">
            Experiences
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
