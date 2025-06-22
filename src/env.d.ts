// Tipado para variables de entorno
interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly ENVIRONMENT: 'development' | 'preview' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 