'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Search, Star, FolderOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminSidebar from '../../../components/AdminSidebar'
import api from '../../../utils/api'

const categoryLabels = {
  residential: 'Résidentiel', commercial: 'Commercial',
  interior: 'Intérieur', industrial: 'Industriel',
  urban: 'Urbain', renovation: 'Rénovation',
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: 100, sort: '-createdAt' })
      if (category !== 'all') params.set('category', category)
      const res = await api.get(`/projects?${params}`)
      setProjects(res.data.data)
    } catch {
      toast.error('Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Supprimer "${title}" ?`)) return
    setDeleting(id)
    try {
      await api.delete(`/projects/${id}`)
      toast.success('Projet supprimé')
      setProjects(prev => prev.filter(p => p._id !== id))
    } catch {
      toast.error('Erreur lors de la suppression')
    } finally {
      setDeleting(null)
    }
  }

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.client?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-dark-900">
      <AdminSidebar />

      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Projets</h1>
              <p className="text-dark-400 text-xs sm:text-sm mt-0.5">{projects.length} projet{projects.length > 1 ? 's' : ''}</p>
            </div>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-gold-500 text-white text-xs uppercase tracking-wider hover:bg-gold-600 transition-colors whitespace-nowrap min-h-[44px]"
            >
              <Plus size={15} />
              <span className="hidden sm:inline">Nouveau projet</span>
              <span className="sm:hidden">Nouveau</span>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="relative flex-1 min-w-[160px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 w-full bg-dark-800 border border-dark-600 text-white text-sm placeholder-dark-500 focus:outline-none focus:border-gold-500"
              />
            </div>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-3 py-2.5 bg-dark-800 border border-dark-600 text-dark-300 text-sm focus:outline-none focus:border-gold-500 min-w-[130px]"
            >
              <option value="all">Toutes</option>
              {Object.entries(categoryLabels).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div className="bg-dark-800 border border-dark-700 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-dark-500">
                <FolderOpen size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Aucun projet trouvé</p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-dark-700">
                        <th className="text-left px-4 sm:px-6 py-4 text-[10px] uppercase tracking-wider text-dark-500 font-semibold">Projet</th>
                        <th className="text-left px-4 sm:px-6 py-4 text-[10px] uppercase tracking-wider text-dark-500 font-semibold hidden md:table-cell">Catégorie</th>
                        <th className="text-left px-4 sm:px-6 py-4 text-[10px] uppercase tracking-wider text-dark-500 font-semibold hidden lg:table-cell">Date</th>
                        <th className="text-left px-4 sm:px-6 py-4 text-[10px] uppercase tracking-wider text-dark-500 font-semibold hidden lg:table-cell">Statut</th>
                        <th className="text-right px-4 sm:px-6 py-4 text-[10px] uppercase tracking-wider text-dark-500 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                      {filtered.map((project, i) => (
                        <motion.tr
                          key={project._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="hover:bg-dark-700 transition-colors"
                        >
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 overflow-hidden shrink-0 bg-dark-700">
                                <img
                                  src={project.coverImage?.url || project.images?.[0]?.url || 'https://via.placeholder.com/40'}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-white font-medium text-sm truncate max-w-[140px] sm:max-w-none">{project.title}</span>
                                  {project.featured && <Star size={11} className="text-gold-500 fill-gold-500 shrink-0" />}
                                </div>
                                {project.client && <span className="text-dark-400 text-xs">{project.client}</span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                            <span className="px-2.5 py-1 bg-dark-700 text-dark-300 text-[10px] uppercase tracking-wider">
                              {categoryLabels[project.category] || project.category}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-dark-400 text-sm hidden lg:table-cell">
                            {project.date ? new Date(project.date).toLocaleDateString('fr-FR') : '—'}
                          </td>
                          <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                            <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider ${
                              project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              project.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' : 'bg-dark-600 text-dark-400'
                            }`}>
                              {project.status === 'completed' ? 'Livré' : project.status === 'ongoing' ? 'En cours' : 'Concept'}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <Link
                                href={`/admin/projects/${project._id}`}
                                className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-dark-400 hover:text-gold-500 hover:bg-dark-600 transition-all"
                              >
                                <Edit2 size={15} />
                              </Link>
                              <button
                                onClick={() => handleDelete(project._id, project.title)}
                                disabled={deleting === project._id}
                                className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-dark-400 hover:text-red-400 hover:bg-dark-600 transition-all disabled:opacity-50"
                              >
                                {deleting === project._id
                                  ? <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                  : <Trash2 size={15} />
                                }
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="sm:hidden divide-y divide-dark-700">
                  {filtered.map((project, i) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-3 p-4"
                    >
                      <div className="w-14 h-14 overflow-hidden shrink-0 bg-dark-700">
                        <img
                          src={project.coverImage?.url || project.images?.[0]?.url || 'https://via.placeholder.com/56'}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-white font-medium text-sm truncate">{project.title}</span>
                          {project.featured && <Star size={10} className="text-gold-500 fill-gold-500 shrink-0" />}
                        </div>
                        <span className="text-dark-400 text-xs">{categoryLabels[project.category]}</span>
                        <div className="mt-1">
                          <span className={`inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider ${
                            project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            project.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' : 'bg-dark-600 text-dark-400'
                          }`}>
                            {project.status === 'completed' ? 'Livré' : project.status === 'ongoing' ? 'En cours' : 'Concept'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Link
                          href={`/admin/projects/${project._id}`}
                          className="p-2.5 text-dark-400 hover:text-gold-500 transition-colors"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(project._id, project.title)}
                          disabled={deleting === project._id}
                          className="p-2.5 text-dark-400 hover:text-red-400 transition-colors disabled:opacity-50"
                        >
                          {deleting === project._id
                            ? <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            : <Trash2 size={16} />
                          }
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
