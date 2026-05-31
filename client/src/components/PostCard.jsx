import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

function PostCard({ post, onPublish, onDelete }) {
  const platforms = {
    instagram: { icon: '📷', label: 'Instagram' },
    facebook: { icon: '👍', label: 'Facebook' },
    tiktok: { icon: '🎵', label: 'TikTok' }
  };

  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <p className="text-gray-700 line-clamp-2">{post.content?.copy || 'Sin contenido'}</p>
          <div className="text-xs text-gray-500 mt-2">
            {formatDistanceToNow(new Date(post.createdAt), { locale: es, addSuffix: true })}
          </div>
        </div>
        <div className="flex gap-2">
          {post.published ? (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
              ✅ Publicado
            </span>
          ) : (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
              ⏰ Programado
            </span>
          )}
        </div>
      </div>

      {/* Platforms */}
      <div className="flex gap-2 mb-3">
        {Object.entries(platforms).map(([key, { icon, label }]) => (
          <span key={key} title={label} className="text-xl">
            {icon}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs">
        <div className="bg-blue-50 p-2 rounded">
          <p className="text-blue-600 font-bold">{post.stats?.likes || 0}</p>
          <p className="text-gray-600">Likes</p>
        </div>
        <div className="bg-purple-50 p-2 rounded">
          <p className="text-purple-600 font-bold">{post.stats?.comments || 0}</p>
          <p className="text-gray-600">Comentarios</p>
        </div>
        <div className="bg-pink-50 p-2 rounded">
          <p className="text-pink-600 font-bold">{post.stats?.shares || 0}</p>
          <p className="text-gray-600">Compartidos</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {!post.published && (
          <button
            onClick={onPublish}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
          >
            📤 Publicar
          </button>
        )}
        <button
          onClick={onDelete}
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

export default PostCard;
