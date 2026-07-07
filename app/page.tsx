import { supabase } from '@/lib/supabase'
export const dynamic = 'force-dynamic'
type Post = {
  id: number
  title: string
  body: string
  category: string
  file_url: string | null
  created_at: string
}

export default async function HomePage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8">Error loading posts: {error.message}</div>
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">CSC 2028 — Class Portal</h1>

      <div className="space-y-4">
        {posts?.length === 0 && (
          <p className="text-gray-500">No posts yet. Check back soon.</p>
        )}

        {posts?.map((post: Post) => (
          <div key={post.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <span className="text-xs uppercase bg-red-100 px-2 py-1 rounded">
                {post.category}
              </span>
            </div>

            <p className="text-gray-700 whitespace-pre-wrap">{post.body}</p>

            {post.file_url && (
              <a
                href={post.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm mt-2 inline-block"
              >
                View attachment
              </a>
            )}

            <p className="text-xs text-gray-400 mt-2">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}