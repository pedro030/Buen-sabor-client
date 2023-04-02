import React from 'react'
import './App.scss'
import Header from './components/header/Header'
import Carousel from './components/carousel/Carousel'
import Menu from './components/menu/Menu'




const  App = () => {
  return (
    <div>
        <Header />
        <Carousel />
        <Menu/>
    </div>
  )
}

export default App
