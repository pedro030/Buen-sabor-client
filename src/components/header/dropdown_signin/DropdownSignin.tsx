// React Router
import { NavigateFunction, useNavigate } from 'react-router-dom';

//Auth0
import { useAuth0 } from '@auth0/auth0-react';

const DropdownSignin = () => {
    // Redirect URL
    const redirectUri = import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL;

    // Auth0
    const { user, loginWithRedirect, logout, isAuthenticated} = useAuth0();
    
    // Navigation
    const navigate: NavigateFunction = useNavigate();

    // Login
    const handleLogin = async () => {
        await loginWithRedirect();
    };

    // Register / Sign Up
    const handleSignUp = async () => {
        await loginWithRedirect({
            authorizationParams: {
                screen_hint: "signup",
            },
        });
    };

    // Log Out
    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: redirectUri,
            },
        });
    };

    // Switch Button if is logged
    const switchButton = () => {
        if (!isAuthenticated) {
            return <button className='w-full rounded-full btn btn-primary max-md:w-32'>Sign In</button>
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

    return (
        <>
            <div className="w-full dropdown dropdown-end">
                {switchButton()}
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border">
                    {!isAuthenticated && (
                        <>
                            <li className='cursor-pointer dropdown-item' onClick={handleLogin}>Log In</li>
                            <li className='cursor-pointer dropdown-item' onClick={handleSignUp}>Sign Up</li>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <li className='cursor-pointer dropdown-item' onClick={() => navigate('myprofile')}>My Profile</li>
                            <li className='cursor-pointer dropdown-item' onClick={handleLogout}>Log out</li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
}

export default DropdownSignin