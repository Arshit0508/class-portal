'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Megaphone, BookOpen, Newspaper, Clock } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/publications', label: 'Publications', icon: FileText },
  { href: '/notices', label: 'Notices', icon: Megaphone },
  { href: '/notes', label: 'Notes', icon: BookOpen },
  { href: '/news', label: 'Important News', icon: Newspaper },
  { href: '/deadlines', label: 'Deadlines', icon: Clock },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-64 shrink-0 p-6 border-r"
      style={{ borderColor: 'var(--line)' }}
    >
      <h2 className="font-display text-lg font-bold mb-1" style={{ color: 'var(--ink)' }}>
        CSC 2028
      </h2>
      <p className="text-xs mb-8" style={{ color: 'var(--slate)' }}>
        Class Portal
      </p>

      <nav className="space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors"
              style={{
                background: active ? 'var(--ink)' : 'transparent',
                color: active ? 'var(--paper)' : 'var(--slate)',
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
        <ThemeToggle />
      </div>
    </aside>
  )
}