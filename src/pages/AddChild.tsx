
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import ChildAccountForm from '@/components/ChildAccountForm';

function AddChild() {
  const navigate = useNavigate();
  const { createChildAccount } = useSupabaseAuth();
  const { toast } = useToast();

  const handleCreateChild = async (formData: {
    name: string;
    surname: string;
    nickname?: string;
    email: string;
    avatar?: string;
  }) => {
    try {
      // Generate a unique ID for the child account
      const userId = uuidv4();
      
      // Create the child account
      await createChildAccount({
        ...formData,
        userId,
        avatar: formData.avatar || null
      });
      
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
          <ChildAccountForm onSubmit={handleCreateChild} />
        </div>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigate('/parent-dashboard')} 
            className="text-goodchild-blue hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddChild;
