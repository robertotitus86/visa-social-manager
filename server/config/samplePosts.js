// Posts de ejemplo para pruebas
export const SAMPLE_POSTS = [
  {
    id: 'sample_1',
    contentType: 'promocion_usa',
    copy: '🇺🇸 ¡Tu VISA USA aprobada sin complicaciones! 95% tasa de éxito. Consulta gratis 📞 +593977704310',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    published: true,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    stats: { likes: 45, comments: 12, shares: 8 },
    formats: ['instagram_feed', 'facebook_feed', 'instagram_story']
  },
  {
    id: 'sample_2',
    contentType: 'promocion_schengen',
    copy: '🇪🇺 Europa está esperando! Visa Schengen aprobada. Trámite completamente online. 🛫✈️',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    published: true,
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    stats: { likes: 32, comments: 8, shares: 5 },
    formats: ['instagram_reel', 'tiktok_video']
  },
  {
    id: 'sample_3',
    contentType: 'tip_visa',
    copy: '💡 TIPS: Los documentos deben estar traducidos oficialmente. No descuides esto en tu entrevista! 🎯',
    createdAt: new Date(),
    published: false,
    publishedAt: null,
    stats: { likes: 0, comments: 0, shares: 0 },
    formats: ['instagram_story', 'facebook_feed']
  },
  {
    id: 'sample_4',
    contentType: 'estadistica',
    copy: '📊 95% Tasa de Aprobación en visas USA. ¡Somos expertos! Confía en nosotros 🙌',
    createdAt: new Date(),
    published: false,
    publishedAt: null,
    stats: { likes: 0, comments: 0, shares: 0 },
    formats: ['instagram_feed', 'instagram_reel']
  },
  {
    id: 'sample_5',
    contentType: 'testimonio',
    copy: '⭐ "Consiguieron mi visa en menos tiempo del esperado. Muy profesionales" - María, Ecuador',
    createdAt: new Date(),
    published: false,
    publishedAt: null,
    stats: { likes: 0, comments: 0, shares: 0 },
    formats: ['instagram_story', 'tiktok_video']
  },
  {
    id: 'sample_6',
    contentType: 'cta_consulta',
    copy: '📞 CONSULTA GRATIS sobre tu visa. Hablemos de tu sueño 🎯 +593977704310 WhatsApp',
    createdAt: new Date(),
    published: false,
    publishedAt: null,
    stats: { likes: 0, comments: 0, shares: 0 },
    formats: ['facebook_feed', 'instagram_reel']
  }
];

export const TRENDING_TOPICS = [
  'solicitud de visa',
  'entrevista en embajada',
  'documentos para visa',
  'viajes internacionales',
  'estudiar en el extranjero',
  'trabajar en USA',
  'Europa visa',
  'trámites migratorios'
];

export const POST_TEMPLATES = {
  morning: {
    types: ['tip_visa', 'estadistica', 'promocion_usa'],
    tone: 'motivador'
  },
  afternoon: {
    types: ['cta_consulta', 'testimonio', 'promocion_schengen'],
    tone: 'urgente'
  }
};
