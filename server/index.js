import 'dotenv/config'; // PRIMERO — carga .env antes de todos los demás módulos
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { generatePostContent } from './services/contentGenerator.js';
import { renderPostDesigns } from './services/renderDesigns.js';
import { publishToSocialMedia } from './services/socialMediaPublisher.js';
import { getScheduledPosts, addPost, updatePost, deletePost } from './services/database.js';
import { generatePostImages } from './services/imageGenerator.js';
import { generateAdvancedCopy } from './services/advancedCopywriter.js';
import { generateVideo } from './services/videoGenerator.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('../client/dist'));
app.use('/posts', express.static('../public/posts')); // Imágenes generadas públicas

// API Routes

// Obtener posts programados
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await getScheduledPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo post manualmente
app.post('/api/posts', async (req, res) => {
  try {
    const { content, scheduledTime } = req.body;
    const post = await addPost(content, scheduledTime);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, scheduledTime } = req.body;
    const post = await updatePost(id, content, scheduledTime);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deletePost(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Publicar post inmediatamente
app.post('/api/posts/:id/publish', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await publishToSocialMedia(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generar preview de post con diseños profesionales
app.post('/api/preview', async (req, res) => {
  try {
    const content = await generatePostContent();
    // Agregar diseños al contenido
    const designs = await renderPostDesigns(content);
    content.designs = designs;
    const post = await addPost(content, new Date());
    res.json({ content, post, designs });
  } catch (error) {
    console.error('Error en /api/preview:', error);
    res.status(500).json({ error: error.message });
  }
});

const CONTENT_ROTATION = [
  'tip_visa','entrevista','rechazo','promocion_usa',
  'testimonio','cta_consulta','promocion_schengen','caso_exitoso'
];

function getTipoDelDia(slot) {
  const dia = new Date().getDate();
  const idx = (dia * 2 + slot) % CONTENT_ROTATION.length;
  return CONTENT_ROTATION[idx];
}

// 8:00 AM — Post imagen en Facebook e Instagram
cron.schedule('0 8 * * *', async () => {
  try {
    const tipo = getTipoDelDia(0);
    console.log(`[CRON 8am] Generando post imagen: ${tipo}`);
    const copyData = await generateAdvancedCopy(tipo);
    const images   = await generatePostImages({ contentType: tipo, id: `post_${Date.now()}` });
    const content  = { ...copyData, images, formats: ['instagram_feed','facebook_feed'] };
    const post     = await addPost(content, new Date());
    await publishToSocialMedia(post.id);
    console.log('[CRON 8am] Post publicado en FB + IG');
  } catch (err) { console.error('[CRON 8am] Error:', err.message); }
});

// 12:00 PM — Video para Instagram Reels (Veo 2 gratis)
cron.schedule('0 12 * * *', async () => {
  try {
    const tipo = getTipoDelDia(1);
    console.log(`[CRON 12pm] Generando video Reels: ${tipo}`);
    const videoUrl = await generateVideo(tipo, '9:16');
    if (videoUrl) {
      const copyData = await generateAdvancedCopy(tipo);
      const content  = { ...copyData, videoUrl, formats: ['instagram_reel'] };
      const post     = await addPost(content, new Date());
      await publishToSocialMedia(post.id);
      console.log('[CRON 12pm] Reel publicado en IG');
    }
  } catch (err) { console.error('[CRON 12pm] Error:', err.message); }
});

// 5:00 PM — Post imagen (segundo del día)
cron.schedule('0 17 * * *', async () => {
  try {
    const tipo = getTipoDelDia(2);
    console.log(`[CRON 5pm] Generando post imagen: ${tipo}`);
    const copyData = await generateAdvancedCopy(tipo);
    const images   = await generatePostImages({ contentType: tipo, id: `post_${Date.now()}` });
    const content  = { ...copyData, images, formats: ['instagram_feed','facebook_feed','instagram_story'] };
    const post     = await addPost(content, new Date());
    await publishToSocialMedia(post.id);
    console.log('[CRON 5pm] Post publicado en FB + IG');
  } catch (err) { console.error('[CRON 5pm] Error:', err.message); }
});

// 8:00 PM — Video para TikTok (segundo video Veo 2)
cron.schedule('0 20 * * *', async () => {
  try {
    const tipo = getTipoDelDia(3);
    console.log(`[CRON 8pm] Generando video TikTok: ${tipo}`);
    const videoUrl = await generateVideo(tipo, '9:16');
    if (videoUrl) {
      const copyData = await generateAdvancedCopy(tipo);
      const content  = { ...copyData, videoUrl, formats: ['tiktok_video'] };
      const post     = await addPost(content, new Date());
      await publishToSocialMedia(post.id);
      console.log('[CRON 8pm] Video TikTok generado');
    }
  } catch (err) { console.error('[CRON 8pm] Error:', err.message); }
});

// TEST: genera imagen + copy
app.get('/api/test-generar', async (req, res) => {
  try {
    const tipo = req.query.tipo || 'tip_visa';
    const copyData = await generateAdvancedCopy(tipo);
    const images = await generatePostImages({ contentType: tipo, id: `test_${Date.now()}` });
    res.json({ ok: true, copy: copyData.copy, images });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// TEST: genera video con Kling (~60-90 segundos de espera)
app.get('/api/test-video', async (req, res) => {
  try {
    const tipo = req.query.tipo || 'tip_visa';
    console.log(`[TEST VIDEO] Generando video tipo: ${tipo}`);
    const videoUrl = await generateVideo(tipo);
    res.json({ ok: !!videoUrl, video_url: videoUrl });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
