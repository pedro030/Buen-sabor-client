import React, { useEffect, useState } from 'react'
import './Header.scss'
import setting from '../../assets/setting.svg'
import bike from '../../assets/bike.svg'
import cart from '../../assets/cart.svg'
import DropdownSignin from '../dropdown_signin/DropdownSignin'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
// import searcher from '../../assets/searcher.svg'

interface NavbarLink {
    id: number;
    title: string;
    path: string;
}

const Header: React.FC = () => {
    const [navbarLinks, setNavbarLinks] = useState<NavbarLink[]>([
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'Order', path: '/order' },
        { id: 3, title: 'Menu', path: '/menu' },
        { id: 4, title: 'About', path: '/about' },
    ]);

    const [activeLink, setActiveLink] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        const currentPath = window.location.pathname;
        setActiveLink(currentPath);
      }, []);

    return (
        <nav className="nav">
            <div className='top_nav'>
                <div className="logo">
                    <h1 onClick={() => navigate('/')}>Buen Sabor</h1>
                    {/* <h4>by UTN</h4> */}
                </div>
                <div>
                    <input className="searchInput" type='search' placeholder="Search Food"></input>
                </div>

                <ul className="items">
                    <li><img src={setting} height="25" /></li>
                    {/* <li>
                        <div className='circle'>
                            <img src={bike} height="25"/>
                            <div className='circle small_circle'>1</div>
                        </div>                            
                    </li> */}

                    <li><img src={cart} height="25" /></li>
                    <DropdownSignin />
                </ul>
            </div>
            <div className="under_nave">
                <ul className="items">
                    {navbarLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={link.path}
                                className={link.path === activeLink ? 'active' : ''}
                                onClick={() => setActiveLink(link.path)}
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Header