import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Eye, Heart, Zap, Shield } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

const values = [
  { icon: Eye, title: 'Vision', desc: 'Nous voyons au-delà du projet pour créer des espaces qui transcendent le temps et inspirent les générations.' },
  { icon: Heart, title: 'Passion', desc: 'L\'architecture est notre art, notre passion. Chaque détail compte, chaque ligne est pensée avec amour.' },
  { icon: Zap, title: 'Innovation', desc: 'Nous intégrons les dernières technologies et tendances pour créer des projets avant-gardistes.' },
  { icon: Shield, title: 'Excellence', desc: 'La qualité n\'est pas négociable. Nous visons l\'excellence dans chaque aspect de notre travail.' },
]

const team = [
  {
    name: 'Brahim Karimi',
    role: 'Architecte Principal & Fondateur',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    desc: 'Diplômé de l\'École Nationale d\'Architecture, Brahim a fondé BK-Architecture avec la vision de créer des espaces d\'exception.',
  },
  {
    name: 'Karim Benali',
    role: 'Directeur Artistique',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    desc: 'Passionné de design et d\'art contemporain, Karim donne une dimension artistique unique à chaque projet.',
  },
  {
    name: 'Sara Mansouri',
    role: 'Architecte d\'Intérieur',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
    desc: 'Spécialiste en design d\'intérieur, Sara crée des espaces intérieurs raffinés et fonctionnels.',
  },
]

export default function About() {
  return (
    <div className="pt-20 dark:bg-dark-900">
      {/* Hero */}
      <section className="relative h-64 sm:h-80 md:h-96 flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1920" alt="About" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark-900/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-subtitle text-gold-400 mb-3">Notre cabinet</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">À Propos de Nous</h1>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="section-subtitle mb-3 sm:mb-4">Notre mission</p>
              <h2 className="section-title text-dark-900 dark:text-white mb-4 sm:mb-6">
                Créer des espaces qui<br />inspirent et perdurent
              </h2>
              <div className="gold-line mb-5 sm:mb-6" />
              <p className="text-dark-500 dark:text-dark-300 leading-relaxed mb-4 text-sm sm:text-base">
                Depuis plus de 15 ans, BK-Architecture façonne le paysage architectural marocain en créant des œuvres qui allient esthétique, fonctionnalité et durabilité. Notre cabinet est né d'une conviction profonde : l'architecture a le pouvoir de transformer les vies.
              </p>
              <p className="text-dark-500 dark:text-dark-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                De la première esquisse à la livraison finale, nous accompagnons nos clients dans chaque étape du processus créatif. Notre approche collaborative garantit que chaque projet reflète fidèlement la vision et les aspirations de ceux qui y vivront ou y travailleront.
              </p>
              <Link to="/projects" className="btn-primary">
                Voir nos réalisations <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600',
                  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
                  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
                  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
                ].map((src, i) => (
                  <div key={i} className={`aspect-square overflow-hidden ${i % 2 === 1 ? 'mt-4 sm:mt-8' : ''}`}>
                    <img src={src} alt={`Architecture ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 lg:py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader subtitle="Ce qui nous guide" title="Nos valeurs fondamentales" light />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-14 lg:mt-16">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group text-center p-6 sm:p-8 border border-dark-700 hover:border-gold-500 transition-colors duration-400"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-5 sm:mb-6 group-hover:bg-gold-500 transition-colors duration-300">
                  <Icon size={22} className="text-gold-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader subtitle="Notre équipe" title="Les visionnaires derrière chaque projet" description="Une équipe passionnée d'architectes et designers dédiée à l'excellence." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-10 sm:mt-14 lg:mt-16">
            {team.map(({ name, role, img, desc }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-5">
                  <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-dark-900 dark:text-white">{name}</h3>
                  <p className="text-gold-500 text-xs sm:text-sm uppercase tracking-wider mt-1 mb-3">{role}</p>
                  <p className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
