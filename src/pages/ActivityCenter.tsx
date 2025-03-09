
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Search, Clock, Tag, ChevronLeft, Plus, Save, Calendar as CalendarComponent, AlertCircle, CheckCircle, Brain, MessageSquare, User, Lightbulb, Heart, Zap, Users } from 'lucide-react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Activity, DevelopmentArea } from '@/types';
import { SupabaseActivity, SupabaseChild, SupabaseDevelopmentArea } from '@/services/types';
import { adaptSupabaseActivity } from '@/utils/typeAdapters';

// Development areas with icons and colors
const developmentAreas = [
  {
    id: 'health-mind',
    name: 'Health & Mind' as DevelopmentArea,
    icon: <Brain className="text-blue-500" />,
    description: "Activities that promote physical health, mental well-being, and cognitive development.",
    color: 'blue',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'communication',
    name: 'Effective Communication' as DevelopmentArea,
    icon: <MessageSquare className="text-green-500" />,
    description: "Activities to improve verbal, written, and non-verbal communication skills.",
    color: 'green',
    bgColor: 'bg-green-100'
  },
  {
    id: 'enrichment',
    name: 'Personal Enrichment' as DevelopmentArea,
    icon: <User className="text-purple-500" />,
    description: "Activities focused on personal growth, learning, and developing new skills.",
    color: 'purple',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'creativity',
    name: 'Creativity' as DevelopmentArea,
    icon: <Lightbulb className="text-yellow-500" />,
    description: "Activities that foster creative thinking, artistic expression, and innovation.",
    color: 'yellow',
    bgColor: 'bg-yellow-100'
  },
  {
    id: 'family',
    name: 'Deeper Family Bonds' as DevelopmentArea,
    icon: <Heart className="text-red-500" />,
    description: "Activities designed to strengthen family relationships and create meaningful memories.",
    color: 'red',
    bgColor: 'bg-red-100'
  },
  {
    id: 'emotional',
    name: 'Emotional Intelligence' as DevelopmentArea,
    icon: <Zap className="text-orange-500" />,
    description: "Activities to help understand, express, and manage emotions effectively.",
    color: 'orange',
    bgColor: 'bg-orange-100'
  },
  {
    id: 'social',
    name: 'Social Skills' as DevelopmentArea,
    icon: <Users className="text-indigo-500" />,
    description: "Activities to develop interaction, cooperation, and positive peer relationships.",
    color: 'indigo',
    bgColor: 'bg-indigo-100'
  }
];

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
    // Join with development_areas table to get the area name
    const { data, error } = await supabase
      .from('activities')
      .select(`
        *,
        development_areas (*)
      `);
      
    if (error) throw error;
    
    // Convert Supabase data to our Activity type
    return data.map((item: any) => {
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
    return data;
  };
  
  // Query to fetch development areas
  const fetchDevelopmentAreas = async (): Promise<SupabaseDevelopmentArea[]> => {
    const { data, error } = await supabase
      .from('development_areas')
      .select('*');
      
    if (error) throw error;
    return data;
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
        .from('activities')
        .insert({
          title: data.title,
          description: data.description,
          development_area_id: areaData.id,
          coin_reward: data.goodCoins,
          created_by: user?.id,
          due_date: null,
          completed: false,
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
    mutationFn: async (data: { activityId: string, childId: string, dates: Date[] }) => {
      if (!selectedActivity) throw new Error("No activity selected");
      
      // For each selected date, create an assigned activity
      const promises = data.dates.map(async (date) => {
        const { error } = await supabase
          .from('assigned_activities')
          .insert({
            activity_id: data.activityId,
            child_id: data.childId,
            due_date: format(date, 'yyyy-MM-dd'),
            assigned_by: user?.id,
            completed: false,
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
      activityId: selectedActivity.id,
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
  
  // Function to get the development area object
  const getDevelopmentArea = (name: DevelopmentArea) => {
    return developmentAreas.find(area => area.name === name) || developmentAreas[0];
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
          
          {showDetail ? (
            /* Detailed activity view with assignment */
            <div className="glass-card p-6 rounded-xl animate-fade-in">
              <Button 
                variant="ghost" 
                className="mb-4 flex items-center gap-2" 
                onClick={handleBackToList}
              >
                <ChevronLeft size={16} /> Back to Activities
              </Button>
              
              {selectedActivity && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-goodchild-text-primary">{selectedActivity.title}</h2>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      {/* Development area tag */}
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-${getDevelopmentArea(selectedActivity.developmentArea).color}-100 text-${getDevelopmentArea(selectedActivity.developmentArea).color}-700`}>
                        {getDevelopmentArea(selectedActivity.developmentArea).icon}
                        <span>{selectedActivity.developmentArea}</span>
                      </div>
                      
                      {/* GoodCoin reward */}
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                        <GoodCoinIcon className="h-4 w-4" />
                        <span>{selectedActivity.goodCoins} GoodCoins</span>
                      </div>
                      
                      {/* Estimated time if available */}
                      {selectedActivity.estimatedTime && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                          <Clock size={14} />
                          <span>{selectedActivity.estimatedTime}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-goodchild-text-primary">{selectedActivity.description}</p>
                    </div>
                    
                    {/* Sample image - in a real app, this would come from the activity data */}
                    <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={`https://placehold.co/800x400/${getDevelopmentArea(selectedActivity.developmentArea).color.slice(0, 6)}/FFFFFF?text=${selectedActivity.title}`} 
                        alt={selectedActivity.title} 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="glass-card p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-4">Assign Activity to Child</h3>
                      
                      {profile?.role === 'parent' ? (
                        <Form {...assignActivityForm}>
                          <form onSubmit={assignActivityForm.handleSubmit(onAssignActivitySubmit)} className="space-y-6">
                            <FormField
                              control={assignActivityForm.control}
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
                              control={assignActivityForm.control}
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
                              disabled={assignActivityMutation.isPending}
                            >
                              {assignActivityMutation.isPending ? "Assigning..." : "Assign Activity"}
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
              )}
            </div>
          ) : (
            /* Activity list view */
            <>
              {/* Development areas filter tiles */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-goodchild-text-primary">Development Areas</h2>
                  {selectedArea && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleClearFilters}
                      className="text-sm"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {developmentAreas.map((area) => (
                    <div 
                      key={area.id} 
                      className={`development-area-tile ${selectedArea === area.name ? 'active' : ''}`}
                      onClick={() => setSelectedArea(selectedArea === area.name ? null : area.name)}
                    >
                      <div className={`development-area-icon ${area.bgColor} relative w-16 h-16 rounded-2xl shadow-sm`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {area.icon}
                        </div>
                        {/* Small icon at bottom right */}
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-${area.color}-500 flex items-center justify-center shadow-md border-2 border-white`}>
                          {area.icon && React.cloneElement(area.icon, { size: 12, className: "text-white" })}
                        </div>
                      </div>
                      <h3 className="font-medium text-center mt-2 text-sm">{area.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Search & sort bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-goodchild-text-secondary h-4 w-4" />
                </div>
                
                <div className="flex gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Sort by Title</SelectItem>
                      <SelectItem value="coins">Sort by Reward</SelectItem>
                      <SelectItem value="area">Sort by Area</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {profile?.role === 'parent' && (
                    <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                      <DialogTrigger asChild>
                        <Button className="whitespace-nowrap">
                          <Plus className="mr-2 h-4 w-4" /> Create Activity
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                          <DialogTitle>Create New Activity</DialogTitle>
                          <DialogDescription>
                            Design a custom activity for your children. Fill out the details below.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Form {...createActivityForm}>
                          <form onSubmit={createActivityForm.handleSubmit(onCreateActivitySubmit)} className="space-y-6">
                            <FormField
                              control={createActivityForm.control}
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
                              control={createActivityForm.control}
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
                                control={createActivityForm.control}
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
                                control={createActivityForm.control}
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
                              control={createActivityForm.control}
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
                                disabled={createActivityMutation.isPending}
                                className="w-full sm:w-auto"
                              >
                                {createActivityMutation.isPending ? (
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
                    </Dialog>
                  )}
                </div>
              </div>
              
              {/* Activities grid */}
              {filteredActivities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {filteredActivities.map((activity) => {
                    const areaData = getDevelopmentArea(activity.developmentArea);
                    
                    return (
                      <Card 
                        key={activity.id} 
                        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleViewActivity(activity)}
                      >
                        <div className={`h-3 ${areaData ? `bg-${areaData.color}-500` : 'bg-gray-500'}`} />
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl">{activity.title}</CardTitle>
                            <div className={`w-8 h-8 rounded-full ${areaData ? areaData.bgColor : 'bg-gray-100'} flex items-center justify-center`}>
                              {areaData && areaData.icon}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-goodchild-text-secondary line-clamp-3 mb-4">
                            {activity.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${areaData ? `bg-${areaData.color}-100 text-${areaData.color}-700` : 'bg-gray-100 text-gray-700'}`}>
                              {areaData && React.cloneElement(areaData.icon, { size: 12 })}
                              <span>{activity.developmentArea}</span>
                            </div>
                            
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                              <GoodCoinIcon className="h-3 w-3" />
                              <span>{activity.goodCoins}</span>
                            </div>
                            
                            {activity.estimatedTime && (
                              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                <Clock size={12} />
                                <span>{activity.estimatedTime}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button 
                            variant="ghost" 
                            className="w-full justify-center text-goodchild-blue hover:text-goodchild-blue/80 hover:bg-goodchild-blue/10"
                          >
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <Search className="h-12 w-12 mx-auto text-goodchild-text-secondary opacity-60" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No activities found</h3>
                  <p className="text-goodchild-text-secondary mb-4">
                    {searchQuery || selectedArea ? 
                      "Try adjusting your search filters." : 
                      "No activities are available right now."}
                  </p>
                  {profile?.role === 'parent' && (
                    <Button onClick={() => setShowCreateForm(true)}>
                      <Plus className="mr-2 h-4 w-4" /> Create an Activity
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ActivityCenter;
