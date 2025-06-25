# Despliegue en Cloudflare Pages

## Preparación Local

### 1. Variables de Entorno
Copia el archivo de ejemplo y configura tus variables:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores reales:
```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
ENVIRONMENT=production
```

### 2. Build Local
Verifica que el build funciona correctamente:
```bash
npm run build
```

## Despliegue en Cloudflare Pages

### Opción 1: Git Integration (Recomendado)

1. **Conectar Repositorio**
   - Ve a [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
   - Haz clic en "Create a project"
   - Conecta tu repositorio de GitHub/GitLab

2. **Configuración de Build**
   - **Framework preset**: `None` o `Other`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (dejar vacío)

3. **Variables de Entorno**
   En la sección "Environment variables":
   ```
   PUBLIC_SUPABASE_URL = https://tu-proyecto.supabase.co
   PUBLIC_SUPABASE_ANON_KEY = tu_clave_anonima_de_supabase  
   ENVIRONMENT = production
   ```

### Opción 2: Wrangler CLI

1. **Instalar Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Autenticar**
   ```bash
   wrangler login
   ```

3. **Desplegar**
   ```bash
   npm run build
   npm run deploy
   ```

## Configuración Post-Despliegue

### 1. Dominio Personalizado
- Ve a tu proyecto en Cloudflare Pages
- En "Custom domains", añade tu dominio
- Configura los DNS records según las instrucciones

### 2. Variables de Entorno de Producción
- Verifica que todas las variables estén configuradas
- Usa diferentes valores para preview/production si es necesario

### 3. Headers de Cache
Los headers están configurados en `public/_headers`:
- Build assets: Cache por 1 año
- Service worker: Sin cache

## Scripts Disponibles

```bash
# Desarrollo
npm start                 # Servidor de desarrollo
npm run dev              # Servidor de desarrollo alternativo

# Build
npm run build            # Build completo de producción
npm run build.client     # Solo build del cliente
npm run build.server     # Solo build del servidor

# Preview
npm run preview          # Preview local del build
npm run serve           # Servir con Wrangler localmente

# Despliegue
npm run deploy          # Desplegar a Cloudflare Pages

# Calidad de código
npm run lint            # Linting
npm run fmt             # Formatear código
```

## Troubleshooting

### Build Errors
- Verifica que todas las dependencias estén instaladas
- Asegúrate de que las variables de entorno estén configuradas
- Revisa los logs de build en Cloudflare Pages

### Runtime Errors
- Verifica las variables de entorno en Cloudflare Pages
- Revisa los logs en Real-time Logs o Analytics
- Asegúrate de que Supabase esté configurado correctamente

### Cache Issues
- Purga el cache de Cloudflare si es necesario
- Verifica los headers de cache en `public/_headers`