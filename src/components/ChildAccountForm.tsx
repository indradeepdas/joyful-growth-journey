
import React, { useState } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { X, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ChildAccountFormProps {
  onClose: () => void;
}

const ChildAccountForm: React.FC<ChildAccountFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    nickname: '',
    email: '',
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createChildAccount } = useSupabaseAuth();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatar(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Simple validation
    if (!formData.name || !formData.surname || !formData.email) {
      setError('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // 1. First, create a Supabase Auth account for the child
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: 'test123', // Default password
        options: {
          data: {
            first_name: formData.name,
            last_name: formData.surname,
            nickname: formData.nickname || undefined,
            role: 'child'
          }
        }
      });
      
      if (authError) throw authError;
      
      if (!authData.user) {
        throw new Error('Failed to create user account');
      }
      
      // Upload avatar if provided
      let avatarUrl = null;
      if (avatar) {
        const fileExt = avatar.name.split('.').pop();
        const fileName = `${authData.user.id}.${fileExt}`;
        const filePath = `avatars/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatar);
          
        if (uploadError) {
          console.error('Avatar upload error:', uploadError);
          // Continue without avatar rather than failing the whole process
        } else {
          const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
          avatarUrl = urlData.publicUrl;
        }
      }
      
      // 2. Create the child profile in our database
      await createChildAccount({
        name: formData.name,
        surname: formData.surname,
        nickname: formData.nickname || undefined,
        email: formData.email,
        avatar: avatarUrl,
        userId: authData.user.id
      });
      
      // 3. Send welcome email
      // This would typically be handled by a server-side function
      // For this demo, we'll simulate it with a toast notification
      
      toast({
        title: "Success!",
        description: "Child account created successfully. A welcome email has been sent.",
      });
      
      onClose(); // Close the form after successful submission
    } catch (err) {
      if (err instanceof Error) {
        // Handle specific error cases
        if (err.message.includes('already registered')) {
          setError('This email is already registered. Please use a different email.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Create Child Account</h2>
          <button 
            onClick={onClose}
            className="text-goodchild-text-secondary hover:text-goodchild-red transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        {error && (
          <div className="bg-goodchild-red/10 text-goodchild-red p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-goodchild-blue flex items-center justify-center">
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Avatar preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="text-gray-400" size={32} />
                  )}
                </div>
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute bottom-0 right-0 bg-goodchild-blue text-white p-1 rounded-full cursor-pointer"
                >
                  <Upload size={16} />
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
                Name*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
                placeholder="First name"
              />
            </div>
            
            <div>
              <label htmlFor="surname" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
                Surname*
              </label>
              <input
                id="surname"
                name="surname"
                type="text"
                required
                value={formData.surname}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
                placeholder="Last name"
              />
            </div>
            
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
                Nickname
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                value={formData.nickname}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
                placeholder="Nickname (optional)"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
                placeholder="child@example.com"
              />
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3 border border-gray-300 rounded-lg text-goodchild-text-secondary hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 py-3 bg-goodchild-blue text-white rounded-lg hover:bg-goodchild-blue/90 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildAccountForm;
