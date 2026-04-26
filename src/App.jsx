import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MainBody from './components/MainBody'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/UserAuthentication/Login'
import Body from './components/Body'
import SignUp from './components/UserAuthentication/Signup'
import EmailOtp from './components/UserAuthentication/EmailOtp'

function App() {

  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainBody />} >
          <Route path='/' element={<Body />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/otp' element={<EmailOtp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
