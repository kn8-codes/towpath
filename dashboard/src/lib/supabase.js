import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://rmvnvrgnfsmdgbrawrnr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtdm52cmduZnNtZGdicmF3cm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjE4NzIsImV4cCI6MjA5MjQ5Nzg3Mn0.k7S838kaQ1bWvY4Ih5UAf-l7CGXurkPZUy1Ll5_fiM8'
)
