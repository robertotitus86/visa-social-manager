import { createRichDesign } from './richDesigns.js';

export async function renderPostDesigns(postContent) {
  const designs = {};
  const copy = postContent.copy || 'Tu Visa Aprobada';
  const cta = postContent.cta || 'Saber Más';
  const angle = postContent.angle || 'urgency';

  const formats = {
    instagram_feed: { width: 1080, height: 1080, name: 'Instagram Feed' },
    instagram_story: { width: 1080, height: 1920, name: 'Instagram Story' },
    instagram_reel: { width: 1080, height: 1920, name: 'Instagram Reel' },
    tiktok_video: { width: 1080, height: 1920, name: 'TikTok' },
    facebook_feed: { width: 1200, height: 628, name: 'Facebook' },
    linkedin_post: { width: 1200, height: 627, name: 'LinkedIn' }
  };

  for (const [format, dims] of Object.entries(formats)) {
    const html = createRichDesign(copy, cta, format, angle);
    designs[format] = {
      format,
      name: dims.name,
      dimensions: dims,
      html: html
    };
  }

  return designs;
}
