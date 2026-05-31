import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'posts.json');

// Asegurar que existe el directorio
function ensureDbDirectory() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadDatabase() {
  ensureDbDirectory();
  if (fs.existsSync(DB_FILE)) {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  }
  return [];
}

function saveDatabase(posts) {
  ensureDbDirectory();
  fs.writeFileSync(DB_FILE, JSON.stringify(posts, null, 2));
}

export async function getScheduledPosts() {
  try {
    const posts = loadDatabase();
    return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error leyendo base de datos:', error);
    return [];
  }
}

export async function addPost(content, scheduledTime) {
  try {
    const posts = loadDatabase();
    const newPost = {
      id: `post_${Date.now()}`,
      content,
      scheduledTime: scheduledTime || new Date(),
      createdAt: new Date(),
      published: false,
      publishedAt: null,
      stats: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    };
    posts.push(newPost);
    saveDatabase(posts);
    return newPost;
  } catch (error) {
    console.error('Error agregando post:', error);
    throw error;
  }
}

export async function updatePost(id, content, scheduledTime) {
  try {
    let posts = loadDatabase();
    posts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            content,
            scheduledTime: scheduledTime || post.scheduledTime,
            updatedAt: new Date()
          }
        : post
    );
    saveDatabase(posts);
    return posts.find((p) => p.id === id);
  } catch (error) {
    console.error('Error actualizando post:', error);
    throw error;
  }
}

export async function deletePost(id) {
  try {
    let posts = loadDatabase();
    posts = posts.filter((post) => post.id !== id);
    saveDatabase(posts);
  } catch (error) {
    console.error('Error eliminando post:', error);
    throw error;
  }
}

export async function getPostById(id) {
  try {
    const posts = loadDatabase();
    return posts.find((post) => post.id === id);
  } catch (error) {
    console.error('Error obteniendo post:', error);
    return null;
  }
}

export async function markAsPublished(id) {
  try {
    let posts = loadDatabase();
    posts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            published: true,
            publishedAt: new Date()
          }
        : post
    );
    saveDatabase(posts);
  } catch (error) {
    console.error('Error marcando como publicado:', error);
    throw error;
  }
}

export async function updatePostStats(id, stats) {
  try {
    let posts = loadDatabase();
    posts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            stats: { ...post.stats, ...stats }
          }
        : post
    );
    saveDatabase(posts);
  } catch (error) {
    console.error('Error actualizando estadísticas:', error);
    throw error;
  }
}
