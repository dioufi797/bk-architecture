import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProjects from './pages/admin/ProjectsList'
import AdminProjectForm from './pages/admin/ProjectForm'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-dark-900">{children}</div>
)

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
)

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isAdmin ? (
          <AdminLayout>
            <Routes location={location} key={location.pathname}>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
              <Route path="/admin/projects/new" element={<ProtectedRoute><AdminProjectForm /></ProtectedRoute>} />
              <Route path="/admin/projects/edit/:id" element={<ProtectedRoute><AdminProjectForm /></ProtectedRoute>} />
            </Routes>
          </AdminLayout>
        ) : (
          <PublicLayout>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PublicLayout>
        )}
      </AnimatePresence>
    </>
  )
}
