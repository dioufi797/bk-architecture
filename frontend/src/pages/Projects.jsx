import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import api from '../utils/api'

const categories = [
  { value: 'all', label: 'Tous' },
  { value: 'residential', label: 'Résidentiel' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'interior', label: 'Intérieur' },
  { value: 'industrial', label: 'Industriel' },
  { value: 'urban', label: 'Urbain' },
  { value: 'renovation', label: 'Rénovation' },
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState(null)
  const LIMIT = 9

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: LIMIT, page, sort: '-createdAt' })
      if (category !== 'all') params.set('category', category)
      const res = await api.get(`/projects?${params}`)
      setProjects(res.data.data)
      setPagination(res.data.pagination)
    } catch {
      setProjects([])
    } finally {
      setLoading(false)
    }
  }, [category, page])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const handleCategory = (val) => {
    setCategory(val)
    setPage(1)
  }

  return (
    <div className="pt-20 dark:bg-dark-900 min-h-screen">
      {/* Hero */}
      <section className="relative h-64 sm:h-72 md:h-80 flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920" alt="Projects" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-subtitle text-gold-400 mb-3">Portfolio</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">Nos Réalisations</h1>
            <p className="text-white/60 mt-2 sm:mt-3 max-w-lg text-sm sm:text-base">
              Découvrez l'ensemble de nos projets architecturaux.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters — sticky below navbar */}
      <section className="sticky top-20 z-30 bg-white dark:bg-dark-900 border-b border-dark-100 dark:border-dark-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 sm:py-4 no-scrollbar">
            {categories.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleCategory(value)}
                className={`shrink-0 px-4 sm:px-5 py-2 text-[10px] sm:text-xs uppercase tracking-widest font-medium transition-all duration-200 min-h-[36px] ${
                  category === value
                    ? 'bg-gold-500 text-white'
                    : 'text-dark-500 dark:text-dark-300 hover:text-gold-500 border border-dark-200 dark:border-dark-600 hover:border-gold-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-dark-100 dark:bg-dark-800 animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 sm:py-24">
              <Search size={40} className="text-dark-300 mx-auto mb-4" />
              <h3 className="font-display text-lg sm:text-xl text-dark-500 dark:text-dark-400">Aucun projet dans cette catégorie</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {projects.map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-center flex-wrap gap-2 mt-12 sm:mt-16">
              {[...Array(pagination.pages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 text-sm font-medium transition-all duration-200 ${
                    page === i + 1
                      ? 'bg-gold-500 text-white'
                      : 'border border-dark-200 dark:border-dark-600 text-dark-500 dark:text-dark-300 hover:border-gold-500 hover:text-gold-500'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          {pagination && (
            <p className="text-center text-dark-400 text-xs sm:text-sm mt-5 sm:mt-6">
              {pagination.total} projet{pagination.total > 1 ? 's' : ''} au total
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
