// Auth0
import { Auth0Provider } from "@auth0/auth0-react";

// React Router
import { useNavigate } from "react-router-dom";

// Interfaces
import { IAuth0ProviderWithNavigate } from "../../interfaces/IAuth0ProviderWithNavigate";

const Auth0ProviderWithNavigate = (props: IAuth0ProviderWithNavigate) => {
  // Navigation
  const navigate = useNavigate();

  // Variables de Entorno
  const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_REACT_APP_AUDIENCE;

  // Donde retorna el login
  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return <p>Bad params</p>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience 
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {props.children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate