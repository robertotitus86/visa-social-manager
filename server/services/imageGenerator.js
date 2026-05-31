// Generación de imágenes: primero usa imágenes subidas por Roberto (Freepik),
// si no hay ninguna disponible usa Pollinations.ai como respaldo automático.

export const imagenesSubidas = new Map(); // slot → base64 jpeg

const VISUAL_PROMPTS = {
  promocion_usa: [
    'happy ecuadorian family celebrating visa approval airport holding USA passports warm golden light authentic emotion photorealistic',
    'confident latin american professional approved US visa New York skyline success moment cinematic lighting',
    'young ecuadorian woman holding B1B2 visa joyful expression modern airport terminal vibrant colors photorealistic',
    'latin american couple at US embassy exit smiling with approved visas, relief and happiness, warm afternoon light',
    'ecuadorian parents showing USA visa to their children, kitchen table scene, genuine family joy photorealistic',
    'person unpacking travel bag with USA visa passport, excited expression, bedroom setting, warm natural light'
  ],
  promocion_schengen: [
    'happy ecuadorian couple european landmark approved schengen visa golden hour photography authentic joy',
    'latin american family Eiffel Tower holding visas warm sunset celebrating photorealistic',
    'latin american traveler passport schengen stamp european city happiness freedom',
    'ecuadorian woman at Barcelona streets holding schengen visa, summer light, colorful background, photorealistic',
    'latin american professional at amsterdam canal approved europe visa, professional attire, warm light cinematic',
    'family group photo in front of european architecture with visas, genuine happiness, golden hour'
  ],
  tip_visa: [
    'clean flat lay passport organized documents pen wooden desk warm natural lighting minimalist professional',
    'closeup passport multiple visa stamps travel documents soft bokeh warm tones professional photography',
    'professional consultant reviewing visa documents modern office trust expertise warm lighting',
    'organized visa application folder with documents checklist pen, overhead view, clean desk minimalist',
    'hands carefully filling out visa form with passport nearby, focused concentration, warm office lighting',
    'visa approval stamp closeup on passport pages, authentic document texture, warm light macro photography'
  ],
  entrevista: [
    'confident latin american person consulate interview calm prepared expression modern office natural light',
    'person interview preparation documents ready confident expression success atmosphere clean',
    'consulate building entrance professional person walking in determined, cinematic natural light',
    'latin american professional practicing interview in mirror, confident posture, modern bathroom, warm light',
    'person and visa consultant doing mock interview session, engaged conversation, modern office setting',
    'confident ecuadorian person at consulate waiting room, calm and prepared, professional attire, warm light'
  ],
  rechazo: [
    'resilient latin american person determined hopeful expression second chance warm encouraging light photorealistic',
    'comeback story ecuadorian professional passport in hand bright future cinematic warm tones',
    'person transformation worried to confident holding approved visa optimistic warm photorealistic',
    'person looking at rejected visa stamp with determination to try again, focus and resilience, warm tones',
    'latin american person at sunset thinking about future travel plans, hopeful expression, golden light',
    'two photos side by side concept: worried person and same person celebrating visa approval, warm light'
  ],
  testimonio: [
    'happy ecuadorian client celebrating visa approval genuine authentic smile warm natural photography',
    'latin american family departure gate approved visas genuine celebration authentic happiness airport',
    'real person holding approved visa smiling camera warm authentic photography gratitude relief',
    'ecuadorian family at international airport check-in counter with luggage and visas, genuine excitement',
    'person showing approved visa stamp on phone screen to family, kitchen scene, authentic joy photorealistic',
    'latin american woman reading visa approval email on laptop, surprised joy, home office warm lighting'
  ],
  cta_consulta: [
    'friendly professional visa consultant meeting latin american client trust warmth modern office natural light',
    'professional visa advisor organized documents approachable expert clean modern office background warm',
    'consultant client handshake professional environment success partnership warm natural lighting',
    'latin american person on video call with visa consultant, home setting, engaged and hopeful expression',
    'professional whatsapp consultation mockup, visa documents visible, modern phone, clean background warm',
    'welcoming office reception area with visa global branding, professional modern design, warm inviting light'
  ],
  caso_exitoso: [
    'ecuadorian person airport departure hall visa approved pure happiness authentic celebratory warm light',
    'latin american family airport visas in hand tears of joy genuine emotion photorealistic warm',
    'traveler boarding international flight passport visa ready achievement freedom cinematic',
    'ecuadorian person landing at international airport abroad, first time abroad expression, wonder and joy',
    'family video call showing approved visa to relatives abroad, emotional reunion moment, warm home lighting',
    'person packing suitcase happily with approved visa on top, bedroom scene, excited anticipation photorealistic'
  ]
};

function pickPrompt(contentType) {
  const options = VISUAL_PROMPTS[contentType] || VISUAL_PROMPTS['cta_consulta'];
  // Usa día + hora para que cada publicación del día sea diferente
  const now = new Date();
  const idx = (now.getDate() * 7 + now.getHours()) % options.length;
  return options[idx];
}

function buildUrl(prompt, width, height) {
  const seed = Math.floor(Math.random() * 999999);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true&enhance=true`;
}

const SERVER_URL = process.env.SERVER_URL || 'https://visa-social-manager.onrender.com';

export async function generatePostImages(postContent) {
  const { contentType } = postContent;

  const feedUrl  = imagenesSubidas.has('feed')
    ? `${SERVER_URL}/api/imagen/feed`
    : buildUrl(pickPrompt(contentType), 1080, 1080);

  const storyUrl = imagenesSubidas.has('story')
    ? `${SERVER_URL}/api/imagen/story`
    : buildUrl(pickPrompt(contentType), 1080, 1920);

  return {
    instagram_feed:  feedUrl,
    facebook_feed:   feedUrl,
    instagram_story: storyUrl,
    instagram_reel:  storyUrl,
    tiktok_cover:    storyUrl
  };
}
