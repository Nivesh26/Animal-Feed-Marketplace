import Header from '../UserComponents/Header'
import Footer from '../UserComponents/Footer'
import Hero from '../UserComponents/Hero'
import CategoriesHome from '../UserComponents/CategoriesHome'
import Topbar from '../UserComponents/Topbar'
import Copyright from '../UserComponents/Copyright'
import TopProduct from '../UserComponents/TopProduct'
import BestSelling from '../UserComponents/BestSelling'
import CTA from '../UserComponents/CTA'
import ProductLiked from '../UserComponents/ProductLiked'
import FAQ from '../UserComponents/Faq'

const Home = () => {
  return (
    <div>
      <Topbar />
      <Header />
      <Hero />
      <CategoriesHome />
      <TopProduct />
      <BestSelling />
      <CTA />
      <ProductLiked />
      <FAQ />
      <Footer />
      <Copyright />
    </div>
  )
}

export default Home