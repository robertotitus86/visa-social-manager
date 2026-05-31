import axios from 'axios';

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const BASE_URL   = 'https://generativelanguage.googleapis.com/v1beta';

// Veo 3.0 fast — mejor calidad, disponible en tu cuenta gratis
const VEO_MODEL = 'models/veo-3.0-fast-generate-001';

const VIDEO_PROMPTS = {
  promocion_usa: [
    'happy ecuadorian family celebrating at airport with USA visas, warm cinematic lighting, slow motion, authentic emotion, vertical 9:16',
    'confident latin american professional holding approved US visa, New York background, success moment, cinematic vertical'
  ],
  promocion_schengen: [
    'latin american traveler arriving at european city, passport and schengen visa, golden hour, cinematic vertical slow motion',
    'happy ecuadorian couple walking through european street with visas, warm sunset, celebration, cinematic vertical'
  ],
  tip_visa: [
    'professional hands organizing passport and documents on desk, warm close up, smooth camera movement, cinematic vertical',
    'person carefully reviewing visa documents, organized desk, focused expression, warm lighting, vertical cinematic'
  ],
  entrevista: [
    'confident person walking into consulate building, professional outfit, determined expression, cinematic vertical slow motion',
    'person preparing for consulate interview, practicing confident answers, modern professional setting, vertical cinematic'
  ],
  rechazo: [
    'resilient person standing strong looking at sunrise with passport in hand, determination and hope, cinematic vertical',
    'person transforming from worried to confident, holding approved visa, optimistic warm cinematic vertical'
  ],
  testimonio: [
    'happy latin american family at airport gate with approved visas, genuine celebration, tears of joy, cinematic vertical',
    'person receiving visa approval, authentic joy, real emotion, warm cinematic vertical slow motion'
  ],
  cta_consulta: [
    'friendly visa consultant welcoming client in modern office, trust and warmth, cinematic vertical',
    'professional handshake between consultant and happy client, success partnership, warm office, cinematic vertical'
  ],
  caso_exitoso: [
    'person boarding international flight with passport and visa, freedom and achievement, airport sunset, slow motion cinematic vertical',
    'latin american traveler at departure gate, visa in hand, emotional farewell, authentic moment, cinematic vertical'
  ]
};

function pickPrompt(contentType) {
  const options = VIDEO_PROMPTS[contentType] || VIDEO_PROMPTS['cta_consulta'];
  const now = new Date();
  const idx = (now.getDate() * 5 + now.getHours()) % options.length;
  return options[idx];
}

async function submitVeoJob(prompt, aspectRatio = '9:16') {
  const response = await axios.post(
    `${BASE_URL}/${VEO_MODEL}:predictLongRunning?key=${GEMINI_KEY}`,
    {
      instances: [{ prompt }],
      parameters: {
        aspectRatio,
        durationSeconds: 8,
        sampleCount: 1
      }
    },
    { headers: { 'Content-Type': 'application/json' }, timeout: 30000 }
  );
  return response.data?.name || null;
}

async function pollVeoResult(operationName, maxWaitMs = 300000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    await new Promise(r => setTimeout(r, 10000));
    const response = await axios.get(
      `${BASE_URL}/${operationName}?key=${GEMINI_KEY}`,
      { timeout: 15000 }
    );
    const data = response.data;
    console.log(`[Veo] Estado: ${data.done ? 'LISTO' : 'procesando...'}`);
    if (data.done) {
      // Puede venir en distintos campos según la versión
      const samples = data.response?.generatedSamples || data.response?.videos || [];
      const video = samples[0]?.video || samples[0];
      return video?.uri || video?.url || null;
    }
    if (data.error) throw new Error(`Veo error: ${JSON.stringify(data.error)}`);
  }
  throw new Error('Veo timeout — demoró más de 5 minutos');
}

export async function generateVideo(contentType, aspectRatio = '9:16') {
  const prompt = pickPrompt(contentType);
  try {
    console.log(`[Veo] Iniciando video: ${contentType}`);
    const operationName = await submitVeoJob(prompt, aspectRatio);
    if (!operationName) throw new Error('No se recibió nombre de operación');
    console.log(`[Veo] Operación: ${operationName} — esperando resultado...`);
    const videoUrl = await pollVeoResult(operationName);
    console.log(`[Veo] Video listo: ${videoUrl}`);
    return videoUrl;
  } catch (err) {
    console.error('[Veo] Error:', err.response?.data || err.message);
    return null;
  }
}
