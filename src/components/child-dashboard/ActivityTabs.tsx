
import React from 'react';
import { Activity } from '@/services/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskCard from './TaskCard';

interface ActivityTabsProps {
  pendingActivities: Activity[];
  completedActivities: Activity[];
  onCompleteTask: (activityId: string) => void;
}

const ActivityTabs: React.FC<ActivityTabsProps> = ({ 
  pendingActivities, 
  completedActivities, 
  onCompleteTask 
}) => {
  return (
    <div className="glass-card p-6 rounded-xl mb-6">
      <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">My Tasks</h2>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="text-lg">
            Pending Tasks
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-lg">
            Completed Tasks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {pendingActivities.length === 0 ? (
            <div className="text-center p-8 text-goodchild-text-secondary">
              <p>You don't have any pending tasks right now. Great job!</p>
            </div>
          ) : (
            pendingActivities.map(activity => (
              <TaskCard 
                key={activity.id} 
                activity={activity} 
                isPending={true}
                onComplete={onCompleteTask}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {completedActivities.length === 0 ? (
            <div className="text-center p-8 text-goodchild-text-secondary">
              <p>You haven't completed any tasks yet. Let's get started!</p>
            </div>
          ) : (
            completedActivities.map(activity => (
              <TaskCard 
                key={activity.id} 
                activity={activity} 
                isPending={false}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActivityTabs;
