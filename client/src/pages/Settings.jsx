import React, { useState } from 'react';
import toast from 'react-hot-toast';

function Settings() {
  const [settings, setSettings] = useState({
    instagramToken: localStorage.getItem('instagramToken') || '',
    facebookToken: localStorage.getItem('facebookToken') || '',
    tiktokToken: localStorage.getItem('tiktokToken') || '',
    postTime1: localStorage.getItem('postTime1') || '08:00',
    postTime2: localStorage.getItem('postTime2') || '17:00',
    autoPublish: localStorage.getItem('autoPublish') === 'true'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    Object.entries(settings).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    toast.success('⚙️ Configuración guardada');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">⚙️ Configuración</h1>

      {/* Social Media Tokens */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Credenciales de Redes Sociales</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔐 Token de Instagram
            </label>
            <input
              type="password"
              name="instagramToken"
              value={settings.instagramToken}
              onChange={handleChange}
              placeholder="Ingresa tu token de acceso de Instagram"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              📖 Obtén tu token en <a href="#" className="text-blue-500 hover:underline">Meta Developer Console</a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔐 Token de Facebook
            </label>
            <input
              type="password"
              name="facebookToken"
              value={settings.facebookToken}
              onChange={handleChange}
              placeholder="Ingresa tu token de acceso de Facebook"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔐 Token de TikTok
            </label>
            <input
              type="password"
              name="tiktokToken"
              value={settings.tiktokToken}
              onChange={handleChange}
              placeholder="Ingresa tu token de acceso de TikTok"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Publishing Schedule */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">⏰ Horarios de Publicación</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Matutino
            </label>
            <input
              type="time"
              name="postTime1"
              value={settings.postTime1}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Vespertino
            </label>
            <input
              type="time"
              name="postTime2"
              value={settings.postTime2}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="autoPublish"
              checked={settings.autoPublish}
              onChange={handleChange}
              className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">
              ✅ Publicación automática habilitada
            </span>
          </label>
        </div>
      </div>

      {/* Brand Colors */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">🎨 Colores de Marca</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-900 rounded-lg border-2 border-gray-300"></div>
            <div>
              <p className="font-medium text-gray-800">Azul Marino</p>
              <p className="text-sm text-gray-600">#001F4D</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg border-2 border-gray-300" style={{ backgroundColor: '#D4AF37' }}></div>
            <div>
              <p className="font-medium text-gray-800">Dorado</p>
              <p className="text-sm text-gray-600">#D4AF37</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-blue-900 to-yellow-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition"
      >
        💾 Guardar Configuración
      </button>

      {/* API Documentation */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-bold text-blue-900 mb-2">📚 Documentación</h3>
        <p className="text-sm text-blue-800 mb-3">
          Para conectar tus redes sociales, necesitas obtener tokens de acceso:
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>📷 <strong>Instagram:</strong> Meta Developer Console</li>
          <li>👍 <strong>Facebook:</strong> Facebook Graph API</li>
          <li>🎵 <strong>TikTok:</strong> TikTok Business API</li>
        </ul>
      </div>
    </div>
  );
}

export default Settings;
