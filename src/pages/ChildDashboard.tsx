
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
import { CheckCircle, Clock, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import SpinWheel from '@/components/SpinWheel';

// Dummy child data
const DUMMY_CHILD = {
  id: "child-1",
  name: "Emma",
  surname: "Smith",
  nickname: "Em",
  good_coins: 150,
  avatar: null
};

// Dummy activity data
const DUMMY_ACTIVITIES = [
  {
    id: "activity-1",
    title: "Complete Math Homework",
    description: "Finish all math problems in your workbook",
    developmentArea: "Academic Excellence",
    dueDate: "2023-12-15",
    goodCoins: 20,
    status: "pending"
  },
  {
    id: "activity-2",
    title: "Read for 30 Minutes",
    description: "Read a book of your choice for at least 30 minutes",
    developmentArea: "Academic Excellence",
    dueDate: "2023-12-14",
    goodCoins: 15,
    status: "pending"
  },
  {
    id: "activity-3",
    title: "Clean Your Room",
    description: "Tidy up your room, make your bed, and organize your desk",
    developmentArea: "Responsibility",
    dueDate: "2023-12-13",
    goodCoins: 25,
    status: "completed"
  }
];

// Dummy transaction data
const DUMMY_TRANSACTIONS = [
  {
    id: "transaction-1",
    childId: "child-1",
    amount: -15,
    type: "penalty",
    description: "Late for dinner",
    createdBy: "parent-1",
    createdAt: "2023-12-10T15:30:00Z"
  },
  {
    id: "transaction-2",
    childId: "child-1",
    amount: -50,
    type: "spent",
    description: "Redeemed Movie Night Reward",
    createdBy: "child-1",
    createdAt: "2023-12-05T18:45:00Z"
  },
  {
    id: "transaction-3",
    childId: "child-1",
    amount: 20,
    type: "earned",
    description: "Completed activity: Clean Your Room",
    createdBy: "parent-1",
    createdAt: "2023-12-03T14:20:00Z"
  }
];

const ChildDashboard: React.FC = () => {
  const [childData, setChildData] = useState(DUMMY_CHILD);
  const [activities, setActivities] = useState(DUMMY_ACTIVITIES);
  const [completedActivities, setCompletedActivities] = useState<any[]>([]);
  const [pendingActivities, setPendingActivities] = useState<any[]>([]);
  const [transactions, setTransactions] = useState(DUMMY_TRANSACTIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data from backend
    const timer = setTimeout(() => {
      try {
        // Filter activities by completion status
        const completed = activities.filter(activity => activity.status === 'completed');
        const pending = activities.filter(activity => activity.status === 'pending');
        
        setCompletedActivities(completed);
        setPendingActivities(pending);
        setLoading(false);
      } catch (error: any) {
        console.error('Error in loading data:', error);
        setError('An unexpected error occurred. Please refresh the page.');
        setLoading(false);
      }
    }, 800); // Simulate a small delay for data loading
    
    return () => clearTimeout(timer);
  }, [activities]);

  const handleCompleteTask = async (activityId: string) => {
    try {
      // Find the activity
      const activity = activities.find(a => a.id === activityId);
      if (!activity) return;
      
      /* 
      BACKEND INTEGRATION COMMENT:
      In a real application, this would connect to your database to:
      1. Update the activity status to completed
      2. Add GoodCoins to the child's balance
      3. Create a transaction record for earning coins
      */
      
      // Update activity status locally
      const updatedActivities = activities.map(a => 
        a.id === activityId ? { ...a, status: 'completed' } : a
      );
      setActivities(updatedActivities);
      
      // Update child's GoodCoins locally
      setChildData(prev => ({
        ...prev,
        good_coins: prev.good_coins + activity.goodCoins
      }));
      
      // Add a new transaction
      const newTransaction = {
        id: `transaction-${Date.now()}`,
        childId: childData.id,
        amount: activity.goodCoins,
        type: "earned",
        description: `Completed activity: ${activity.title}`,
        createdBy: childData.id,
        createdAt: new Date().toISOString()
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Update completed and pending activities
      const completed = updatedActivities.filter(a => a.status === 'completed');
      const pending = updatedActivities.filter(a => a.status === 'pending');
      
      setCompletedActivities(completed);
      setPendingActivities(pending);
      
      toast({
        title: "Activity Completed!",
        description: `You earned ${activity.goodCoins} GoodCoins!`,
      });
    } catch (error: any) {
      console.error('Error completing task:', error);
      toast({
        title: "Error",
        description: "Failed to complete the activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWinCoins = (amount: number) => {
    /* 
    BACKEND INTEGRATION COMMENT:
    In a real application, this would connect to your database to:
    1. Add the won GoodCoins to the child's balance
    2. Create a transaction record for the prize
    */
    
    // Update child's GoodCoins locally
    setChildData(prev => ({
      ...prev,
      good_coins: prev.good_coins + amount
    }));
    
    // Add a new transaction
    const newTransaction = {
      id: `transaction-${Date.now()}`,
      childId: childData.id,
      amount: amount,
      type: "earned",
      description: `Won ${amount} GoodCoins from Spin Wheel!`,
      createdBy: childData.id,
      createdAt: new Date().toISOString()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-goodchild-background flex items-center justify-center">
        <div className="text-2xl text-goodchild-text-primary">Loading your dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-goodchild-background flex items-center justify-center">
        <div className="text-2xl text-goodchild-text-primary text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-goodchild-blue text-white hover:bg-goodchild-blue/90"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-goodchild-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="glass-card p-6 rounded-xl mb-6 text-center">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-gradient">My Dashboard!</h1>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
          <p className="text-xl text-goodchild-text-secondary mb-4">
            Welcome back, {childData.nickname || childData.name}!
          </p>
          
          {/* GoodCoin Balance */}
          <div className="good-coin-display animate-float mb-4 inline-block">
            <div className="bg-goodchild-card p-4 rounded-full flex items-center gap-2 shadow-glow">
              <GoodCoinIcon className="w-8 h-8" />
              <span className="text-2xl font-bold">{childData.good_coins} GoodCoins</span>
            </div>
          </div>
        </div>

        {/* SpinWheel Section */}
        <SpinWheel onWin={handleWinCoins} />

        {/* Tasks Section */}
        <div className="glass-card p-6 rounded-xl mb-6 mt-6">
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
                        <span className="font-bold">{activity.goodCoins} GoodCoins</span>
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
                        <span className="font-bold">{activity.goodCoins} GoodCoins earned</span>
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
                            <p className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center text-red-500 font-bold">
                            <X className="h-4 w-4 mr-1" />
                            {Math.abs(transaction.amount)} GoodCoins
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
                    onClick={() => navigate('/rewards-hub')}
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
                            <p className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center text-blue-500 font-bold">
                            <GoodCoinIcon className="h-4 w-4 mr-1" />
                            {Math.abs(transaction.amount)} GoodCoins
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
              onClick={() => navigate('/rewards-hub')}
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
