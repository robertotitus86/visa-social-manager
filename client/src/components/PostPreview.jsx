import React, { useState } from 'react'

export default function PostPreview({ post, onPublish, onDelete, fullPreview = false }) {
  const [selectedFormat, setSelectedFormat] = useState(
    post.content?.designs ? Object.keys(post.content.designs)[0] : 'instagram_feed'
  )
  
  const contentType = post.content?.contentType || 'general'
  const copy = post.content?.copy || 'Sin contenido'
  const designs = post.content?.designs || {}
  const selectedDesign = designs[selectedFormat]

  const formatEmojis = {
    instagram_feed: '📸',
    instagram_story: '📖',
    instagram_reel: '🎬',
    tiktok_video: '🎵',
    facebook_feed: 'f',
    linkedin_post: '💼'
  }

  const networkNames = {
    instagram_feed: 'Instagram Feed',
    instagram_story: 'Instagram Story',
    instagram_reel: 'Instagram Reels',
    tiktok_video: 'TikTok',
    facebook_feed: 'Facebook',
    linkedin_post: 'LinkedIn'
  }

  if (fullPreview) {
    return (
      <div className="p-8">
        {selectedDesign && (
          <div className="space-y-6">
            {/* Selector de formatos grande */}
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-4">Selecciona la red social:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(designs).map(([format, design]) => (
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    className={`p-4 rounded-lg font-bold transition ${
                      selectedFormat === format
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-2">{formatEmojis[format]}</div>
                    <div className="text-xs">{networkNames[format]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview grande */}
            <div className="bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200">
              <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white p-4">
                <p className="font-bold text-lg">{networkNames[selectedFormat]}</p>
                <p className="text-sm opacity-90">{selectedDesign.dimensions.width}x{selectedDesign.dimensions.height}px</p>
              </div>
              <div className="p-6 flex justify-center bg-white overflow-auto max-h-screen">
                <iframe
                  srcDoc={selectedDesign.html}
                  style={{
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    width: Math.min(selectedDesign.dimensions.width, 600),
                    height: Math.min(selectedDesign.dimensions.height, 800)
                  }}
                  title={`Preview ${selectedFormat}`}
                />
              </div>
            </div>

            {/* Información */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-bold text-blue-900 mb-3">📤 Redes donde se publicará:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(designs).map(format => (
                  <div key={format} className="bg-white p-3 rounded border border-blue-200">
                    <div className="text-2xl mb-1">{formatEmojis[format]}</div>
                    <div className="text-xs font-semibold text-gray-700">{networkNames[format]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{copy.substring(0, 50)}...</h3>
            <p className="text-blue-100 mt-2 flex items-center gap-2">
              <span>📅</span>
              {new Date(post.createdAt).toLocaleDateString('es-ES')}
            </p>
          </div>
          <div className="text-5xl">
            {contentType === 'promocion_usa' ? '🇺🇸' : 
             contentType === 'promocion_schengen' ? '🇪🇺' :
             '✈️'}
          </div>
        </div>
      </div>

      {/* Preview miniatura */}
      {selectedDesign && (
        <div className="p-6 bg-gray-50">
          <p className="text-sm font-semibold text-gray-700 mb-3">Vista previa:</p>
          <div className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden" style={{ height: '250px' }}>
            <iframe
              srcDoc={selectedDesign.html}
              style={{
                border: 'none',
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              title="Preview"
            />
          </div>
          
          {/* Información de redes */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs font-bold text-blue-900 mb-2">📤 Se publicará en:</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(designs).map(fmt => (
                <span key={fmt} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
                  {formatEmojis[fmt]} {networkNames[fmt].split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="p-6 bg-white border-t border-gray-200 flex gap-3">
        <button
          onClick={() => onPublish(post.id)}
          disabled={post.published}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-bold transition transform hover:scale-105"
        >
          {post.published ? '✅ Publicado' : '📤 Publicar en Redes'}
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-bold transition"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
