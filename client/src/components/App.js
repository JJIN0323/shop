import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from '../hoc/auth'
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import ProductPage from './views/ProductPage/ProductPage'
import CartPage from './views/CartPage/CartPage'
import UploadProductPage from './views/UploadProductPage/UploadProductPage'
import DetailProductPage from './views/DetailProductPage/DetailProductPage'
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
          <>
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route exact path='/product/upload' component={Auth(UploadProductPage, true)} />
          <Route exact path='/product/shop' component={Auth(ProductPage, null)} />
          <Route exact path='/user/cart' component={Auth(CartPage, true)} />
          <Route exact path='/product/shop/:productId' component={Auth(DetailProductPage, null)} />
          <Footer /> {/* LandingPage에서는 footer 안 보여줌 */}
          </>
        </Switch>
      </div>      
    </Suspense>
  )
}

export default App
