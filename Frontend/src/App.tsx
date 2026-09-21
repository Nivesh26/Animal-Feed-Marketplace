import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import UserLogin from './Logins/UserLogin'
import UserSignup from './Logins/UserSignup'
import Products from './Pages/Products'
import Categories from './Pages/Categories'
import Aboutus from './Pages/Aboutus'
import Contact from './Pages/Contact'
import ProductDetail from './Pages/ProductDetail'
import Cart from './Pages/Cart'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/productdetail' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App 