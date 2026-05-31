import axios from 'axios';

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

const BRAND_CONTEXT = `Eres el copywriter de Asesoría Visa Global, empresa de asesoría de visas en Ecuador dirigida por Roberto Acosta, asesor español con experiencia en consulados europeos y americanos.

PRECIOS REALES (nunca inventes otros):
- Diagnóstico de perfil: $50
- Paquete Esencial: $197
- Paquete Profesional: $265 (el más solicitado)
- Paquete VIP (casos con rechazo previo): $320
- Descuento familiar: 10% para 2-5 personas del mismo núcleo familiar
- Revisión exprés de documentos: $49

CUMPLIMIENTO ESTRICTO META Y TIKTOK (sin excepciones):
PROHIBIDO:
- Urgencia o escasez falsa: "últimos cupos", "solo hoy", "quedan 2 lugares"
- Estadísticas inventadas o no verificables con números exactos
- Garantías de resultado: "te aprobamos la visa", "100% de éxito"
- Testimonios fabricados con nombres o detalles inventados
- Afirmaciones no comprobables: "certificados por embajadas", "ranking #1"
- Precios engañosos o servicios descritos como gratis si tienen costo
- Presión psicológica negativa excesiva

PERMITIDO:
- Casos de éxito en términos generales sin números exactos
- Beneficios concretos y reales del servicio
- Preguntas educativas que generen reflexión
- Información real sobre el proceso consular
- Precios reales cuando sea relevante
- La experiencia del asesor como español con conocimiento del consulado europeo

TONO: cálido, directo, humano. Como un amigo experto que habla de frente. Sin corporativo ni agencia genérica.
FORMATO: texto plano sin asteriscos ni markdown. Máximo 5 líneas. Termina con una pregunta concreta o acción específica.
CONTACTO: asesoriadevisadosglobal.com | WhatsApp: +593 99 444 2512`;

const COPY_INSTRUCTIONS = {
  promocion_usa: 'Post sobre visa USA B1/B2 para ecuatorianos. Ángulo: el valor real de prepararse bien antes de la cita consular. Menciona el Paquete Profesional ($265) de forma natural.',
  promocion_schengen: 'Post sobre visa Schengen (Europa) para ecuatorianos. Ángulo: la ventaja única de tener un asesor español que conoce el consulado desde dentro.',
  tip_visa: 'Post educativo con un consejo práctico sobre visas — el error más común, qué miran los cónsules, o cómo preparar documentos. El tip demuestra expertise sin revelar todo.',
  entrevista: 'Post sobre la entrevista consular. Ángulo: los primeros 6 segundos con el cónsul deciden todo. Genera curiosidad sobre cómo prepararse correctamente.',
  rechazo: 'Post para personas con rechazo previo de visa. Tono empático: el rechazo no es el fin, es información para mejorar la estrategia. Menciona el Paquete VIP ($320) naturalmente.',
  testimonio: 'Post de prueba social en términos generales — sin inventar nombres ni detalles. Cuenta que hemos ayudado a familias con rechazos previos a conseguir su visa. Emocional y auténtico.',
  cta_consulta: 'Post de llamada a la acción. Ángulo: la primera conversación es sin costo — el cliente cuenta su situación y evaluamos su caso juntos. El gancho es demostrar valor antes de cobrar.',
  caso_exitoso: 'Post celebrando un caso de éxito en términos generales — sin nombres inventados. Enfocado en la transformación: de la incertidumbre al viaje hecho realidad.'
};

