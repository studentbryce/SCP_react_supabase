import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;  // URL for the Supabase instance, stored in environment variables
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;  // Key for the Supabase instance, stored in environment variables

export const supabase = createClient(supabaseUrl, supabaseKey)  // Create a Supabase client instance using the URL and key