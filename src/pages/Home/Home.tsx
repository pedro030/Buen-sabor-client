import React from 'react'
import './Home.scss'
import Header from '../../components/header/Header'
import Carousel from '../../components/carousel/Carousel'
import Menu from '../../components/menu/Menu'




const Home = () => {
    return (
        <div>
            {/* <Header /> */}
            <Carousel />
            <Menu />
        </div>
    )
}

export default Home