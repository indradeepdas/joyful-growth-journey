
import { supabase } from '@/integrations/supabase/client';

export const seedRewards = async () => {
  // Check if rewards already exist
  const { data: existingRewards, error: checkError } = await supabase
    .from('rewards')
    .select('id')
    .limit(1);
    
  if (checkError) {
    console.error('Error checking for existing rewards:', checkError);
    return false;
  }
  
  // If rewards already exist, don't seed
  if (existingRewards && existingRewards.length > 0) {
    console.log('Rewards already exist, skipping seed');
    return false;
  }
  
  // Sample rewards
  const rewards = [
    {
      name: 'Extra Screen Time',
      description: 'Earn 30 minutes of additional screen time',
      image_url: 'https://placehold.co/400x300/FFD166/073B4C?text=Screen+Time',
      good_coins: 25,
    },
    {
      name: 'Movie Night',
      description: 'Choose a movie for family movie night',
      image_url: 'https://placehold.co/400x300/FFD166/073B4C?text=Movie+Night',
      good_coins: 50,
    },
    {
      name: 'Pick Dinner',
      description: 'Choose what the family has for dinner',
      image_url: 'https://placehold.co/400x300/FFD166/073B4C?text=Dinner+Choice',
      good_coins: 30,
    },
    {
      name: 'Toy Store Trip',
      description: 'Special trip to the toy store with a $20 budget',
      image_url: 'https://placehold.co/400x300/FFD166/073B4C?text=Toy+Store',
      original_price: 20,
      good_coins: 100,
    },
  ];
  
  // Insert rewards
  const { error: insertError } = await supabase
    .from('rewards')
    .insert(rewards);
    
  if (insertError) {
    console.error('Error seeding rewards:', insertError);
    return false;
  }
  
  console.log('Successfully seeded rewards');
  return true;
};

export const seedDevelopmentAreas = async () => {
  // Check if development areas already exist
  const { data: existingAreas, error: checkError } = await supabase
    .from('development_areas')
    .select('id')
    .limit(1);
    
  if (checkError) {
    console.error('Error checking for existing development areas:', checkError);
    return false;
  }
  
  // If areas already exist, don't seed
  if (existingAreas && existingAreas.length > 0) {
    console.log('Development areas already exist, skipping seed');
    return false;
  }
  
  // Sample development areas
  const areas = [
    {
      name: 'Health & Mind',
      description: 'Activities that promote physical health, mental well-being, and cognitive development',
    },
    {
      name: 'Effective Communication',
      description: 'Activities to improve verbal, written, and non-verbal communication skills',
    },
    {
      name: 'Personal Enrichment',
      description: 'Activities focused on personal growth, learning, and developing new skills',
    },
    {
      name: 'Creativity',
      description: 'Activities that foster creative thinking, artistic expression, and innovation',
    },
    {
      name: 'Deeper Family Bonds',
      description: 'Activities designed to strengthen family relationships and create meaningful memories',
    },
    {
      name: 'Emotional Intelligence',
      description: 'Activities to help understand, express, and manage emotions effectively',
    },
    {
      name: 'Social Skills',
      description: 'Activities to develop interaction, cooperation, and positive peer relationships',
    },
  ];
  
  // Insert development areas
  const { error: insertError } = await supabase
    .from('development_areas')
    .insert(areas);
    
  if (insertError) {
    console.error('Error seeding development areas:', insertError);
    return false;
  }
  
  console.log('Successfully seeded development areas');
  return true;
};

export const seedSampleActivities = async () => {
  // Check if activities already exist
  const { data: existingActivities, error: checkError } = await supabase
    .from('activity_masters')
    .select('id')
    .limit(1);
    
  if (checkError) {
    console.error('Error checking for existing activities:', checkError);
    return false;
  }
  
  // If activities already exist, don't seed
  if (existingActivities && existingActivities.length > 0) {
    console.log('Activities already exist, skipping seed');
    return false;
  }
  
  // Get development areas
  const { data: areas, error: areasError } = await supabase
    .from('development_areas')
    .select('id, name');
    
  if (areasError || !areas || areas.length === 0) {
    console.error('Error fetching development areas:', areasError);
    return false;
  }
  
  // Create a mapping of area names to IDs
  const areaMap = areas.reduce((map, area) => {
    map[area.name] = area.id;
    return map;
  }, {} as Record<string, string>);
  
  // Sample activities
  const activities = [
    {
      title: 'Morning Yoga Routine',
      description: 'Complete a 15-minute morning yoga routine',
      development_area_id: areaMap['Health & Mind'],
      good_coins: 15,
      estimated_time: '15 minutes',
    },
    {
      title: 'Read a Book',
      description: 'Read a book for at least 30 minutes',
      development_area_id: areaMap['Personal Enrichment'],
      good_coins: 20,
      estimated_time: '30 minutes',
    },
    {
      title: 'Help with Dinner',
      description: 'Help prepare dinner for the family',
      development_area_id: areaMap['Deeper Family Bonds'],
      good_coins: 25,
      estimated_time: '45 minutes',
    },
    {
      title: 'Clean Your Room',
      description: 'Organize and clean your bedroom',
      development_area_id: areaMap['Personal Enrichment'],
      good_coins: 30,
      estimated_time: '1 hour',
    },
  ];
  
  // Insert activities
  const { error: insertError } = await supabase
    .from('activity_masters')
    .insert(activities);
    
  if (insertError) {
    console.error('Error seeding activities:', insertError);
    return false;
  }
  
  console.log('Successfully seeded activities');
  return true;
};
