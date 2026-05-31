import axios from 'axios';
import { getPostById, markAsPublished } from './database.js';

// Configurar credenciales desde variables de entorno
const SOCIAL_MEDIA_TOKENS = {
  instagram: {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    businessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  },
  facebook: {
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN,
    pageId: process.env.FACEBOOK_PAGE_ID
  },
  tiktok: {
    accessToken: process.env.TIKTOK_ACCESS_TOKEN,
    clientKey: process.env.TIKTOK_CLIENT_KEY,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET
  }
};

export async function publishToSocialMedia(postId) {
  try {
    const post = await getPostById(postId);
    if (!post) {
      throw new Error('Post no encontrado');
    }

    const results = {
      instagram: null,
      facebook: null,
      tiktok: null,
      success: false,
      publishedAt: new Date()
    };

    // Publicar a Instagram (Feed + Story)
    if (SOCIAL_MEDIA_TOKENS.instagram.accessToken) {
      try {
        results.instagram = await publishToInstagram(post);
      } catch (error) {
        console.error('Error publicando en Instagram:', error.message);
        results.instagram = { error: error.message };
      }
    }

    // Publicar a Facebook
    if (SOCIAL_MEDIA_TOKENS.facebook.accessToken) {
      try {
        results.facebook = await publishToFacebook(post);
      } catch (error) {
        console.error('Error publicando en Facebook:', error.message);
        results.facebook = { error: error.message };
      }
    }

    // Publicar a TikTok
    if (SOCIAL_MEDIA_TOKENS.tiktok.accessToken) {
      try {
        results.tiktok = await publishToTikTok(post);
      } catch (error) {
        console.error('Error publicando en TikTok:', error.message);
        results.tiktok = { error: error.message };
      }
    }

    // Marcar como publicado si al menos una red social fue exitosa
    if (results.instagram || results.facebook || results.tiktok) {
      await markAsPublished(postId);
      results.success = true;
    }

    return results;
  } catch (error) {
    console.error('Error publicando post:', error);
    throw error;
  }
}

async function publishToInstagram(post) {
  const { accessToken, businessAccountId } = SOCIAL_MEDIA_TOKENS.instagram;

  try {
    // Publicar imagen en feed
    const feedResponse = await axios.post(
      `https://graph.instagram.com/v18.0/${businessAccountId}/media`,
      {
        image_url: post.content.images?.instagram_feed || post.content.copy,
        caption: post.content.copy,
        access_token: accessToken
      }
    );

    // Publicar story (si es disponible)
    const storyResponse = await axios.post(
      `https://graph.instagram.com/v18.0/${businessAccountId}/media`,
      {
        image_url: post.content.images?.instagram_story || post.content.copy,
        media_type: 'STORIES',
        access_token: accessToken
      }
    );

    return {
      feedPostId: feedResponse.data.id,
      storyPostId: storyResponse.data.id,
      success: true
    };
  } catch (error) {
    throw new Error(`Instagram API error: ${error.response?.data?.error?.message || error.message}`);
  }
}

async function publishToFacebook(post) {
  const { accessToken, pageId } = SOCIAL_MEDIA_TOKENS.facebook;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${pageId}/feed`,
      {
        message: post.content.copy,
        link: process.env.WEBSITE_URL || 'https://cosmic-baklava-9c05de.netlify.app/',
        picture: post.content.images?.facebook_feed,
        access_token: accessToken
      }
    );

    return {
      postId: response.data.id,
      success: true
    };
  } catch (error) {
    throw new Error(`Facebook API error: ${error.response?.data?.error?.message || error.message}`);
  }
}

async function publishToTikTok(post) {
  const { accessToken, clientKey, clientSecret } = SOCIAL_MEDIA_TOKENS.tiktok;

  try {
    // TikTok requiere una arquitectura más compleja
    // Por ahora retornamos un placeholder
    console.log('📱 TikTok integration - configurar credenciales en .env');

    return {
      message: 'TikTok: Configurar credenciales en variables de entorno',
      success: false
    };
  } catch (error) {
    throw new Error(`TikTok API error: ${error.message}`);
  }
}

export async function getPublicationStats(postId) {
  try {
    const post = await getPostById(postId);
    if (!post) {
      throw new Error('Post no encontrado');
    }

    return {
      postId,
      stats: post.stats,
      published: post.published,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    throw error;
  }
}

export async function updatePublicationStats(postId, stats) {
  try {
    // Actualizar estadísticas en base de datos
    const post = await getPostById(postId);
    const updatedPost = {
      ...post,
      stats: { ...post.stats, ...stats }
    };
    // Aquí iría la lógica de actualización en BD
    return updatedPost;
  } catch (error) {
    console.error('Error actualizando estadísticas:', error);
    throw error;
  }
}
