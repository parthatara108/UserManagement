import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

const options = {
  position: positions.TOP_CENTER,
  timeout: 2000,
  offset: '30px',
  transition: transitions.FADE
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
        <App />
      </Provider>
    </AlertProvider>
  </React.StrictMode>,
)
