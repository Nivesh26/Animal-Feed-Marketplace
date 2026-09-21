import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './UserPages/Home'
import UserLogin from './Logins/UserLogin'
import UserSignup from './Logins/UserSignup'
import Products from './UserPages/Products'
import Categories from './UserPages/Categories'
import Aboutus from './UserPages/Aboutus'
import Contact from './UserPages/Contact'
import ProductDetail from './UserPages/ProductDetail'
import Cart from './UserPages/Cart'

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