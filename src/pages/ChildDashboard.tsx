
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { 
  Activity, 
  Transaction, 
  ChildData, 
  getChildById, 
  getActivitiesForChild, 
  getTransactionsForChild 
} from '@/services/mockData';
import { CheckCircle, Clock, X } from 'lucide-react';

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
          const completed = childActivities.filter(activity => activity.completed);
          const pending = childActivities.filter(activity => !activity.completed);
          
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
      activity.id === activityId ? { ...activity, completed: true } : activity
    );
    
    // Update all state
    setActivities(updatedActivities);
    const completed = updatedActivities.filter(activity => activity.completed);
    const pending = updatedActivities.filter(activity => !activity.completed);
    setCompletedActivities(completed);
    setPendingActivities(pending);
    
    // Add a new transaction
    const activity = activities.find(a => a.id === activityId);
    if (activity) {
      const newTransaction: Transaction = {
        id: `new-${Date.now()}`,
        childId: child?.id || '',
        amount: activity.coinReward,
        type: 'earned',
        description: `Completed "${activity.title}"`,
        date: new Date().toISOString().split('T')[0]
      };
      
      setTransactions([newTransaction, ...transactions]);
      
      // Update GoodCoins balance
      if (child) {
        setChild({
          ...child,
          goodCoins: child.goodCoins + activity.coinReward
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
        <div className="glass-card p-6 rounded-xl mb-6 text-center">
          <h1 className="text-4xl font-bold text-gradient mb-2">My Dashboard!</h1>
          <p className="text-xl text-goodchild-text-secondary mb-4">Welcome back, {child.nickname || child.name}!</p>
          
          {/* GoodCoin Balance */}
          <div className="good-coin-display animate-float mb-4 inline-block">
            <div className="bg-goodchild-card p-4 rounded-full flex items-center gap-2 shadow-glow">
              <GoodCoinIcon className="w-8 h-8" />
              <span className="text-2xl font-bold">{child.goodCoins} GoodCoins</span>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
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
                  <Card key={activity.id} className="task-card hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{activity.title}</CardTitle>
                          <CardDescription className="text-base mt-1">
                            {activity.description}
                          </CardDescription>
                        </div>
                        <div className="text-goodchild-secondary flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          <span>Due: {activity.dueDate}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2 text-goodchild-text-secondary">
                        <span className="bg-goodchild-accent/20 px-3 py-1 rounded-full text-sm">
                          {activity.developmentArea}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <GoodCoinIcon className="w-5 h-5" />
                        <span className="font-bold">{activity.coinReward} GoodCoins</span>
                      </div>
                      <Button 
                        onClick={() => handleCompleteTask(activity.id)}
                        className="bg-goodchild-primary hover:bg-goodchild-primary/80"
                      >
                        Mark as Complete
                      </Button>
                    </CardFooter>
                  </Card>
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
                  <Card key={activity.id} className="task-card opacity-80">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            {activity.title}
                          </CardTitle>
                          <CardDescription className="text-base mt-1">
                            {activity.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2 text-goodchild-text-secondary">
                        <span className="bg-goodchild-accent/20 px-3 py-1 rounded-full text-sm">
                          {activity.developmentArea}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex items-center gap-2">
                        <GoodCoinIcon className="w-5 h-5" />
                        <span className="font-bold">{activity.coinReward} GoodCoins earned</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Transactions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Penalties */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">My Penalties</h2>
            
            <div className="space-y-4">
              {transactions.filter(t => t.type === 'penalty').length === 0 ? (
                <div className="text-center p-4 text-goodchild-text-secondary">
                  <p>No penalties! Keep up the good work! 🌟</p>
                </div>
              ) : (
                transactions
                  .filter(t => t.type === 'penalty')
                  .map(transaction => (
                    <Card key={transaction.id} className="bg-red-50 border-red-100">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                          <div className="flex items-center text-red-500 font-bold">
                            <X className="h-4 w-4 mr-1" />
                            {transaction.amount} GoodCoins
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </div>

          {/* Redemptions */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">My Redemptions</h2>
            
            <div className="space-y-4">
              {transactions.filter(t => t.type === 'spent').length === 0 ? (
                <div className="text-center p-4 text-goodchild-text-secondary">
                  <p>You haven't redeemed any rewards yet!</p>
                  <Button 
                    className="mt-2 bg-goodchild-secondary hover:bg-goodchild-secondary/80"
                    onClick={() => window.location.href = '/rewards'}
                  >
                    View Rewards
                  </Button>
                </div>
              ) : (
                transactions
                  .filter(t => t.type === 'spent')
                  .map(transaction => (
                    <Card key={transaction.id} className="bg-blue-50 border-blue-100">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                          <div className="flex items-center text-blue-500 font-bold">
                            <GoodCoinIcon className="h-4 w-4 mr-1" />
                            {transaction.amount} GoodCoins
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* My Rewards Section */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">
            My Rewards
          </h2>
          <div className="text-center p-4">
            <p className="text-goodchild-text-secondary mb-4">
              Visit the Rewards Hub to discover exciting rewards you can redeem with your GoodCoins!
            </p>
            <Button 
              className="bg-goodchild-secondary hover:bg-goodchild-secondary/80"
              onClick={() => window.location.href = '/rewards'}
            >
              Go to Rewards Hub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
