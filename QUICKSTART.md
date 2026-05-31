# ⚡ Guía Rápida de Inicio

## 1️⃣ Instalación (2 minutos)

```bash
# Instalar dependencias
npm install

# Copiar configuración
cp .env.example .env
```

## 2️⃣ Configurar API Key (1 minuto)

Edita `.env` y agrega tu clave de Claude:
```env
ANTHROPIC_API_KEY=sk_live_xxxxx
```

Obtén una en: https://console.anthropic.com/

## 3️⃣ Iniciar la aplicación

```bash
npm run dev
```

- 🖥️ Frontend: http://localhost:5173
- 🔧 Backend: http://localhost:5000

## 4️⃣ Generar tu primer post

1. Abre http://localhost:5173
2. Haz clic en "✨ Generar Post"
3. Espera a que se genere el contenido
4. Revisa el post en el dashboard
5. Haz clic en "📤 Publicar" o deja que se publique automáticamente

## 🌐 Conectar Redes Sociales (Opcional)

1. Ve a **Configuración** en el dashboard
2. Ingresa tus tokens:
   - Instagram
   - Facebook
   - TikTok (opcional)
3. Haz clic en "💾 Guardar Configuración"

## 🚀 Deploy a Netlify

### Opción Rápida (Recomendada)

```bash
npm install -g netlify-cli
netlify deploy
```

### Con Git

1. Push a GitHub
2. Conecta repo en Netlify
3. Asigna variables de entorno
4. Deploy automático

## ❓ Primeros pasos

- El sistema genera automáticamente 2 posts diarios
- Puedes publicar manualmente en cualquier momento
- Todos los posts se guardan localmente
- Los colores se personalizan automáticamente

## 📞 Ayuda Rápida

**¿No genera posts?**
- Verifica tu API Key en `.env`
- Revisa que el servidor esté corriendo

**¿No se publica?**
- Configura los tokens de redes en Configuración
- Verifica los permisos de la API

**¿Quieres cambiar horarios?**
- Ve a Configuración → Horarios de Publicación
- Guarda los cambios

¡Listo! Ya tienes tu Social Media Manager funcionando 🎉
