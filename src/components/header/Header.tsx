import React, { useEffect, useState } from 'react'
import './Header.scss'
import setting from '../../assets/setting.svg'
import bike from '../../assets/bike.svg'
import cart from '../../assets/cart.svg'
import DropdownSignin from './dropdown_signin/DropdownSignin'
import { NavLink, useNavigate } from 'react-router-dom'
// import searcher from '../../assets/searcher.svg'

interface NavbarLink {
    id: number;
    title: string;
    path: string;
}

const Header: React.FC = () => {
    const [navbarLinks, setNavbarLinks] = useState<NavbarLink[]>([
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'Coming soon', path: '/order' },
        { id: 3, title: 'Menu', path: '/menu' },
        { id: 4, title: 'About', path: '/about' },
    ]);

    //esto tal vez se pueda borrar
    const [activeLink, setActiveLink] = useState('');

    const navigate = useNavigate()

    // esto tal vez se pueda borrar se
    useEffect(() => {
        const currentPath = window.location.pathname;
        setActiveLink(currentPath);
    }, []);

    return (
        <>
            <nav className="sticky top-0 z-10 grid lg:grid-rows-[48px_32px] bg-base-100 navbar shadow grid-rows-1">
                <div className='flex justify-between lg:grid lg:grid-cols-[250px_1fr_70px_70px_130px]'>
                    <a className="text-xl normal-case"><h1 className='font-bold text-red-600 min-w-[28px] ml-10' onClick={() => navigate('/')}>Buen Sabor</h1></a>

                    <input type="text" placeholder="Search Food" className="hidden w-full rounded-full h-11 input input-bordered lg:inline" />

                    <div className='hidden lg:flex lg:justify-center'>
                        <img src={setting} height="25" />
                    </div>
                    <div className='hidden lg:flex lg:justify-center'>
                        <img src={cart} height="25" />
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

                <ul className="flex-row justify-around hidden pt-1 text-gray-400 lg:flex">
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
        </>
    )
}

export default Header