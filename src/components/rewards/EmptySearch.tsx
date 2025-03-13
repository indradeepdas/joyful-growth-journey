
import React from 'react';
import { Search } from 'lucide-react';

const EmptySearch: React.FC = () => {
  return (
    <div className="col-span-full text-center py-12">
      <div className="mb-4">
        <Search className="h-12 w-12 mx-auto text-gray-700 opacity-60" />
      </div>
      <h3 className="text-xl font-medium mb-2 text-gray-800">No rewards found</h3>
      <p className="text-gray-600">
        Try adjusting your search or check back later for new rewards.
      </p>
    </div>
  );
};

export default EmptySearch;