export async function generateAdvancedCopy(contentType) {
  const instruction = COPY_INSTRUCTIONS[contentType] || COPY_INSTRUCTIONS['tip_visa'];
  const now = new Date();
  const fecha = now.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long' });
  const angulos = [
    'dolor del cliente que ya lo intentó solo y falló',
    'sueño concreto: pisar ese aeropuerto y pasar migración',
    'dato sorprendente que nadie sabe sobre los cónsules',
    'miedo real al rechazo y cómo evitarlo',
    'empatía: entender el nerviosismo del cliente',
    'urgencia real: el tiempo del consulado no espera',
    'autoridad: lo que sabe un asesor español que otros no',
    'prueba social: familias que llegaron con rechazo y viajaron'
  ];
  const angulo = angulos[(now.getDate() + now.getMonth() * 3) % angulos.length];
  const ganchos = [
    'Empieza con una pregunta directa al lector.',
    'Empieza con un dato o hecho que sorprenda.',
    'Empieza con una afirmación contundente.',
    'Empieza contando una situación que el lector reconoce.',
    'Empieza con lo que el lector está pensando ahora mismo.',
    'Empieza con el error más común que comete la gente.',
    'Empieza con una frase corta de impacto, máximo 6 palabras.'
  ];
  const gancho = ganchos[(now.getDate() * 2 + now.getHours()) % ganchos.length];

  try {
    const fullPrompt = `${BRAND_CONTEXT}\n\n---\n\nFecha: ${fecha}.\nTipo de contenido: ${instruction}\nÁngulo emocional de hoy: "${angulo}".\nInstrucción de apertura: ${gancho}\n\nEl post debe ser ÚNICO para esta fecha. No repitas ganchos anteriores. SOLO el texto del post, sin títulos ni explicaciones.`;

    const response = await axios.post(GEMINI_URL, {
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: { maxOutputTokens: 300, temperature: 0.95 }
    }, { timeout: 20000 });

    const copy = response.data.candidates[0].content.parts[0].text.trim();

    return {
      copy,
      cta: extractCTA(copy),
      emoji: getEmoji(contentType),
      angle: contentType,
      product: getProduct(contentType)
    };
  } catch (err) {
    console.error('[Gemini] Error generando copy:', err.message);
    return getFallbackCopy(contentType);
  }
}

function extractCTA(copy) {
  const lines = copy.split('\n').filter(l => l.trim());
  const last = lines[lines.length - 1] || '';
  return last.includes('?') || last.includes('!') ? last : 'Escríbenos: +593 99 444 2512';
}

function getEmoji(contentType) {
  const map = {
    promocion_usa: '🇺🇸', promocion_schengen: '🇪🇺', tip_visa: '💡',
    entrevista: '🎯', rechazo: '💪', testimonio: '⭐', cta_consulta: '📋', caso_exitoso: '✈️'
  };
  return map[contentType] || '✈️';
}

function getProduct(contentType) {
  const map = {
    promocion_usa:      { heading: 'Paquete Profesional', price: '$265' },
    promocion_schengen: { heading: 'Paquete Profesional', price: '$265' },
    tip_visa:           { heading: 'Diagnóstico de perfil', price: '$50' },
    entrevista:         { heading: 'Paquete Profesional', price: '$265' },
    rechazo:            { heading: 'Paquete VIP', price: '$320' },
    testimonio:         { heading: 'Paquete Profesional', price: '$265' },
    cta_consulta:       { heading: 'Primera consulta', price: 'Sin costo' },
    caso_exitoso:       { heading: 'Paquete Profesional', price: '$265' }
  };
  return map[contentType] || { heading: 'Paquete Profesional', price: '$265' };
}

function getFallbackCopy(contentType) {
  const fallbacks = {
    tip_visa: 'El error más común en la entrevista consular no es de documentos. Es de preparación.\n\nEl cónsul tiene 3 minutos para decidir tu caso. Lo que dices en esos 3 minutos lo es todo.\n\n¿Sabes exactamente qué te van a preguntar? Escríbenos: +593 99 444 2512',
    rechazo: 'Un rechazo de visa no te cierra la puerta. Te dice exactamente dónde reforzar el expediente.\n\nHemos ayudado a familias con rechazos previos a conseguir su visa con una estrategia diferente.\n\nCuéntanos tu caso: asesoriadevisadosglobal.com',
    cta_consulta: 'Antes de gastar los $185 de la cita consular, asegúrate de que tu expediente está listo.\n\nEvaluamos tu situación y te decimos exactamente qué ajustar. La primera conversación es sin costo.\n\n¿Le damos una mirada a tu caso? +593 99 444 2512'
  };
  return {
    copy: fallbacks[contentType] || fallbacks['tip_visa'],
    cta: '+593 99 444 2512',
    emoji: getEmoji(contentType),
    angle: contentType,
    product: getProduct(contentType)
  };
}
