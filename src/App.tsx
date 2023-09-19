import React, { useContext, useEffect, useState } from 'react'
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
import { LocationsProvider } from './context/locations';


const  App = () => {

  const { isLoading, user, logout } = useAuth0();
  const { getUserInfo, tokenUser } = useContext(UserContext);

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  useEffect(() => {
    if (user && tokenUser) {
      if (user.email) getUserInfo(user.email);
    }
  }, [tokenUser])

  // Logout por Inactividad de 45 Minutos
  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout | null = null;

    // Función para reiniciar el temporizador de inactividad
    const resetInactivityTimeout = () => {
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }

      // Configura el tiempo de espera nuevamente
      inactivityTimeout = setTimeout(() => {
        logout()
      }, 45 * 60 * 1000); // 45 minutos en milisegundos
    };

    // Agrega controladores de eventos para rastrear la actividad
    window.addEventListener('mousemove', resetInactivityTimeout);
    window.addEventListener('keydown', resetInactivityTimeout);
    window.addEventListener('click', resetInactivityTimeout);

    // Inicializa el temporizador de inactividad
    resetInactivityTimeout();

    return () => {
      // Limpia los controladores de eventos al desmontar el componente
      window.removeEventListener('mousemove', resetInactivityTimeout);
      window.removeEventListener('keydown', resetInactivityTimeout);
      window.removeEventListener('click', resetInactivityTimeout);
    };
  }, []);
  

  return (
    <>
      <CartProvider>
      <FiltersProvider>
      <LocationsProvider>
      <PaymenthDeliveryProvider>
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
      </PaymenthDeliveryProvider>
      </LocationsProvider>
      </FiltersProvider>
      </CartProvider>
      <Footer/>
    </>
  )
}

export default App
