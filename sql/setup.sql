
-- Create a storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT DO NOTHING;

-- Create activity_masters table for storing reusable activity templates
CREATE TABLE IF NOT EXISTS public.activity_masters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  development_area_id UUID REFERENCES public.development_areas(id),
  good_coins INTEGER NOT NULL DEFAULT 10,
  estimated_time TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert sample activity masters
INSERT INTO public.activity_masters (title, description, development_area_id, good_coins, estimated_time)
SELECT 
  'Morning Yoga Routine', 
  'Start the day with a 15-minute yoga routine to improve flexibility and focus.', 
  id, 
  15, 
  '15 minutes'
FROM public.development_areas 
WHERE name = 'Health & Mind'
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_masters (title, description, development_area_id, good_coins, estimated_time)
SELECT 
  'Storytelling Challenge', 
  'Create and tell a short story using at least 5 new vocabulary words.', 
  id, 
  20, 
  '30 minutes'
FROM public.development_areas 
WHERE name = 'Effective Communication'
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_masters (title, description, development_area_id, good_coins, estimated_time)
SELECT 
  'Learn a New Skill', 
  'Spend time learning a new skill like coding, cooking, or playing an instrument.', 
  id, 
  25, 
  '45 minutes'
FROM public.development_areas 
WHERE name = 'Personal Enrichment'
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_masters (title, description, development_area_id, good_coins, estimated_time)
SELECT 
  'Art Project', 
  'Create an art project using recycled materials from around the house.', 
  id, 
  18, 
  '40 minutes'
FROM public.development_areas 
WHERE name = 'Creativity'
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_masters (title, description, development_area_id, good_coins, estimated_time)
SELECT 
  'Family Game Night', 
  'Organize and lead a family game night with board games or card games.', 
  id, 
  22, 
  '1 hour'
FROM public.development_areas 
WHERE name = 'Deeper Family Bonds'
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_masters (title, description, development_area_id, good_coins, estimated_time)
SELECT 
  'Feelings Journal', 
  'Write in a journal about your feelings and emotions from the day.', 
  id, 
  12, 
  '20 minutes'
FROM public.development_areas 
WHERE name = 'Emotional Intelligence'
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_masters (title, description, development_area_id, good_coins, estimated_time)
SELECT 
  'Group Project Collaboration', 
  'Work effectively with peers on a group project, practicing teamwork skills.', 
  id, 
  20, 
  '1 hour'
FROM public.development_areas 
WHERE name = 'Social Skills'
ON CONFLICT DO NOTHING;

-- Add sample rewards if the rewards table exists
INSERT INTO public.rewards (name, description, image_url, original_price, discounted_price, good_coins)
VALUES
  ('30 Minutes Extra Screen Time', 'Earn 30 minutes of additional screen time to be used at your discretion.', 'https://placehold.co/400x300/FFD166/073B4C?text=Screen+Time', NULL, NULL, 50),
  ('Choose Dinner For The Family', 'Get to pick what the family has for dinner one night this week.', 'https://placehold.co/400x300/06D6A0/073B4C?text=Dinner+Choice', NULL, NULL, 75),
  ('Movie Night Selection', 'Choose the movie for the next family movie night.', 'https://placehold.co/400x300/118AB2/FFFFFF?text=Movie+Night', NULL, NULL, 60),
  ('Stay Up 30 Minutes Later', 'Push your bedtime back by 30 minutes for one night.', 'https://placehold.co/400x300/EF476F/FFFFFF?text=Late+Night', NULL, NULL, 40),
  ('Special Treat', 'Receive a special dessert or treat of your choice.', 'https://placehold.co/400x300/FFD166/073B4C?text=Special+Treat', 5.99, 4.99, 35),
  ('Day Trip Choice', 'Choose the destination for the next family day trip or outing.', 'https://placehold.co/400x300/06D6A0/073B4C?text=Day+Trip', NULL, NULL, 100),
  ('$10 Gift Card', 'Redeem for a $10 gift card to your favorite store or online service.', 'https://placehold.co/400x300/118AB2/FFFFFF?text=Gift+Card', 10.00, 10.00, 150),
  ('No Chores Day', 'Get a day off from your regular chores and responsibilities.', 'https://placehold.co/400x300/EF476F/FFFFFF?text=No+Chores', NULL, NULL, 80)
ON CONFLICT DO NOTHING;

-- Ensure activities table has estimated_time column
ALTER TABLE public.activities 
ADD COLUMN IF NOT EXISTS estimated_time TEXT;

-- Create RLS policies for activity_masters
ALTER TABLE public.activity_masters ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read activity_masters
CREATE POLICY "Anyone can view activity_masters"
ON public.activity_masters
FOR SELECT
USING (true);

-- Only authenticated users can modify their own activity_masters
CREATE POLICY "Users can insert their own activity_masters"
ON public.activity_masters
FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own activity_masters"
ON public.activity_masters
FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own activity_masters"
ON public.activity_masters
FOR DELETE
USING (auth.uid() = created_by);
