import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from '../hoc/auth'
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import NavBar from './views/NavBar/NavBar'
import Footer from './views/Footer/Footer'

// null  누구나 접속 가능한 페이지
// true  로그인한 사용자만 들어갈 수 있는 페이지
// false 로그인한 사용자는 들어갈 수 없는 페이지

function App() {
  return (
    <Suspense fallback={(<div>Loading-</div>)}>
      <NavBar />
      <div className='wrap'>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

export default App
