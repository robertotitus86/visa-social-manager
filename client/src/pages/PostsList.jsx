import React from 'react';
import PostCard from '../components/PostCard';

function PostsList({ posts, onPublishPost, onDeletePost, onGeneratePost, loading }) {
  const publishedPosts = posts.filter(p => p.published);
  const scheduledPosts = posts.filter(p => !p.published);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Todos los Posts</h1>
        <button
          onClick={onGeneratePost}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg disabled:opacity-50"
        >
          ✨ Nuevo Post
        </button>
      </div>

      {/* Scheduled Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          ⏰ Posts Programados ({scheduledPosts.length})
        </h2>
        {scheduledPosts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay posts programados</p>
        ) : (
          <div className="space-y-4">
            {scheduledPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPublish={() => onPublishPost(post.id)}
                onDelete={() => onDeletePost(post.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Published Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          ✅ Posts Publicados ({publishedPosts.length})
        </h2>
        {publishedPosts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay posts publicados</p>
        ) : (
          <div className="space-y-4">
            {publishedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPublish={() => onPublishPost(post.id)}
                onDelete={() => onDeletePost(post.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostsList;
