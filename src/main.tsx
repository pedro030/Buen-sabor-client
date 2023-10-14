// React DOM
import ReactDOM from 'react-dom/client'

// React Router
import { BrowserRouter } from "react-router-dom";

// Components
import Auth0ProviderWithNavigate from './components/auth0/Auth0ProviderWithNavigate.jsx'
import App from './App';

// Context
import { UserProvider } from './context/user';

// Styles
import 'normalize.css'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <UserProvider>
        <App/>
      </UserProvider>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
)
