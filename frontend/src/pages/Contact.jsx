import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'

const infos = [
  { icon: MapPin, title: 'Notre adresse', lines: ['123 Avenue Mohammed V', 'Casablanca 20000, Maroc'] },
  { icon: Phone, title: 'Téléphone', lines: ['+212 6 00 00 00 00', '+212 5 22 00 00 00'] },
  { icon: Mail, title: 'Email', lines: ['contact@bk-architecture.com', 'projets@bk-architecture.com'] },
  { icon: Clock, title: 'Horaires', lines: ['Lun - Ven : 9h00 - 18h00', 'Sam : 10h00 - 14h00'] },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Veuillez remplir les champs obligatoires.')
      return
    }
    setSending(true)
    try {
      await api.post('/contact', form)
      toast.success('Message envoyé ! Nous vous répondrons sous 24h.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="pt-20 dark:bg-dark-900 min-h-screen">
      {/* Hero */}
      <section className="relative h-64 sm:h-72 flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920" alt="Contact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-subtitle text-gold-400 mb-3">Parlons de votre projet</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">Contactez-nous</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4 sm:space-y-5"
            >
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <p className="section-subtitle mb-3">Nos coordonnées</p>
                <h2 className="font-display text-2xl sm:text-2xl font-semibold text-dark-900 dark:text-white mb-2">Prenons contact</h2>
                <div className="gold-line mb-4" />
                <p className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed">
                  Notre équipe est disponible pour répondre à toutes vos questions et étudier votre projet.
                </p>
              </div>

              {infos.map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-3 p-4 bg-dark-50 dark:bg-dark-800">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gold-500 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-dark-400 mb-1">{title}</div>
                    {lines.map(l => (
                      <div key={l} className="text-dark-700 dark:text-dark-200 text-xs sm:text-sm font-medium break-words">{l}</div>
                    ))}
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-4 bg-[#25D366] text-white hover:bg-[#1ebe5a] transition-colors min-h-[56px]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <div className="font-semibold text-sm">Écrire sur WhatsApp</div>
                  <div className="text-white/80 text-xs">Réponse rapide garantie</div>
                </div>
              </a>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="bg-dark-50 dark:bg-dark-800 p-5 sm:p-8 md:p-10">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-dark-900 dark:text-white mb-1">Envoyez-nous un message</h3>
                <p className="text-dark-400 text-xs sm:text-sm mb-6">Les champs marqués * sont obligatoires.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-2">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="votre@email.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+212 6 00 00 00 00"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-2">Sujet</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Objet de votre message"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider text-dark-500 dark:text-dark-400 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Décrivez votre projet..."
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full justify-center min-h-[52px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : (
                    <><Send size={16} />Envoyer le message</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-12 sm:mt-16"
          >
            <div className="h-56 sm:h-72 lg:h-80 bg-dark-200 dark:bg-dark-700 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846!2d-7.5898!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCasablanca!5e0!3m2!1sfr!2sma!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%)' }}
                allowFullScreen
                loading="lazy"
                title="BK-Architecture Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
