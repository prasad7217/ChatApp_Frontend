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
import UserProfile from './components/User/UserProfile'
import AdminLogin from './components/admin/authentication/AdminLogin.'
import AdminDashboard from './components/admin/AdminDashboard'
// import ProtectedRoutes from './ProtectedRoutes'
import { Provider } from 'react-redux'
import appStore from './components/Redux/appStore'
import ResetViaEmail from './components/UserAuthentication/ResetViaEmail'
import NewPassword from './components/UserAuthentication/NewPassword'
import FeedPage from './components/FeedPage'

function App() {

  const [count, setCount] = useState(0)

  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainBody />} >
            <Route path='/' element={<Body />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/otp' element={<EmailOtp />} />
            <Route path='/reset/password' element={<ResetViaEmail />} />
            <Route path='/reset/password/new' element={<NewPassword />} />
            {/* <Route element={<ProtectedRoutes role={"user"} />}> */}
            <Route path='/feed' element={<FeedPage />} />
            <Route path='/profile' element={<UserProfile />} />
            {/* </Route> */}
          </Route>


          <Route path='/admin/login' element={<AdminLogin />} />

          {/* <Route element={<ProtectedRoutes role={"admin"} />}> */}
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          {/* </Route>  */}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
