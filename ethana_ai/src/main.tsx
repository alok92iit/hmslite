
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store, { persistor } from './store/index.ts'
import { Provider } from 'react-redux' 
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ToastContainer autoClose={5000}  />
    <App />

        </PersistGate>
    </Provider>
,
)
