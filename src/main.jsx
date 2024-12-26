import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Suspense } from 'react'
import LazyLoader from './utils/LazyLoader.jsx'

createRoot(document.getElementById('root')).render(
    <Suspense fallback={<LazyLoader/>}>
        <App />
    </Suspense>
)
