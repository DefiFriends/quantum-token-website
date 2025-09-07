'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Check for saved theme preference first
    const savedTheme = localStorage.getItem('quantum-theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Always default to dark instead of checking system preference
      // Remove this line if you want to force dark for everyone:
      // setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      
      // Force dark theme as default
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('quantum-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}