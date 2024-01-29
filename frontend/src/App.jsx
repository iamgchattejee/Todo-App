import { useEffect, useState } from 'react'
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
import { useRecoilState } from 'recoil';
import { authAtom } from './store';
function App() {
  const [auth,setAuthState] = useRecoilState(authAtom);
  useEffect(()=>{
    const userid =sessionStorage.getItem("id");
    if(userid) {
      setAuthState({user:userid,isLoggedIn:true});
    }
  },[]);
  return (
    <>
      <Router>
        <Appbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/signin' element={<Signin/>}/>
          <Route exact path='/todo' element={<Todo/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
