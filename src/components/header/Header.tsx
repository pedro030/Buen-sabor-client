// React
import {
  FC,
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";

// React Router
import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";

// React Responsive
import { useMediaQuery } from "react-responsive";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// Sweet Alert 2
import Swal from "sweetalert2";

// Socket
import SockJS from "sockjs-client";
import { over, Client } from "stompjs";

// Contexts
import { UserContext } from "../../context/user";
import { CartContext } from "../../context/cart";
import { FiltersContext } from "../../context/filters";

// Components
import DropdownSignin from "./dropdown_signin/DropdownSignin";
import EditCartModal from "../menu/EditCartModal/EditCartModal";

// Types
import { IUserContext } from "../../models/IUserContext";
import { INavbarLink } from "../../models/INavBarLink";
import { MOrder } from "../../models/MOrder";
import { ICartContext, MCart } from "../../models/ICartContext";
import { IFilterContext } from "../../models/IFilterContext";

// Assets
import notepad from "../../assets/notepad.svg";
import searcher from "../../assets/searcher.svg";
import cartImg from "../../assets/cart.svg";

// Styles
import "./Header.scss";
import { MenuHeader } from "./components/MenuHeader";

const Header: FC = () => {
  // Auth0
  const { loginWithRedirect } = useAuth0();

  // User Information
  const { userInfo }: IUserContext = useContext(UserContext);

  // Responsive
  const isTable = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 750 });

  // Cart
  const { cart }: ICartContext = useContext(CartContext);

  // Filters
  const { filters, setFilters }: IFilterContext = useContext(FiltersContext);

  const [navbarLinks, setNavbarLinks] = useState<INavbarLink[]>([
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Help", path: "/help" },
    { id: 3, title: "Menu", path: "/menu" },
    { id: 4, title: "About", path: "/about" },
  ]);

  // Navigate
  const navigate: NavigateFunction = useNavigate();

  // Cart Modal State
  const [isEditCartModalOpen, setIsEditCartModalOpen] =
    useState<boolean>(false);

  const handleOpenProductModal = () => {
    setIsEditCartModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsEditCartModalOpen(false);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => ({
      ...prevState,
      search: e.target.value,
    }));
  };

  // Si se presiona Enter, se realiza un scroll hacia el Menú
  const scrollToSection = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const seccionDestino = document.getElementById("menuSeccion");
      if (seccionDestino) {
        seccionDestino.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // WebSocket
  const [pendingOrders, setPendingOrders] = useState<MOrder[]>([]);
  const [stompClient, setStompClient] = useState<Client>(
    over(new SockJS("https://buen-sabor-backend-production.up.railway.app/ws"))
  );

  // Conexion al Socket
  const connectSocket = () => {
    stompClient.connect({}, onConnected, onError);
  };

  // Que hacer cuando se conecta al socket
  const onConnected = async () => {
    try {
      // Se subscribe al tópico
      await stompClient.subscribe(
        `/user/${userInfo.mail}/private`,
        onMessageReceived
      );
      await stompClient.send(
        `/app/private-message`,
        {},
        JSON.stringify(userInfo.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Recibimiento y seteo de ordenes enviadas por el Socket
  const onMessageReceived = (payload: { body: string }) => {
    const payloadData: MOrder[] = JSON.parse(payload.body);
    setPendingOrders(payloadData);

    // Si no hay ordenes pendientes se desconecta del Socket
    if (payloadData.length === 0) stompClient?.disconnect(() => {});
  };

  // Por si hay un error en la conexion al Socket
  const onError = (err: any) => {
    console.log(err);
  };

  useEffect(() => {
    // Si existe el mail del user se conecta al Socket
    //if(userInfo.mail.length > 0) connectSocket();

    // Al desmontar el componente
    return () => {
      // Si la conexión está establecida se desconecta del Socket
      stompClient.connected ? stompClient?.disconnect(() => {}) : "";
    };
  }, []);

  // The User is Logged to Continue Shopping?
  const handleLogin = () => {
    if (userInfo.id === 0) {
      Swal.fire({
        icon: "warning",
        title: "Login",
        text: "To continue shopping you need to login",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: "Login",
        confirmButtonColor: "#E73636",
      }).then((result) => {
        if (result.isConfirmed) {
          loginWithRedirect();
        }
      });
    } else navigate("/order-detail");
  };

  return (
    <>
      <nav className='sticky top-0 z-10 flex flex-col gap-2 shadow bg-base-100 navbar '>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex flex-row items-center justify-between w-full px-2'>
            <MenuHeader/>
            <a className='text-xl normal-case cursor-pointer'>
              <h1
                className='ml-5 font-bold text-red-600 max-lg:mx-1'
                onClick={() => navigate("/")}
              >
                Buen Sabor
              </h1>
            </a>
            <input
            type='search'
            placeholder='Search Food'
            className='hidden rounded-full w-[70%] h-11 input input-bordered lg:inline'
            onChange={handleChangeSearch}
            value={filters.search}
            onKeyDown={scrollToSection}
          />
            <div className="flex flex-row items-center justify-center gap-5">
            
              {/* PENDING ORDERS */}
              <div className='hidden dropdown dropdown-end lg:inline'>
                <div
                  tabIndex={0}
                  className='flex justify-center cursor-pointer '
                >
                  <img src={notepad} height='25' />
                </div>
                <ul
                  tabIndex={0}
                  className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2 '
                >
                  <div className='overflow-y-auto'>
                    <table className='table '>
                      <thead>
                        <tr>
                          <th>N Order</th>
                          <th>State</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingOrders.length > 0 ? (
                          pendingOrders.map((o: MOrder) => {
                            return (
                              <tr
                                key={o.id}
                                className='cursor-pointer hover'
                                onClick={() =>
                                  navigate(`/order-tracking/${o.id}`)
                                }
                              >
                                <th>{o.id}</th>
                                <td>
                                  <div className='badge badge-secondary'>
                                    {o.statusOrder.statusType.replace("_", " ")}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className='my-auto text-lg font-bold text-center h-36 text-secondary'
                            >
                              No Pending Orders
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </ul>
              </div>

              {/* HEADER CART */}
              <div className='hidden dropdown dropdown-end lg:inline'>
                <div
                  tabIndex={0}
                  className='flex justify-center cursor-pointer'
                >
                  <img src={cartImg} height='25' />
                </div>
                <ul
                  tabIndex={0}
                  className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64 mt-2'
                >
                  <div className='flex justify-end pr-8'>
                    <a
                      className='text-xs font-bold cursor-pointer btn-sm btn btn-primary'
                      onClick={() => handleOpenProductModal()}
                    >
                      edit
                    </a>
                  </div>
                  <div className='h-48 overflow-y-auto scrollbar'>
                    <table className='table '>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart[0].quantity === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className='my-auto text-xl font-bold text-center h-36 text-secondary'
                            >
                              Empty Cart
                            </td>
                          </tr>
                        ) : (
                          cart.map((item: MCart, index: number) => {
                            // console.log(item)
                            return (
                              <tr key={index}>
                                <td className='text-xs'>
                                  {item.quantity}x {item.product.name}
                                </td>
                                <td className='text-xs'>
                                  ${item.product.price * item.quantity}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  {cart[0].quantity === 0 ? (
                    <button className='w-full mt-1 rounded-full btn btn-primary btn-sm btn-disabled '>
                      Continue
                    </button>
                  ) : (
                    <button
                      className='w-full mt-1 rounded-full btn btn-primary btn-sm '
                      onClick={handleLogin}
                    >
                      Continue
                    </button>
                  )}
                </ul>
            </div>
            <div className='flex dropdown dropdown-end'>
              <DropdownSignin />
            </div>
            </div>
            
          </div>

          <input
            type='search'
            placeholder='Search Food'
            className=' rounded-full h-11 w-[95%] input input-bordered lg:hidden'
            onChange={handleChangeSearch}
            value={filters.search}
            onKeyDown={scrollToSection}
          />
        </div>
        {/* NAV BAR */}
        <ul className='flex flex-row justify-around w-full pt-1 text-gray-400 '>
          {navbarLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* EDIT CART MODAL */}
      <EditCartModal
        isOpen={isEditCartModalOpen}
        onClose={handleCloseProductModal}
      />
    </>
  );
};

export default Header;
