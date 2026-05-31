import React, { useState } from 'react'
import axios from 'axios'
import PostPreview from '../components/PostPreview'

export default function Dashboard({ posts, loading, onPostsUpdate }) {
  const [generating, setGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState('pending')
  const [selectedPost, setSelectedPost] = useState(null)

  const handleGeneratePreview = async () => {
    try {
      setGenerating(true)
      const response = await axios.post('/api/preview')
      alert('✅ Post generado exitosamente')
      onPostsUpdate()
    } catch (error) {
      alert('❌ Error: ' + error.message)
    } finally {
      setGenerating(false)
    }
  }

  const handlePublish = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/publish`)
      alert('✅ Post publicado en Instagram, Facebook y TikTok')
      onPostsUpdate()
    } catch (error) {
      alert('❌ Error publicando: ' + error.message)
    }
  }

  const handleDelete = async (postId) => {
    if (confirm('¿Eliminar este post?')) {
      try {
        await axios.delete(`/api/posts/${postId}`)
        alert('✅ Post eliminado')
        onPostsUpdate()
      } catch (error) {
        alert('❌ Error: ' + error.message)
      }
    }
  }

  const pendingPosts = posts.filter(p => !p.published)
  const publishedPosts = posts.filter(p => p.published)

  return (
    <div className="space-y-6">
      {/* Botón de Generar */}
      <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-100">
        <button
          onClick={handleGeneratePreview}
          disabled={generating}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-5 px-8 rounded-lg text-xl disabled:opacity-50 transition transform hover:scale-105"
        >
          {generating ? '⏳ Generando diseño profesional...' : '✨ Generar Nuevo Post'}
        </button>
        <p className="text-gray-600 mt-3 text-center font-semibold">Crea contenido profesional para todas tus redes sociales automáticamente</p>
      </div>

      {/* Pestañas */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-50">
        <div className="flex border-b-2 border-blue-100">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-4 px-6 font-bold text-lg transition ${
              activeTab === 'pending'
                ? 'bg-blue-50 border-b-4 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📅 Por Publicar ({pendingPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`flex-1 py-4 px-6 font-bold text-lg transition ${
              activeTab === 'published'
                ? 'bg-blue-50 border-b-4 border-green-600 text-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            ✅ Publicados ({publishedPosts.length})
          </button>
        </div>

        {/* Contenido */}
        <div className="p-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin text-blue-600 text-6xl mb-4">⚙️</div>
              <p className="text-gray-600 text-xl">Cargando posts...</p>
            </div>
          ) : activeTab === 'pending' && pendingPosts.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-b from-blue-50 to-white rounded-lg">
              <p className="text-2xl font-bold text-gray-700">📭 No hay posts pendientes</p>
              <p className="text-gray-500 mt-2 text-lg">Genera uno nuevo para empezar tu estrategia</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {(activeTab === 'pending' ? pendingPosts : publishedPosts).map(post => (
                <PostPreview
                  key={post.id}
                  post={post}
                  onPublish={handlePublish}
                  onDelete={handleDelete}
                  onPreview={() => setSelectedPost(post)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
          <div className="text-4xl font-bold text-blue-600">{posts.length}</div>
          <div className="text-gray-600 font-semibold">Posts Creados</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-600">
          <div className="text-4xl font-bold text-orange-600">{pendingPosts.length}</div>
          <div className="text-gray-600 font-semibold">Por Publicar</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
          <div className="text-4xl font-bold text-green-600">{publishedPosts.length}</div>
          <div className="text-gray-600 font-semibold">Publicados</div>
        </div>
      </div>

      {/* Modal de vista previa completa */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-96 overflow-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Vista Previa del Post</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-2xl hover:scale-110 transition"
              >
                ✕
              </button>
            </div>
            <PostPreview
              post={selectedPost}
              onPublish={handlePublish}
              onDelete={handleDelete}
              fullPreview={true}
            />
          </div>
        </div>
      )}
    </div>
  )
}
