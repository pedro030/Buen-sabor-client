// React
import { useContext, useEffect, useState } from "react";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// Components
import Header from "../../components/header/Header";
import Carousel from "./carousel/Carousel";
import Menu from "../../components/menu/Menu";
import PageLoader from "../page_loader/PageLoader";

// Context
import { UserContext } from "../../context/user";

// Types
import { IUserContext } from "../../models/IUserContext";

const Home = () => {
  // User Context
  const { userInfo }: IUserContext = useContext(UserContext);

  // Auth0
  const { isAuthenticated } = useAuth0();

  // Boolean State: User Info is Ready?
  const [userInfoReady, setUserInfoReady] = useState<boolean>(false);

  // Cada vez que cambia de estado userInfo verifica que exista un mail del user.
  useEffect(() => {
    if (userInfo?.mail.length !== 0) {
      setUserInfoReady(true);
    }
  }, [userInfo]);

  // Si el user está logueado y su información no está lista carga el PageLoader (Para el Socket).
  if (isAuthenticated && !userInfoReady) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Carousel />
      <Menu />
    </>
  );
};

export default Home;
