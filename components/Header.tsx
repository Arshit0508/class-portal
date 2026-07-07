'use client'

import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import ContactAdmin from './ContactAdmin'

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/':              { title: 'Dashboard', subtitle: 'Everything at a glance' },
  '/publications':  { title: 'Publications', subtitle: 'Papers, reports, and official documents' },
  '/notices':       { title: 'Notices', subtitle: 'Official announcements from the class rep' },
  '/notes':         { title: 'Notes', subtitle: 'Shared study material' },
  '/news':          { title: 'Important News', subtitle: 'Things you need to know' },
  '/deadlines':     { title: 'Deadlines', subtitle: 'What\'s due, and when' },
}

export default function Header() {
  const pathname = usePathname()
  const page = pageTitles[pathname] ?? { title: 'Class Portal', subtitle: '' }

  return (
    <header
      className="flex items-center justify-between px-8 py-5 border-b"
      style={{ borderColor: 'var(--line)' }}
    >
      <div>
        <h1 className="font-display text-xl font-bold" style={{ color: 'var(--ink)' }}>
          {page.title}
        </h1>
        {page.subtitle && (
          <p className="text-sm" style={{ color: 'var(--slate)' }}>
            {page.subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-md border w-64"
          style={{ borderColor: 'var(--line)' }}
        >
          <Search size={16} style={{ color: 'var(--slate)' }} />
          <input
            type="text"
            placeholder="Search posts..."
            className="bg-transparent outline-none text-sm w-full"
            style={{ color: 'var(--ink)' }}
          />
        </div>

        <ContactAdmin />
      </div>
    </header>
  )
}