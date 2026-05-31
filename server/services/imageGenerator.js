// Generación de imágenes gratis con Pollinations.ai — Flux, sin API key, sin costo

const VISUAL_PROMPTS = {
  promocion_usa: [
    'happy ecuadorian family celebrating visa approval airport holding USA passports warm golden light authentic emotion photorealistic',
    'confident latin american professional approved US visa New York skyline success moment cinematic lighting photorealistic',
    'young ecuadorian woman holding B1B2 visa joyful expression modern airport terminal vibrant colors photorealistic'
  ],
  promocion_schengen: [
    'happy ecuadorian couple european landmark approved schengen visa golden hour photography authentic joy photorealistic',
    'latin american family Eiffel Tower holding visas warm sunset celebrating photorealistic high quality',
    'latin american traveler passport schengen stamp european city happiness freedom photorealistic'
  ],
  tip_visa: [
    'clean flat lay passport organized documents pen wooden desk warm natural lighting minimalist professional photography',
    'closeup passport multiple visa stamps travel documents soft bokeh warm tones professional photography',
    'professional consultant reviewing visa documents modern office trust expertise warm lighting'
  ],
  entrevista: [
    'confident latin american person consulate interview calm prepared expression modern office natural light professional',
    'person interview preparation documents ready confident expression success atmosphere clean professional',
    'consulate meeting scene professional environment trust and preparation warm natural lighting'
  ],
  rechazo: [
    'resilient latin american person determined hopeful expression second chance warm encouraging light photorealistic',
    'comeback story ecuadorian professional passport in hand bright future cinematic warm tones',
    'person transformation worried to confident holding approved visa optimistic warm photorealistic'
  ],
  testimonio: [
    'happy ecuadorian client celebrating visa approval genuine authentic smile warm natural photography',
    'latin american family departure gate approved visas genuine celebration authentic happiness airport',
    'real person holding approved visa smiling camera warm authentic photography gratitude relief'
  ],
  cta_consulta: [
    'friendly professional visa consultant meeting latin american client trust warmth modern office natural light',
    'professional visa advisor organized documents approachable expert clean modern office background warm',
    'consultant client handshake professional environment success partnership warm natural lighting'
  ],
  caso_exitoso: [
    'ecuadorian person airport departure hall visa approved pure happiness authentic celebratory warm light',
    'latin american family airport visas in hand tears of joy genuine emotion photorealistic warm',
    'traveler boarding international flight passport visa ready achievement freedom cinematic'
  ]
};

function pickPrompt(contentType) {
  const options = VISUAL_PROMPTS[contentType] || VISUAL_PROMPTS['cta_consulta'];
  return options[Math.floor(Math.random() * options.length)];
}

function buildUrl(prompt, width, height) {
  const seed = Math.floor(Math.random() * 999999);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true&enhance=true`;
}

export async function generatePostImages(postContent) {
  const { contentType } = postContent;
  const prompt = pickPrompt(contentType);

  const feedUrl  = buildUrl(prompt, 1080, 1080);
  const storyUrl = buildUrl(prompt, 1080, 1920);

  return {
    instagram_feed:  feedUrl,
    facebook_feed:   feedUrl,
    instagram_story: storyUrl,
    instagram_reel:  storyUrl,
    tiktok_cover:    storyUrl
  };
}
