'use client'

import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
  },
  {
    id: 'search',
    label: 'Search',
    path: '/university/search',
  },
  {
    id: 'favourites',
    label: 'Favourites',
    path: '/university/favourites',
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const isActive = (path: Url) => pathname === path

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start" />
      <div className="navbar-center">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`btn btn-ghost sm:text-lg rounded-none ${
              isActive(item.path) ? 'border-b-solid border-b-2 border-b-black' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="navbar-end" />
    </nav>
  )
}
