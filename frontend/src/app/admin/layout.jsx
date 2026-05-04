'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

export default function AdminLayout({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== '/admin/login') {
      router.replace('/admin/login')
    }
  }, [loading, isAuthenticated, pathname, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <div className="min-h-screen bg-dark-900">{children}</div>
}
