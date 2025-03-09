
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Brain, MessageSquare, User, Lightbulb, Heart, Zap, Users, Lock } from 'lucide-react';

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

const progressData = [
  { name: 'Week 1', coins: 45 },
  { name: 'Week 2', coins: 75 },
  { name: 'Week 3', coins: 110 },
  { name: 'Week 4', coins: 160 },
  { name: 'Week 5', coins: 210 },
  { name: 'Week 6', coins: 270 },
];

const PublicDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-goodchild-text-primary mb-4">
              Parent Dashboard Preview
            </h1>
            <p className="text-xl text-goodchild-text-secondary max-w-3xl mx-auto">
              This is a preview of the parent dashboard. Sign up or log in to access the full functionality.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg">Create Your Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">Log In</Button>
              </Link>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Child Overview Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock size={16} /> Child Overview
                </CardTitle>
                <CardDescription>Sign in to view your children's progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg p-8 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">Child information is only available to logged-in parents</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/login" className="w-full">
                  <Button className="w-full">Log In to View</Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* GoodCoins Summary */}
            <Card>
              <CardHeader>
                <CardTitle>GoodCoins Earned</CardTitle>
                <CardDescription>Preview of coins earned by all children</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-amber-500 mb-4">270</div>
                <p className="text-sm text-gray-500">Sample data only</p>
                
                <div className="w-full h-48 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="coins" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Development Areas */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Development Areas Progress</CardTitle>
              <CardDescription>Overview of activities completed by development area</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-8">
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
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-100">
                    <div className={`bg-${area.color}-100 p-2 rounded-full`}>
                      {area.icon}
                    </div>
                    <div>
                      <div className="font-medium">{area.name}</div>
                      <div className="text-sm text-gray-500">{area.count} activities</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Preview Features Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">This is a Preview</h2>
            <p className="mb-4">
              Create an account to track your children's progress, assign activities, and reward them with GoodCoins.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button>Create Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Log In</Button>
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
