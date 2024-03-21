import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Users from './components/Users'
import Abaut from './components/Abaut'
import Usuarios from './components/usuarios'
import { BrowserRouter , Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className='container p-2'>
        <Switch>
          <Route path='/about' component={Usuarios}/>
          <Route path='/' component={Users}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
