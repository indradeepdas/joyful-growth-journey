import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import ChildAccountForm from '@/components/ChildAccountForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Child, Activity, Transaction } from '@/types';
import { 
  getChildData,
  getActivitiesForChild,
  getTransactionsForChild,
  mockActivities,
  mockTransactions
} from '@/services/mockData';
import {
  Users,
  Calendar,
  BarChart3,
  Plus,
  Award,
  BookOpen,
  Brain,
  Heart,
  Lightbulb,
  MessageSquare,
  User,
  Zap,
  ArrowRight,
  MinusCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ParentDashboard: React.FC = () => {
  const { user, isAuthenticated, getParentData } = useAuth();
  const [showChildForm, setShowChildForm] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'parent') {
      navigate('/login');
      return;
    }
    
    const parent = getParentData();
    if (parent) {
      setChildren(parent.children);
      
      // Since we can't get activities and transactions directly from getChildData(),
      // we'll create some mock data for demonstration purposes
      const mockChildActivities = mockActivities.slice(0, 5);
      const mockChildTransactions = mockTransactions.slice(0, 5);
      
      setActivities(mockChildActivities);
      setTransactions(mockChildTransactions);
    }
  }, [isAuthenticated, user, navigate, getParentData]);

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

  const handleAddPenalty = (childId: string) => {
    // In a real app, this would open a form or modal
    toast({
      title: "Penalty Applied",
      description: "A penalty of 10 GoodCoins has been applied.",
    });
  };

  const handleAddGoodCoin = (childId: string) => {
    // In a real app, this would open a form or modal
    toast({
      title: "GoodCoins Added",
      description: "20 GoodCoins have been added to the child's balance.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-goodchild-background">
      <Navbar />
      
      <main className="flex-grow px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-goodchild-text-primary mb-2">
                Parent Dashboard
              </h1>
              <p className="text-goodchild-text-secondary">
                Manage your children's activities, rewards, and progress.
              </p>
            </div>
            
            <button 
              onClick={() => setShowChildForm(true)}
              className="btn-primary inline-flex items-center gap-2 self-start"
            >
              <Plus size={18} />
              <span>Create Child Account</span>
            </button>
          </header>
          
          {/* Children's Progress Overview Section */}
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
            
            {children.length === 0 ? (
              <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                <p className="text-goodchild-text-secondary mb-4">
                  You haven't added any children yet.
                </p>
                <button 
                  onClick={() => setShowChildForm(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Plus size={18} />
                  <span>Add Your First Child</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {children.map((child) => (
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
                          <GoodCoinIcon value={child.goodCoins} />
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        {['Health & Mind', 'Creativity', 'Social Skills'].map((area) => (
                          <div key={area} className="flex items-center gap-2">
                            <div className="flex items-center gap-2 flex-shrink-0 w-48">
                              {getAreaIcon(area)}
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
                ))}
              </div>
            )}
          </section>
          
          {/* Activity Management Summary */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-goodchild-text-primary flex items-center gap-2">
                <Calendar size={24} />
                <span>Activity Management</span>
              </h2>
              <button className="text-goodchild-blue hover:underline inline-flex items-center gap-1 text-sm">
                <span>Manage Activities</span>
                <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex justify-end mb-4">
                <button className="btn-outline text-sm px-4 py-2 inline-flex items-center gap-1">
                  <Plus size={16} />
                  <span>Create Activity</span>
                </button>
              </div>
              
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-goodchild-text-secondary mb-2">No scheduled activities yet.</p>
                  <p className="text-sm text-goodchild-text-secondary">
                    Create activities to help your children develop and earn GoodCoins.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const childName = children.find(c => c.id === activity.childId)?.name || 'Unknown Child';
                    return (
                      <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-goodchild-blue/10 flex items-center justify-center">
                            {getAreaIcon(activity.developmentArea)}
                          </div>
                          <div>
                            <h4 className="font-medium text-goodchild-text-primary">{activity.title}</h4>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-goodchild-text-secondary">Assigned to:</span>
                              <span className="font-medium">{childName}</span>
                              <span className="text-goodchild-blue">
                                <GoodCoinIcon size="sm" value={activity.goodCoins} />
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {activity.status === 'pending' ? (
                            <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                              {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : 'Pending'}
                            </span>
                          ) : (
                            <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
          
          {/* GoodCoin Management Overview */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-goodchild-text-primary flex items-center gap-2">
                <BarChart3 size={24} />
                <span>GoodCoin Management</span>
              </h2>
              <button className="text-goodchild-blue hover:underline inline-flex items-center gap-1 text-sm">
                <span>View All Transactions</span>
                <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="font-semibold text-goodchild-text-primary mb-4 flex items-center gap-2">
                  <Award size={20} />
                  <span>Recent Transactions</span>
                </h3>
                
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-goodchild-text-secondary mb-2">No transactions yet.</p>
                    <p className="text-sm text-goodchild-text-secondary">
                      Transactions will appear here when your children earn or spend GoodCoins.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((transaction) => {
                      const childName = children.find(c => c.id === transaction.childId)?.name || 'Unknown Child';
                      return (
                        <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                          <div>
                            <div className="font-medium text-goodchild-text-primary">
                              {childName} - {transaction.description}
                            </div>
                            <div className="text-sm text-goodchild-text-secondary">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className={`font-bold ${getTransactionColor(transaction.type)}`}>
                            {getTransactionPrefix(transaction.type)}{transaction.amount}
                            <GoodCoinIcon size="sm" className="ml-1" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Penalties Section */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="font-semibold text-goodchild-text-primary mb-4 flex items-center gap-2">
                  <MinusCircle size={20} />
                  <span>Apply Penalties</span>
                </h3>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="childSelect" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
                      Select Child
                    </label>
                    <select
                      id="childSelect"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
                    >
                      <option value="">Select a child</option>
                      {children.map((child) => (
                        <option key={child.id} value={child.id}>
                          {child.name} {child.surname}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="penaltyAmount" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
                      GoodCoins to Deduct
                    </label>
                    <input
                      id="penaltyAmount"
                      type="number"
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
                      placeholder="Enter amount"
                    />
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
      
      {/* Child Account Creation Modal */}
      {showChildForm && <ChildAccountForm onClose={() => setShowChildForm(false)} />}
    </div>
  );
};

export default ParentDashboard;
