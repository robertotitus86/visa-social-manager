# 📱 Social Media Manager - Asesoría Visa Global

Herramienta automatizada para generar y publicar posts en redes sociales (Instagram, Facebook, TikTok) usando IA.

## ✨ Características

- ✅ **Generación automática de contenido** con IA (Claude)
- 🖼️ **Generación de imágenes** automáticas con colores de marca
- 📅 **Publicación programada** (2 posts diarios: 8AM y 5PM)
- 📊 **Dashboard intuitivo** con analítica en tiempo real
- 🎨 **Diseños personalizados** para cada red social
- 🤖 **Automatización completa** sin intervención manual
- 📈 **Estadísticas y seguimiento** de engagement

## 🚀 Instalación Rápida

### Prerrequisitos
- Node.js 16+
- npm o yarn
- Clave API de Anthropic (Claude)

### Paso 1: Clonar y configurar

```bash
cd visa-social-manager
npm install
cp .env.example .env
```

### Paso 2: Configurar variables de entorno

Edita `.env` y agrega:

```env
# Claude API
ANTHROPIC_API_KEY=tu_clave_aqui

# Instagram (opcional)
INSTAGRAM_ACCESS_TOKEN=token_aqui
INSTAGRAM_BUSINESS_ACCOUNT_ID=id_aqui

# Facebook (opcional)
FACEBOOK_ACCESS_TOKEN=token_aqui
FACEBOOK_PAGE_ID=id_aqui

# Horarios (puedes cambiar estos)
# 0 8 * * * = 8:00 AM
# 0 17 * * * = 5:00 PM
```

### Paso 3: Instalar dependencias del cliente

```bash
cd client
npm install
cd ..
```

### Paso 4: Ejecutar en desarrollo

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📖 Obtener Credenciales

### Instagram/Facebook (Meta)
1. Ve a https://developers.facebook.com/
2. Crea una aplicación
3. Obtén el Access Token desde Business Settings
4. Copia el Business Account ID

### TikTok (Opcional)
1. Ve a https://developers.tiktok.com/
2. Aplica para acceso a TikTok Business API
3. Obtén tus credenciales

### Claude API
1. Ve a https://console.anthropic.com/
2. Crea una clave API
3. Cópiala a tu `.env`

## 🎯 Cómo Usar

### Dashboard
- **Dashboard**: Vista general de estadísticas
- **Posts**: Gestiona todos tus posts
- **Calendario**: Visualiza publicaciones por día
- **Analítica**: Revisa engagement y estadísticas
- **Configuración**: Configura APIs y horarios

### Generar Posts
1. Haz clic en "✨ Generar Post"
2. La IA creará el contenido y las imágenes automáticamente
3. Revisa el post en el dashboard
4. Haz clic en "📤 Publicar" para publicar inmediatamente
5. O deja que se publique automáticamente a la hora programada

### Tipos de Contenido Generados Automáticamente
- 🇺🇸 Promociones de Visa USA
- 🇪🇺 Promociones de Visa Schengen
- 💡 Tips y consejos sobre visas
- 📊 Estadísticas y datos interesantes
- ⭐ Testimonios de clientes
- 📞 Llamadas a acción (CTA)
- 🎉 Casos de éxito
- 🔥 Contenido trending

## 🛠️ Estructura del Proyecto

```
visa-social-manager/
├── server/                 # Backend (Node.js + Express)
│   ├── services/
│   │   ├── contentGenerator.js    # IA para generar contenido
│   │   ├── imageGenerator.js      # Generador de imágenes
│   │   ├── socialMediaPublisher.js # Publicación en redes
│   │   └── database.js            # Almacenamiento local
│   └── index.js
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas principales
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
├── .env.example
└── package.json
```

## 📊 API Endpoints

### Posts
- `GET /api/posts` - Obtener todos los posts
- `POST /api/posts` - Crear nuevo post
- `PUT /api/posts/:id` - Actualizar post
- `DELETE /api/posts/:id` - Eliminar post
- `POST /api/posts/:id/publish` - Publicar post inmediatamente

### Generador
- `POST /api/preview` - Generar preview de nuevo post

## 🔧 Configuración Avanzada

### Cambiar horarios de publicación

Edita `server/index.js`:

```javascript
// 8:00 AM
cron.schedule('0 8 * * *', async () => {
  // Tu código aquí
});

// 5:00 PM
cron.schedule('0 17 * * *', async () => {
  // Tu código aquí
});
```

**Formato Cron:**
- `0 8 * * *` = Diariamente a las 8:00 AM
- `0 17 * * *` = Diariamente a las 5:00 PM
- `0 9 * * 1-5` = Lunes a viernes a las 9:00 AM

### Personalizar colores de marca

Edita `server/services/imageGenerator.js`:

```javascript
const COLORS = {
  darkBlue: '#001F4D',  // Tu color principal
  gold: '#D4AF37',      // Tu color secundario
  white: '#FFFFFF'
};
```

## 🚀 Deploy a Netlify

### Opción 1: Netlify Functions

1. Crea un `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "client/dist"
  functions = "netlify/functions"
```

2. Deploy:
```bash
npm install -g netlify-cli
netlify deploy
```

### Opción 2: Vercel

```bash
npm install -g vercel
vercel
```

## 📝 Variables de Entorno Necesarias

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `ANTHROPIC_API_KEY` | Clave API de Claude | ✅ Sí |
| `INSTAGRAM_ACCESS_TOKEN` | Token de Instagram | ❌ No |
| `INSTAGRAM_BUSINESS_ACCOUNT_ID` | ID de negocio | ❌ No |
| `FACEBOOK_ACCESS_TOKEN` | Token de Facebook | ❌ No |
| `FACEBOOK_PAGE_ID` | ID de página | ❌ No |
| `TIKTOK_ACCESS_TOKEN` | Token de TikTok | ❌ No |

## 🐛 Troubleshooting

### Error: "Canvas not supported"
- Instala: `npm install canvas --build-from-source`

### Error: "API Key not valid"
- Verifica tu `.env` tenga la clave correcta
- No incluyas espacios extras

### Error: "Cannot POST /api/posts"
- Verifica que el servidor está corriendo en puerto 5000
- Comprueba CORS está habilitado

## 📞 Soporte

Para problemas o preguntas:
1. Revisa los logs del servidor
2. Verifica las credenciales en `.env`
3. Abre un issue en GitHub

## 📄 Licencia

Este proyecto es propiedad de Asesoría Visa Global.

---

**Última actualización:** Marzo 2024
**Versión:** 1.0.0
