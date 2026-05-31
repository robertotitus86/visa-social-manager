# 🔐 Configuración de APIs

## 🔑 Claude API (REQUERIDO)

### Paso 1: Crear cuenta
1. Ve a https://console.anthropic.com/
2. Crea una cuenta con tu email
3. Verifica tu email

### Paso 2: Crear clave API
1. En el dashboard, haz clic en "API Keys"
2. Haz clic en "Create Key"
3. Dale un nombre descriptivo (ej: "Visa Social Manager")
4. Copia la clave completa

### Paso 3: Agregar a .env
```env
ANTHROPIC_API_KEY=sk_live_xxxxx...
```

**⚠️ Importante:** No compartas tu clave API. No la publiques en GitHub.

---

## 📷 Instagram API (OPCIONAL)

### Paso 1: Crear aplicación Meta
1. Ve a https://developers.facebook.com/
2. Haz clic en "My Apps" → "Create App"
3. Selecciona "Business" como tipo
4. Llena los detalles

### Paso 2: Agregar Instagram
1. En tu app, haz clic en "Add Product"
2. Busca "Instagram Graph API"
3. Haz clic en "Set Up"

### Paso 3: Obtener credenciales
1. Ve a "Settings" → "Basic"
2. Copia: **App ID** y **App Secret**
3. Ve a "Roles" → "Test Users"
4. Genera un token de acceso (válido por 60 días)

### Paso 4: Obtener Business Account ID
1. Ve a "Instagram Graph API" → "Tools"
2. Usa el Graph API Explorer
3. Consulta: `me?fields=instagram_business_account`
4. Copia el ID

### Paso 5: Agregar a .env
```env
INSTAGRAM_ACCESS_TOKEN=EAAB...
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841400000000000
```

---

## 👍 Facebook API (OPCIONAL)

### Paso 1: Usar misma aplicación Meta
La aplicación que creaste para Instagram sirve para Facebook también.

### Paso 2: Agregar Product
1. "Add Product" → "Facebook Login"
2. Configura los RedirectURI si es necesario

### Paso 3: Obtener Page ID
1. Ve a tu página de Facebook
2. En la URL o en Configuración verás el Page ID

### Paso 4: Generar Access Token
1. En Meta App Dashboard
2. "Tools" → "Graph API Explorer"
3. Selecciona tu página de Facebook
4. Solicita permiso: `pages_read_user_content`
5. Genera el token

### Paso 5: Agregar a .env
```env
FACEBOOK_ACCESS_TOKEN=EAAB...
FACEBOOK_PAGE_ID=123456789
```

---

## 🎵 TikTok API (OPCIONAL - AVANZADO)

### Paso 1: Solicitar acceso a Business API
1. Ve a https://developers.tiktok.com/
2. Haz clic en "Sign Up"
3. Completa el formulario de solicitud
4. **Nota:** TikTok toma 1-2 semanas para aprobar

### Paso 2: Crear aplicación
1. Una vez aprobado, ve a "My Apps"
2. Crea una nueva aplicación
3. Selecciona "Business Account Management"

### Paso 3: Obtener credenciales
1. Copia: Client Key, Client Secret
2. Configura Redirect URL

### Paso 4: Agregar a .env
```env
TIKTOK_ACCESS_TOKEN=your_token_here
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
```

---

## ✅ Verificación

### Prueba tu configuración

```bash
# Instala las dependencias
npm install

# Ejecuta el servidor
npm run dev:server

# En otra terminal, prueba la API
curl http://localhost:5000/api/posts
```

Deberías ver un array vacío o con posts de ejemplo.

---

## 🔄 Renovar Tokens

### Instagram/Facebook
- Los tokens pueden expirar
- Instagram: 60 días (sin extensión)
- Facebook: 60 días (con extensión a 60 años)

Para extender:
1. Ve a Meta App Dashboard
2. "Tools" → "Access Token Debugger"
3. Selecciona tu token
4. Haz clic en "Extend Access Token"

### TikTok
- Los tokens expiran después de 24 horas
- Debes implementar refresh token flow

---

## 🚨 Solución de Problemas

### Error: "Invalid API Key"
- Verifica que copiaste toda la clave
- No incluyas espacios
- Verifica que sea para la región correcta

### Error: "Access Token Expired"
- Renueva el token siguiendo los pasos arriba
- Para Instagram: Usa Graph API Debugger
- Para Facebook: Extiende el token

### Error: "Insufficient Permissions"
- Verifica los permisos en Meta App Dashboard
- Para Instagram: Necesitas `instagram_basic`, `instagram_content_publish`
- Para Facebook: Necesitas `pages_manage_posts`, `pages_read_user_content`

### No se publica en Instagram
- Instagram tiene límites de API
- Máximo 30 publicaciones por 24 horas
- Máximo 200 comentarios por 24 horas

---

## 📚 Recursos Útiles

- [Meta Developers](https://developers.facebook.com/)
- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api/)
- [TikTok Developer](https://developers.tiktok.com/)
- [Anthropic Claude API](https://console.anthropic.com/)

---

**Última actualización:** Marzo 2024
