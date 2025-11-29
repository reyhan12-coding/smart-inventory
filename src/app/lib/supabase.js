// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Ini URL dan Key Project Supabase punya kamu
const supabaseUrl = 'https://yzmedawuygtqoueacbbw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6bWVkYXd1eWd0cW91ZWFjYmJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTE5ODQsImV4cCI6MjA3OTU4Nzk4NH0.T02QgDnGxWTtMYrMAsRrtbxEDeWzGR9RMhw85MXT6GQ'

export const supabase = createClient(supabaseUrl, supabaseKey)