// React
import { FC, useContext, useEffect, useState, ChangeEvent, KeyboardEvent } from 'react'

// React Router
import { NavLink, NavigateFunction, useNavigate } from 'react-router-dom'

// React Responsive
import { useMediaQuery } from 'react-responsive';

// Socket
import SockJS from 'sockjs-client'
import { over, Client } from 'stompjs';

// Contexts
import { UserContext } from '../../context/user'
import { CartContext } from '../../context/cart'
import { FiltersContext } from '../../context/filters'

// Components
import DropdownSignin from './dropdown_signin/DropdownSignin'
import EditCartModal from '../menu/EditCartModal/EditCartModal'

// Types
import { IUserContext } from '../../models/IUserContext'
import { INavbarLink } from '../../models/INavBarLink'
import { MOrder } from '../../models/MOrder';
import { ICartContext } from '../../models/ICartContext';

// Assets
import setting from '../../assets/setting.svg'
import notepad from '../../assets/notepad.svg'
import searcher from '../../assets/searcher.svg'
import cartImg from '../../assets/cart.svg'


const Header: FC = () => {
    // User Information
    const { userInfo }: IUserContext = useContext(UserContext);

    // Responsive
    const isTable = useMediaQuery({ maxWidth: 1024 });

    // Cart
    const { cart }: ICartContext = useContext(CartContext);

    // Filters
    const { filters, setFilters } : any = useContext(FiltersContext);

    const [navbarLinks, setNavbarLinks] = useState<INavbarLink[]>([
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'Help', path: '/help' },
        { id: 3, title: 'Menu', path: '/menu' },
        { id: 4, title: 'About', path: '/about' },
    ]);

    //esto tal vez se pueda borrar
    const [activeLink, setActiveLink] = useState('');

    // Navigate
    const navigate: NavigateFunction = useNavigate();

    // Cart Modal State
    const [isEditCartModalOpen, setIsEditCartModalOpen] = useState<boolean>(false);

    const handleOpenProductModal = () => {
        setIsEditCartModalOpen(true);
    };

    const handleCloseProductModal = () => {
        setIsEditCartModalOpen(false);
    };

    const handleChangeSearch = (e : ChangeEvent<HTMLInputElement>) => {
        setFilters((prevState: any) => ({
            ...prevState,
            search: e.target.value
        }))
    }

    // Si se presiona Enter, se realiza un scroll hacia el Menú
    const scrollToSection = (e : KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            const seccionDestino = document.getElementById('menuSeccion');
            if (seccionDestino) {
                seccionDestino.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // WebSocket
    const [pendingOrders, setPendingOrders] = useState<MOrder[]>([]);
    const [stompClient, setStompClient] = useState<Client>(over(new SockJS('https://buen-sabor-backend-production.up.railway.app/ws')))
    
    // Conexion al Socket
    const connectSocket = () => {
        stompClient.connect({}, onConnected, onError)
    }

    // Que hacer cuando se conecta al socket
    const onConnected = async () => {
        try {
            // Se subscribe al tópico
            await stompClient.subscribe(`/user/${userInfo.mail}/private`, onMessageReceived)
            await stompClient.send(`/app/private-message`, {}, JSON.stringify(userInfo.id))
        } catch (error) {
            console.log(error)
        }
    }

    // Recibimiento y seteo de ordenes enviadas por el Socket
    const onMessageReceived = (payload: { body: string; }) => {
        const payloadData: MOrder[] = JSON.parse(payload.body);
        setPendingOrders(payloadData);

        // Si no hay ordenes pendientes se desconecta del Socket
        if(payloadData.length === 0) stompClient?.disconnect(() => {})
    }
    
    // Por si hay un error en la conexion al Socket
    const onError = (err: any) => {
        console.log(err);
    }

    useEffect(() => {
        const currentPath = window.location.pathname;
        setActiveLink(currentPath);

        // Si existe el mail del user se conecta al Socket
        //if(userInfo.mail.length > 0) connectSocket();
        
        // Al desmontar el componente
        return () => {
            // Si la conexión está establecida se desconecta del Socket
            stompClient.connected ? stompClient?.disconnect(() => {}) : '';
        };
    }, []);

    return (
        <>
            <nav className="sticky top-0 z-10 grid grid-rows-[48px_32px] max-lg:grid-rows-1 bg-base-100 navbar shadow ">
                <div className=' grid grid-cols-[250px_1fr_70px_70px_70px_130px] max-lg:gap-1 max-lg:grid-cols-[1fr_70px_70px_128px] '>
                    <a className="text-xl normal-case cursor-pointer"><h1 className=' font-bold text-red-600 min-w-[28px] ml-10 max-lg:mx-1' onClick={() => navigate('/')}>Buen Sabor</h1></a>
                    { (isTable) &&
                        // SEARCH
                        <div className='flex justify-center '>
                            <img src={searcher} height="25" />
                        </div>
                    }

                    { (!isTable) && 
                        // SEARCH BAR
                        <input type="text" placeholder="Search Food" className="w-full rounded-full h-11 input input-bordered" onChange={handleChangeSearch} value={filters.search} onKeyDown={scrollToSection}/>
                    }

                    { (!isTable) &&
                    <>
                    <div></div>

                        {/* PENDING ORDERS */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className='flex justify-center cursor-pointer max-md:hidden'>
                                <img src={notepad} height="25" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2 ">
                                <div className="overflow-y-auto">
                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <th>N Order</th>
                                                <th>State</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { pendingOrders.length > 0 ? (pendingOrders.map((o: any) => {
                                                return <tr key={o.id} className='cursor-pointer hover' onClick={() => navigate(`/order-tracking/${o.id}`)}>
                                                    <th>{o.id}</th>
                                                    <td><div className="badge badge-secondary">{o.statusOrder.statusType}</div></td>
                                                </tr>
                                            })) : <tr><td colSpan={5} className="my-auto text-lg font-bold text-center h-36 text-secondary">No Pending Orders</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </ul>
                        </div>
                    </>
                    }
                    { /* HEADER CART */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className='flex justify-center cursor-pointer'>
                            <img src={cartImg} height="25" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64 mt-2">
                            <div className='flex justify-end pr-8'>
                                <a className='text-xs font-bold cursor-pointer btn-sm btn btn-primary' onClick={() => handleOpenProductModal()}>edit</a>
                            </div>
                            <div className="h-48 overflow-y-auto scrollbar">
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart[0].quantity === 0 ? <tr><td colSpan={5} className="my-auto text-xl font-bold text-center h-36 text-secondary">Empty Cart</td></tr> : (cart.map((item: any) => {
                                            return <tr key={item.id}>
                                                <td className='text-xs'>{item.quantity}x {item.name}</td>
                                                <td className='text-xs'>${item.price * item.quantity}</td>
                                            </tr>
                                        }))}
                                    </tbody>
                                </table>
                            </div>
                            {cart[0].quantity === 0 ? <button className='w-full mt-1 rounded-full btn btn-primary btn-sm btn-disabled '>Continue</button> : <button className='w-full mt-1 rounded-full btn btn-primary btn-sm ' onClick={() => navigate('/order-detail')}>Continue</button>}

                        </ul>
                    </div>
                    { /* DROPDOWN: LOG IN / LOG OUT */}
                    <div className="flex justify-end w-full dropdown dropdown-end">
                        <DropdownSignin />
                    </div>
                </div>
                { /* NAV BAR */}
                <ul className="flex flex-row justify-around pt-1 text-gray-400 max-lg:hidden">
                    {navbarLinks.map((link) => (
                        <li key={link.id}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                {link.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            { /* EDIT CART MODAL */}
            <EditCartModal
                isOpen={isEditCartModalOpen}
                onClose={handleCloseProductModal}
            />
        </>
    )
}

export default Header