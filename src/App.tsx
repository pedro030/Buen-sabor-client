import React from 'react'
import './App.scss'
import Header from './components/header/Header'
import Carousel from './components/carousel/Carousel'
import Menu from './components/menu/Menu'
import routes from './router/routes'
import { Provider } from 'react-redux'
import store from './state/store/store'
import { RouterProvider } from 'react-router-dom'




const  App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={routes}/>
    </Provider>
  )
}

export default App
