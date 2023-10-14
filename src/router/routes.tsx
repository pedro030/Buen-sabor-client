// React Router
import { Route, Routes } from "react-router-dom";

// Auth0 Aunthentication
import { AuthenticationGuard } from "../components/auth0/AuthenticationGuard";

// Components
import Home from "../pages/Home/Home";
import About from "../pages/About/AboutComponent";
import MenuPage from "../pages/Menu/Menu";
import UserProfile from "../pages/UserProfile/UserProfile";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import OrderTracking from "../pages/OrderTracking/OrderTracking";
import { Help } from "../pages/Help/Help";

function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/myprofile/*" element={<AuthenticationGuard component={UserProfile}/>} />
        <Route path='/order-detail' element={<OrderDetail/>} />
        <Route path='/order-tracking/:id' element={<OrderTracking/>} />
        <Route path="*" element={<Home />} />
      </Routes>
  );
}

export default AppRouter;