import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import 'normalize.css'
import './index.scss'
import routes from './router/routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={routes} />
)
