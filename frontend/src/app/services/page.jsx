'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, Home, Palette, Trees, Wrench, ArrowRight, CheckCircle } from 'lucide-react'
import SectionHeader from '../../components/SectionHeader'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const services = [
  {
    icon: Home,
    title: 'Architecture Résidentielle',
    desc: 'Villas, maisons individuelles, appartements de luxe — nous créons des espaces de vie qui reflètent votre personnalité et répondent à vos besoins.',
    features: ['Villas et maisons de luxe', 'Appartements haut de gamme', 'Résidences secondaires', 'Complexes résidentiels'],
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
  },
  {
    icon: Building2,
    title: 'Architecture Commerciale',
    desc: 'Bureaux, centres commerciaux, hôtels, restaurants — des espaces commerciaux qui inspirent confiance et reflètent l\'image de votre marque.',
    features: ['Immeubles de bureaux', 'Centres commerciaux', 'Hôtels & resorts', 'Restaurants & cafés'],
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
  },
  {
    icon: Palette,
    title: 'Design Intérieur',
    desc: 'Aménagement intérieur sur mesure alliant esthétique contemporaine et confort absolu. Chaque espace devient une œuvre d\'art habitable.',
    features: ['Aménagement résidentiel', 'Design commercial', 'Mobilier sur mesure', 'Coordination des travaux'],
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800',
  },
  {
    icon: Trees,
    title: 'Architecture Paysagère',
    desc: 'Jardins, espaces verts, aménagements extérieurs — nous créons des environnements qui s\'harmonisent avec l\'architecture et la nature.',
    features: ['Jardins privés', 'Espaces verts urbains', 'Piscines & espaces détente', 'Terrasses & rooftops'],
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  },
  {
    icon: Wrench,
    title: 'Rénovation & Réhabilitation',
    desc: 'Transformation et mise en valeur de bâtiments existants. Nous insufflons une nouvelle vie à vos espaces tout en préservant leur âme.',
    features: ['Rénovation complète', 'Extension et surélévation', 'Réhabilitation patrimoniale', 'Mise aux normes'],
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  },
]

const process = [
  { step: '01', title: 'Consultation', desc: 'Écoute de vos besoins, analyse du site et définition des objectifs.' },
  { step: '02', title: 'Conception', desc: 'Élaboration des plans, esquisse, avant-projet et présentation 3D.' },
  { step: '03', title: 'Permis', desc: 'Constitution et dépôt du dossier de permis de construire.' },
  { step: '04', title: 'Réalisation', desc: 'Suivi et coordination des travaux jusqu\'à la livraison finale.' },
]

export default function Services() {
  return (
    <>
      <Navbar />
      <div className="pt-20 dark:bg-dark-900">
        {/* Hero */}
        <section className="relative h-64 sm:h-80 md:h-96 flex items-center">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920" alt="Services" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-dark-900/80" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="section-subtitle text-gold-400 mb-3">Ce que nous faisons</p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">Nos Services</h1>
            </motion.div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-dark-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 lg:space-y-24">
            {services.map(({ icon: Icon, title, desc, features, img }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
              >
                {/* Text — always first on mobile */}
                <div className={`flex flex-col items-center text-center lg:items-start lg:text-left ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gold-500 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-dark-900 dark:text-white mb-3 sm:mb-4">{title}</h2>
                  <div className="gold-line mb-5" />
                  <p className="text-dark-500 dark:text-dark-300 leading-relaxed mb-6 text-sm sm:text-base">{desc}</p>
                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 w-full">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-dark-600 dark:text-dark-300 text-sm justify-center lg:justify-start">
                        <CheckCircle size={15} className="text-gold-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary">
                    Discuter de votre projet <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Image */}
                <div className={`relative overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img src={img} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-12 h-12 sm:w-16 sm:h-16 bg-gold-500 flex items-center justify-center">
                    <span className="font-display text-white font-bold text-lg sm:text-xl">0{i + 1}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="py-16 sm:py-20 lg:py-24 bg-dark-50 dark:bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader subtitle="Notre méthode" title="Comment nous travaillons" description="Un processus éprouvé pour garantir l'excellence à chaque étape de votre projet." />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 relative">
              <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-dark-200 dark:bg-dark-600" />
              {process.map(({ step, title, desc }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-dark-700 border-2 border-gold-500 flex items-center justify-center mx-auto mb-4 sm:mb-6 relative z-10">
                    <span className="font-display text-gold-500 font-bold text-lg sm:text-xl">{step}</span>
                  </div>
                  <h3 className="font-display text-base sm:text-xl font-semibold text-dark-900 dark:text-white mb-2 sm:mb-3">{title}</h3>
                  <p className="text-dark-500 dark:text-dark-400 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
