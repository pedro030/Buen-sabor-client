import React from 'react'
import './UserProfile.scss'
import { Link, Route, Routes } from 'react-router-dom'
import UserDetails from '../../components/user_details/UserDetails'
import { useAuth0 } from '@auth0/auth0-react'
import Address from '../../components/addresses/Address'
import Change_password from '../../components/change_password/Change_password'
import History_Order from '../../components/history_order/History_Order'

const UserProfile = () => {
  const { user } = useAuth0()

  return (

    <div className='grid grid-cols-[260px_1fr]'>
      <ul className="w-56 m-4 max-h-96 menu bg-secondary rounded-box">
        <div className="flex justify-center avatar">
          <div className="w-24 rounded-full">
            <img src={user?.picture} />
          </div>
        </div>
        <h3 className='text-center text-gray-600 menu-title'>{user?.given_name + ' ' + user?.family_name || "User"}</h3>
        <li>
          <h2 className="menu-title">Account</h2>
          <ul>
            <li><a>Info</a></li>
            <li><a>Addresses</a></li>
            <li><a>Change password</a></li>
          </ul>
        </li>
        <li>
          <h2 className="menu-title">Orders</h2>
          <ul>
            <li><a>Order history</a></li>
          </ul>
        </li>
      </ul>
      <div className='px-4 pt-1 mt-4'>
        <Routes>
          {/* <Route path="/" element={<UserDetails />} /> */}
          {/* <Route path="/" element={<Address />} /> */}
          {/* <Route path="/" element={<Change_password />} /> */}
          {/* <Route path="/" element={<History_Order />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default UserProfile