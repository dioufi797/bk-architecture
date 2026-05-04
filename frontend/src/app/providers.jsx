'use client'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../context/AuthContext'
import { ThemeProvider } from '../context/ThemeContext'

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #C9A84C',
              borderRadius: '0',
              fontSize: '14px',
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  )
}
