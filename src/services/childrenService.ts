
import { supabase } from '@/integrations/supabase/client';
import { ChildData } from '@/services/types';
import { ChildProfile } from '@/types';

export const getChildren = async (parentId: string): Promise<ChildData[]> => {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('parent_id', parentId);

  if (error) {
    console.error('Error fetching children:', error);
    throw error;
  }

  if (!data) return [];

  const children: ChildData[] = data.map(child => ({
    id: child.id,
    name: child.name,
    surname: child.surname,
    nickname: child.nickname || '',
    avatar: child.avatar || '',
    goodCoins: child.good_coins,
    parentId: child.parent_id,
    developmentAreas: []
  }));

  return children;
};

export const getChildById = async (childId: string): Promise<ChildData | null> => {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('id', childId)
    .single();

  if (error) {
    console.error('Error fetching child by ID:', error);
    return null;
  }

  if (!data) return null;

  const child: ChildData = {
    id: data.id,
    name: data.name,
    surname: data.surname,
    nickname: data.nickname || '',
    avatar: data.avatar || '',
    goodCoins: data.good_coins,
    parentId: data.parent_id,
    developmentAreas: []
  };

  return child;
};

export const createChild = async (childData: Partial<ChildProfile>) => {
  // Format the data for Supabase
  const supabaseChildData = {
    name: childData.first_name,
    surname: childData.last_name,
    parent_id: childData.parent_id,
    avatar: childData.avatar_url,
    good_coins: childData.goodcoins_balance || 0,
    // Add other fields as needed
  };

  const { data, error } = await supabase
    .from('children')
    .insert(supabaseChildData)
    .select()
    .single();

  if (error) {
    console.error('Error creating child:', error);
    throw error;
  }

  return data;
};
