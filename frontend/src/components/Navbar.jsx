'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/about', label: 'À Propos' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projets' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  const isActive = (to) => {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gold-500 flex items-center justify-center transition-transform group-hover:rotate-12 duration-300">
              <span className="text-white font-display font-bold text-lg">BK</span>
            </div>
            <div className="leading-tight">
              <div className={`font-display font-bold text-lg tracking-wide transition-colors ${
                scrolled || !isHome ? 'text-dark-900 dark:text-white' : 'text-white'
              }`}>
                BK<span className="text-gold-500">-</span>Architecture
              </div>
              <div className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${
                scrolled || !isHome ? 'text-dark-400 dark:text-dark-400' : 'text-white/70'
              }`}>
                Excellence & Prestige
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(({ to, label }) => {
              const active = isActive(to)
              return (
                <Link
                  key={to}
                  href={to}
                  className={`relative text-sm tracking-widest uppercase font-medium transition-colors duration-300 py-1 group ${
                    active
                      ? 'text-gold-500'
                      : scrolled || !isHome
                        ? 'text-dark-700 dark:text-dark-200 hover:text-gold-500'
                        : 'text-white/90 hover:text-gold-400'
                  }`}
                >
                  {label}
                  <span className={`absolute bottom-0 left-0 h-px bg-gold-500 transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-none transition-colors ${
                scrolled || !isHome
                  ? 'text-dark-600 dark:text-dark-300 hover:text-gold-500'
                  : 'text-white/80 hover:text-gold-400'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-5 py-2.5 bg-gold-500 text-white text-xs uppercase tracking-widest font-medium hover:bg-gold-600 transition-colors"
            >
              Nous Contacter
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 transition-colors ${
                scrolled || !isHome ? 'text-dark-900 dark:text-white' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-dark-900 border-t border-dark-100 dark:border-dark-700 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map(({ to, label }) => {
                const active = isActive(to)
                return (
                  <Link
                    key={to}
                    href={to}
                    className={`block text-sm tracking-widest uppercase font-medium py-2 border-b border-dark-100 dark:border-dark-700 transition-colors ${
                      active ? 'text-gold-500' : 'text-dark-700 dark:text-dark-200'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                className="block text-center px-5 py-3 bg-gold-500 text-white text-xs uppercase tracking-widest font-medium mt-4"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
