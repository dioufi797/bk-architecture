import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FolderOpen, PlusSquare, LogOut, ExternalLink, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/projects', icon: FolderOpen, label: 'Projets' },
  { to: '/admin/projects/new', icon: PlusSquare, label: 'Nouveau projet' },
]

function SidebarContent({ onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Déconnecté')
    navigate('/admin/login')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-dark-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gold-500 flex items-center justify-center shrink-0">
            <span className="text-white font-display font-bold">BK</span>
          </div>
          <div>
            <div className="text-white font-semibold text-sm">BK-Architecture</div>
            <div className="text-dark-500 text-[10px] uppercase tracking-wider">Administration</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-dark-400 hover:text-white lg:hidden p-1">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-gold-500 text-white'
                  : 'text-dark-300 hover:bg-dark-700 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-dark-700 space-y-1">
        <Link
          to="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-dark-400 hover:text-white text-sm transition-colors"
        >
          <ExternalLink size={16} />
          Voir le site
        </Link>
        <div className="px-4 py-2">
          <div className="text-dark-500 text-xs truncate">{user?.email}</div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 text-dark-400 hover:text-red-400 text-sm transition-colors w-full"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </div>
  )
}

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-dark-800 border-b border-dark-700 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gold-500 flex items-center justify-center">
            <span className="text-white font-display font-bold text-xs">BK</span>
          </div>
          <span className="text-white font-semibold text-sm">Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-dark-300 hover:text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-dark-800 border-r border-dark-700 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-dark-900/80 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-dark-800 border-r border-dark-700 flex flex-col"
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
