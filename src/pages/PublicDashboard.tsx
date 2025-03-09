
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { BadgeCheck, Calendar, Gift, ChevronRight, TrendingUp, Users, Shield, Activity, Plus } from 'lucide-react';
import GoodCoinIcon from '@/components/GoodCoinIcon';

// Sample data for charts
const progressData = [
  { name: 'Week 1', Health: 40, Communication: 30, Enrichment: 20, Creativity: 15, Family: 25, Emotional: 35, Social: 10 },
  { name: 'Week 2', Health: 45, Communication: 35, Enrichment: 25, Creativity: 20, Family: 30, Emotional: 40, Social: 15 },
  { name: 'Week 3', Health: 50, Communication: 40, Enrichment: 30, Creativity: 25, Family: 35, Emotional: 45, Social: 20 },
  { name: 'Week 4', Health: 55, Communication: 45, Enrichment: 35, Creativity: 30, Family: 40, Emotional: 50, Social: 25 },
];

const activityCompletionData = [
  { name: 'Week 1', Completed: 5, Pending: 3 },
  { name: 'Week 2', Completed: 7, Pending: 4 },
  { name: 'Week 3', Completed: 9, Pending: 3 },
  { name: 'Week 4', Completed: 12, Pending: 2 },
];

// Sample children profiles
const sampleChildren = [
  {
    id: '1',
    name: 'Alex',
    avatar: 'https://placehold.co/100/06D6A0/FFFFFF?text=A',
    goodCoins: 185,
    completedActivities: 12
  },
  {
    id: '2',
    name: 'Jamie',
    avatar: 'https://placehold.co/100/EF476F/FFFFFF?text=J',
    goodCoins: 120,
    completedActivities: 8
  }
];

// Recent activities
const recentActivities = [
  { id: '1', child: 'Alex', action: 'completed', activity: 'Morning Yoga Routine', date: '2 hours ago', goodCoins: 15 },
  { id: '2', child: 'Jamie', action: 'earned', activity: 'Special Treat', date: 'Yesterday', goodCoins: 35 },
  { id: '3', child: 'Alex', action: 'completed', activity: 'Storytelling Challenge', date: '2 days ago', goodCoins: 20 },
  { id: '4', child: 'Jamie', action: 'redeemed', activity: 'No Chores Day', date: '3 days ago', goodCoins: -80 }
];

const PublicDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-goodchild-text-primary mb-4">
              Parent Dashboard Demo
            </h1>
            <p className="text-xl text-goodchild-text-secondary max-w-3xl mx-auto">
              Preview the parent dashboard where you can track your children's progress and manage their activities.
            </p>
            <div className="mt-6">
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-goodchild-green hover:bg-goodchild-green/90"
              >
                Sign Up to Create Account
              </Button>
              <span className="mx-2 text-goodchild-text-secondary">or</span>
              <Button 
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-goodchild-blue text-goodchild-blue hover:bg-goodchild-blue/10"
              >
                Sign In
              </Button>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total GoodCoins</CardTitle>
                <GoodCoinIcon className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">305</div>
                <p className="text-xs text-goodchild-text-secondary mt-1">Earned across all children</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Activities</CardTitle>
                <BadgeCheck className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">20</div>
                <p className="text-xs text-goodchild-text-secondary mt-1">Activities completed this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Activities</CardTitle>
                <Calendar className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-xs text-goodchild-text-secondary mt-1">Activities due in the next 7 days</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Child profiles and quick actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Child Profiles</CardTitle>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add Child</span>
                    </Button>
                  </div>
                  <CardDescription>Manage your children's accounts and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {sampleChildren.map(child => (
                      <div key={child.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative">
                            <img 
                              src={child.avatar} 
                              alt={child.name} 
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-goodchild-background">
                              <BadgeCheck className="h-4 w-4 text-green-500" />
                            </span>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium">{child.name}</h3>
                            <div className="flex items-center text-sm text-goodchild-text-secondary">
                              <GoodCoinIcon className="h-4 w-4 mr-1 text-amber-500" />
                              <span>{child.goodCoins} GoodCoins</span>
                              <span className="mx-2">•</span>
                              <BadgeCheck className="h-4 w-4 mr-1 text-green-500" />
                              <span>{child.completedActivities} Activities</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          className="hover:bg-goodchild-blue/10 hover:text-goodchild-blue"
                          onClick={() => navigate('/login')}
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">View Profile</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3">
                  <Button
                    className="w-full bg-goodchild-blue hover:bg-goodchild-blue/90"
                    onClick={() => navigate('/login')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Sign In to Manage Children
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks you might want to perform</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/login')}
                  >
                    <Plus className="mr-2 h-4 w-4 text-green-500" />
                    Create New Activity
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/login')} 
                  >
                    <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                    Schedule Activities
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/login')} 
                  >
                    <Gift className="mr-2 h-4 w-4 text-purple-500" />
                    Create New Reward
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/login')} 
                  >
                    <Shield className="mr-2 h-4 w-4 text-red-500" />
                    Update Parental Controls
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/login')} 
                  >
                    <TrendingUp className="mr-2 h-4 w-4 text-amber-500" />
                    View Progress Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Development progress chart */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Development Progress</CardTitle>
                <CardDescription>Track your children's growth across 7 key developmental areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={progressData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="Health" stackId="1" stroke="#2196F3" fill="#2196F3" />
                      <Area type="monotone" dataKey="Communication" stackId="1" stroke="#4CAF50" fill="#4CAF50" />
                      <Area type="monotone" dataKey="Enrichment" stackId="1" stroke="#9C27B0" fill="#9C27B0" />
                      <Area type="monotone" dataKey="Creativity" stackId="1" stroke="#FFC107" fill="#FFC107" />
                      <Area type="monotone" dataKey="Family" stackId="1" stroke="#F44336" fill="#F44336" />
                      <Area type="monotone" dataKey="Emotional" stackId="1" stroke="#FF9800" fill="#FF9800" />
                      <Area type="monotone" dataKey="Social" stackId="1" stroke="#3F51B5" fill="#3F51B5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-between">
                <span className="text-sm text-goodchild-text-secondary">Sample data shown for demonstration</span>
                <Button variant="link" onClick={() => navigate('/login')}>View Detailed Report</Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Recent activities and completion rates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest events and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map(item => (
                    <div key={item.id} className="flex justify-between items-start border-b border-gray-100 pb-4 last:border-0">
                      <div>
                        <p className="font-medium">
                          <span className="text-goodchild-blue">{item.child}</span>
                          {' '}
                          <span>{item.action}</span>
                          {' '}
                          <span className="font-normal text-goodchild-text-secondary">{item.activity}</span>
                        </p>
                        <span className="text-sm text-goodchild-text-secondary">{item.date}</span>
                      </div>
                      <div className={`flex items-center ${item.goodCoins > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <GoodCoinIcon className="h-4 w-4 mr-1" />
                        <span>{item.goodCoins > 0 ? '+' : ''}{item.goodCoins}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button variant="link" className="w-full" onClick={() => navigate('/login')}>
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Completion Rates</CardTitle>
                <CardDescription>Track how many activities are completed vs. pending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={activityCompletionData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Completed" stackId="a" fill="#4CAF50" />
                      <Bar dataKey="Pending" stackId="a" fill="#FFC107" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button variant="link" className="w-full" onClick={() => navigate('/login')}>
                  View Activity Analytics
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicDashboard;
