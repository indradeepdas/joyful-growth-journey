
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Activity } from '@/types';
import { SupabaseActivity, SupabaseChild } from '@/services/types';
import { adaptSupabaseActivity } from '@/utils/typeAdapters';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import components
import { 
  ActivityFilters, 
  ActivityList, 
  ActivityDetail, 
  ActivityCreateForm, 
  developmentAreas 
} from '@/components/activity-center';

// Schema for activity creation form
const activityFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  developmentArea: z.string().min(1, "Please select a development area"),
  estimatedTime: z.string().min(1, "Please provide an estimated time"),
  goodCoins: z.coerce.number().min(1, "Reward must be at least 1 GoodCoin").max(100, "Reward cannot exceed 100 GoodCoins"),
});

// Schema for assigning an activity
const assignActivitySchema = z.object({
  childId: z.string().min(1, "Please select a child"),
  dates: z.array(z.date()).min(1, "Please select at least one date"),
});

const ActivityCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();
  const { user, profile, isLoading: authLoading } = useSupabaseAuth();
  const queryClient = useQueryClient();
  
  // Reset UI state when navigating away
  useEffect(() => {
    return () => {
      setShowDetail(false);
      setSelectedActivity(null);
      setShowCreateForm(false);
    };
  }, []);
  
  // Form for creating a new activity
  const createActivityForm = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: '',
      description: '',
      developmentArea: '',
      estimatedTime: '',
      goodCoins: 10,
    },
  });
  
  // Form for assigning an activity
  const assignActivityForm = useForm<z.infer<typeof assignActivitySchema>>({
    resolver: zodResolver(assignActivitySchema),
    defaultValues: {
      childId: '',
      dates: [],
    },
  });
  
  // Query to fetch activities from Supabase
  const fetchActivities = async (): Promise<Activity[]> => {
    // First fetch activities from activity_masters
    const { data: masterData, error: masterError } = await supabase
      .from('activity_masters')
      .select(`
        *,
        development_areas (*)
      `);
      
    if (masterError) throw masterError;
    
    // Then fetch assigned activities
    const { data: assignedData, error: assignedError } = await supabase
      .from('activities')
      .select(`
        *,
        development_areas (*)
      `)
      .eq(profile?.role === 'parent' ? 'created_by' : 'assigned_to', user?.id);
      
    if (assignedError) throw assignedError;
    
    // Combine both datasets
    const combinedData = [...(masterData || []), ...(assignedData || [])];
    
    // Convert Supabase data to our Activity type
    return combinedData.map((item: any) => {
      const { development_areas, ...activity } = item;
      return adaptSupabaseActivity({
        ...activity,
        development_area_id: development_areas?.id || null,
        developmentAreaName: development_areas?.name || null,
      });
    });
  };
  
  // Query to fetch children for the parent
  const fetchChildren = async (): Promise<SupabaseChild[]> => {
    if (!user || profile?.role !== 'parent') return [];
    
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('parent_id', user.id);
      
    if (error) throw error;
    return data || [];
  };
  
  // Query to fetch development areas
  const fetchDevelopmentAreas = async () => {
    const { data, error } = await supabase
      .from('development_areas')
      .select('*');
      
    if (error) throw error;
    return data || [];
  };
  
  // Queries
  const { data: activities = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities,
  });
  
  const { data: children = [], isLoading: childrenLoading } = useQuery({
    queryKey: ['children'],
    queryFn: fetchChildren,
    enabled: !!user && profile?.role === 'parent',
  });
  
  const { data: dbDevelopmentAreas = [], isLoading: areasLoading } = useQuery({
    queryKey: ['developmentAreas'],
    queryFn: fetchDevelopmentAreas,
  });
  
  // Mutation to create a new activity
  const createActivityMutation = useMutation({
    mutationFn: async (data: z.infer<typeof activityFormSchema>) => {
      const { data: areaData, error: areaError } = await supabase
        .from('development_areas')
        .select('id')
        .eq('name', data.developmentArea)
        .single();
      
      if (areaError) throw areaError;
      
      const { error } = await supabase
        .from('activity_masters')
        .insert({
          title: data.title,
          description: data.description,
          development_area_id: areaData.id,
          good_coins: data.goodCoins,
          created_by: user?.id,
          estimated_time: data.estimatedTime,
        });
        
      if (error) throw error;
      
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Activity Created",
        description: "Your new activity has been created successfully.",
        variant: "default",
      });
      
      // Close the form and refresh activities
      setShowCreateForm(false);
      createActivityForm.reset();
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create activity. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Mutation to assign an activity
  const assignActivityMutation = useMutation({
    mutationFn: async (data: { childId: string, dates: Date[] }) => {
      if (!selectedActivity) throw new Error("No activity selected");
      
      // For each selected date, create an assigned activity
      const promises = data.dates.map(async (date) => {
        // Using activities table instead of assigned_activities
        // We'll add the assignment data directly to the activities table
        const { error } = await supabase
          .from('activities')
          .insert({
            title: selectedActivity.title,
            description: selectedActivity.description,
            development_area_id: selectedActivity.id, // Use the original activity's area
            good_coins: selectedActivity.goodCoins,
            created_by: user?.id,
            assigned_to: data.childId,
            due_date: format(date, 'yyyy-MM-dd'),
            completed: false,
            estimated_time: selectedActivity.estimatedTime,
          });
          
        if (error) throw error;
      });
      
      await Promise.all(promises);
      
      return { activityTitle: selectedActivity.title, dates: data.dates.length };
    },
    onSuccess: (data) => {
      toast({
        title: "Activity Assigned",
        description: `"${data.activityTitle}" has been assigned successfully to ${data.dates} date(s).`,
        variant: "default",
      });
      
      // Reset the form and go back to activity list
      assignActivityForm.reset();
      setShowDetail(false);
      setSelectedActivity(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to assign activity. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Handle activity creation form submission
  const onCreateActivitySubmit = (data: z.infer<typeof activityFormSchema>) => {
    createActivityMutation.mutate(data);
  };
  
  // Handle activity assignment form submission
  const onAssignActivitySubmit = (data: z.infer<typeof assignActivitySchema>) => {
    if (!selectedActivity) return;
    
    assignActivityMutation.mutate({
      childId: data.childId,
      dates: data.dates,
    });
  };
  
  // Filter and sort activities
  const filteredActivities = activities.filter(activity => {
    // Filter by search query
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by development area
    const matchesArea = !selectedArea || activity.developmentArea === selectedArea;
    
    return matchesSearch && matchesArea;
  }).sort((a, b) => {
    // Sort based on selected sort option
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'coins':
        return b.goodCoins - a.goodCoins;
      case 'area':
        return a.developmentArea.localeCompare(b.developmentArea);
      default:
        return 0;
    }
  });
  
  // Handle viewing activity details
  const handleViewActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowDetail(true);
    
    // Reset the form values
    assignActivityForm.reset({
      childId: '',
      dates: [],
    });
  };
  
  // Back to activity list
  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedActivity(null);
  };
  
  // Clear filters
  const handleClearFilters = () => {
    setSelectedArea(null);
    setSearchQuery('');
    setSortBy('title');
  };
  
  if (authLoading || activitiesLoading) {
    return (
      <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading Activities...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-goodchild-text-primary mb-4">
              Activity Center: Empower Your Child's Growth
            </h1>
            <p className="text-xl text-goodchild-text-secondary max-w-3xl mx-auto">
              Assign activities that promote development across 7 key areas. Browse pre-designed activity packages and create custom activities.
            </p>
          </div>
          
          {showDetail && selectedActivity ? (
            /* Detailed activity view with assignment */
            <ActivityDetail
              activity={selectedActivity}
              onBack={handleBackToList}
              children={children}
              assignForm={assignActivityForm}
              onAssignActivity={onAssignActivitySubmit}
              isParent={profile?.role === 'parent'}
              isAssigning={assignActivityMutation.isPending}
            />
          ) : (
            /* Activity list view */
            <>
              <ActivityFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                selectedArea={selectedArea}
                setSelectedArea={setSelectedArea}
                handleClearFilters={handleClearFilters}
                showCreateForm={showCreateForm}
                setShowCreateForm={setShowCreateForm}
                isParent={profile?.role === 'parent'}
              />
              
              <ActivityList 
                activities={filteredActivities}
                onViewActivity={handleViewActivity}
              />
            </>
          )}
        </div>
      </main>
      
      {/* Create activity dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <ActivityCreateForm
          form={createActivityForm}
          onSubmit={onCreateActivitySubmit}
          isCreating={createActivityMutation.isPending}
        />
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ActivityCenter;
