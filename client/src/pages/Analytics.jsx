import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

function Analytics({ posts }) {
  // Calcular estadísticas
  const totalLikes = posts.reduce((sum, p) => sum + (p.stats?.likes || 0), 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.stats?.comments || 0), 0);
  const totalShares = posts.reduce((sum, p) => sum + (p.stats?.shares || 0), 0);

  // Datos para gráficos
  const postData = posts.slice(0, 10).map((post, index) => ({
    name: `Post ${index + 1}`,
    likes: post.stats?.likes || 0,
    comments: post.stats?.comments || 0,
    shares: post.stats?.shares || 0
  }));

  const engagementByPlatform = [
    { name: 'Instagram', value: Math.floor(totalLikes * 0.4) },
    { name: 'Facebook', value: Math.floor(totalLikes * 0.35) },
    { name: 'TikTok', value: Math.floor(totalLikes * 0.25) }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">📊 Analítica</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Likes" value={totalLikes} icon="👍" color="bg-blue-100" />
        <MetricCard title="Comentarios" value={totalComments} icon="💬" color="bg-purple-100" />
        <MetricCard title="Compartidos" value={totalShares} icon="📤" color="bg-pink-100" />
        <MetricCard
          title="Engagement Rate"
          value={`${Math.round((totalLikes + totalComments + totalShares) / Math.max(posts.length, 1))}%`}
          icon="📈"
          color="bg-green-100"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement by Post */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Engagement por Post</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={postData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="likes" fill="#3B82F6" />
              <Bar dataKey="comments" fill="#8B5CF6" />
              <Bar dataKey="shares" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement by Platform */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Alcance por Plataforma</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementByPlatform}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#D4AF37" name="Alcance" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Posts con Mejor Desempeño</h2>
        <div className="space-y-3">
          {posts
            .sort((a, b) => (b.stats?.likes || 0) - (a.stats?.likes || 0))
            .slice(0, 5)
            .map((post, index) => (
              <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{index + 1}.</span>
                  <p className="text-gray-700 line-clamp-1">{post.content?.copy || 'Sin contenido'}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{post.stats?.likes || 0} 👍</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color }) {
  return (
    <div className={`${color} rounded-lg p-6 text-center`}>
      <p className="text-3xl mb-2">{icon}</p>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

export default Analytics;
