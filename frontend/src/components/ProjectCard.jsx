import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight } from 'lucide-react'

const categoryLabels = {
  residential: 'Résidentiel',
  commercial: 'Commercial',
  industrial: 'Industriel',
  interior: 'Intérieur',
  urban: 'Urbain',
  renovation: 'Rénovation',
}

export default function ProjectCard({ project, index = 0 }) {
  const imageUrl = project.coverImage?.url || project.images?.[0]?.url || 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/projects/${project._id}`} className="group block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-dark-200">
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gold-500 text-white text-[10px] uppercase tracking-wider font-semibold">
              {categoryLabels[project.category] || project.category}
            </span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-dark-900/80 text-gold-400 text-[10px] uppercase tracking-wider font-semibold border border-gold-500/50">
                Featured
              </span>
            </div>
          )}

          {/* Arrow icon */}
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-gold-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-400">
            <ArrowUpRight size={18} className="text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          <h3 className="font-display text-xl font-semibold text-dark-900 dark:text-white group-hover:text-gold-500 transition-colors duration-300 mb-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-4 text-xs text-dark-400 dark:text-dark-400">
            {project.location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {project.location}
              </span>
            )}
            {project.date && (
              <span>{new Date(project.date).getFullYear()}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
