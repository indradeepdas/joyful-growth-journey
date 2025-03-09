
import React, { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
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
import { supabase } from '@/integrations/supabase/client';
import { SupabaseActivity, SupabaseChild, SupabaseTransaction } from '@/services/types';
import { Activity, Transaction } from '@/types';
import { adaptSupabaseActivity, adaptSupabaseTransaction } from '@/utils/typeAdapters';

const ChildDashboard: React.FC = () => {
  const { user, profile, isAuthenticated, isLoading } = useSupabaseAuth();
  const [childData, setChildData] = useState<SupabaseChild | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [completedActivities, setCompletedActivities] = useState<Activity[]>([]);
  const [pendingActivities, setPendingActivities] = useState<Activity[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        if (!user || !profile || profile.role !== 'child') {
          console.log('Not a child user or not authenticated');
          return;
        }

        console.log('Fetching child data for user:', user.id);
        
        // Find child record in the children table
        const { data: childRecord, error: childError } = await supabase
          .from('children')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (childError) {
          console.error('Error fetching child record:', childError);
        } else if (childRecord) {
          console.log('Child record found:', childRecord);
          setChildData(childRecord);
          
          // Get activities for this child
          const { data: activitiesData, error: activitiesError } = await supabase
            .from('activities')
            .select('*')
            .eq('assigned_to', user.id);
            
          if (activitiesError) {
            console.error('Error fetching activities:', activitiesError);
          } else if (activitiesData) {
            console.log('Activities found:', activitiesData.length);
            const formattedActivities = activitiesData.map(activity => adaptSupabaseActivity(activity));
            setActivities(formattedActivities);
            
            // Filter activities by completion status
            const completed = formattedActivities.filter(activity => activity.status === 'completed');
            const pending = formattedActivities.filter(activity => activity.status === 'pending');
            
            setCompletedActivities(completed);
            setPendingActivities(pending);
          }
          
          // Get transactions for this child
          const { data: transactionsData, error: transactionsError } = await supabase
            .from('transactions')
            .select('*')
            .eq('child_id', user.id)
            .order('created_at', { ascending: false });
            
          if (transactionsError) {
            console.error('Error fetching transactions:', transactionsError);
          } else if (transactionsData) {
            console.log('Transactions found:', transactionsData.length);
            const formattedTransactions = transactionsData.map(transaction => {
              const compatibleTransaction: SupabaseTransaction = {
                id: transaction.id,
                child_id: transaction.child_id,
                amount: transaction.amount,
                transaction_type: transaction.type === 'spend' ? 'spend' : 'earn',
                // Fix: Explicitly type-cast the string to our Transaction type's expected values
                type: (transaction.type as 'earned' | 'spent' | 'penalty' | 'given'),
                description: transaction.description,
                created_by: transaction.created_by,
                created_at: transaction.created_at
              };
              return adaptSupabaseTransaction(compatibleTransaction);
            });
            setTransactions(formattedTransactions);
          }
        }
      } catch (error) {
        console.error('Error in fetchChildData:', error);
        toast({
          title: "Error",
          description: "Could not load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated && !isLoading) {
      fetchChildData();
    }
  }, [isAuthenticated, isLoading, user, profile, toast]);

  const handleCompleteTask = async (activityId: string) => {
    if (!user || !childData) return;
    
    try {
      // 1. Update the activity status in the database
      const { error: updateError } = await supabase
        .from('activities')
        .update({ 
          completed: true,
          completed_date: new Date().toISOString() 
        })
        .eq('id', activityId);
        
      if (updateError) {
        throw updateError;
      }
      
      // Get the activity details
      const activity = activities.find(a => a.id === activityId);
      if (!activity) return;
      
      toast({
        title: "Activity Completed!",
        description: `You earned ${activity.goodCoins} GoodCoins!`,
      });
      
      // Refresh data
      const { data: activitiesData } = await supabase
        .from('activities')
        .select('*')
        .eq('assigned_to', user.id);
        
      if (activitiesData) {
        const formattedActivities = activitiesData.map(activity => adaptSupabaseActivity(activity));
        setActivities(formattedActivities);
        
        const completed = formattedActivities.filter(activity => activity.status === 'completed');
        const pending = formattedActivities.filter(activity => activity.status === 'pending');
        
        setCompletedActivities(completed);
        setPendingActivities(pending);
      }
      
      // Refresh transactions
      const { data: transactionsData } = await supabase
        .from('transactions')
        .select('*')
        .eq('child_id', user.id)
        .order('created_at', { ascending: false });
        
      if (transactionsData) {
        const formattedTransactions = transactionsData.map(transaction => {
          const compatibleTransaction: SupabaseTransaction = {
            id: transaction.id,
            child_id: transaction.child_id,
            amount: transaction.amount,
            transaction_type: transaction.type === 'spend' ? 'spend' : 'earn',
            // Fix: Ensure proper typing for the transaction type
            type: (transaction.type as 'earned' | 'spent' | 'penalty' | 'given'),
            description: transaction.description,
            created_by: transaction.created_by,
            created_at: transaction.created_at
          };
          return adaptSupabaseTransaction(compatibleTransaction);
        });
        setTransactions(formattedTransactions);
      }
      
      // Update child's GoodCoins
      const { data: updatedChild } = await supabase
        .from('children')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (updatedChild) {
        setChildData(updatedChild);
      }
      
    } catch (error) {
      console.error('Error completing task:', error);
      toast({
        title: "Error",
        description: "Failed to complete the activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-goodchild-background flex items-center justify-center">
        <div className="text-2xl text-goodchild-text-primary">Loading your dashboard...</div>
      </div>
    );
  }

  if (!isAuthenticated || !profile || profile.role !== 'child') {
    return (
      <div className="min-h-screen bg-goodchild-background flex items-center justify-center">
        <div className="text-2xl text-goodchild-text-primary">Please log in as a child to view this dashboard</div>
      </div>
    );
  }

  if (!childData) {
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
                            <p className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
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
