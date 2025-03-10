
import React, { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

function ParentDashboard() {
  const { profile, childAccounts } = useSupabaseAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(false);
      } catch (err: any) {
        console.error("Error loading dashboard:", err);
        setError("Failed to load dashboard data. Please refresh the page.");
        setLoading(false);
      }
    };
    
    loadDashboard();
  }, []);

  const handleAddChild = () => {
    navigate('/add-child');
  };

  const handleViewChildDashboard = (childId: string) => {
    // This would typically navigate to a child-specific view
    toast({
      title: "Feature in Development",
      description: "Viewing individual child dashboards will be available soon.",
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-goodchild-background flex items-center justify-center">
      <div className="text-xl">Loading your dashboard...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-goodchild-background flex items-center justify-center">
      <div className="text-xl text-red-500">{error}</div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-goodchild-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-6 rounded-xl mb-6">
          <h1 className="text-3xl font-bold text-goodchild-text-primary mb-2">
            Parent Dashboard
          </h1>
          <p className="text-xl text-goodchild-text-secondary">
            Welcome, {profile?.first_name || 'Parent'}!
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-goodchild-text-primary">Your Children</h2>
            <Button 
              onClick={handleAddChild}
              className="bg-goodchild-blue text-white hover:bg-goodchild-blue/90"
            >
              Add Child
            </Button>
          </div>

          {childAccounts.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-goodchild-text-secondary mb-4">You haven't added any children yet.</p>
              <Button 
                onClick={handleAddChild}
                className="bg-goodchild-yellow text-goodchild-text-primary hover:bg-goodchild-yellow/90"
              >
                Add Your First Child
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {childAccounts.map((child) => (
                <Card key={child.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle>{child.name} {child.surname}</CardTitle>
                    <CardDescription>
                      {child.nickname ? `"${child.nickname}"` : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="font-semibold">
                        GoodCoins: {child.good_coins}
                      </div>
                      <Button 
                        onClick={() => handleViewChildDashboard(child.id)}
                        size="sm"
                        variant="outline"
                        className="border-goodchild-blue text-goodchild-blue hover:bg-goodchild-blue/10"
                      >
                        View Dashboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">Activity Center</h2>
            <p className="text-goodchild-text-secondary mb-4">
              Create and assign activities for your children to complete.
            </p>
            <Button 
              onClick={() => navigate('/activity-center')}
              className="w-full bg-goodchild-green text-white hover:bg-goodchild-green/90"
            >
              Go to Activity Center
            </Button>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">Rewards Hub</h2>
            <p className="text-goodchild-text-secondary mb-4">
              Browse and create rewards that your children can earn with GoodCoins.
            </p>
            <Button 
              onClick={() => navigate('/rewards-hub')}
              className="w-full bg-goodchild-green text-white hover:bg-goodchild-green/90"
            >
              Go to Rewards Hub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;
