
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChildData, 
  Activity, 
  Transaction,
  getChildById, 
  getActivitiesForChild, 
  getTransactionsForChild 
} from '@/services/mockData';
import {
  DashboardHeader,
  ActivityTabs,
  TransactionSection,
  RewardsSection
} from '@/components/child-dashboard';

const ChildDashboard: React.FC = () => {
  const [child, setChild] = useState<ChildData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [completedActivities, setCompletedActivities] = useState<Activity[]>([]);
  const [pendingActivities, setPendingActivities] = useState<Activity[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        // For demo purposes, we're using the first child (Emma)
        const childId = '1';
        const childData = await getChildById(childId);
        
        if (childData) {
          setChild(childData);
          
          // Get activities for this child
          const childActivities = await getActivitiesForChild(childId);
          setActivities(childActivities);
          
          // Filter activities by completion status
          const completed = childActivities.filter(activity => activity.status === 'completed');
          const pending = childActivities.filter(activity => activity.status === 'pending');
          
          setCompletedActivities(completed);
          setPendingActivities(pending);
          
          // Get transactions for this child
          const childTransactions = await getTransactionsForChild(childId);
          setTransactions(childTransactions);
        }
      } catch (error) {
        console.error('Error fetching child data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChildData();
  }, []);

  const handleCompleteTask = (activityId: string) => {
    // Update the activity status
    const updatedActivities = activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, status: 'completed' as const } 
        : activity
    );
    
    // Update all state
    setActivities(updatedActivities);
    const completed = updatedActivities.filter(activity => activity.status === 'completed');
    const pending = updatedActivities.filter(activity => activity.status === 'pending');
    setCompletedActivities(completed);
    setPendingActivities(pending);
    
    // Add a new transaction
    const activity = activities.find(a => a.id === activityId);
    if (activity) {
      const newTransaction: Transaction = {
        id: `new-${Date.now()}`,
        childId: child?.id || '',
        amount: activity.goodCoins,
        type: 'earned',
        description: `Completed "${activity.title}"`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setTransactions([newTransaction, ...transactions]);
      
      // Update GoodCoins balance
      if (child) {
        setChild({
          ...child,
          goodCoins: child.goodCoins + activity.goodCoins
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-goodchild-background flex items-center justify-center">
        <div className="text-2xl text-goodchild-text-primary">Loading your dashboard...</div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-goodchild-background flex items-center justify-center">
        <div className="text-2xl text-goodchild-text-primary">Child data not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-goodchild-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <DashboardHeader child={child} />

        {/* Tasks Section */}
        <ActivityTabs 
          pendingActivities={pendingActivities} 
          completedActivities={completedActivities}
          onCompleteTask={handleCompleteTask}
        />

        {/* Transactions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Penalties */}
          <TransactionSection 
            transactions={transactions}
            type="penalty"
            title="My Penalties"
            emptyMessage="No penalties! Keep up the good work! 🌟"
          />

          {/* Redemptions */}
          <TransactionSection 
            transactions={transactions}
            type="spent"
            title="My Redemptions"
            emptyMessage="You haven't redeemed any rewards yet!"
            actionButton={
              <Button 
                className="mt-2 bg-goodchild-secondary hover:bg-goodchild-secondary/80"
                onClick={() => window.location.href = '/rewards'}
              >
                View Rewards
              </Button>
            }
          />
        </div>

        {/* My Rewards Section */}
        <RewardsSection />
      </div>
    </div>
  );
};

export default ChildDashboard;
