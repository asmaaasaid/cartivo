import { createRoot } from 'react-dom/client'
import AppRouter from '@routes/AppRouter';

// style
import './index.css'
import "@styles/global.css"
import 'bootstrap/dist/css/bootstrap.min.css';

// redux
import { Provider } from 'react-redux';
import {store, persistor}  from "@store/index";
import { PersistGate } from 'redux-persist/integration/react';

// axios
import "./services/axios-global.js"


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter/>
    </PersistGate>
    
  </Provider>
  
)
