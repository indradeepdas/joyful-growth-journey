
import React from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  visibilityTab: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVisibilityChange: (value: string) => void;
  isChild: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  visibilityTab,
  onSearchChange,
  onVisibilityChange,
  isChild
}) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-auto flex-1 md:max-w-md">
        <Input
          type="text"
          placeholder="Search rewards..."
          value={searchQuery}
          onChange={onSearchChange}
          className="pl-10 border-[#aed6f1] text-[#4a6fa1]"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#85c1e9] h-4 w-4" />
      </div>
      
      <Tabs value={visibilityTab} onValueChange={onVisibilityChange} className="w-full md:w-auto">
        <TabsList className="bg-[#e8f0fe]">
          <TabsTrigger value="all" className="text-[#4a6fa1] data-[state=active]:bg-[#aed6f1]">All Rewards</TabsTrigger>
          {isChild && (
            <TabsTrigger value="affordable" className="text-[#4a6fa1] data-[state=active]:bg-[#aed6f1]">I Can Afford</TabsTrigger>
          )}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SearchBar;
