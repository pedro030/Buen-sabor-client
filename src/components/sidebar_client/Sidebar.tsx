import { CgProfile } from 'react-icons/cg'
import './sidebar.scss'
import { User, useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

function Sidebar({ user } : User) {

  const navigate = useNavigate();
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
        logoutParams: {
            returnTo: window.location.origin,
        },
    });
};

  return (
    <div className="container">
        <div className="container-img-user-role">
            <div className="left-profile-img-container"><CgProfile className="left-profile-img"/></div>
            <span className="left-username">{user?.given_name || "User"}</span>
        </div>
        <div className="nav-container">
            <ul className="nav-list">
                <li className="nav-list-item" onClick={() => navigate('/myprofile')}>Account</li>
                <li className="nav-list-item" onClick={() => navigate('/myprofile/order-history')}>Order History</li>
                <li className="nav-list-item" onClick={() => navigate('/myprofile/addresses')}>Addresses</li>
                <li className="nav-list-item" onClick={() => navigate('/myprofile/change-pass')}>Change Password</li>
                <li className="nav-list-item-logout" onClick={ handleLogout }>Log Out</li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar