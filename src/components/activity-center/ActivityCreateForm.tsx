
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Save } from 'lucide-react';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { developmentAreas } from './constants';

// Schema for activity creation form
const activityFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  developmentArea: z.string().min(1, "Please select a development area"),
  estimatedTime: z.string().min(1, "Please provide an estimated time"),
  goodCoins: z.coerce.number().min(1, "Reward must be at least 1 GoodCoin").max(100, "Reward cannot exceed 100 GoodCoins"),
});

type FormValues = z.infer<typeof activityFormSchema>;

interface ActivityCreateFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: FormValues) => void;
  isCreating: boolean;
}

const ActivityCreateForm: React.FC<ActivityCreateFormProps> = ({ 
  form, 
  onSubmit, 
  isCreating 
}) => {
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Create New Activity</DialogTitle>
        <DialogDescription>
          Design a custom activity for your children. Fill out the details below.
        </DialogDescription>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Title</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Morning Yoga Routine" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the activity, its goals, and instructions..." 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="developmentArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Development Area</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {developmentAreas.map((area) => (
                        <SelectItem key={area.id} value={area.name}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="estimatedTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Time</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., 15 minutes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="goodCoins"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GoodCoin Reward</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <GoodCoinIcon className="mr-2 h-5 w-5" />
                    <Input 
                      type="number" 
                      min={1}
                      max={100}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  How many GoodCoins will be rewarded for completing this activity?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isCreating}
              className="w-full sm:w-auto"
            >
              {isCreating ? (
                "Creating..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Create Activity
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default ActivityCreateForm;
