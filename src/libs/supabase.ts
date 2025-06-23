import { createClient } from '@supabase/supabase-js';

// Validar variables de entorno

export const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.PUBLIC_SUPABASE_ANON_KEY!
);
