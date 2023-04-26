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
import CategoriesCRUD from './pages/CategoriesCRUD/CategoriesCRUD';




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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myprofile" element={<AuthenticationGuard component={UserProfile}/>} />
        <Route path="/detail" element={<ProductDetail />} />
        <Route path="/categories-crud" element={ <CategoriesCRUD/> }/>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
