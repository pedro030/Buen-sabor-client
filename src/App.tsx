// React
import { useContext, useEffect } from 'react'

// Auth0
import { useAuth0 } from '@auth0/auth0-react';

// Components
import PageLoader from './pages/page_loader/PageLoader';
import Footer from './components/footer/Footer';
import AppRouter from './router/routes';

// Contexts Providers
import { CartProvider } from './context/cart';
import { FiltersProvider } from './context/filters';
import { UserContext } from './context/user';
import { PaymenthDeliveryProvider } from './context/paymenth-delivery';
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
        <AppRouter/>
      </PaymenthDeliveryProvider>
      </LocationsProvider>
      </FiltersProvider>
      </CartProvider>
      <Footer/>
    </>
  )
}

export default App
