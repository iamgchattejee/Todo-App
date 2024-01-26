import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Appbar from './components/navbar/navbar'
import Home from './components/home/home'
import Signup from './components/sign/signup'
import Signin from './components/sign/signin'
import Todo from './components/todo/todo'
import {RecoilRoot} from 'recoil';
function App() {

  return (
    <>
      <Router>
      <RecoilRoot>
        <Appbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/signin' element={<Signin/>}/>
          <Route exact path='/todo' element={<Todo/>}/>
        </Routes>
        </RecoilRoot>
      </Router>
    </>
  )
}

export default App;
