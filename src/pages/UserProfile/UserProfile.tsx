import React from 'react'
import './UserProfile.scss'
import { NavLink, Route, Routes } from 'react-router-dom'
import UserDetails from './Components/user_details/UserDetails'
import { useAuth0 } from '@auth0/auth0-react'
import Address from './Components/addresses/Address'
import Change_password from './Components/change_password/Change_password'
import History_Order from './Components/history_order/History_Order'

const UserProfile = () => {
  const { user } = useAuth0()

  return (

    <div className='grid grid-cols-[260px_1fr] min-h-[30rem]'>
      <ul className="w-56 m-4 menu bg-secondary rounded-box">
        <div className="flex justify-center avatar">
          <div className="w-24 rounded-full">
            <img src={user?.picture} />
          </div>
        </div>
        <h3 className='text-center text-gray-600 menu-title'>{user?.given_name + ' ' + user?.family_name || "User"}</h3>
        <li>
          <h2 className="menu-title">Account</h2>
          <ul>
            <li>
              <NavLink to=""
              end
              className={({ isActive }) => isActive ? "active" : ""}>Info</NavLink>
            </li>
            <li>
              <NavLink to="addresses" 
              className={({ isActive}) => isActive ? "active" : ""}>Addresses</NavLink></li>
            <li>
              <NavLink to="password-form"
              className={({ isActive }) => isActive ? "active" : ""}>Change password</NavLink></li>
          </ul>
        </li>
        <li>
          <h2 className="menu-title">Orders</h2>
          <ul>
            <li><NavLink to="orders"
              className={({ isActive }) => isActive ? "active" : ""}>Order history</NavLink></li>
          </ul>
        </li>
      </ul>
      <div className='px-4 pt-1 mt-4'>
        <Routes>
          <Route path="/" element={<UserDetails />} /> */
          <Route path="/addresses" element={<Address />} />
          <Route path="/password-form" element={<Change_password />} />
          <Route path="/orders" element={<History_Order />} />
        </Routes>
      </div>
    </div>
  )
}

export default UserProfile