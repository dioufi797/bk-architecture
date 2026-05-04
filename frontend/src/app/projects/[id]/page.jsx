'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, User, Tag, ChevronLeft, ChevronRight, X } from 'lucide-react'
import api from '../../../utils/api'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

const categoryLabels = {
  residential: 'Résidentiel', commercial: 'Commercial',
  industrial: 'Industriel', interior: 'Design Intérieur',
  urban: 'Urbanisme', renovation: 'Rénovation',
}

export default function ProjectDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(res => setProject(res.data.data))
      .catch(() => router.push('/projects'))
      .finally(() => setLoading(false))
  }, [id, router])

  const openLightbox = (idx) => setLightbox(idx)
  const closeLightbox = () => setLightbox(null)
  const prevImage = () => setLightbox(l => (l - 1 + project.images.length) % project.images.length)
  const nextImage = () => setLightbox(l => (l + 1) % project.images.length)

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, project])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 dark:bg-dark-900 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    )
  }

  if (!project) return null

  const mainImage = project.coverImage?.url || project.images?.[0]?.url

  const details = [
    { icon: Tag, label: 'Catégorie', value: categoryLabels[project.category] },
    project.date && { icon: Calendar, label: 'Année', value: new Date(project.date).getFullYear() },
    project.client && { icon: User, label: 'Client', value: project.client },
    project.location && { icon: MapPin, label: 'Lieu', value: project.location },
    project.area && { icon: Tag, label: 'Surface', value: project.area },
    project.status && { icon: Tag, label: 'Statut', value: project.status === 'completed' ? 'Livré' : project.status === 'ongoing' ? 'En cours' : 'Concept' },
  ].filter(Boolean)

  return (
    <>
      <Navbar />
      <div className="pt-20 dark:bg-dark-900 min-h-screen">
        {/* Hero Image */}
        <section className="relative h-[50vh] sm:h-[60vh] min-h-[300px] overflow-hidden">
          <img src={mainImage} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/30 to-transparent" />
          <div className="absolute bottom-6 sm:bottom-8 left-0 right-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <span className="inline-block px-3 py-1 bg-gold-500 text-white text-[10px] uppercase tracking-wider font-semibold mb-3">
                  {categoryLabels[project.category] || project.category}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">{project.title}</h1>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Back */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-dark-400 hover:text-gold-500 transition-colors text-xs sm:text-sm uppercase tracking-wider min-h-[44px]"
          >
            <ArrowLeft size={16} />
            Retour aux projets
          </button>
        </div>

        {/* Content */}
        <section className="pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

              {/* Main content */}
              <div className="lg:col-span-2">
                {/* Details inline on mobile */}
                <div className="lg:hidden bg-dark-50 dark:bg-dark-800 p-5 mb-8 grid grid-cols-2 gap-4">
                  {details.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2">
                      <Icon size={14} className="text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-dark-400 mb-0.5">{label}</div>
                        <div className="text-dark-900 dark:text-white text-xs font-medium">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-semibold text-dark-900 dark:text-white mb-3 sm:mb-4">Description du projet</h2>
                <div className="gold-line mb-5" />
                <p className="text-dark-500 dark:text-dark-300 leading-relaxed text-sm sm:text-base lg:text-lg whitespace-pre-line">
                  {project.description}
                </p>

                {project.tags?.length > 0 && (
                  <div className="mt-6 sm:mt-8 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 border border-gold-500/50 text-gold-500 text-[10px] uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Gallery */}
                {project.images?.length > 1 && (
                  <div className="mt-10 sm:mt-12">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-dark-900 dark:text-white mb-4 sm:mb-6">Galerie Photos</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {project.images.map((img, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.07 }}
                          onClick={() => openLightbox(i)}
                          className="relative aspect-square overflow-hidden group"
                        >
                          <img
                            src={img.url}
                            alt={`${project.title} ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/30 transition-colors duration-300" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar — desktop only */}
              <div className="hidden lg:block">
                <div className="bg-dark-50 dark:bg-dark-800 p-6 sm:p-8 sticky top-28">
                  <h3 className="font-display text-lg font-semibold text-dark-900 dark:text-white mb-6">Détails du projet</h3>
                  <div className="space-y-4">
                    {details.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3 pb-4 border-b border-dark-200 dark:border-dark-600 last:border-0 last:pb-0">
                        <Icon size={15} className="text-gold-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-dark-400 dark:text-dark-500 mb-0.5">{label}</div>
                          <div className="text-dark-900 dark:text-white font-medium text-sm">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-dark-200 dark:border-dark-600">
                    <p className="text-dark-500 dark:text-dark-400 text-sm mb-4">Vous avez un projet similaire ?</p>
                    <Link href="/contact" className="btn-primary w-full justify-center">Contactez-nous</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden mt-10 p-5 bg-dark-50 dark:bg-dark-800">
              <p className="text-dark-500 dark:text-dark-400 text-sm mb-4">Vous avez un projet similaire ?</p>
              <Link href="/contact" className="btn-primary w-full justify-center">Contactez-nous</Link>
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightbox !== null && project.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-900/96 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gold-500 transition-colors p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-2 sm:left-4 text-white hover:text-gold-500 transition-colors p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ChevronLeft size={32} />
            </button>
            <img
              src={project.images[lightbox]?.url}
              alt=""
              className="max-h-[80vh] max-w-[85vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-2 sm:right-4 text-white hover:text-gold-500 transition-colors p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ChevronRight size={32} />
            </button>
            <div className="absolute bottom-4 text-white/50 text-sm">
              {lightbox + 1} / {project.images.length}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  )
}
