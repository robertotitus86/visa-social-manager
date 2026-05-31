// Diseños Visuales Ricos - Estilo Agencias Profesionales

export function createRichDesign(copy, cta, format, angle) {
  const layouts = {
    instagram_feed: [richIGFeed1, richIGFeed2, richIGFeed3, richIGFeed4],
    instagram_story: [richStory1, richStory2],
    tiktok_video: [richTikTok1],
    facebook_feed: [richIGFeed1, richIGFeed2]
  };

  const designFunctions = layouts[format] || [richIGFeed1];
  const randomLayout = designFunctions[Math.floor(Math.random() * designFunctions.length)];

  return randomLayout(copy, cta, angle);
}

// LAYOUT 1: Info Card with Price y Benefits
function richIGFeed1(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1080px; height: 1080px; font-family: 'Poppins', sans-serif;
             background: linear-gradient(135deg, #001F4D 0%, #003d7a 100%); }
      .container { width: 100%; height: 100%; display: flex; flex-direction: column;
                   padding: 40px; gap: 20px; }

      .header { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);
                padding: 30px; border-radius: 20px; border: 2px solid #D4AF37;
                text-align: center; }

      .header-emoji { font-size: 80px; margin-bottom: 15px; }

      .header-title { color: white; font-size: 32px; font-weight: 900;
                      margin-bottom: 10px; }

      .header-subtitle { color: #D4AF37; font-size: 18px; font-weight: 700;
                         letter-spacing: 1px; }

      .main-content { flex: 1; background: white; border-radius: 20px;
                      padding: 30px; display: flex; flex-direction: column;
                      justify-content: space-between; }

      .price-section { text-align: center; margin-bottom: 20px; }

      .price { font-size: 48px; color: #D4AF37; font-weight: 900; }

      .price-label { color: #666; font-size: 14px; margin-top: 5px; }

      .benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

      .benefit { background: #f0f0f0; padding: 15px; border-radius: 10px;
                 text-align: center; border-left: 4px solid #D4AF37; }

      .benefit-icon { font-size: 32px; margin-bottom: 8px; }

      .benefit-text { font-size: 12px; color: #333; font-weight: 600; }

      .cta-button { background: linear-gradient(135deg, #D4AF37, #c99a2e);
                    color: #001F4D; border: none; padding: 20px;
                    border-radius: 15px; font-weight: 900; font-size: 16px;
                    cursor: pointer; text-transform: uppercase;
                    box-shadow: 0 8px 20px rgba(212,175,55,0.4); }

      .footer { background: rgba(255,255,255,0.95); padding: 20px;
                border-radius: 15px; text-align: center; }

      .footer-brand { color: #001F4D; font-weight: 900; font-size: 14px; }

      .footer-contact { color: #D4AF37; font-size: 12px; margin-top: 5px; }
    </style></head>
    <body>
      <div class="container">
        <div class="header">
          <div class="header-emoji">🎯</div>
          <div class="header-title">VISA GARANTIZADA</div>
          <div class="header-subtitle">95% Aprobación</div>
        </div>

        <div class="main-content">
          <div>
            <div class="price-section">
              <div class="price">\$120</div>
              <div class="price-label">Paquete USA Completo</div>
            </div>

            <div class="benefits">
              <div class="benefit">
                <div class="benefit-icon">📋</div>
                <div class="benefit-text">Documentos Completos</div>
              </div>
              <div class="benefit">
                <div class="benefit-icon">🎤</div>
                <div class="benefit-text">Coaching Entrevista</div>
              </div>
              <div class="benefit">
                <div class="benefit-icon">📱</div>
                <div class="benefit-text">Soporte 24/7</div>
              </div>
              <div class="benefit">
                <div class="benefit-icon">⚡</div>
                <div class="benefit-text">3 Meses Aprox</div>
              </div>
            </div>
          </div>

          <button class="cta-button">${cta}</button>
        </div>

        <div class="footer">
          <div class="footer-brand">ASESORÍA VISA GLOBAL</div>
          <div class="footer-contact">📍 Quito | 📞 +593 098119179</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// LAYOUT 2: Comparison Style
function richIGFeed2(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1080px; height: 1080px; font-family: 'Poppins', sans-serif;
             background: linear-gradient(180deg, #f5f7fa 0%, white 100%); }
      .container { width: 100%; height: 100%; display: flex; flex-direction: column;
                   padding: 40px; gap: 20px; }

      .headline { text-align: center; }

      .headline-emoji { font-size: 80px; }

      .headline-text { color: #001F4D; font-size: 36px; font-weight: 900;
                       margin-top: 10px; line-height: 1.2; }

      .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; flex: 1; }

      .card { background: white; border-radius: 15px; padding: 20px;
              box-shadow: 0 5px 15px rgba(0,0,0,0.1);
              border-top: 4px solid #D4AF37;
              display: flex; flex-direction: column; justify-content: space-between; }

      .card.highlight { border: 3px solid #D4AF37;
                        background: linear-gradient(135deg, rgba(212,175,55,0.05), white);
                        transform: scale(1.05); }

      .card-title { color: #001F4D; font-weight: 900; font-size: 18px;
                    margin-bottom: 15px; }

      .card-items { font-size: 12px; color: #666; line-height: 1.8; }

      .card-item { margin-bottom: 8px; }

      .card-price { color: #D4AF37; font-weight: 900; font-size: 28px;
                    margin-top: 15px; border-top: 1px solid #eee;
                    padding-top: 10px; }

      .footer-section { background: #001F4D; color: white; padding: 20px;
                        border-radius: 15px; text-align: center; }

      .footer-title { font-weight: 900; margin-bottom: 10px; }

      .footer-cta { background: #D4AF37; color: #001F4D; padding: 15px;
                    border-radius: 10px; font-weight: 900; cursor: pointer;
                    margin-top: 10px; }
    </style></head>
    <body>
      <div class="container">
        <div class="headline">
          <div class="headline-emoji">🏆</div>
          <div class="headline-text">ELIGE TU PLAN</div>
        </div>

        <div class="cards">
          <div class="card">
            <div class="card-title">CONSULTA</div>
            <div class="card-items">
              <div class="card-item">✅ 30 min asesoramiento</div>
              <div class="card-item">✅ Evaluación documentos</div>
              <div class="card-item">✅ Plan personalizado</div>
            </div>
            <div class="card-price">GRATIS</div>
          </div>

          <div class="card highlight">
            <div class="card-title">PAQUETE USA</div>
            <div class="card-items">
              <div class="card-item">✅ Todo incluido</div>
              <div class="card-item">✅ Coaching garantizado</div>
              <div class="card-item">✅ 95% aprobación</div>
            </div>
            <div class="card-price">\$120</div>
          </div>
        </div>

        <div class="footer-section">
          <div class="footer-title">¿LISTO PARA TU VISA?</div>
          <div class="footer-cta">${cta}</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// LAYOUT 3: Testimonial + Stats
function richIGFeed3(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1080px; height: 1080px; font-family: 'Poppins', sans-serif;
             background: linear-gradient(135deg, #001F4D 0%, #004a99 100%); }
      .container { width: 100%; height: 100%; display: flex; flex-direction: column;
                   justify-content: space-between; padding: 50px 40px; color: white; }

      .stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;
               margin-bottom: 30px; }

      .stat { background: rgba(212,175,55,0.2); padding: 20px; border-radius: 15px;
              border: 2px solid #D4AF37; text-align: center; }

      .stat-number { font-size: 40px; font-weight: 900; color: #D4AF37; }

      .stat-label { font-size: 12px; margin-top: 8px; color: rgba(255,255,255,0.9); }

      .testimonial { background: white; color: #001F4D; padding: 30px;
                     border-radius: 20px; margin: 20px 0; }

      .testimonial-text { font-size: 18px; font-weight: 600; margin-bottom: 15px;
                          line-height: 1.6; }

      .testimonial-author { font-size: 14px; color: #D4AF37; font-weight: 900; }

      .cta { background: #D4AF37; color: #001F4D; padding: 18px;
             border-radius: 50px; font-weight: 900; border: none;
             cursor: pointer; text-transform: uppercase; font-size: 16px;
             width: 100%; }

      .footer { text-align: center; font-size: 14px;
                border-top: 2px solid #D4AF37; padding-top: 15px; }
    </style></head>
    <body>
      <div class="container">
        <div class="stats">
          <div class="stat">
            <div class="stat-number">95%</div>
            <div class="stat-label">Aprobación</div>
          </div>
          <div class="stat">
            <div class="stat-number">1,247</div>
            <div class="stat-label">Clientes</div>
          </div>
          <div class="stat">
            <div class="stat-number">20+</div>
            <div class="stat-label">Años</div>
          </div>
        </div>

        <div class="testimonial">
          <div class="testimonial-text">"Me cambió la vida, ahora vivo en USA. El equipo fue increíble en cada paso."</div>
          <div class="testimonial-author">⭐⭐⭐⭐⭐ Juan, Quito</div>
        </div>

        <button class="cta">${cta}</button>

        <div class="footer">
          Visa Global • 📞 +593 098119179 • Quito, Ecuador
        </div>
      </div>
    </body>
    </html>
  `;
}

// LAYOUT 4: Services Grid
function richIGFeed4(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1080px; height: 1080px; font-family: 'Poppins', sans-serif;
             background: linear-gradient(135deg, white 0%, #f8f9fa 100%); }
      .container { width: 100%; height: 100%; display: flex; flex-direction: column;
                   padding: 40px; gap: 20px; }

      .header { text-align: center; margin-bottom: 10px; }

      .header-emoji { font-size: 80px; margin-bottom: 10px; }

      .header-text { color: #001F4D; font-size: 36px; font-weight: 900; }

      .services { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; flex: 1; }

      .service { background: linear-gradient(135deg, #001F4D, #003d7a);
                 color: white; padding: 25px; border-radius: 15px;
                 border: 2px solid #D4AF37;
                 display: flex; flex-direction: column; justify-content: space-between; }

      .service-icon { font-size: 50px; margin-bottom: 10px; }

      .service-name { font-weight: 900; font-size: 16px; margin-bottom: 8px; }

      .service-desc { font-size: 12px; line-height: 1.5;
                      color: rgba(255,255,255,0.9); }

      .service-price { color: #D4AF37; font-weight: 900; font-size: 20px;
                       margin-top: 10px; border-top: 1px solid #D4AF37;
                       padding-top: 8px; }

      .footer { background: #001F4D; color: white; padding: 20px;
                border-radius: 15px; text-align: center; }

      .footer-cta { background: #D4AF37; color: #001F4D; padding: 15px;
                    border-radius: 10px; font-weight: 900; cursor: pointer;
                    margin-top: 10px; text-transform: uppercase; }
    </style></head>
    <body>
      <div class="container">
        <div class="header">
          <div class="header-emoji">🚀</div>
          <div class="header-text">NUESTROS SERVICIOS</div>
        </div>

        <div class="services">
          <div class="service">
            <div>
              <div class="service-icon">🇺🇸</div>
              <div class="service-name">VISA USA</div>
              <div class="service-desc">Documentos, entrevista, seguimiento</div>
            </div>
            <div class="service-price">\$120</div>
          </div>

          <div class="service">
            <div>
              <div class="service-icon">🇪🇺</div>
              <div class="service-name">VISA SCHENGEN</div>
              <div class="service-desc">Europa lista, 100% aprobada</div>
            </div>
            <div class="service-price">\$100</div>
          </div>

          <div class="service">
            <div>
              <div class="service-icon">🎤</div>
              <div class="service-name">COACHING</div>
              <div class="service-desc">3 sesiones de práctica</div>
            </div>
            <div class="service-price">\$35</div>
          </div>

          <div class="service">
            <div>
              <div class="service-icon">💬</div>
              <div class="service-name">CONSULTA</div>
              <div class="service-desc">Evaluación personalizada</div>
            </div>
            <div class="service-price">GRATIS</div>
          </div>
        </div>

        <div class="footer">
          <div style="font-weight: 900; margin-bottom: 10px;">¿CUÁL ES TU SIGUIENTE PASO?</div>
          <div class="footer-cta">${cta}</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function richStory1(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; }
      body { width: 1080px; height: 1920px; font-family: 'Poppins', sans-serif;
             background: linear-gradient(180deg, #001F4D, #003d7a, #001F4D); color: white; }
      .container { width: 100%; height: 100%; display: flex; flex-direction: column;
                   justify-content: space-around; align-items: center; padding: 100px 50px;
                   text-align: center; }
      .emoji { font-size: 200px; margin-bottom: 40px; animation: bounce 2s infinite; }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-40px); } }
      .text { font-size: 56px; font-weight: 900; line-height: 1.2; margin-bottom: 50px; }
      .highlight { color: #D4AF37; }
      .cta-box { background: rgba(212,175,55,0.2); border: 3px solid #D4AF37;
                 padding: 40px; border-radius: 30px; }
      .cta-text { font-size: 36px; font-weight: 900; color: #D4AF37; }
    </style></head>
    <body>
      <div class="container">
        <div class="emoji">⚡</div>
        <div class="text">
          ${copy.substring(0, 50)}<br>
          <span class="highlight">${copy.substring(50, 80)}</span>
        </div>
        <div class="cta-box">
          <div class="cta-text">TAP PARA ${cta}</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function richStory2(copy, cta, angle) { return richStory1(copy, cta, angle); }

function richTikTok1(copy, cta, angle) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; }
      body { width: 1080px; height: 1920px; font-family: 'Poppins', sans-serif;
             background: linear-gradient(180deg, #001F4D 0%, #003d7a 50%, #001F4D 100%);
             color: white; }
      .container { width: 100%; height: 100%; display: flex; flex-direction: column;
                   justify-content: space-between; padding: 80px 50px; }
      .emoji { font-size: 150px; text-align: center; margin-bottom: 30px; }
      .text { font-size: 52px; font-weight: 900; line-height: 1.2; text-align: center;
              margin-bottom: 40px; }
      .highlight { color: #D4AF37; display: block; margin-top: 15px; }
      .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 40px 0; }
      .stat-item { background: rgba(212,175,55,0.2); padding: 20px; border-radius: 15px;
                   border: 2px solid #D4AF37; text-align: center; }
      .stat-big { font-size: 44px; font-weight: 900; color: #D4AF37; }
      .stat-small { font-size: 14px; margin-top: 10px; }
      .footer { text-align: center; border-top: 2px solid #D4AF37; padding-top: 20px; }
      .footer-text { font-weight: 900; color: #D4AF37; }
    </style></head>
    <body>
      <div class="container">
        <div>
          <div class="emoji">🔥</div>
          <div class="text">
            ${copy.substring(0, 40)}
            <span class="highlight">${copy.substring(40, 80)}</span>
          </div>

          <div class="stats">
            <div class="stat-item">
              <div class="stat-big">95%</div>
              <div class="stat-small">Aprobación</div>
            </div>
            <div class="stat-item">
              <div class="stat-big">3</div>
              <div class="stat-small">Meses</div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="footer-text">👇 TAP PARA ${cta}</div>
        </div>
      </div>
    </body>
    </html>
  `;
}
