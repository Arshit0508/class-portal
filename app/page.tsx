import { supabase } from '@/lib/supabase'
import PostCard from '@/components/PostCard'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8">Error loading posts: {error.message}</div>
  }

  return (
    <div className="max-w-3xl space-y-4">
      {posts?.length === 0 && (
        <p style={{ color: 'var(--slate)' }}>No posts yet. Check back soon.</p>
      )}
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}