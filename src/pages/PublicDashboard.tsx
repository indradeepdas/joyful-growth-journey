
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Brain, MessageSquare, User, Lightbulb, Heart, Zap, Users, ArrowUp, ArrowDown, CalendarDays, CheckCircle, ThumbsDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoodCoinIcon from '@/components/GoodCoinIcon';

// Sample data for charts
const developmentAreasData = [
  { name: 'Health & Mind', value: 25, color: '#3b82f6' },
  { name: 'Effective Communication', value: 15, color: '#10b981' },
  { name: 'Personal Enrichment', value: 20, color: '#8b5cf6' },
  { name: 'Creativity', value: 18, color: '#facc15' },
  { name: 'Deeper Family Bonds', value: 10, color: '#ef4444' },
  { name: 'Emotional Intelligence', value: 7, color: '#f97316' },
  { name: 'Social Skills', value: 5, color: '#6366f1' },
];

// Sample children data
const childrenData = [
  {
    id: "child1",
    name: "Emma",
    age: 8,
    goodCoins: 270,
    avatar: "https://i.pravatar.cc/150?img=44",
    progressData: [
      { name: 'Week 1', coins: 45 },
      { name: 'Week 2', coins: 75 },
      { name: 'Week 3', coins: 110 },
      { name: 'Week 4', coins: 160 },
      { name: 'Week 5', coins: 210 },
      { name: 'Week 6', coins: 270 },
    ],
    upcomingActivities: [
      { id: "a1", name: "Reading Adventure", date: "Tomorrow, 4:00 PM", coins: 25, area: "Personal Enrichment" },
      { id: "a2", name: "Family Game Night", date: "Saturday, 7:00 PM", coins: 30, area: "Deeper Family Bonds" },
      { id: "a3", name: "Science Experiment", date: "Sunday, 2:00 PM", coins: 40, area: "Health & Mind" },
    ],
    completedActivities: [
      { id: "c1", name: "Math Practice", date: "Yesterday", coins: 20, area: "Health & Mind" },
      { id: "c2", name: "Help with Dishes", date: "2 days ago", coins: 15, area: "Personal Enrichment" },
      { id: "c3", name: "Art Project", date: "3 days ago", coins: 35, area: "Creativity" },
      { id: "c4", name: "Story Writing", date: "Last week", coins: 30, area: "Effective Communication" },
    ]
  },
  {
    id: "child2",
    name: "Noah",
    age: 10,
    goodCoins: 385,
    avatar: "https://i.pravatar.cc/150?img=59",
    progressData: [
      { name: 'Week 1', coins: 60 },
      { name: 'Week 2', coins: 120 },
      { name: 'Week 3', coins: 190 },
      { name: 'Week 4', coins: 240 },
      { name: 'Week 5', coins: 320 },
      { name: 'Week 6', coins: 385 },
    ],
    upcomingActivities: [
      { id: "a4", name: "Coding Challenge", date: "Tomorrow, 5:00 PM", coins: 50, area: "Health & Mind" },
      { id: "a5", name: "Basketball Practice", date: "Friday, 4:00 PM", coins: 35, area: "Health & Mind" },
      { id: "a6", name: "Help Grandma", date: "Saturday, 10:00 AM", coins: 45, area: "Social Skills" },
    ],
    completedActivities: [
      { id: "c5", name: "Book Report", date: "Yesterday", coins: 40, area: "Personal Enrichment" },
      { id: "c6", name: "Organize Room", date: "2 days ago", coins: 25, area: "Personal Enrichment" },
      { id: "c7", name: "Team Project", date: "Last week", coins: 55, area: "Social Skills" },
    ]
  },
  {
    id: "child3",
    name: "Olivia",
    age: 7,
    goodCoins: 195,
    avatar: "https://i.pravatar.cc/150?img=48",
    progressData: [
      { name: 'Week 1', coins: 30 },
      { name: 'Week 2', coins: 55 },
      { name: 'Week 3', coins: 85 },
      { name: 'Week 4', coins: 120 },
      { name: 'Week 5', coins: 160 },
      { name: 'Week 6', coins: 195 },
    ],
    upcomingActivities: [
      { id: "a7", name: "Dance Lesson", date: "Tomorrow, 3:00 PM", coins: 30, area: "Health & Mind" },
      { id: "a8", name: "Story Time", date: "Friday, 6:00 PM", coins: 25, area: "Emotional Intelligence" },
      { id: "a9", name: "Play Date", date: "Sunday, 2:00 PM", coins: 40, area: "Social Skills" },
    ],
    completedActivities: [
      { id: "c8", name: "Drawing Session", date: "Yesterday", coins: 20, area: "Creativity" },
      { id: "c9", name: "Practice Letters", date: "3 days ago", coins: 25, area: "Effective Communication" },
      { id: "c10", name: "Help with Groceries", date: "Last week", coins: 30, area: "Personal Enrichment" },
    ]
  }
];

