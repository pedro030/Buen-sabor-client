import React from 'react'
import './UserProfile.scss'
import { Route, Routes } from 'react-router-dom'
import UserDetails from '../../components/user_details/UserDetails'
import { useAuth0 } from '@auth0/auth0-react'
import Sidebar from '../../components/sidebar_client/Sidebar'
import OrderHistory from '../../components/order_history/OrderHistory'
import UserAddresses from '../../components/user_addresses/UserAddresses'
import ChangePassword from '../../components/change_password/ChangePassword'

const UserProfile = () => {
  const { user } = useAuth0()
  
  return (
    <div className="user-profile-container">
      <Sidebar user={user}/>
      <div className="user-profile-details">
        <Routes>
          <Route path="/" element={<UserDetails/>} />
          <Route path="/order-history" element={<OrderHistory/>}/>
          <Route path="/addresses" element={<UserAddresses/>}/>
          <Route path="/change-pass" element={<ChangePassword/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default UserProfile