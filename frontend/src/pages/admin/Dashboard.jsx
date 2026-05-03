import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FolderOpen, PlusSquare, TrendingUp, Star } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../utils/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recentProjects, setRecentProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/projects/stats'),
      api.get('/projects?limit=5&sort=-createdAt'),
    ]).then(([statsRes, projectsRes]) => {
      setStats(statsRes.data.data)
      setRecentProjects(projectsRes.data.data)
    }).finally(() => setLoading(false))
  }, [])

  const categoryLabels = {
    residential: 'Résidentiel', commercial: 'Commercial',
    interior: 'Intérieur', industrial: 'Industriel',
    urban: 'Urbain', renovation: 'Rénovation',
  }

  return (
    <div className="flex min-h-screen bg-dark-900">
      <AdminSidebar />

      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-dark-400 text-sm mt-1">Vue d'ensemble de votre portfolio</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-10">
                {[
                  { icon: FolderOpen, label: 'Total projets', value: stats?.total || 0 },
                  { icon: Star, label: 'En vedette', value: recentProjects.filter(p => p.featured).length },
                  { icon: TrendingUp, label: 'Ce mois', value: recentProjects.filter(p => new Date(p.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length },
                  { icon: FolderOpen, label: 'Catégories', value: stats?.byCategory?.length || 0 },
                ].map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-dark-800 border border-dark-700 p-4 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-dark-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1.5 sm:mb-2 leading-tight">{label}</p>
                        <p className="font-display text-2xl sm:text-3xl font-bold text-white">{value}</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gold-500/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-gold-500 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {/* Recent Projects */}
                <div className="lg:col-span-2 bg-dark-800 border border-dark-700 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-white font-semibold text-sm sm:text-base">Projets récents</h2>
                    <Link to="/admin/projects" className="text-gold-500 text-xs uppercase tracking-wider hover:text-gold-400">
                      Voir tout
                    </Link>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {recentProjects.map(project => (
                      <div key={project._id} className="flex items-center gap-3 p-2.5 sm:p-3 bg-dark-700 hover:bg-dark-600 transition-colors">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden shrink-0">
                          <img
                            src={project.coverImage?.url || project.images?.[0]?.url || 'https://via.placeholder.com/48'}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs sm:text-sm font-medium truncate">{project.title}</p>
                          <p className="text-dark-400 text-[10px] sm:text-xs">{categoryLabels[project.category]} · {new Date(project.date || project.createdAt).getFullYear()}</p>
                        </div>
                        <span className={`shrink-0 hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                          project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' : 'bg-dark-600 text-dark-400'
                        }`}>
                          {project.status === 'completed' ? 'Livré' : project.status === 'ongoing' ? 'En cours' : 'Concept'}
                        </span>
                        <Link
                          to={`/admin/projects/edit/${project._id}`}
                          className="text-dark-500 hover:text-gold-500 text-xs transition-colors shrink-0 hidden sm:block"
                        >
                          Éditer
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Stats */}
                <div className="bg-dark-800 border border-dark-700 p-4 sm:p-6">
                  <h2 className="text-white font-semibold text-sm sm:text-base mb-4 sm:mb-6">Par catégorie</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {stats?.byCategory?.map(({ _id, count }) => (
                      <div key={_id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-dark-300 text-xs sm:text-sm">{categoryLabels[_id] || _id}</span>
                          <span className="text-gold-500 text-xs sm:text-sm font-semibold">{count}</span>
                        </div>
                        <div className="h-1.5 bg-dark-700">
                          <div
                            className="h-full bg-gold-500 transition-all duration-700"
                            style={{ width: `${(count / (stats?.total || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-dark-700">
                    <Link
                      to="/admin/projects/new"
                      className="flex items-center gap-2 w-full justify-center px-4 py-3 bg-gold-500 text-white text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-600 transition-colors"
                    >
                      <PlusSquare size={15} />
                      Ajouter un projet
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
