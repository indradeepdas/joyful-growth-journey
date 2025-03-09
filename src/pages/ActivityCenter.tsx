
import React, { useState, useEffect, useRef } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Activity, DevelopmentArea } from '@/types';
import { adaptSupabaseActivity } from '@/utils/typeAdapters';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  MessageSquare, 
  User, 
  Lightbulb, 
  Heart, 
  Zap, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Clock, 
  Award, 
  X, 
  Check, 
  ArrowLeft 
} from 'lucide-react';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { SupabaseActivity, SupabaseDevelopmentArea } from '@/services/types';

// Development areas
const developmentAreas: { id: string; name: DevelopmentArea; description: string; color: string; icon: React.ReactNode }[] = [
  { 
    id: '1', 
    name: 'Health & Mind', 
    description: 'Activities promoting physical health, wellness, and cognitive development.',
    color: 'bg-blue-100 text-blue-600',
    icon: <Brain className="text-blue-600" size={24} />
  },
  { 
    id: '2', 
    name: 'Effective Communication', 
    description: 'Activities focused on verbal, written, and emotional communication skills.',
    color: 'bg-green-100 text-green-600',
    icon: <MessageSquare className="text-green-600" size={24} />
  },
  { 
    id: '3', 
    name: 'Personal Enrichment', 
    description: 'Activities for self-improvement, life skills, and personal growth.',
    color: 'bg-purple-100 text-purple-600',
    icon: <User className="text-purple-600" size={24} />
  },
  { 
    id: '4', 
    name: 'Creativity', 
    description: 'Activities encouraging artistic expression, innovation, and creative thinking.',
    color: 'bg-yellow-100 text-yellow-600',
    icon: <Lightbulb className="text-yellow-600" size={24} />
  },
  { 
    id: '5', 
    name: 'Deeper Family Bonds', 
    description: 'Activities to strengthen family relationships and shared experiences.',
    color: 'bg-red-100 text-red-600',
    icon: <Heart className="text-red-600" size={24} />
  },
  { 
    id: '6', 
    name: 'Emotional Intelligence', 
    description: 'Activities focused on recognizing and managing emotions effectively.',
    color: 'bg-indigo-100 text-indigo-600',
    icon: <Zap className="text-indigo-600" size={24} />
  },
  { 
    id: '7', 
    name: 'Social Skills', 
    description: 'Activities developing social competence, teamwork, and community engagement.',
    color: 'bg-teal-100 text-teal-600',
    icon: <Users className="text-teal-600" size={24} />
  }
];

