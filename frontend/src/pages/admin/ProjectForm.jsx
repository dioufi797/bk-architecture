import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, X, ArrowLeft, Save, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../utils/api'

const CATEGORIES = [
  { value: 'residential', label: 'Résidentiel' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'interior', label: 'Design Intérieur' },
  { value: 'industrial', label: 'Industriel' },
  { value: 'urban', label: 'Urbanisme' },
  { value: 'renovation', label: 'Rénovation' },
]

const STATUSES = [
  { value: 'completed', label: 'Livré' },
  { value: 'ongoing', label: 'En cours' },
  { value: 'concept', label: 'Concept' },
]

export default function AdminProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    title: '', description: '', category: 'residential',
    date: '', client: '', location: '', area: '',
    status: 'completed', featured: false, tags: '',
  })
  const [existingImages, setExistingImages] = useState([])
  const [newFiles, setNewFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(isEdit)

  useEffect(() => {
    if (!isEdit) return
    api.get(`/projects/${id}`)
      .then(res => {
        const p = res.data.data
        setForm({
          title: p.title || '',
          description: p.description || '',
          category: p.category || 'residential',
          date: p.date ? new Date(p.date).toISOString().split('T')[0] : '',
          client: p.client || '',
          location: p.location || '',
          area: p.area || '',
          status: p.status || 'completed',
          featured: p.featured || false,
          tags: p.tags?.join(', ') || '',
        })
        setExistingImages(p.images || [])
      })
      .catch(() => {
        toast.error('Projet introuvable')
        navigate('/admin/projects')
      })
      .finally(() => setFetchLoading(false))
  }, [id, isEdit, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    setNewFiles(prev => [...prev, ...files])
    setPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
  }

  const removeExisting = (idx) => setExistingImages(prev => prev.filter((_, i) => i !== idx))

  const removeNew = (idx) => {
    URL.revokeObjectURL(previews[idx])
    setNewFiles(prev => prev.filter((_, i) => i !== idx))
    setPreviews(prev => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.description || !form.category || !form.date) {
      toast.error('Veuillez remplir tous les champs obligatoires.')
      return
    }
    setLoading(true)
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      if (isEdit) data.append('existingImages', JSON.stringify(existingImages))
      newFiles.forEach(f => data.append('images', f))

      isEdit
        ? await api.put(`/projects/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        : await api.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } })

      toast.success(isEdit ? 'Projet mis à jour !' : 'Projet créé !')
      navigate('/admin/projects')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex min-h-screen bg-dark-900">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center pt-14 lg:pt-0">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-dark-900">
      <AdminSidebar />

      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate('/admin/projects')}
              className="text-dark-400 hover:text-white transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
                {isEdit ? 'Modifier le projet' : 'Nouveau projet'}
              </h1>
              <p className="text-dark-400 text-xs sm:text-sm mt-0.5">
                {isEdit ? 'Mettez à jour les informations' : 'Remplissez les informations'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* On mobile: vertical stack. On lg: 2/3 + 1/3 */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 lg:gap-8">

              {/* Sidebar settings — shown first on mobile */}
              <div className="lg:order-2 space-y-4 lg:space-y-6">
                <div className="bg-dark-800 border border-dark-700 p-4 sm:p-6 space-y-4">
                  <h2 className="text-white font-semibold text-xs uppercase tracking-wider border-b border-dark-700 pb-3">
                    Paramètres
                  </h2>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-dark-400 mb-2">Catégorie *</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 bg-dark-700 border border-dark-600 text-white focus:outline-none focus:border-gold-500 transition-colors text-sm"
                    >
                      {CATEGORIES.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-dark-400 mb-2">Statut</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full px-3 py-3 bg-dark-700 border border-dark-600 text-white focus:outline-none focus:border-gold-500 transition-colors text-sm"
                    >
                      {STATUSES.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer p-3 bg-dark-700 hover:bg-dark-600 transition-colors">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                      className="w-4 h-4 accent-gold-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-white text-sm">
                        <Star size={13} className="text-gold-500" />
                        En vedette
                      </div>
                      <div className="text-dark-400 text-xs mt-0.5">Affiché sur l'accueil</div>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gold-500 text-white text-sm uppercase tracking-wider font-medium hover:bg-gold-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[52px]"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><Save size={16} />{isEdit ? 'Mettre à jour' : 'Créer le projet'}</>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/admin/projects')}
                  className="w-full py-3 border border-dark-600 text-dark-400 hover:border-dark-400 hover:text-white text-sm uppercase tracking-wider transition-colors"
                >
                  Annuler
                </button>
              </div>

              {/* Main fields */}
              <div className="lg:order-1 lg:col-span-2 space-y-4 lg:space-y-6">
                {/* Info */}
                <div className="bg-dark-800 border border-dark-700 p-4 sm:p-6 space-y-4">
                  <h2 className="text-white font-semibold text-xs uppercase tracking-wider border-b border-dark-700 pb-3">
                    Informations générales
                  </h2>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-dark-400 mb-2">Titre *</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      placeholder="Villa Lumière"
                      className="w-full px-3 sm:px-4 py-3 bg-dark-700 border border-dark-600 text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-dark-400 mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Description détaillée du projet..."
                      className="w-full px-3 sm:px-4 py-3 bg-dark-700 border border-dark-600 text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 transition-colors resize-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-dark-400 mb-2">Client</label>
                      <input
                        name="client"
                        value={form.client}
                        onChange={handleChange}
                        placeholder="Nom du client"
                        className="w-full px-3 sm:px-4 py-3 bg-dark-700 border border-dark-600 text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-dark-400 mb-2">Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-3 bg-dark-700 border border-dark-600 text-white focus:outline-none focus:border-gold-500 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-dark-400 mb-2">Lieu</label>
                      <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Casablanca, Maroc"
                        className="w-full px-3 sm:px-4 py-3 bg-dark-700 border border-dark-600 text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-dark-400 mb-2">Surface</label>
                      <input
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        placeholder="500 m²"
                        className="w-full px-3 sm:px-4 py-3 bg-dark-700 border border-dark-600 text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-dark-400 mb-2">Tags (séparés par des virgules)</label>
                    <input
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      placeholder="luxe, contemporain, villa"
                      className="w-full px-3 sm:px-4 py-3 bg-dark-700 border border-dark-600 text-white placeholder-dark-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="bg-dark-800 border border-dark-700 p-4 sm:p-6">
                  <h2 className="text-white font-semibold text-xs uppercase tracking-wider border-b border-dark-700 pb-3 mb-4">
                    Images du projet
                  </h2>

                  {existingImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-dark-400 text-xs uppercase tracking-wider mb-3">Images existantes</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {existingImages.map((img, i) => (
                          <div key={i} className="relative aspect-square group">
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeExisting(i)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={11} />
                            </button>
                            {i === 0 && (
                              <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-gold-500 text-white text-[8px] uppercase">Cover</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {previews.length > 0 && (
                    <div className="mb-4">
                      <p className="text-dark-400 text-xs uppercase tracking-wider mb-3">Nouvelles images</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {previews.map((url, i) => (
                          <div key={i} className="relative aspect-square group">
                            <img src={url} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeNew(i)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 sm:py-10 border-2 border-dashed border-dark-600 hover:border-gold-500 transition-colors flex flex-col items-center gap-2 text-dark-400 hover:text-gold-500 active:scale-95"
                  >
                    <Upload size={24} />
                    <div className="text-sm font-medium">Ajouter des images</div>
                    <div className="text-xs">JPEG, PNG, WebP · Max 10 Mo</div>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFiles}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
