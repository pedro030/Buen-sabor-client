import React from 'react'
import './Home.scss'
import Header from '../../components/header/Header'
import Carousel from './carousel/Carousel'
import Menu from '../../components/menu/Menu'
import Footer from '../../components/footer/Footer'
import OrderDetail from '../OrderDetail/OrderDetail'
import OrderTracking from '../OrderTracking/OrderTracking'
import Register from '../Register/Register'
import Login from '../Login/Login'
import { FiltersProvider } from '../../context/filters'
import { CartProvider } from '../../context/cart'

const Home = () => {
    return (
        <div>
            <FiltersProvider>
            
                <Carousel />
                <Menu />

                {/* <OrderDetail/> */}

                {/* <OrderTracking /> */}

                {/* <Register/> */}
                {/* <Login/> */}
            </FiltersProvider>
        </div >
    )
}

export default Home