
import React from 'react';
import { format } from 'date-fns';
import { Activity, DevelopmentArea } from '@/types';
import { ChevronLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertCircle, CalendarIcon } from 'lucide-react';
import { SupabaseChild } from '@/services/types';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { developmentAreas } from './constants';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Schema for assigning an activity
const assignActivitySchema = z.object({
  childId: z.string().min(1, "Please select a child"),
  dates: z.array(z.date()).min(1, "Please select at least one date"),
});

type AssignFormValues = z.infer<typeof assignActivitySchema>;

interface ActivityDetailProps {
  activity: Activity;
  onBack: () => void;
  children: SupabaseChild[];
  assignForm: UseFormReturn<AssignFormValues>;
  onAssignActivity: (data: AssignFormValues) => void;
  isParent: boolean;
  isAssigning: boolean;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({
  activity,
  onBack,
  children,
  assignForm,
  onAssignActivity,
  isParent,
  isAssigning
}) => {
  // Function to get the development area object
  const getDevelopmentArea = (name: DevelopmentArea) => {
    return developmentAreas.find(area => area.name === name) || developmentAreas[0];
  };

  return (
    <div className="glass-card p-6 rounded-xl animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center gap-2" 
        onClick={onBack}
      >
        <ChevronLeft size={16} /> Back to Activities
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-goodchild-text-primary">{activity.title}</h2>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {/* Development area tag */}
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-${getDevelopmentArea(activity.developmentArea).color}-100 text-${getDevelopmentArea(activity.developmentArea).color}-700`}>
              {getDevelopmentArea(activity.developmentArea).icon}
              <span>{activity.developmentArea}</span>
            </div>
            
            {/* GoodCoin reward */}
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
              <GoodCoinIcon className="h-4 w-4" />
              <span>{activity.goodCoins} GoodCoins</span>
            </div>
            
            {/* Estimated time if available */}
            {activity.estimatedTime && (
              <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                <Clock size={14} />
                <span>{activity.estimatedTime}</span>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-goodchild-text-primary">{activity.description}</p>
          </div>
          
          {/* Sample image - in a real app, this would come from the activity data */}
          <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
            <img 
              src={`https://placehold.co/800x400/${getDevelopmentArea(activity.developmentArea).color.slice(0, 6)}/FFFFFF?text=${activity.title}`} 
              alt={activity.title} 
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div>
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Assign Activity to Child</h3>
            
            {isParent ? (
              <Form {...assignForm}>
                <form onSubmit={assignForm.handleSubmit(onAssignActivity)} className="space-y-6">
                  <FormField
                    control={assignForm.control}
                    name="childId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Child</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a child" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {children.length > 0 ? (
                              children.map((child) => (
                                <SelectItem key={child.id} value={child.id}>
                                  {child.name} {child.surname}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-children" disabled>
                                No children found
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={assignForm.control}
                    name="dates"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Select Dates</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value.length && "text-muted-foreground"
                                )}
                              >
                                {field.value.length > 0 ? (
                                  field.value.length === 1 
                                    ? format(field.value[0], "PPP") 
                                    : `${field.value.length} dates selected`
                                ) : (
                                  <span>Select dates</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="multiple"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          You can select multiple dates to schedule this activity.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isAssigning}
                  >
                    {isAssigning ? "Assigning..." : "Assign Activity"}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center py-6">
                <AlertCircle className="h-12 w-12 mx-auto text-goodchild-yellow mb-3" />
                <h4 className="text-lg font-semibold mb-2">Parent Account Required</h4>
                <p className="text-goodchild-text-secondary mb-4">
                  Only parent accounts can assign activities to children.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
