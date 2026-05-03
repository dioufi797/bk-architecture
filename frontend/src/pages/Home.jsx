import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Users, Building2, Star, ChevronDown } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import SectionHeader from '../components/SectionHeader'
import api from '../utils/api'

const services = [
  { icon: Building2, title: 'Architecture Résidentielle', desc: 'Des villas et résidences sur mesure qui reflètent votre personnalité et votre style de vie.' },
  { icon: Award, title: 'Architecture Commerciale', desc: 'Des espaces de travail et commerces qui inspirent la confiance et l\'excellence.' },
  { icon: Star, title: 'Design Intérieur', desc: 'Des intérieurs raffinés qui transforment chaque pièce en une expérience sensorielle unique.' },
  { icon: Users, title: 'Urbanisme & Paysage', desc: 'La conception d\'espaces urbains harmonieux qui réunissent les communautés.' },
]

const stats = [
  { value: '15+', label: 'Années' },
  { value: '200+', label: 'Projets' },
  { value: '98%', label: 'Satisfaction' },
  { value: '25+', label: 'Prix' },
]

export default function Home() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects?featured=true&limit=6')
      .then(res => setProjects(res.data.data))
      .catch(() => {})
  }, [])

  return (
    <div className="dark:bg-dark-900">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85"
            alt="BK Architecture Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/60 to-dark-900/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-40 sm:pb-36 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="section-subtitle text-gold-400 mb-4 sm:mb-6"
            >
              Cabinet d'Architecture de Prestige
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4 sm:mb-6"
            >
              Transformer vos
              <br />
              <span className="text-gradient">rêves</span> en réalité
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg"
            >
              Nous créons des architectures qui transcendent le temps — des espaces où l'élégance rencontre la fonctionnalité pour donner vie à votre vision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link to="/projects" className="btn-primary justify-center sm:justify-start">
                Découvrir nos projets
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-secondary text-white border-white hover:bg-white hover:text-dark-900 justify-center sm:justify-start">
                Prendre rendez-vous
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-dark-800 grid grid-cols-4 divide-x divide-dark-100 dark:divide-dark-700">
              {stats.map(({ value, label }) => (
                <div key={label} className="px-3 sm:px-6 py-4 sm:py-5 text-center">
                  <div className="font-display text-xl sm:text-2xl font-bold text-gold-500">{value}</div>
                  <div className="text-[9px] sm:text-xs text-dark-400 dark:text-dark-400 mt-0.5 uppercase tracking-wider leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-32 right-6 lg:right-10 hidden lg:flex flex-col items-center gap-2 text-white/50"
        >
          <span className="writing-vertical text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={14} />
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="py-16 sm:py-20 lg:py-28 bg-dark-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Notre expertise"
            title="Services d'exception"
            description="Chaque projet est une opportunité de créer quelque chose d'unique. Notre équipe d'architectes passionnés transforme vos ambitions en chefs-d'œuvre architecturaux."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-14 lg:mt-16">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-6 sm:p-8 bg-white dark:bg-dark-700 hover:bg-dark-900 dark:hover:bg-dark-900 transition-all duration-500 border border-transparent hover:border-gold-500/30"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gold-500/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-gold-500 transition-colors duration-300">
                  <Icon size={20} className="text-gold-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-dark-900 dark:text-white group-hover:text-white transition-colors duration-300 mb-2 sm:mb-3">
                  {title}
                </h3>
                <p className="text-dark-500 dark:text-dark-300 group-hover:text-white/60 text-sm leading-relaxed transition-colors duration-300">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle mb-3 sm:mb-4">Notre histoire</p>
              <h2 className="section-title text-dark-900 dark:text-white mb-4 sm:mb-6">
                L'architecture comme art de vivre
              </h2>
              <div className="gold-line mb-5 sm:mb-6" />
              <p className="text-dark-500 dark:text-dark-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Fondé avec la vision de créer des espaces qui inspirent et perdurent, BK-Architecture est devenu une référence dans l'architecture haut de gamme. Notre approche allie rigueur technique, sensibilité artistique et compréhension profonde des besoins de nos clients.
              </p>
              <p className="text-dark-500 dark:text-dark-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                Chaque projet est unique. Nous prenons le temps de comprendre votre vision, vos contraintes et vos aspirations pour créer des espaces qui vous ressemblent.
              </p>
              <Link to="/about" className="btn-primary">
                En savoir plus
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800"
                  alt="BK Architecture atelier"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold badge — repositioned to not overflow on mobile */}
              <div className="absolute -bottom-4 left-4 sm:-bottom-6 sm:-left-6 w-28 h-28 sm:w-36 sm:h-36 bg-gold-500 flex flex-col items-center justify-center text-white p-3 sm:p-4">
                <span className="font-display text-3xl sm:text-4xl font-bold">15</span>
                <span className="text-[9px] sm:text-xs uppercase tracking-widest text-center mt-1 leading-tight">Ans d'excellence</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-28 bg-dark-50 dark:bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-16">
              <SectionHeader
                subtitle="Portfolio"
                title="Nos réalisations"
                center={false}
              />
              <Link to="/projects" className="btn-ghost shrink-0 self-start sm:self-auto">
                Voir tout
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {projects.map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1920"
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-900/85" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-subtitle text-gold-400 mb-4">Commençons ensemble</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Votre projet mérite<br className="hidden sm:block" /> une architecture d'exception
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de votre vision et découvrir comment nous pouvons la transformer en réalité.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/contact" className="btn-primary justify-center">
                Démarrer votre projet
                <ArrowRight size={16} />
              </Link>
              <Link to="/projects" className="btn-secondary justify-center">
                Voir nos réalisations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
