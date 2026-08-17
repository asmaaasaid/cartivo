import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from '@routes/AppRouter';
import "@styles/global.css"




createRoot(document.getElementById('root')!).render(
  <AppRouter/>
)
