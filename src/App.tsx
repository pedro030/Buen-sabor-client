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
import { LocationsProvider } from './context/locations';
import { checkOpeningHours } from './utils/utils';

const  App = () => {
  // Auth0
  const { isLoading, user, logout } = useAuth0();

  // User Context
  const { getUserInfo, tokenUser } = useContext(UserContext);

  // Si se está logueando aparece un Loader
  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  // Si existe el user, token y email se obtiene la informacion del usuario a traves del mail
  useEffect(() => {
    if (user && tokenUser) {
      if (user.email) getUserInfo(user.email);
    }
  // Se ejecuta cada vez que cambia el estado del Token
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

    // Valida el horario del comercio
    checkOpeningHours();

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
        <AppRouter/>
      </LocationsProvider>
      </FiltersProvider>
      </CartProvider>
      <Footer/>
    </>
  )
}

export default App
