import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import AppContainer from './shared/components/appContainer/AppContainer'
import NavItem from './shared/components/nav/NavItem'
import { RiHome2Fill } from 'react-icons/ri'

function App() {
  return (
    <AppContainer
      appName='Template'
      displayThemeToggle
      navbarContent={
        <div style={{display: 'flex', flexDirection: 'column', padding: '0.2rem 2rem'}}>
          <NavItem path='/' exact icon={<RiHome2Fill />} title='Home' />
        </div>
      }
    >
      <Switch>
        <Route path='/' exact component={HomePage} />
      </Switch>
    </AppContainer>
  )
}

export default App
