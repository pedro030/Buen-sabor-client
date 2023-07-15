import React, { useContext, useEffect, useState } from 'react'
import './Header.scss'
import setting from '../../assets/setting.svg'
import notepad from '../../assets/notepad.svg'
import searcher from '../../assets/searcher.svg'
import cart from '../../assets/cart.svg'
import DropdownSignin from './dropdown_signin/DropdownSignin'
import { NavLink, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import { CartContext } from '../../context/cart'
import EditCartModal from '../menu/EditCartModal/EditCartModal'
import { FiltersContext } from '../../context/filters'
import { OrdersContext } from '../../context/orders'
// import searcher from '../../assets/searcher.svg'

interface NavbarLink {
    id: number;
    title: string;
    path: string;
}

const Header: React.FC = () => {
    const isTable = useMediaQuery({ maxWidth: 1024 });
    const context: any = useContext(CartContext);
    const { filters, setFilters } : any = useContext(FiltersContext);
    const { orders }: any = useContext(OrdersContext);

    const [navbarLinks, setNavbarLinks] = useState<NavbarLink[]>([
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'Help', path: '/help' },
        { id: 3, title: 'Menu', path: '/menu' },
        { id: 4, title: 'About', path: '/about' },
    ]);

    //esto tal vez se pueda borrar
    const [activeLink, setActiveLink] = useState('');

    const navigate = useNavigate()

    const [isEditCartModalOpen, setIsEditCartModalOpen] = useState(false);

    const handleOpenProductModal = () => {
        setIsEditCartModalOpen(true);
    };

    const handleCloseProductModal = () => {
        setIsEditCartModalOpen(false);
    };

    const handleConfirmDelete = () => {

    };

    // esto tal vez se pueda borrar se
    useEffect(() => {
        const currentPath = window.location.pathname;
        setActiveLink(currentPath);
    }, []);

    const handleChangeSearch = (e : any) => {
        setFilters((prevState: any) => ({
            ...prevState,
            search: e.target.value
        }))
    }

    const scrollToSection = (e : any) => {
        if(e.key === 'Enter') {
            const seccionDestino = document.getElementById('menuSeccion');
            if (seccionDestino) {
                seccionDestino.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    return (
        <>
            <nav className="sticky top-0 z-10 grid grid-rows-[48px_32px] max-lg:grid-rows-1 bg-base-100 navbar shadow ">
                <div className=' grid grid-cols-[250px_1fr_70px_70px_70px_130px] max-lg:gap-1 max-lg:grid-cols-[1fr_70px_70px_128px] '>
                    <a className="text-xl normal-case cursor-pointer"><h1 className=' font-bold text-red-600 min-w-[28px] ml-10 max-lg:mx-1' onClick={() => navigate('/')}>Buen Sabor</h1></a>

                    {
                        (isTable) &&
                        // Search
                        <div className='flex justify-center '>
                            <img src={searcher} height="25" />
                        </div>
                    }

                    {
                        (!isTable) && <input type="text" placeholder="Search Food" className="w-full rounded-full h-11 input input-bordered" onChange={handleChangeSearch} value={filters.search} onKeyDown={scrollToSection}/>
                    }

                    {
                        (!isTable) &&

                        <>
                            {/* Settings */}
                            <div className='flex justify-center max-md:hidden'>
                                <img src={setting} height="25" />
                            </div>

                            {/* Order List */}
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
                                                {orders.map((o: any) => {
                                                    return <tr className='cursor-pointer hover' onClick={() => navigate(`/order-tracking/${o.idOrder}`)}>
                                                        <th>{o.idOrder}</th>
                                                        <td><div className="badge badge-secondary">{o.status}</div></td>
                                                    </tr>
                                                })}
                                                {/*<tr className='cursor-pointer hover'>
                                                    <th>1</th>
                                                    <td><div className="badge badge-secondary">Preparing</div></td>
                                                </tr>
                                                <tr className='cursor-pointer hover'>
                                                    <th>2</th>
                                                    <td><div className="badge badge-warning">Delivery</div></td>
                                            </tr>*/}
                                            </tbody>
                                        </table>
                                    </div>
                                </ul>
                            </div>


                        </>

                    }

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className='flex justify-center cursor-pointer'>
                            <img src={cart} height="25" />
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
                                        {context.cart[0].quantity === 0 ? <tr><td colSpan={5} className="my-auto text-xl font-bold text-center h-36 text-secondary">Empty Cart</td></tr> : (context.cart.map((item: any) => {
                                            return <tr key={item.id}>
                                                <td className='text-xs'>{item.quantity}x {item.name}</td>
                                                <td className='text-xs'>${item.price * item.quantity}</td>
                                            </tr>
                                        }))}
                                    </tbody>
                                </table>
                            </div>
                            {context.cart[0].quantity === 0 ? <button className='w-full mt-1 rounded-full btn btn-primary btn-sm btn-disabled '>Continue</button> : <button className='w-full mt-1 rounded-full btn btn-primary btn-sm ' onClick={() => navigate('/order-detail')}>Continue</button>}

                        </ul>
                    </div>


                    <div className="flex justify-end w-full dropdown dropdown-end">
                        <DropdownSignin />
                        {/* <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
            <img src="" />
        </div>
    </label> */}
                    </div>
                </div>

                <ul className="flex flex-row justify-around pt-1 text-gray-400 max-lg:hidden">
                    {navbarLinks.map((link) => (
                        <li key={link.id}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => isActive ? "active" : ""}
                            // onClick={() => setActiveLink(link.path)}
                            >
                                {link.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <EditCartModal
                isOpen={isEditCartModalOpen}
                onClose={handleCloseProductModal}
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}

export default Header