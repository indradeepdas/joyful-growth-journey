
import React, { useState } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import ChildAccountForm from '@/components/ChildAccountForm';
import { useNavigate } from 'react-router-dom';
import { childrenService } from '@/services/childrenService';
import { ChildProfile } from '@/types';

const AddChild = () => {
  const { profile, user } = useSupabaseAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!profile || !user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (formData: any) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const newChild: Partial<ChildProfile> = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        parent_id: profile.id,
        gender: formData.gender,
        avatar_url: formData.avatarUrl || "https://api.dicebear.com/7.x/adventurer/svg?seed=" + formData.firstName,
        goodcoins_balance: 0
      };
      
      await childrenService.createChild(newChild);
      navigate('/parent-dashboard');
    } catch (error) {
      console.error("Failed to create child account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Add a Child Account</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create an account for your child to start tracking their progress and rewarding good behavior.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <ChildAccountForm />
        </div>
      </div>
    </div>
  );
};

export default AddChild;