const PublicDashboard: React.FC = () => {
  const [penaltyOpen, setPenaltyOpen] = useState<{ [key: string]: boolean }>({});
  const [penaltyReason, setPenaltyReason] = useState<{ [key: string]: string }>({});
  const [penaltyAmount, setPenaltyAmount] = useState<{ [key: string]: number }>({});

  const togglePenalty = (childId: string) => {
    setPenaltyOpen(prev => ({
      ...prev,
      [childId]: !prev[childId]
    }));
  };

  const handlePenaltyReasonChange = (childId: string, reason: string) => {
    setPenaltyReason(prev => ({
      ...prev,
      [childId]: reason
    }));
  };

  const handlePenaltyAmountChange = (childId: string, amount: number) => {
    setPenaltyAmount(prev => ({
      ...prev,
      [childId]: amount
    }));
  };

  const handleApplyPenalty = (childId: string) => {
    // This would apply the penalty in a real app
    alert(`Penalty of ${penaltyAmount[childId] || 0} GoodCoins applied to ${childrenData.find(c => c.id === childId)?.name} for: ${penaltyReason[childId] || 'No reason provided'}`);
    togglePenalty(childId);
    setPenaltyReason(prev => ({ ...prev, [childId]: '' }));
    setPenaltyAmount(prev => ({ ...prev, [childId]: 0 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#91EBFF] to-[#B8A9FA] flex flex-col font-['Nunito',_sans-serif]">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-4 font-['Nunito',_sans-serif]">
              Parent Dashboard Preview
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-['Nunito',_sans-serif]">
              This is a preview of the parent dashboard. Sign up or log in to access the full functionality.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-[#FF85E2] hover:bg-[#FF59D6] text-white font-['Nunito',_sans-serif]">Create Your Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-['Nunito',_sans-serif]">Log In</Button>
              </Link>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="mb-8 bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-[#FF85E2]">
            <h2 className="text-2xl font-bold text-white mb-4 font-['Nunito',_sans-serif]">Your Children</h2>
            
            <Tabs defaultValue="child1" className="w-full">
              <TabsList className="w-full mb-4 bg-white/30">
                {childrenData.map(child => (
                  <TabsTrigger 
                    key={child.id} 
                    value={child.id}
                    className="text-white data-[state=active]:bg-[#FF85E2] data-[state=active]:text-white font-['Nunito',_sans-serif]"
                  >
                    {child.name} ({child.age})
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {childrenData.map(child => (
                <TabsContent key={child.id} value={child.id} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Child Overview */}
                    <Card className="flex-1">
                      <CardHeader className="bg-[#FF85E2] text-white">
                        <CardTitle className="flex items-center gap-2 font-['Nunito',_sans-serif]">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img src={child.avatar} alt={child.name} className="w-full h-full object-cover" />
                          </div>
                          {child.name}'s Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center p-3 bg-[#FFC2E9]/20 rounded-lg mb-4">
                          <div>
                            <span className="text-sm text-[#FF85E2] font-['Nunito',_sans-serif]">GoodCoins Balance</span>
                            <div className="font-bold text-2xl flex items-center gap-1 text-[#FF85E2]">
                              <GoodCoinIcon className="h-6 w-6" />
                              {child.goodCoins}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {child.progressData[child.progressData.length - 1].coins > 
                             child.progressData[child.progressData.length - 2].coins ? (
                              <div className="flex items-center text-green-500">
                                <ArrowUp size={18} />
                                <span>Growing</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-red-500">
                                <ArrowDown size={18} />
                                <span>Decreasing</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="w-full h-52">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={child.progressData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="coins" stroke="#FF85E2" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Penalty Section */}
                    <Card className="w-full md:w-96">
                      <CardHeader className="bg-[#A7C2FF] text-white">
                        <CardTitle className="font-['Nunito',_sans-serif]">Assign Penalty</CardTitle>
                        <CardDescription className="text-white/80 font-['Nunito',_sans-serif]">
                          Deduct GoodCoins for rule violations
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        {!penaltyOpen[child.id] ? (
                          <Button 
                            onClick={() => togglePenalty(child.id)} 
                            className="w-full bg-[#A7C2FF] hover:bg-[#85B0FF] text-white"
                          >
                            <ThumbsDown className="mr-2 h-4 w-4" />
                            Assign Penalty
                          </Button>
                        ) : (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-1 text-[#FF85E2]">Reason for penalty</label>
                              <textarea 
                                className="w-full p-2 border border-[#FF85E2] rounded-md bg-white/50"
                                rows={2}
                                placeholder="Why are you assigning this penalty?"
                                value={penaltyReason[child.id] || ''}
                                onChange={(e) => handlePenaltyReasonChange(child.id, e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-[#FF85E2]">GoodCoins to deduct</label>
                              <input 
                                type="number" 
                                className="w-full p-2 border border-[#FF85E2] rounded-md bg-white/50"
                                min={0}
                                max={child.goodCoins}
                                value={penaltyAmount[child.id] || 0}
                                onChange={(e) => handlePenaltyAmountChange(child.id, parseInt(e.target.value, 10) || 0)}
                              />
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button 
                                onClick={() => togglePenalty(child.id)} 
                                variant="outline" 
                                className="flex-1 border-[#FF85E2] text-[#FF85E2]"
                              >
                                Cancel
                              </Button>
                              <Button 
                                onClick={() => handleApplyPenalty(child.id)} 
                                className="flex-1 bg-[#FF85E2] hover:bg-[#FF59D6] text-white"
                                disabled={!penaltyReason[child.id] || !(penaltyAmount[child.id] > 0)}
                              >
                                Apply Penalty
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Activities Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upcoming Activities */}
                    <Card>
                      <CardHeader className="bg-[#91EBFF] text-white">
                        <CardTitle className="flex items-center gap-2 font-['Nunito',_sans-serif]">
                          <CalendarDays className="h-5 w-5" />
                          Upcoming Activities
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        {child.upcomingActivities.length === 0 ? (
                          <p className="text-center py-4 text-gray-500">No upcoming activities</p>
                        ) : (
                          <div className="space-y-3">
                            {child.upcomingActivities.map(activity => (
                              <div key={activity.id} className="flex justify-between p-3 bg-[#91EBFF]/10 rounded-lg border border-[#91EBFF]/30">
                                <div>
                                  <h4 className="font-medium text-[#91EBFF] font-['Nunito',_sans-serif]">{activity.name}</h4>
                                  <div className="text-sm text-gray-600 flex items-center gap-1">
                                    <CalendarDays className="h-3 w-3" />
                                    {activity.date}
                                  </div>
                                  <div className="text-xs bg-[#91EBFF]/20 px-2 py-1 rounded inline-block mt-1">
                                    {activity.area}
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <div className="flex items-center gap-1 text-[#FF85E2] font-bold">
                                    <GoodCoinIcon className="h-4 w-4" />
                                    {activity.coins}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    {/* Completed Activities */}
                    <Card>
                      <CardHeader className="bg-[#FFD4A9] text-white">
                        <CardTitle className="flex items-center gap-2 font-['Nunito',_sans-serif]">
                          <CheckCircle className="h-5 w-5" />
                          Completed Activities
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        {child.completedActivities.length === 0 ? (
                          <p className="text-center py-4 text-gray-500">No completed activities</p>
                        ) : (
                          <div className="space-y-3">
                            {child.completedActivities.map(activity => (
                              <div key={activity.id} className="flex justify-between p-3 bg-[#FFD4A9]/10 rounded-lg border border-[#FFD4A9]/30">
                                <div>
                                  <h4 className="font-medium text-[#FFD4A9] font-['Nunito',_sans-serif]">{activity.name}</h4>
                                  <div className="text-sm text-gray-600 flex items-center gap-1">
                                    <CalendarDays className="h-3 w-3" />
                                    {activity.date}
                                  </div>
                                  <div className="text-xs bg-[#FFD4A9]/20 px-2 py-1 rounded inline-block mt-1">
                                    {activity.area}
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <div className="flex items-center gap-1 text-[#FF85E2] font-bold">
                                    <GoodCoinIcon className="h-4 w-4" />
                                    {activity.coins}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* Development Areas */}
          <Card className="mb-8">
            <CardHeader className="bg-[#A7C2FF] text-white">
              <CardTitle className="font-['Nunito',_sans-serif]">Development Areas Progress</CardTitle>
              <CardDescription className="text-white/80 font-['Nunito',_sans-serif]">Overview of activities completed by development area</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-8 pt-6">
              <div className="w-full md:w-1/3 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={developmentAreasData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name }) => name}
                    >
                      {developmentAreasData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Health & Mind', icon: <Brain className="text-blue-500" />, count: 5, color: 'blue' },
                  { name: 'Effective Communication', icon: <MessageSquare className="text-green-500" />, count: 3, color: 'green' },
                  { name: 'Personal Enrichment', icon: <User className="text-purple-500" />, count: 4, color: 'purple' },
                  { name: 'Creativity', icon: <Lightbulb className="text-yellow-500" />, count: 6, color: 'yellow' },
                  { name: 'Deeper Family Bonds', icon: <Heart className="text-red-500" />, count: 2, color: 'red' },
                  { name: 'Emotional Intelligence', icon: <Zap className="text-orange-500" />, count: 3, color: 'orange' },
                  { name: 'Social Skills', icon: <Users className="text-indigo-500" />, count: 1, color: 'indigo' },
                ].map((area, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/50 shadow-sm border border-gray-100">
                    <div className={`bg-${area.color}-100 p-2 rounded-full`}>
                      {area.icon}
                    </div>
                    <div>
                      <div className="font-medium font-['Nunito',_sans-serif]">{area.name}</div>
                      <div className="text-sm text-gray-500">{area.count} activities</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Preview Features Disclaimer */}
          <div className="bg-[#FF85E2]/30 border border-[#FF85E2] rounded-lg p-6 text-center mb-8">
            <h2 className="text-xl font-semibold mb-2 text-white font-['Nunito',_sans-serif]">This is a Preview</h2>
            <p className="mb-4 text-white/90 font-['Nunito',_sans-serif]">
              Create an account to track your children's progress, assign activities, and reward them with GoodCoins.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-[#FF85E2] hover:bg-[#FF59D6] text-white font-['Nunito',_sans-serif]">Create Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-['Nunito',_sans-serif]">Log In</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicDashboard;
