import React, { useContext } from 'react'
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
import { UserProvider } from './context/user';
import OrderTracking from './pages/OrderTracking/OrderTracking';
import { PaymenthDeliveryProvider } from './context/paymenth-delivery';
import Login from './pages/Login/Login';




const  App = () => {

  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
    <UserProvider>
      <CartProvider>
      <FiltersProvider>
      <PaymenthDeliveryProvider>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/myprofile/*" element={<AuthenticationGuard component={UserProfile}/>} />
        {/* <Route path="/detail" element={<ProductDetail />} /> */}
        <Route path='/order-detail' element={<OrderDetail/>} />
        <Route path='/order-tracking' element={<OrderTracking/>} />
        <Route path="*" element={<Home />} />
      </Routes>
      </PaymenthDeliveryProvider>
      </FiltersProvider>
      </CartProvider>
      </UserProvider>
      <Footer/>
    </>
  )
}

export default App
