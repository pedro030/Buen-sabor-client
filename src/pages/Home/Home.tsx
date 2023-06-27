import React from 'react'
import './Home.scss'
import Header from '../../components/header/Header'
import Carousel from '../../components/carousel/Carousel'
import Menu from '../../components/menu/Menu'
import Footer from '../../components/footer/Footer'




const Home = () => {
    return (
        <div>
            <Carousel />
            <Menu />
        </div>
    )
}

export default Home