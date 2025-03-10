
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-goodchild-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-6 rounded-xl mb-6">
          <h1 className="text-3xl font-bold text-goodchild-text-primary mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-xl text-goodchild-text-secondary">
            Welcome to the teacher dashboard!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Classes</CardTitle>
              <CardDescription>
                Manage your classes and student groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/teacher/classes')}>
                View Classes
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Activities</CardTitle>
              <CardDescription>
                Create and assign educational activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/teacher/activities')}>
                Manage Activities
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
            <CardDescription>
              Track student performance and development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center p-8 text-goodchild-text-secondary">
              This feature is coming soon! You'll be able to track your students' progress across different development areas.
            </p>
          </CardContent>
        </Card>
        
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">
            Teacher Resources
          </h2>
          <p className="text-goodchild-text-secondary mb-4">
            Access teaching materials, guides, and resources to help create effective educational activities.
          </p>
          <Button className="w-full md:w-auto">
            Browse Resources
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
