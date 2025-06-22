// Utilidad para variables de entorno
export const env = {
  // Variables públicas (accesibles en el cliente)
  PUBLIC_SUPABASE_URL: import.meta.env.PUBLIC_SUPABASE_URL || '',
  PUBLIC_SUPABASE_ANON_KEY: import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '',
  ENVIRONMENT: import.meta.env.ENVIRONMENT || 'development',
  
  // Helpers
  isDevelopment: () => import.meta.env.ENVIRONMENT === 'development',
  isPreview: () => import.meta.env.ENVIRONMENT === 'preview', 
  isProduction: () => import.meta.env.ENVIRONMENT === 'production',
  
  // Validación
  validate() {
    const required = ['PUBLIC_SUPABASE_URL', 'PUBLIC_SUPABASE_ANON_KEY'];
    const missing = required.filter(key => !import.meta.env[key]);
    
    if (missing.length > 0) {
      throw new Error(`Faltan variables de entorno requeridas: ${missing.join(', ')}`);
    }
  }
};

// Validar en desarrollo
if (env.isDevelopment()) {
  try {
    env.validate();
  } catch (error) {
    console.warn('⚠️ Variables de entorno:', error);
  }
} 