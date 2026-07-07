'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Post = {
  id: number
  title: string
  body: string
  category: string
  file_url: string | null
}

export default function AdminPage() {
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('news')
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/admin/login')
        return
      }
      setChecked(true)
      loadPosts()
    }
    checkAuth()
  }, [router])

  async function loadPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data || [])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    let file_url: string | null = null

    if (file) {
      const filePath = `${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('attachments')
        .upload(filePath, file)

      if (uploadError) {
        alert('File upload failed: ' + uploadError.message)
        setSaving(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('attachments')
        .getPublicUrl(filePath)
      file_url = urlData.publicUrl
    }

    const { error } = await supabase
      .from('posts')
      .insert({ title, body, category, file_url })

    setSaving(false)

    if (error) {
      alert('Error saving post: ' + error.message)
      return
    }

    setTitle('')
    setBody('')
    setCategory('news')
    setFile(null)
    loadPosts()
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this post?')) return
    await supabase.from('posts').delete().eq('id', id)
    loadPosts()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (!checked) return <div className="p-8">Loading...</div>

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button onClick={handleLogout} className="text-sm text-red-600 underline">
          Log out
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 border rounded-lg p-4 mb-8">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          placeholder="Content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border rounded p-2"
          rows={4}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="news">News</option>
          <option value="notes">Notes</option>
          <option value="publication">Publication</option>
        </select>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
        />
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white rounded p-2 px-4"
        >
          {saving ? 'Posting...' : 'Post'}
        </button>
      </form>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="border rounded p-3 flex justify-between items-start">
            <div>
              <p className="font-semibold">{post.title}</p>
              <p className="text-sm text-gray-500">{post.category}</p>
            </div>
            <button
              onClick={() => handleDelete(post.id)}
              className="text-red-600 text-sm underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}