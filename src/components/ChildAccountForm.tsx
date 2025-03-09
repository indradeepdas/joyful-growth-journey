
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Plus } from 'lucide-react';

const childAccountSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  nickname: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type ChildAccountFormValues = z.infer<typeof childAccountSchema>;

// The component can accept an onClose prop, but it's optional
interface ChildAccountFormProps {
  onClose?: () => void;
}

const ChildAccountForm: React.FC<ChildAccountFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  const { user, createChildAccount } = useSupabaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ChildAccountFormValues>({
    resolver: zodResolver(childAccountSchema),
    defaultValues: {
      name: '',
      surname: '',
      nickname: '',
      email: '',
      password: 'GoodChild123', // Default strong password
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ChildAccountFormValues) => {
    setError(null);
    setIsLoading(true);
    
    try {
      console.log('Creating child account with data:', data);
      
      // 1. Signup the child with Supabase Auth
      const { data: authData, error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.name,
            last_name: data.surname,
            role: 'child',
          }
        }
      });

      if (signupError) throw signupError;
      if (!authData.user) throw new Error("Failed to create user account");

      console.log('Child auth account created:', authData.user.id);

      // 2. Upload avatar if provided
      let avatarUrl = null;
      if (avatarFile) {
        const fileName = `${Date.now()}-${avatarFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
          
        if (uploadError) throw uploadError;
        
        // Get public URL for the avatar
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
          
        avatarUrl = publicUrl;
        console.log('Avatar uploaded, URL:', avatarUrl);
      }
      
      // 3. Create child profile in our database
      await createChildAccount({
        name: data.name,
        surname: data.surname,
        nickname: data.nickname || undefined,
        email: data.email,
        avatar: avatarUrl,
        userId: authData.user.id,
      });
      
      console.log('Child profile created in database');
      
      // Success message
      toast({
        title: "Success!",
        description: "Child account created successfully. They can log in using the email and password you provided.",
      });
      
      // Close form and reset
      setOpen(false);
      form.reset();
      setAvatarFile(null);
      setAvatarPreview(null);
      
      // Call onClose if provided
      if (onClose) {
        onClose();
      }
      
    } catch (err) {
      console.error("Error creating child account:", err);
      setError(err instanceof Error ? err.message : "Failed to create child account");
      
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create child account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Child Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Child Account</DialogTitle>
          <DialogDescription>
            Create a new account for your child. They'll be able to log in using the email and password you provide.
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarPreview || undefined} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2">
                  <label htmlFor="avatar-upload" className="cursor-pointer bg-primary text-primary-foreground rounded-full p-1 shadow-md">
                    <Plus className="h-4 w-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Johnny" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    This email will be used to log into the account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="••••••••" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Must be at least 6 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                  setAvatarFile(null);
                  setAvatarPreview(null);
                  if (onClose) onClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Child Account"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChildAccountForm;
