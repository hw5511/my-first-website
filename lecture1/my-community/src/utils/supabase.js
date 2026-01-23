import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://skopkmlgyqnnvfwcgspe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb3BrbWxneXFubnZmd2Nnc3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMTI3NjcsImV4cCI6MjA4NDY4ODc2N30.EHpHJcxEpsNMdBoWswnniHikYkqp7l03mxQh876wYRY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
