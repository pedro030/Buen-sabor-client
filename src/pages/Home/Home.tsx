import React from 'react'
import './Home.scss'
import Header from '../../components/header/Header'
import Carousel from '../../components/carousel/Carousel'
import Menu from '../../components/menu/Menu'
import Footer from '../../components/footer/Footer'
import OrderDetail from '../OrderDetail/OrderDetail'
import OrderTracking from '../OrderTracking/OrderTracking'

const Home = () => {
    const myModal = document.getElementById('my_modal_1') as HTMLElement
    return (
        <div>
            {/* <Carousel />
            <Menu /> */}

            {/* <OrderDetail/> */}

            <OrderTracking />
        </div >
    )
}

export default Home