import { generateAdvancedCopy } from './advancedCopywriter.js';

const CONTENT_TYPES = [
  'promocion_usa',
  'promocion_schengen',
  'tip_visa',
  'estadistica',
  'testimonio',
  'cta_consulta',
  'caso_exitoso',
  'trending_topic'
];

export async function generatePostContent(timeOfDay = 'random') {
  try {
    const today = new Date();
    const dayOfMonth = today.getDate();
    
    // Seleccionar tipo de contenido variado según la hora del día
    let contentType;
    if (timeOfDay === 'morning') {
      // Mañana: CTA y urgencia
      contentType = ['cta_consulta', 'promocion_usa', 'urgency'][dayOfMonth % 3];
    } else if (timeOfDay === 'afternoon') {
      // Tarde: Social proof y testimonios
      contentType = ['testimonio', 'caso_exitoso', 'estadistica'][dayOfMonth % 3];
    } else {
      // Random: cualquier tipo
      contentType = CONTENT_TYPES[dayOfMonth % CONTENT_TYPES.length];
    }

    // Generar copy avanzado con ángulos de venta
    const advancedCopy = generateAdvancedCopy(contentType, dayOfMonth);
    
    return {
      id: `post_${Date.now()}`,
      contentType,
      copy: advancedCopy.copy,
      cta: advancedCopy.cta,
      emoji: advancedCopy.emoji,
      angle: advancedCopy.angle,
      product: advancedCopy.product,
      formats: ['instagram_feed', 'instagram_story', 'tiktok_video', 'facebook_feed'],
      createdAt: new Date(),
      published: false,
      stats: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    };
  } catch (error) {
    console.error('Error generando contenido:', error);
    throw error;
  }
}
