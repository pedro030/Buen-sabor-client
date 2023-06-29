import React, { useState } from 'react'
import './Dropdown.scss'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const DropdownSignin = () => {
    const redirectUri = import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL;
    const [isOpen, setIsOpen] = useState(false);

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
                returnTo: redirectUri,
            },
        });
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const swithButton = () => {
        if (!isAuthenticated) {
            return <button className='w-full rounded-full btn btn-primary'>Sign In</button>
        } else {
            return (
                <div className='pt-2 hero'>
                    <button>
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.picture} />
                            </div>
                        </div>
                    </button>
                </div>)
        }
    }

    const { user } = useAuth0()

    return (
        <>
            <div className="w-full dropdown dropdown-end">

                {swithButton()}

                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                    {!isAuthenticated && (
                        <>
                            <li className='dropdown-item' onClick={handleLogin}>Log In</li>
                            <li className='dropdown-item' onClick={handleSignUp}>Log Up</li>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <li className='dropdown-item' onClick={() => navigate('myprofile')}>My Profile</li>
                            <li className='dropdown-item' onClick={handleLogout}>Log out</li>
                        </>
                    )}
                </ul>
            </div>

            {/* <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                <div className="dropdown__toggle">
                    <span className='button'>{!isAuthenticated ? "Sign In" : "O"}</span>
                </div>
                {isOpen && (
                    <ul className="dropdown__list">
                        {!isAuthenticated && (
                            <>
                                <li className='dropdown-item' onClick={handleLogin}>Log In</li>
                                <li className='dropdown-item' onClick={handleSignUp}>Log Up</li>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <li className='dropdown-item' onClick={() => navigate('myprofile')}>My Profile</li>
                                <li className='dropdown-item' onClick={handleLogout}>Logout</li>
                            </>
                        )}
                    </ul>
                )}
            </div> */}
        </>
    );
}

export default DropdownSignin