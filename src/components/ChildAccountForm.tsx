
import React, { useState } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { X } from 'lucide-react';

interface ChildAccountFormProps {
  onClose: () => void;
}

const ChildAccountForm: React.FC<ChildAccountFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    nickname: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createChildAccount } = useSupabaseAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Simple validation
    if (!formData.name || !formData.surname) {
      setError('Please fill in all required fields.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await createChildAccount({
        name: formData.name,
        surname: formData.surname,
        nickname: formData.nickname || undefined
      });
      onClose(); // Close the form after successful submission
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
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
