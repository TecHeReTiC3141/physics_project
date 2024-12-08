import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Simulator } from './Simulator.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Simulator />
  </StrictMode>,
)
