// Diseños Premium - Nivel Diseñador Experto 20+ años

export function createPremiumDesign(copy, cta, format, angle) {
  const layouts = {
    instagram_feed: [layoutIGFeed1, layoutIGFeed2, layoutIGFeed3],
    instagram_story: [layoutIGStory1, layoutIGStory2],
    tiktok_video: [layoutTikTok1, layoutTikTok2],
    facebook_feed: [layoutFB1, layoutFB2]
  };

  const designFunctions = layouts[format] || [layoutIGFeed1];
  const randomLayout = designFunctions[Math.floor(Math.random() * designFunctions.length)];

  return randomLayout(copy, cta, angle);
}

// INSTAGRAM FEED - Layout 1: Premium Split
function layoutIGFeed1(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1080px; height: 1080px; font-family: 'Poppins', sans-serif; }
      .container { width: 100%; height: 100%; display: flex; }

      .left { width: 45%; background: linear-gradient(135deg, #001F4D 0%, #003d7a 100%);
              display: flex; flex-direction: column; justify-content: center; align-items: center;
              padding: 40px; position: relative; overflow: hidden; }

      .left::before { content: ''; position: absolute; top: -50px; right: -50px;
                      width: 300px; height: 300px; background: rgba(212,175,55,0.2);
                      border-radius: 50%; z-index: 0; }

      .left-content { position: relative; z-index: 1; text-align: center; }

      .emoji { font-size: 100px; margin-bottom: 20px; }

      .highlight { font-size: 48px; font-weight: 900; color: #D4AF37; margin: 20px 0;
                   line-height: 1.1; }

      .right { width: 55%; background: white; display: flex; flex-direction: column;
               justify-content: space-between; padding: 50px; position: relative; }

      .right::before { content: ''; position: absolute; top: 0; left: 0; right: 0;
                       height: 8px; background: linear-gradient(90deg, #D4AF37, #001F4D); }

      .text-section { }

      .label { font-size: 14px; color: #D4AF37; font-weight: 700; letter-spacing: 2px;
               margin-bottom: 10px; }

      .main-text { font-size: 28px; color: #001F4D; font-weight: 700; line-height: 1.4;
                   margin-bottom: 30px; }

      .benefit-list { margin: 30px 0; }
      .benefit { display: flex; gap: 15px; margin-bottom: 20px; font-size: 15px;
                 color: #333; line-height: 1.4; }
      .benefit-icon { font-size: 24px; min-width: 30px; }

      .cta-button { background: linear-gradient(135deg, #D4AF37, #c99a2e); color: #001F4D;
                    padding: 16px 32px; border-radius: 30px; font-weight: 900;
                    font-size: 16px; border: none; cursor: pointer;
                    box-shadow: 0 8px 20px rgba(212,175,55,0.4);
                    text-transform: uppercase; letter-spacing: 1px; margin-top: 20px; }

      .footer { font-size: 12px; color: #999; border-top: 1px solid #eee;
                padding-top: 15px; margin-top: 20px; }

      .footer-bold { color: #001F4D; font-weight: 700; }
    </style></head>
    <body>
      <div class="container">
        <div class="left">
          <div class="left-content">
            <div class="emoji">⭐</div>
            <div class="highlight">95%<br>APROBADO</div>
            <p style="color: white; font-size: 16px; margin-top: 20px;">Tasa más alta del país</p>
          </div>
        </div>

        <div class="right">
          <div class="text-section">
            <div class="label">✓ GARANTIZADO</div>
            <div class="main-text">${copy.substring(0, 80)}</div>

            <div class="benefit-list">
              <div class="benefit"><div class="benefit-icon">✅</div> <div>Documentos completos</div></div>
              <div class="benefit"><div class="benefit-icon">✅</div> <div>Entrevista garantizada</div></div>
              <div class="benefit"><div class="benefit-icon">✅</div> <div>Soporte 24/7</div></div>
            </div>
          </div>

          <div>
            <button class="cta-button">${cta}</button>
            <div class="footer">
              <div class="footer-bold">Asesoría de Visa Global</div>
              📍 Quito • Ecuador
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// INSTAGRAM FEED - Layout 2: Full Image with Overlay
function layoutIGFeed2(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1080px; height: 1080px; font-family: 'Poppins', sans-serif; }
      .container { width: 100%; height: 100%;
                   background: linear-gradient(180deg, rgba(0,31,77,0.9), rgba(0,61,122,0.95)),
                   linear-gradient(135deg, #001F4D, #004a99);
                   display: flex; flex-direction: column; justify-content: space-between;
                   padding: 60px 50px; position: relative; overflow: hidden; }

      .container::before { content: ''; position: absolute; top: -100px; right: -100px;
                           width: 400px; height: 400px;
                           background: radial-gradient(circle, rgba(212,175,55,0.15), transparent);
                           border-radius: 50%; }

      .container::after { content: ''; position: absolute; bottom: -50px; left: -50px;
                          width: 300px; height: 300px;
                          background: radial-gradient(circle, rgba(212,175,55,0.1), transparent);
                          border-radius: 50%; }

      .content { position: relative; z-index: 1; }

      .top { display: flex; align-items: center; gap: 30px; margin-bottom: 40px; }

      .emoji-box { font-size: 100px; animation: float 3s ease-in-out infinite; }

      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

      .headline { flex: 1; }

      .headline-number { font-size: 52px; font-weight: 900; color: #D4AF37; line-height: 1; }

      .headline-text { font-size: 32px; font-weight: 700; color: white;
                       margin-top: 10px; line-height: 1.2; }

      .description { font-size: 18px; color: rgba(255,255,255,0.95);
                     line-height: 1.6; margin: 40px 0; max-width: 600px; }

      .stats { display: flex; gap: 40px; margin: 40px 0; }

      .stat { display: flex; flex-direction: column; align-items: center; }

      .stat-number { font-size: 48px; font-weight: 900; color: #D4AF37; }

      .stat-label { font-size: 14px; color: rgba(255,255,255,0.8); margin-top: 5px;
                    text-align: center; }

      .cta { display: inline-flex; align-items: center; gap: 15px;
             background: #D4AF37; color: #001F4D; padding: 18px 50px;
             border-radius: 50px; font-weight: 900; font-size: 16px;
             border: none; cursor: pointer; text-transform: uppercase;
             letter-spacing: 1px; box-shadow: 0 10px 30px rgba(212,175,55,0.4);
             transition: all 0.3s; }

      .cta:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(212,175,55,0.6); }

      .footer { text-align: center; color: rgba(255,255,255,0.9); font-size: 14px; }

      .footer-brand { font-weight: 900; color: #D4AF37; margin-bottom: 5px; }
    </style></head>
    <body>
      <div class="container">
        <div class="content">
          <div class="top">
            <div class="emoji-box">🎯</div>
            <div class="headline">
              <div class="headline-number">95%</div>
              <div class="headline-text">APROBACIÓN GARANTIZADA</div>
            </div>
          </div>

          <div class="description">${copy}</div>

          <div class="stats">
            <div class="stat">
              <div class="stat-number">1,247+</div>
              <div class="stat-label">Clientes Felices</div>
            </div>
            <div class="stat">
              <div class="stat-number">20+</div>
              <div class="stat-label">Años Experiencia</div>
            </div>
            <div class="stat">
              <div class="stat-number">3</div>
              <div class="stat-label">Meses Promedio</div>
            </div>
          </div>

          <button class="cta">→ ${cta}</button>
        </div>

        <div class="footer">
          <div class="footer-brand">ASESORÍA DE VISA GLOBAL</div>
          📍 Quito, Ecuador • 🌍 USA • Europa • Schengen
        </div>
      </div>
    </body>
    </html>
  `;
}

// INSTAGRAM FEED - Layout 3: Card Style
function layoutIGFeed3(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1080px; height: 1080px; font-family: 'Poppins', sans-serif;
             background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%); }
      .container { width: 100%; height: 100%; display: flex; align-items: center;
                   justify-content: center; padding: 40px; }

      .card { background: white; border-radius: 30px; padding: 60px 50px;
              box-shadow: 0 20px 60px rgba(0,31,77,0.15);
              border-top: 8px solid #D4AF37; text-align: center; }

      .emoji { font-size: 120px; margin-bottom: 30px; animation: bounce 2s infinite; }

      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

      .title { font-size: 44px; font-weight: 900; color: #001F4D;
               margin-bottom: 20px; line-height: 1.2; }

      .subtitle { font-size: 18px; color: #666; margin-bottom: 40px; line-height: 1.6; }

      .highlight-box { background: linear-gradient(135deg, #D4AF37, #c99a2e);
                       padding: 30px; border-radius: 20px; margin: 40px 0; }

      .highlight-text { color: white; font-size: 24px; font-weight: 700; }

      .cta { background: #001F4D; color: #D4AF37; padding: 20px 50px;
             border-radius: 50px; font-weight: 900; font-size: 16px;
             border: 3px solid #D4AF37; cursor: pointer;
             text-transform: uppercase; letter-spacing: 2px;
             margin-top: 30px; transition: all 0.3s; }

      .cta:hover { background: #D4AF37; color: #001F4D; }

      .features { display: flex; justify-content: space-around; margin-top: 40px; }
      .feature { font-size: 14px; color: #666; }
      .feature-icon { font-size: 32px; margin-bottom: 10px; }

      .footer { margin-top: 40px; font-size: 12px; color: #999;
                border-top: 1px solid #eee; padding-top: 20px; }
    </style></head>
    <body>
      <div class="container">
        <div class="card">
          <div class="emoji">✈️</div>
          <div class="title">${copy.substring(0, 40)}</div>
          <div class="subtitle">${copy.substring(40, 100)}</div>

          <div class="highlight-box">
            <div class="highlight-text">95% Aprobación en Primer Intento</div>
          </div>

          <button class="cta">${cta}</button>

          <div class="features">
            <div class="feature">
              <div class="feature-icon">⚡</div>
              <div>Rápido</div>
            </div>
            <div class="feature">
              <div class="feature-icon">🛡️</div>
              <div>Seguro</div>
            </div>
            <div class="feature">
              <div class="feature-icon">💯</div>
              <div>Garantizado</div>
            </div>
          </div>

          <div class="footer">
            Asesoría de Visa Global • 📍 Quito, Ecuador
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// INSTAGRAM STORY - Layout 1
function layoutIGStory1(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1080px; height: 1920px; font-family: 'Poppins', sans-serif;
             background: linear-gradient(180deg, #001F4D 0%, #004a99 100%); }
      .container { width: 100%; height: 100%; display: flex; flex-direction: column;
                   justify-content: space-between; padding: 100px 60px; position: relative; }

      .container::before { content: ''; position: absolute; top: -200px; right: -200px;
                           width: 600px; height: 600px;
                           background: radial-gradient(circle, rgba(212,175,55,0.2), transparent);
                           border-radius: 50%; }

      .content { position: relative; z-index: 1; text-align: center; }

      .emoji { font-size: 180px; margin-bottom: 40px; }

      .main-text { font-size: 52px; font-weight: 900; color: white;
                   line-height: 1.2; margin-bottom: 30px; }

      .cta-text { font-size: 28px; color: #D4AF37; font-weight: 700; margin-top: 60px; }

      .footer { position: relative; z-index: 1; text-align: center; }

      .footer-text { color: white; font-size: 16px; }

      .footer-highlight { color: #D4AF37; font-weight: 900; margin-top: 10px; }
    </style></head>
    <body>
      <div class="container">
        <div class="content">
          <div class="emoji">🔥</div>
          <div class="main-text">${copy.substring(0, 60)}</div>
          <div class="cta-text">↓ TAP PARA SABER MÁS ↓</div>
        </div>

        <div class="footer">
          <div class="footer-text">Visa Global</div>
          <div class="footer-highlight">${cta}</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// TIKTOK - Layout 1
function layoutTikTok1(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1080px; height: 1920px; font-family: 'Poppins', sans-serif;
             background: linear-gradient(180deg, #001F4D 0%, #003366 50%, #001F4D 100%);
             color: white; }
      .container { width: 100%; height: 100%; display: flex; flex-direction: column;
                   justify-content: space-between; padding: 80px 50px;
                   position: relative; overflow: hidden; }

      .container::before { content: ''; position: absolute;
                           top: 50%; left: 50%; transform: translate(-50%, -50%);
                           width: 800px; height: 800px;
                           background: radial-gradient(circle, rgba(212,175,55,0.1), transparent);
                           border-radius: 50%; }

      .content { position: relative; z-index: 1; }

      .emoji { font-size: 150px; text-align: center; margin-bottom: 30px;
               animation: spin 4s linear infinite; }

      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

      .text { font-size: 48px; font-weight: 900; line-height: 1.2;
              margin-bottom: 40px; text-align: center; }

      .highlight { color: #D4AF37; }

      .cta-box { background: rgba(212,175,55,0.15); border: 3px solid #D4AF37;
                 padding: 30px; border-radius: 20px; text-align: center;
                 margin: 40px 0; }

      .cta-text { font-size: 32px; font-weight: 900; color: #D4AF37; }

      .footer { position: relative; z-index: 1; text-align: center;
                font-size: 16px; border-top: 2px solid #D4AF37;
                padding-top: 20px; }

      .footer-bold { font-weight: 900; color: #D4AF37; }
    </style></head>
    <body>
      <div class="container">
        <div class="content">
          <div class="emoji">⚡</div>
          <div class="text">
            ${copy.substring(0, 50)}<br>
            <span class="highlight">${copy.substring(50, 80)}</span>
          </div>

          <div class="cta-box">
            <div class="cta-text">TAP PARA LINK</div>
          </div>
        </div>

        <div class="footer">
          <div class="footer-bold">ASESORÍA VISA GLOBAL</div>
          Visa USA • Europa • Schengen
        </div>
      </div>
    </body>
    </html>
  `;
}

function layoutIGStory2(copy, cta, angle) { return layoutIGStory1(copy, cta, angle); }
function layoutTikTok2(copy, cta, angle) { return layoutTikTok1(copy, cta, angle); }
function layoutFB1(copy, cta, angle) { return layoutIGFeed2(copy, cta, angle); }
function layoutFB2(copy, cta, angle) { return layoutIGFeed1(copy, cta, angle); }
