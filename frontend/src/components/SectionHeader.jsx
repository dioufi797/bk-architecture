'use client'
import { motion } from 'framer-motion'

export default function SectionHeader({ subtitle, title, description, light = false, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={center ? 'text-center' : ''}
    >
      {subtitle && (
        <p className="section-subtitle mb-4">{subtitle}</p>
      )}
      <h2 className={`section-title mb-4 ${light ? 'text-white' : 'text-dark-900 dark:text-white'}`}>
        {title}
      </h2>
      {!center && <div className="gold-line mb-6" />}
      {description && (
        <p className={`text-sm md:text-base leading-relaxed max-w-2xl ${
          center ? 'mx-auto' : ''
        } ${light ? 'text-white/70' : 'text-dark-500 dark:text-dark-300'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
