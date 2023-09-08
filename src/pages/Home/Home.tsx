import React, { useContext, useEffect, useState } from 'react'
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
import { UserContext, UserProvider } from '../../context/user'
import PageLoader from '../page_loader/PageLoader'

const Home = () => {

    const { userInfo }: any = useContext(UserContext)
    const [userInfoReady, setUserInfoReady] = useState(false);

      useEffect(() => {
    
        if(userInfo.mail.length !== 0) {
          setUserInfoReady(true);
      }
    
      }, [userInfo])

      if (!userInfoReady) {
        return (
          <div className="page-layout">
            <PageLoader />
          </div>
        );
      }

    return (
        <div>
                <Header />
                <Carousel />
                <Menu />
        </div >
    )
}

export default Home