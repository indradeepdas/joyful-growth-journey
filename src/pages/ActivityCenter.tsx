
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Activity, ChildData, getChildData, getActivitiesForChild, mockActivities } from '@/services/mockData';
import GoodCoinIcon from '@/components/GoodCoinIcon';

// Development areas
const developmentAreas = [
  "Health & Mind",
  "Effective Communication",
  "Personal Enrichment",
  "Creativity",
  "Deeper Family Bonds",
  "Emotional Intelligence",
  "Social Skills"
];

const ActivityCenter: React.FC = () => {
  const [children, setChildren] = useState<ChildData[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [childActivities, setChildActivities] = useState<Activity[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const childrenData = await getChildData();
        setChildren(childrenData);
        
        // Default select the first child if available
        if (childrenData.length > 0) {
          setSelectedChild(childrenData[0].id);
        }
      } catch (error) {
        console.error("Error fetching children:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      if (selectedChild) {
        try {
          const activities = await getActivitiesForChild(selectedChild);
          setChildActivities(activities);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      }
    };
    
    fetchActivities();
  }, [selectedChild]);

  // Filter activities by development area
  const filteredActivities = selectedArea 
    ? mockActivities.filter(activity => activity.developmentArea === selectedArea)
    : mockActivities;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-goodchild-background flex items-center justify-center">
        <div className="text-2xl text-goodchild-text-primary">Loading Activity Center...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-goodchild-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="glass-card p-6 rounded-xl mb-6 text-center">
          <h1 className="text-4xl font-bold text-gradient mb-2">Activity Center</h1>
          <p className="text-xl text-goodchild-text-secondary mb-4">
            Explore engaging activities and foster growth
          </p>
        </div>

        {/* Development Areas Grid */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">
            Development Areas
          </h2>
          <p className="text-goodchild-text-secondary mb-6">
            Activities are designed to promote development across 7 critical areas:
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {developmentAreas.map((area) => (
              <Card 
                key={area} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedArea === area ? 'border-goodchild-primary ring-2 ring-goodchild-primary/50' : ''
                }`}
                onClick={() => setSelectedArea(area === selectedArea ? null : area)}
              >
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">{area}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Activities Section */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-goodchild-text-primary">
                {selectedArea ? `${selectedArea} Activities` : 'All Activities'}
              </h2>
              {selectedArea && (
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-goodchild-primary"
                  onClick={() => setSelectedArea(null)}
                >
                  Clear filter
                </Button>
              )}
            </div>
            
            {children.length > 0 && (
              <div className="mt-4 sm:mt-0">
                <label className="text-sm font-medium mr-2">Assign to:</label>
                <select 
                  className="bg-white border border-gray-300 rounded-md px-3 py-2"
                  value={selectedChild || ''}
                  onChange={(e) => setSelectedChild(e.target.value)}
                >
                  {children.map(child => (
                    <option key={child.id} value={child.id}>
                      {child.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredActivities.map(activity => (
              <Card key={activity.id} className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>{activity.title}</CardTitle>
                  <CardDescription className="text-base">
                    {activity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-goodchild-accent/20 px-3 py-1 rounded-full text-sm">
                      {activity.developmentArea}
                    </span>
                    <span className="flex items-center gap-1 bg-goodchild-primary/10 px-3 py-1 rounded-full text-sm">
                      <GoodCoinIcon className="w-4 h-4" />
                      {activity.coinReward} Coins
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    disabled={!selectedChild}
                    variant={activity.assignedTo === selectedChild ? "outline" : "default"}
                    className={activity.assignedTo === selectedChild ? "text-goodchild-primary border-goodchild-primary" : ""}
                  >
                    {activity.assignedTo === selectedChild ? 'Already Assigned' : 'Assign to Child'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCenter;
