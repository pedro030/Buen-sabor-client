import { Component, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Carousel from './components/carousel/Carousel'
import ProductDetail from './components/product_detail/ProductDetail'
import ProductCard from './components/product_card/productCard'




const  App = () => {
  return (
    <div>
        <Header />
        <Carousel />
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
    </div>
  )
}

export default App
