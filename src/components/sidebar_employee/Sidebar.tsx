import { CgProfile } from 'react-icons/cg'
import './sidebar.scss'

function Sidebar() {
  return (
    <div className="container">
        <div className="container-img-user-role">
            <div className="left-profile-img-container"><CgProfile className="left-profile-img"/></div>
            <span className="left-username">Asiel Alvarez</span>
            <span className="left-role">Admin</span>
        </div>
        <div className="nav-container">
            <ul className="nav-list">
                <li className="nav-list-item">Home</li>
                <li className="nav-list-item">My Profile</li>
                <li className="nav-list-item">Adressess</li>
                <li className="nav-list-item">Order History</li>
                <li className="nav-list-item">Users</li>
                <li className="nav-list-item">Products</li>
                <li className="nav-list-item">Categories</li>
                <li className="nav-list-item">Stock</li>
                <li className="nav-list-item">Rankings</li>
                <li className="nav-list-item">Movements</li>
                <li className="nav-list-item-logout">Log Out</li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar