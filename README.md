# Arte Inédito | Publicidad y Textiles

Sistema web de catálogo y cotización guiada en 4 pasos para **Arte Inédito** (Lechería, Estado Anzoátegui, Venezuela).

## Despliegue en Vercel

El proyecto está 100% preparado para desplegarse en Vercel con un solo clic:

### Opción 1: Desde GitHub (Recomendado)
1. Sube este repositorio a tu cuenta de **GitHub**.
2. Ingresa a [Vercel](https://vercel.com) y haz clic en **"Add New Project"**.
3. Selecciona tu repositorio de GitHub.
4. Vercel detectará automáticamente la configuración definida en `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Haz clic en **"Deploy"**. En menos de 1 minuto tu aplicación estará en línea con HTTPS y CDN global.

### Opción 2: Usando Vercel CLI
Si prefieres desplegar desde tu terminal:
```bash
npm i -g vercel
vercel
```

---

## Características de la Arquitectura para Vercel
- **Archivo `vercel.json` configurado**: Incluye las reglas de reescritura (`rewrites`) para navegación SPA fluida sin errores 404 al recargar páginas.
- **Activos estáticos en `/public`**: Todas las imágenes, logotipos y muestras del taller se copian directamente a `/dist/assets` durante el build de Vite.
- **Persistencia Híbrida Inteligente**: 
  - En entornos de servidor Node (local o VPS), se conecta al backend Express con **SQLite** (`data/arteinedito.sqlite`).
  - En Vercel (frontend estático/serverless), el cliente conmuta de forma transparente a **LocalStorage** para que cotizaciones, cambios de estado en el panel de taller y edición de productos funcionen de manera instantánea y sin caídas.
- **WhatsApp Integrado**: Envío de proformas con folio consecutivo (`AI-2026-XXXX`) a la línea de Arte Inédito (`wa.link/alpo7z`).
