
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import ChildAccountForm from '@/components/ChildAccountForm';
import { Button } from '@/components/ui/button';

function AddChild() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // This function would normally create a child account in the database
  const handleSubmit = async (formData: any) => {
    try {
      setSubmitting(true);
      
      // Generate a unique ID for the child account
      const userId = uuidv4();
      
      console.log("Creating child account with data:", {
        ...formData,
        userId,
      });
      
      /* 
      BACKEND INTEGRATION COMMENT:
      In a real application, this would connect to your database to:
      1. Create a profile record for the child
      2. Add a record in the children table linking to the parent's ID
      3. Set up initial GoodCoins balance
      
      Example code (removed):
      await createChildAccount({
        name: formData.name,
        surname: formData.surname,
        nickname: formData.nickname,
        email: formData.email,
        avatar: formData.avatar || null,
        userId
      });
      */
      
      // Simulate a short delay for the "API call"
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: `Child account for ${formData.name} created successfully.`,
      });
      
      // Redirect back to parent dashboard
      navigate('/parent-dashboard');
    } catch (error: any) {
      console.error('Error creating child account:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create child account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-goodchild-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-6 rounded-xl mb-6">
          <h1 className="text-3xl font-bold text-goodchild-text-primary mb-2">
            Add Child Account
          </h1>
          <p className="text-goodchild-text-secondary">
            Create a new account for your child
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <ChildAccountForm onSubmit={handleSubmit} isSubmitting={submitting} />
        </div>
        
        <div className="mt-4 text-center">
          <Button 
            onClick={() => navigate('/parent-dashboard')} 
            variant="outline"
            className="text-goodchild-blue hover:bg-goodchild-blue/10"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddChild;
