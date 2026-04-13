import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply saved theme or system preference before first render to prevent flash
const savedTheme = localStorage.getItem('nvidia-theme')
if (savedTheme === 'nvidia-light' || savedTheme === 'nvidia-dark') {
  document.documentElement.classList.add(savedTheme)
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('nvidia-dark')
} else {
  document.documentElement.classList.add('nvidia-light')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
