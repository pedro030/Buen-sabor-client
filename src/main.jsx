import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'
import ProductDetail from './components/product_detail/ProductDetail';
import 'normalize.css'
import './index.css'
import routes from './router/routes'

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={routes} />
)
