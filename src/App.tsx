import React from 'react'
import './App.scss'
import { Route, Routes } from "react-router-dom";
import ProductDetail from './components/product_detail/ProductDetail'
import Home from './pages/Home/Home';
import { useAuth0 } from '@auth0/auth0-react';
import PageLoader from './components/page_loader/PageLoader';
import UserProfile from './pages/UserProfile/UserProfile';
import { AuthenticationGuard } from './components/auth0/AuthenticationGuard';
import Header from './components/header/Header';
import OrderList from './components/order_list/OrderList';




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
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myprofile/*" element={<AuthenticationGuard component={UserProfile}/>} />
        <Route path="/detail" element={<ProductDetail />} />
        <Route path="/cart" element={ <OrderList/> }/>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
