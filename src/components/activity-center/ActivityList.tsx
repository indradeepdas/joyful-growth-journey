
import React from 'react';
import { Activity, DevelopmentArea } from '@/types';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { developmentAreas } from './constants';

interface ActivityListProps {
  activities: Activity[];
  onViewActivity: (activity: Activity) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, onViewActivity }) => {
  // Function to get the development area object
  const getDevelopmentArea = (name: DevelopmentArea) => {
    return developmentAreas.find(area => area.name === name) || developmentAreas[0];
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg className="h-12 w-12 mx-auto text-goodchild-text-secondary opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium mb-2">No activities found</h3>
        <p className="text-goodchild-text-secondary mb-4">
          Try adjusting your search filters or create a new activity.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {activities.map((activity) => {
        const areaData = getDevelopmentArea(activity.developmentArea);
        
        return (
          <Card 
            key={activity.id} 
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onViewActivity(activity)}
          >
            <div className={`h-3 ${areaData ? `bg-${areaData.color}-500` : 'bg-gray-500'}`} />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{activity.title}</CardTitle>
                <div className={`w-8 h-8 rounded-full ${areaData ? areaData.bgColor : 'bg-gray-100'} flex items-center justify-center`}>
                  {areaData && areaData.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-goodchild-text-secondary line-clamp-3 mb-4">
                {activity.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${areaData ? `bg-${areaData.color}-100 text-${areaData.color}-700` : 'bg-gray-100 text-gray-700'}`}>
                  {areaData && React.cloneElement(areaData.icon, { size: 12 })}
                  <span>{activity.developmentArea}</span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                  <GoodCoinIcon className="h-3 w-3" />
                  <span>{activity.goodCoins}</span>
                </div>
                
                {activity.estimatedTime && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    <Clock size={12} />
                    <span>{activity.estimatedTime}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="ghost" 
                className="w-full justify-center text-goodchild-blue hover:text-goodchild-blue/80 hover:bg-goodchild-blue/10"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ActivityList;
