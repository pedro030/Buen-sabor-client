import React from 'react'
import './Header.scss'
import setting from '../../assets/setting.svg'
import bike from '../../assets/bike.svg'
import cart from '../../assets/cart.svg'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
// import searcher from '../../assets/searcher.svg'


const  Header = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    const handleLogin = async () => {
        await loginWithRedirect();
    };

    const handleSignUp = async () => {
        await loginWithRedirect({
            authorizationParams: {
                screen_hint: "signup",
            },
        });
    };

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    return (
        <nav className="nav">
            <div className='top_nav'>
                <div className="logo">
                    <h1>Buen Sabor</h1>
                    {/* <h4>by UTN</h4> */}
                </div>
                <div >
                    <input className="searchInput" type='search'placeholder="         Search Food"></input>
                    </div>
                    
                    <ul className="items">
                        <li><img src={setting} height="25"/></li>

                        <li>
                            <div className='circle'>
                                <img src={bike} height="25"/>
                                <div className='circle small_circle'>1</div>
                            </div>
                            
                        </li>

                        <li><img src={cart} height="25"/></li>
                    {!isAuthenticated && (
                        <>
                            <li><button onClick={handleLogin}>Sign in</button></li>
                            <li><button onClick={handleSignUp}>Sign Up</button></li>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                        <li onClick={()=>navigate('myprofile')}>My Profile</li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                        </>
                    )}
                    </ul>
                    
                
            </div>
            <div className="under_nave">
                <ul className="items">
                    <li className='active'>Home</li>
                    <li>Order</li>
                    <li>Menu</li>
                    <li>About us</li>
                </ul>
            </div>
        </nav>
    )
  }

  export default Header