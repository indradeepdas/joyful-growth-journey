// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ogabcfqcjlwhwgnsqyka.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYWJjZnFjamx3aHdnbnNxeWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MTg4NzgsImV4cCI6MjA1NzA5NDg3OH0.dxitjq3DsQmD5IspQH84_ad6WhIcsR8sjpfgWxKqhro";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);