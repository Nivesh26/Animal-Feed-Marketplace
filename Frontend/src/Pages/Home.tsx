import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Hero from '../Components/Hero'
import Topbar from '../Components/Topbar'
import Copyright from '../Components/Copyright'

const Home = () => {
  return (
    <div>
      <Topbar />
      <Header />
      <Hero />
      <Footer />
      <Copyright />
    </div>
  )
}

export default Home