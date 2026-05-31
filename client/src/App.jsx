import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './pages/Dashboard'
import './App.css'

export default function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/posts')
      setPosts(response.data)
      setError(null)
    } catch (err) {
      setError('Error cargando posts: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">🌍 Asesoría de Visa Global</h1>
          <p className="text-blue-100 mt-2">Social Media Manager Automático</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            ⚠️ {error}
          </div>
        )}

        <Dashboard 
          posts={posts} 
          loading={loading}
          onPostsUpdate={fetchPosts}
        />
      </main>
    </div>
  )
}
