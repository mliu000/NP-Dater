import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../assets/Fonts.css'
import '../css/Config.css'
import Pages from './Pages.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Pages />
    </StrictMode>,
)
