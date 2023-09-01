import React, { useContext, useEffect } from 'react'
import './App.scss'
import { Route, Routes } from "react-router-dom";
import ProductDetail from './components/menu/product_detail/ProductDetail'
import Home from './pages/Home/Home';
import { useAuth0 } from '@auth0/auth0-react';
import PageLoader from './pages/page_loader/PageLoader';
import UserProfile from './pages/UserProfile/UserProfile';
import { AuthenticationGuard } from './components/auth0/AuthenticationGuard';
import Header from './components/header/Header';
import MenuPage from './pages/Menu/Menu';
import Footer from './components/footer/Footer';
import About from './pages/About/AboutComponent';
import { CartProvider } from './context/cart';
import OrderDetail from './pages/OrderDetail/OrderDetail';
import { FiltersProvider } from './context/filters';
import { UserContext } from './context/user';
import OrderTracking from './pages/OrderTracking/OrderTracking';
import { PaymenthDeliveryProvider } from './context/paymenth-delivery';
import Login from './pages/Login/Login';
import { OrdersProvider } from './context/orders';
import { LocationsProvider } from './context/locations';




const  App = () => {

  const { isLoading, user } = useAuth0();
  const { getUserInfo } = useContext(UserContext);

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  useEffect(() => {
    if (user) {
      if (user.email) getUserInfo(user.email);
    }
  }, [])
  
  

  return (
    <>
      <CartProvider>
      <FiltersProvider>
      <LocationsProvider>
      <PaymenthDeliveryProvider>
      <OrdersProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/myprofile/*" element={<AuthenticationGuard component={UserProfile}/>} />
        {/* <Route path="/detail" element={<ProductDetail />} /> */}
        <Route path='/order-detail' element={<OrderDetail/>} />
        <Route path='/order-tracking/:id' element={<OrderTracking/>} />
        <Route path="*" element={<Home />} />
      </Routes>
      </OrdersProvider>
      </PaymenthDeliveryProvider>
      </LocationsProvider>
      </FiltersProvider>
      </CartProvider>
      <Footer/>
    </>
  )
}

export default App