const ActivityCenter: React.FC = () => {
  const { user, childAccounts, isAuthenticated, profile } = useSupabaseAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'goodCoins' | 'time'>('title');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [supabaseDevelopmentAreas, setSupabaseDevelopmentAreas] = useState<SupabaseDevelopmentArea[]>([]);
  
  // Form states for creating custom activity
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityArea, setActivityArea] = useState('');
  const [activityTime, setActivityTime] = useState('30');
  const [activityReward, setActivityReward] = useState('10');
  const [activityImageUrl, setActivityImageUrl] = useState('');

  useEffect(() => {
    if (!isAuthenticated || (profile?.role !== 'parent' && profile?.role !== 'child')) {
      navigate('/login');
      return;
    }

    const fetchDevelopmentAreas = async () => {
      try {
        const { data, error } = await supabase
          .from('development_areas')
          .select('*');
        
        if (error) {
          console.error('Error fetching development areas:', error);
        } else if (data) {
          setSupabaseDevelopmentAreas(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching activities:', error);
        } else if (data) {
          const formattedActivities = data.map(activity => adaptSupabaseActivity(activity));
          setActivities(formattedActivities);
          setFilteredActivities(formattedActivities);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDevelopmentAreas();
    fetchActivities();
  }, [isAuthenticated, navigate, profile, user]);

  // Filter activities by development area
  const filterByArea = (areaId: string | null) => {
    setSelectedArea(areaId);
    
    if (!areaId) {
      // Clear filter
      const filtered = activities.filter(activity => 
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredActivities(filtered);
    } else {
      // Apply filter
      const filtered = activities.filter(activity => {
        const matchesArea = activity.developmentArea === developmentAreas.find(area => area.id === areaId)?.name;
        const matchesSearch = 
          activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesArea && matchesSearch;
      });
      setFilteredActivities(filtered);
    }
  };

  // Search activities
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term) {
      // If no search term, just apply area filter if present
      if (selectedArea) {
        filterByArea(selectedArea);
      } else {
        setFilteredActivities(activities);
      }
      return;
    }
    
    // Apply both search and area filter if present
    const filtered = activities.filter(activity => {
      const matchesSearch = 
        activity.title.toLowerCase().includes(term.toLowerCase()) ||
        activity.description.toLowerCase().includes(term.toLowerCase());
      
      if (selectedArea) {
        const matchesArea = activity.developmentArea === developmentAreas.find(area => area.id === selectedArea)?.name;
        return matchesSearch && matchesArea;
      }
      
      return matchesSearch;
    });
    
    setFilteredActivities(filtered);
  };

  // Sort activities
  const handleSort = (sortType: 'title' | 'goodCoins' | 'time') => {
    setSortBy(sortType);
    
    const sorted = [...filteredActivities];
    
    switch (sortType) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'goodCoins':
        sorted.sort((a, b) => b.goodCoins - a.goodCoins);
        break;
      case 'time':
        // For this example, we're just using the length of the description as a proxy for time
        // In a real app, you'd have a dedicated "estimatedTime" field
        sorted.sort((a, b) => a.description.length - b.description.length);
        break;
    }
    
    setFilteredActivities(sorted);
  };

  const viewActivityDetail = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowDetail(true);
  };

  const closeActivityDetail = () => {
    setShowDetail(false);
    setSelectedActivity(null);
    setSelectedChild('');
    setSelectedDates([]);
  };

  const assignActivity = async () => {
    if (!selectedActivity || !selectedChild || selectedDates.length === 0) {
      toast({
        title: "Error",
        description: "Please select a child and at least one date",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create an activity assignment for each selected date
      for (const date of selectedDates) {
        const { error } = await supabase
          .from('activities')
          .insert([
            {
              title: selectedActivity.title,
              description: selectedActivity.description,
              development_area_id: supabaseDevelopmentAreas.find(
                area => area.name === selectedActivity.developmentArea
              )?.id,
              coin_reward: selectedActivity.goodCoins,
              assigned_to: selectedChild,
              created_by: user?.id,
              due_date: date.toISOString(),
              completed: false
            }
          ]);
        
        if (error) {
          console.error('Error assigning activity:', error);
          toast({
            title: "Error",
            description: "Failed to assign activity: " + error.message,
            variant: "destructive",
          });
          return;
        }
      }
      
      toast({
        title: "Activity Assigned",
        description: `Successfully assigned "${selectedActivity.title}" to ${
          childAccounts.find(child => child.id === selectedChild)?.name
        } on ${selectedDates.length} date(s)`,
      });
      
      closeActivityDetail();
      
      // Refresh activities list
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        const formattedActivities = data.map(activity => adaptSupabaseActivity(activity));
        setActivities(formattedActivities);
        setFilteredActivities(formattedActivities);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const createCustomActivity = async () => {
    if (!activityTitle || !activityDescription || !activityArea || !activityReward) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('activities')
        .insert([
          {
            title: activityTitle,
            description: activityDescription,
            development_area_id: activityArea,
            coin_reward: parseInt(activityReward),
            created_by: user?.id,
            completed: false
          }
        ]);
      
      if (error) {
        console.error('Error creating activity:', error);
        toast({
          title: "Error",
          description: "Failed to create activity: " + error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Activity Created",
        description: `Successfully created "${activityTitle}"`,
      });
      
      // Reset form
      setActivityTitle('');
      setActivityDescription('');
      setActivityArea('');
      setActivityTime('30');
      setActivityReward('10');
      setActivityImageUrl('');
      setShowCreateForm(false);
      
      // Refresh activities list
      const { data, error: fetchError } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!fetchError && data) {
        const formattedActivities = data.map(activity => adaptSupabaseActivity(activity));
        setActivities(formattedActivities);
        setFilteredActivities(formattedActivities);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const toggleDateSelection = (date: Date) => {
    const formattedDate = new Date(date.setHours(0, 0, 0, 0));
    
    // Check if date is already selected
    const dateAlreadySelected = selectedDates.some(
      d => new Date(d.setHours(0, 0, 0, 0)).getTime() === formattedDate.getTime()
    );
    
    if (dateAlreadySelected) {
      // Remove date
      setSelectedDates(selectedDates.filter(
        d => new Date(d.setHours(0, 0, 0, 0)).getTime() !== formattedDate.getTime()
      ));
    } else {
      // Add date
      setSelectedDates([...selectedDates, formattedDate]);
    }
  };

  const getAreaIcon = (areaName: string) => {
    const area = developmentAreas.find(a => a.name === areaName);
    return area ? area.icon : <Brain size={24} />;
  };

  const getAreaColor = (areaName: string) => {
    const area = developmentAreas.find(a => a.name === areaName);
    return area ? area.color : 'bg-blue-100 text-blue-600';
  };

  return (
    <div className="min-h-screen flex flex-col bg-goodchild-background font-sassoon">
      <Navbar />
      
      <main className="flex-grow px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-goodchild-text-primary mb-3">
              Activity Center: Empower Your Child's Growth
            </h1>
            <p className="text-goodchild-text-secondary max-w-3xl mx-auto">
              Assign activities that promote development across 7 key areas. Browse pre-designed activity packages and create custom activities.
            </p>
          </header>
          
          {/* Development Area Tiles */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-goodchild-text-primary mb-6">Development Areas</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {developmentAreas.map((area) => (
                <div 
                  key={area.id}
                  className={`development-area-tile ${selectedArea === area.id ? 'active' : ''}`}
                  onClick={() => filterByArea(selectedArea === area.id ? null : area.id)}
                >
                  <div className={`development-area-icon ${area.color}`}>
                    {area.icon}
                  </div>
                  <h3 className="text-center text-sm font-medium">{area.name}</h3>
                </div>
              ))}
            </div>
            
            {selectedArea && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => filterByArea(null)}
                  className="text-sm text-goodchild-text-secondary hover:text-goodchild-blue flex items-center gap-1"
                >
                  <X size={14} />
                  <span>Clear Filter</span>
                </button>
              </div>
            )}
          </section>
          
          {/* Search and Filters */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-1/2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-goodchild-text-secondary" size={18} />
                <Input
                  type="text"
                  placeholder="Search activities..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-goodchild-text-secondary" />
                  <Select
                    value={sortBy}
                    onValueChange={(value) => handleSort(value as 'title' | 'goodCoins' | 'time')}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="goodCoins">GoodCoin Reward</SelectItem>
                      <SelectItem value="time">Estimated Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                  <DialogTrigger asChild>
                    <Button className="btn-primary">
                      <Plus size={18} className="mr-1" /> Create Activity
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create Custom Activity</DialogTitle>
                      <DialogDescription>
                        Design a new activity for your children to complete
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label htmlFor="title" className="text-sm font-medium">
                          Activity Title
                        </label>
                        <Input
                          id="title"
                          placeholder="Enter a title"
                          value={activityTitle}
                          onChange={(e) => setActivityTitle(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea
                          id="description"
                          placeholder="Explain the activity in detail"
                          rows={4}
                          value={activityDescription}
                          onChange={(e) => setActivityDescription(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="area" className="text-sm font-medium">
                          Development Area
                        </label>
                        <Select
                          value={activityArea}
                          onValueChange={setActivityArea}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an area" />
                          </SelectTrigger>
                          <SelectContent>
                            {supabaseDevelopmentAreas.map((area) => (
                              <SelectItem key={area.id} value={area.id}>
                                {area.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label htmlFor="time" className="text-sm font-medium">
                            Estimated Time (minutes)
                          </label>
                          <Input
                            id="time"
                            type="number"
                            min="5"
                            max="120"
                            placeholder="30"
                            value={activityTime}
                            onChange={(e) => setActivityTime(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <label htmlFor="reward" className="text-sm font-medium">
                            GoodCoin Reward
                          </label>
                          <Input
                            id="reward"
                            type="number"
                            min="1"
                            max="100"
                            placeholder="10"
                            value={activityReward}
                            onChange={(e) => setActivityReward(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="imageUrl" className="text-sm font-medium">
                          Image URL (optional)
                        </label>
                        <Input
                          id="imageUrl"
                          placeholder="https://example.com/image.jpg"
                          value={activityImageUrl}
                          onChange={(e) => setActivityImageUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={createCustomActivity}>
                        Create Activity
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </section>
          
          {/* Activity List */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-goodchild-text-primary mb-6">Activities</h2>
            
            {filteredActivities.length === 0 ? (
              <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                <p className="text-goodchild-text-secondary mb-4">
                  No activities found. Try clearing filters or creating a new activity.
                </p>
                <Button className="btn-primary" onClick={() => setShowCreateForm(true)}>
                  <Plus size={18} className="mr-1" /> Create Activity
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow cursor-pointer"
                    onClick={() => viewActivityDetail(activity)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-goodchild-text-primary">{activity.title}</h3>
                        <div className="good-coin">
                          <GoodCoinIcon className="w-5 h-5" />
                          <span>{activity.goodCoins}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-goodchild-text-secondary mb-4 line-clamp-3">
                        {activity.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${getAreaColor(activity.developmentArea)}`}>
                          {getAreaIcon(activity.developmentArea)}
                          <span>{activity.developmentArea}</span>
                        </div>
                        
                        <div className="text-xs text-goodchild-text-secondary flex items-center gap-1">
                          <Clock size={14} />
                          <span>{Math.floor(activity.description.length / 10) + 5} mins</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          
          {/* Activity Detail Dialog */}
          <Dialog open={showDetail} onOpenChange={setShowDetail}>
            <DialogContent className="sm:max-w-[700px]">
              {selectedActivity && (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={closeActivityDetail}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <ArrowLeft size={18} />
                      </button>
                      <DialogTitle>{selectedActivity.title}</DialogTitle>
                    </div>
                  </DialogHeader>
                  
                  <div className="grid gap-6 py-4">
                    <div className="flex justify-between items-center">
                      <div className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 ${getAreaColor(selectedActivity.developmentArea)}`}>
                        {getAreaIcon(selectedActivity.developmentArea)}
                        <span>{selectedActivity.developmentArea}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-goodchild-text-secondary flex items-center gap-1">
                          <Clock size={16} />
                          <span>{Math.floor(selectedActivity.description.length / 10) + 5} mins</span>
                        </div>
                        
                        <div className="good-coin">
                          <GoodCoinIcon className="w-5 h-5" />
                          <span>{selectedActivity.goodCoins}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Activity Description</h3>
                      <p className="text-goodchild-text-secondary whitespace-pre-line">
                        {selectedActivity.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold mb-4">Assign Activity to Child</h3>
                      
                      <div className="grid gap-4">
                        <div>
                          <label htmlFor="childSelect" className="text-sm text-goodchild-text-secondary mb-1 block">
                            Select Child
                          </label>
                          <Select
                            value={selectedChild}
                            onValueChange={setSelectedChild}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a child" />
                            </SelectTrigger>
                            <SelectContent>
                              {childAccounts.map((child) => (
                                <SelectItem key={child.id} value={child.id}>
                                  {child.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm text-goodchild-text-secondary mb-1 block">
                            Select Date(s)
                          </label>
                          <div className="border rounded-md p-3">
                            <CalendarComponent
                              mode="multiple"
                              selected={selectedDates}
                              onSelect={(dates) => {
                                if (dates && dates.length > 0) {
                                  setSelectedDates(dates);
                                }
                              }}
                              className="rounded-md"
                              disabled={(date) => date < new Date()}
                            />
                          </div>
                          
                          {selectedDates.length > 0 && (
                            <div className="mt-2 text-sm text-goodchild-text-secondary">
                              Selected {selectedDates.length} date(s)
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={closeActivityDetail}>
                      Cancel
                    </Button>
                    <Button onClick={assignActivity} className="btn-primary">
                      Assign Activity
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ActivityCenter;
