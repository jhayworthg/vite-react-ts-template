import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './shared/theme/context'

ReactDOM.render(
  <ThemeProvider appThemeName='template_theme' applyGradients>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
)