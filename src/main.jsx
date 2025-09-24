import { createRoot } from 'react-dom/client'
import './index.css'
//import  Main  from './hooks/usecallback.jsx'
// import Context from './hooks/usecontext/usecontext.jsx'
import App from './App'
import Counter from './hooks/usereduser'
createRoot(document.getElementById('root')).render(
    <App />
)