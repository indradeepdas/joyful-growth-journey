
import React, { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SupabaseChild } from '@/services/types';
import {
  Users,
  Calendar,
  BarChart3,
  Award,
  User,
  ArrowRight,
  MinusCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ParentDashboard: React.FC = () => {
  const { user, profile, childAccounts, isAuthenticated, isLoading } = useSupabaseAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoading) {
        if (!isAuthenticated) {
          console.log('Not authenticated, redirecting to login');
          navigate('/login');
          return;
        }
        
        if (profile?.role !== 'parent') {
          console.log('Not a parent, redirecting to appropriate dashboard');
          if (profile?.role === 'child') {
            navigate('/child-dashboard');
          } else {
            navigate('/login');
          }
          return;
        }
        
        setIsPageLoading(false);
      }
    };
    
    checkAuth();
  }, [isAuthenticated, isLoading, navigate, profile]);

  const handleAddPenalty = async (childId: string) => {
    try {
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to perform this action",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase
        .from('transactions')
        .insert({
          child_id: childId,
          amount: 10,
          type: 'penalty',
          description: 'Penalty applied',
          created_by: user.id
        });
        
      if (error) {
        console.error('Error applying penalty:', error);
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
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to perform this action",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase
        .from('transactions')
        .insert({
          child_id: childId,
          amount: 20,
          type: 'given',
          description: 'GoodCoins added by parent',
          created_by: user.id
        });
        
      if (error) {
        console.error('Error adding GoodCoins:', error);
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
      
    } catch (error) {
      console.error('Error adding GoodCoins:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const renderChildProgress = (child: SupabaseChild) => {
    return (
      <div key={child.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-goodchild-blue/20 rounded-full flex items-center justify-center">
                <User size={24} className="text-goodchild-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-goodchild-text-primary">{child.name}</h3>
                <p className="text-sm text-goodchild-text-secondary">{child.nickname || child.surname}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="good-coin">
                <GoodCoinIcon className="w-5 h-5" />
                <span>{child.good_coins}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            {['Health & Mind', 'Creativity', 'Social Skills'].map((area) => (
              <div key={area} className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-shrink-0 w-48">
                  <span className="text-sm text-goodchild-text-secondary">{area}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-goodchild-blue rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => handleAddGoodCoin(child.id)}
              className="bg-goodchild-green/10 text-goodchild-green px-3 py-1 rounded-lg text-sm hover:bg-goodchild-green/20 transition-colors"
            >
              Add GoodCoins
            </button>
            <button 
              onClick={() => handleAddPenalty(child.id)}
              className="bg-goodchild-red/10 text-goodchild-red px-3 py-1 rounded-lg text-sm hover:bg-goodchild-red/20 transition-colors"
            >
              Apply Penalty
            </button>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-goodchild-blue/5 flex justify-end">
          <button className="text-goodchild-blue hover:underline inline-flex items-center gap-1 text-sm">
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  if (isLoading || isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-goodchild-background">
        <div className="animate-pulse text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-goodchild-background font-sassoon">
      <Navbar />
      
      <main className="flex-grow px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-goodchild-text-primary mb-2">
              Parent Dashboard
            </h1>
            <p className="text-goodchild-text-secondary">
              Manage your children's activities, rewards, and progress.
            </p>
          </header>
          
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-goodchild-text-primary flex items-center gap-2">
                <Users size={24} />
                <span>Children's Progress</span>
              </h2>
              <button className="text-goodchild-blue hover:underline inline-flex items-center gap-1 text-sm">
                <span>View All</span>
                <ArrowRight size={16} />
              </button>
            </div>
            
            {childAccounts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                <p className="text-goodchild-text-secondary mb-4">
                  You haven't added any children yet.
                </p>
                <button 
                  className="bg-goodchild-primary text-white px-4 py-2 rounded-lg hover:bg-goodchild-primary/90"
                  onClick={() => navigate('/add-child')}
                >
                  Add Child Account
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {childAccounts.map(renderChildProgress)}
              </div>
            )}
          </section>
          
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-goodchild-text-primary flex items-center gap-2">
                <Calendar size={24} />
                <span>Activity Management</span>
              </h2>
              <button 
                onClick={() => navigate('/activities')}
                className="text-goodchild-blue hover:underline inline-flex items-center gap-1 text-sm"
              >
                <span>Manage Activities</span>
                <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="text-center py-8">
                <button 
                  onClick={() => navigate('/activities')}
                  className="mb-4 bg-goodchild-primary text-white px-6 py-3 rounded-lg hover:bg-goodchild-primary/90 transition-colors"
                >
                  Go to Activity Center
                </button>
                <p className="text-goodchild-text-secondary">
                  Create activities to help your children develop and earn GoodCoins.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-goodchild-text-primary flex items-center gap-2">
                <BarChart3 size={24} />
                <span>GoodCoin Management</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="font-semibold text-goodchild-text-primary mb-4 flex items-center gap-2">
                  <Award size={20} />
                  <span>Recent Transactions</span>
                </h3>
                
                <div className="text-center py-8">
                  <p className="text-goodchild-text-secondary mb-2">
                    View your children's transaction history to track their progress.
                  </p>
                  <button 
                    className="bg-goodchild-blue text-white px-4 py-2 rounded-lg hover:bg-goodchild-blue/90"
                    onClick={() => navigate('/transactions')}
                  >
                    View All Transactions
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="font-semibold text-goodchild-text-primary mb-4 flex items-center gap-2">
                  <MinusCircle size={20} />
                  <span>Apply Penalties</span>
                </h3>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="childSelect" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
                      Select Child
                    </label>
                    <select
                      id="childSelect"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
                    >
                      <option value="">Select a child</option>
                      {childAccounts.map((child) => (
                        <option key={child.id} value={child.id}>
                          {child.name} {child.surname}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="penaltyReason" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
                      Reason (Optional)
                    </label>
                    <textarea
                      id="penaltyReason"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
                      placeholder="Explain the reason for the penalty"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-goodchild-red text-white px-4 py-2 rounded-lg hover:bg-goodchild-red/90 transition-colors"
                      onClick={() => {
                        const childSelect = document.getElementById('childSelect') as HTMLSelectElement;
                        if (childSelect && childSelect.value) {
                          handleAddPenalty(childSelect.value);
                        } else {
                          toast({
                            title: "Error",
                            description: "Please select a child",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      Apply Penalty
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ParentDashboard;
