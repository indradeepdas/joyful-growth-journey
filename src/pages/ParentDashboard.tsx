
import React, { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { Activity, Transaction } from '@/types';
import { adaptSupabaseActivity, adaptSupabaseTransaction } from '@/utils/typeAdapters';
import {
  Brain,
  Heart,
  Lightbulb,
  MessageSquare,
  User,
  Zap,
  Users,
  BookOpen,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SupabaseTransaction } from '@/services/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  DashboardHeader, 
  ChildrenProgress,
  ActivityManagement,
  GoodCoinManagement
} from '@/components/parent-dashboard';

const ParentDashboard: React.FC = () => {
  const { user, profile, childAccounts, isAuthenticated } = useSupabaseAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || profile?.role !== 'parent') {
      navigate('/login');
      return;
    }
    
    const fetchActivitiesAndTransactions = async () => {
      if (!user) return;
      
      try {
        const { data: activitiesData, error: activitiesError } = await supabase
          .from('activities')
          .select('*')
          .eq('created_by', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (activitiesError) {
          console.error('Error fetching activities:', activitiesError);
        } else if (activitiesData) {
          const formattedActivities = activitiesData.map(activity => adaptSupabaseActivity(activity));
          setActivities(formattedActivities);
        }
        
        if (childAccounts && childAccounts.length > 0) {
          const childIds = childAccounts.map(child => child.id);
          
          const { data: transactionsData, error: transactionsError } = await supabase
            .from('transactions')
            .select('*')
            .in('child_id', childIds)
            .order('created_at', { ascending: false })
            .limit(5);
            
          if (transactionsError) {
            console.error('Error fetching transactions:', transactionsError);
          } else if (transactionsData) {
            const formattedTransactions = transactionsData.map(transaction => {
              const compatibleTransaction: SupabaseTransaction = {
                id: transaction.id,
                child_id: transaction.child_id,
                amount: transaction.amount,
                transaction_type: transaction.type as 'earn' | 'spend',
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
        console.error('Error fetching data:', error);
      }
    };
    
    fetchActivitiesAndTransactions();
  }, [isAuthenticated, user, profile, childAccounts, navigate]);

  const getAreaIcon = (area: string) => {
    switch (area) {
      case 'Health & Mind': return <Brain className="text-goodchild-blue" size={16} />;
      case 'Effective Communication': return <MessageSquare className="text-goodchild-green" size={16} />;
      case 'Personal Enrichment': return <User className="text-goodchild-purple" size={16} />;
      case 'Creativity': return <Lightbulb className="text-goodchild-yellow" size={16} />;
      case 'Deeper Family Bonds': return <Heart className="text-goodchild-red" size={16} />;
      case 'Emotional Intelligence': return <Zap className="text-goodchild-blue" size={16} />;
      case 'Social Skills': return <Users className="text-goodchild-green" size={16} />;
      default: return <BookOpen className="text-goodchild-blue" size={16} />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned': return 'text-goodchild-green';
      case 'spent': return 'text-goodchild-text-secondary';
      case 'penalty': return 'text-goodchild-red';
      case 'given': return 'text-goodchild-blue';
      default: return 'text-goodchild-text-secondary';
    }
  };

  const getTransactionPrefix = (type: string) => {
    switch (type) {
      case 'earned': return '+';
      case 'spent': return '-';
      case 'penalty': return '-';
      case 'given': return '+';
      default: return '';
    }
  };

  const handleAddPenalty = async (childId: string) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            child_id: childId,
            amount: -10,
            type: 'penalty',
            description: 'Penalty applied',
            created_by: user?.id
          }
        ]);
        
      if (error) {
        toast({
          title: "Error",
          description: "Failed to apply penalty: " + error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Penalty Applied",
        description: "A penalty of 10 GoodCoins has been applied.",
      });
      
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('child_id', childId)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (!transactionsError && transactionsData) {
        const formattedTransactions = transactionsData.map(transaction => {
          const compatibleTransaction: SupabaseTransaction = {
            id: transaction.id,
            child_id: transaction.child_id,
            amount: transaction.amount,
            transaction_type: transaction.type as 'earn' | 'spend',
            description: transaction.description,
            created_by: transaction.created_by,
            created_at: transaction.created_at
          };
          return adaptSupabaseTransaction(compatibleTransaction);
        });
        setTransactions(formattedTransactions);
      }
    } catch (error) {
      console.error('Error applying penalty:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleAddGoodCoin = async (childId: string) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            child_id: childId,
            amount: 20,
            type: 'given',
            description: 'GoodCoins added by parent',
            created_by: user?.id
          }
        ]);
        
      if (error) {
        toast({
          title: "Error",
          description: "Failed to add GoodCoins: " + error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "GoodCoins Added",
        description: "20 GoodCoins have been added to the child's balance.",
      });
      
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('child_id', childId)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (!transactionsError && transactionsData) {
        const formattedTransactions = transactionsData.map(transaction => {
          const compatibleTransaction: SupabaseTransaction = {
            id: transaction.id,
            child_id: transaction.child_id,
            amount: transaction.amount,
            transaction_type: transaction.type as 'earn' | 'spend',
            description: transaction.description,
            created_by: transaction.created_by,
            created_at: transaction.created_at
          };
          return adaptSupabaseTransaction(compatibleTransaction);
        });
        setTransactions(formattedTransactions);
      }
    } catch (error) {
      console.error('Error adding GoodCoins:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-goodchild-background font-sassoon">
      <Navbar />
      
      <main className="flex-grow px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />
          
          <ChildrenProgress 
            childAccounts={childAccounts} 
            user={user} 
            handleAddGoodCoin={handleAddGoodCoin}
            handleAddPenalty={handleAddPenalty}
          />
          
          <ActivityManagement 
            activities={activities} 
            childAccounts={childAccounts} 
            getAreaIcon={getAreaIcon} 
          />
          
          <GoodCoinManagement 
            transactions={transactions} 
            childAccounts={childAccounts} 
            getTransactionColor={getTransactionColor} 
            getTransactionPrefix={getTransactionPrefix}
            handleAddPenalty={handleAddPenalty}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ParentDashboard;
