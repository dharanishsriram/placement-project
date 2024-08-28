import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ResetStyle from './styles/ResetStyle.js'
import GlobalStyle from './styles/GlobalStyle.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </>
)
