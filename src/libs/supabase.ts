import { createClient } from '@supabase/supabase-js';
import { env } from '../utils/env';

// Validar variables de entorno
env.validate();

export const supabase = createClient(
  env.PUBLIC_SUPABASE_URL,
  env.PUBLIC_SUPABASE_ANON_KEY
);
