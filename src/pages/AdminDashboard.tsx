
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-goodchild-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-6 rounded-xl mb-6">
          <h1 className="text-3xl font-bold text-goodchild-text-primary mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl text-goodchild-text-secondary">
            Welcome to the admin dashboard!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/admin/users')}>
                Manage Users
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Activity Library</CardTitle>
              <CardDescription>
                Manage the activity library
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/admin/activities')}>
                Manage Activities
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rewards Management</CardTitle>
              <CardDescription>
                Manage reward offerings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/admin/rewards')}>
                Manage Rewards
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Dashboard Statistics</CardTitle>
            <CardDescription>
              Overview of system usage and metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">This section is currently under development.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg">Total Users</h3>
                <p className="text-2xl">--</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg">Total Children</h3>
                <p className="text-2xl">--</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg">Activities</h3>
                <p className="text-2xl">--</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg">Rewards</h3>
                <p className="text-2xl">--</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
