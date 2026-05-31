# 🔗 Conectar Redes Sociales Reales

Tu herramienta **genera diseños profesionales** pero aún falta conectarla a tus redes reales para PUBLICAR automáticamente.

## 📱 Plataformas Soportadas:

- ✅ **Instagram** (Feed, Stories, Reels)
- ✅ **Facebook**
- ✅ **TikTok**
- ✅ **LinkedIn**

---

## 🔑 Paso 1: Obtener Credenciales

### Instagram + Facebook (Meta)
1. Ve a: https://developers.facebook.com/
2. Crea una app (o usa una existente)
3. Agrega producto "Instagram Graph API"
4. Obtén: `FACEBOOK_ACCESS_TOKEN` y `INSTAGRAM_BUSINESS_ACCOUNT_ID`
5. Guarda en `.env`

### TikTok
1. Ve a: https://developers.tiktok.com/
2. Crea app TikTok Business
3. Obtén: `TIKTOK_ACCESS_TOKEN` y `TIKTOK_CLIENT_KEY`
4. Guarda en `.env`

### LinkedIn
1. Ve a: https://www.linkedin.com/developers/
2. Crea aplicación
3. Obtén: `LINKEDIN_ACCESS_TOKEN`
4. Guarda en `.env`

---

## 📝 Paso 2: Actualizar .env

```env
# Instagram
INSTAGRAM_ACCESS_TOKEN=tu_token_aqui
INSTAGRAM_BUSINESS_ACCOUNT_ID=tu_id_aqui

# Facebook
FACEBOOK_ACCESS_TOKEN=tu_token_aqui
FACEBOOK_PAGE_ID=tu_id_pagina_aqui

# TikTok
TIKTOK_ACCESS_TOKEN=tu_token_aqui
TIKTOK_CLIENT_KEY=tu_key_aqui

# LinkedIn
LINKEDIN_ACCESS_TOKEN=tu_token_aqui
```

---

## 🚀 Paso 3: Reinicia la Herramienta

```bash
npm run dev
```

Ahora cuando publiques, se enviará automáticamente a TODAS tus redes 📤

---

## 💡 Alternativa: Publicar Manualmente en Canva

Mientras configuras las APIs:

1. **Descarga la imagen** desde la herramienta
2. **Sube a Canva** (edita si quieres)
3. **Publica** en tus redes directamente

Las imágenes están **100% listas** para usar 🎨

---

## ⚙️ Troubleshooting

**"Tokens inválidos"** → Revisa en developers.instagram.com / developers.tiktok.com que sean válidos

**"No puedo conseguir IDs"** → En Meta, ve a Configuración → IDs públicos

**"Rate limit"** → Espera 1 hora, las APIs tienen límites diarios

---

**¿Necesitas ayuda?** Cuéntame dónde te atoras y te guío 🚀
