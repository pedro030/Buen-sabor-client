import React, { useContext } from "react";
import "./UserProfile.scss";
import { NavLink, Route, Routes } from "react-router-dom";
import UserDetails from "./Components/user_details/UserDetails";
import { useAuth0 } from "@auth0/auth0-react";
import Address from "./Components/addresses/Address";
import Change_password from "./Components/change_password/Change_password";
import History_Order from "./Components/history_order/History_Order";
import { UserContext } from "../../context/user";
import Header from "../../components/header/Header";
import { FaBars } from 'react-icons/fa';

const UserProfile = () => {
  const { user } = useAuth0();

  const { userInfo } = useContext(UserContext);

  return (
    <>
      <Header />

      <div className='grid grid-cols-[260px_1fr] max-lg:grid-cols-1 '>
      <details className='mt-3 ml-3 lg:hidden dropdown'>
            <summary className='m-1 btn btn-circle btn-secondary'><FaBars className="w-5 h-5"/></summary>
            <ul className='p-2 shadow menu dropdown-content z-[1] bg-secondary rounded-box w-52'>
              <div className='flex justify-center avatar'>
                <div className='w-24 rounded-full'>
                  <img src={user?.picture} />
                </div>
              </div>
              <h3 className='text-center text-gray-600 menu-title'>
                {userInfo?.firstName + " " + userInfo?.lastName || "User"}
              </h3>
              <li>
                <h2 className='menu-title'>Account</h2>
                <ul>
                  <li>
                    <NavLink
                      to=''
                      end
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Info
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='addresses'
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Addresses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='password-form'
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Change password
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <h2 className='menu-title'>Orders</h2>
                <ul>
                  <li>
                    <NavLink
                      to='orders'
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Order history
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </details>
        <ul className='w-56 m-4 menu bg-secondary rounded-box max-lg:hidden'>
          
          <div className='max-lg:hidden'>
            <div className='flex justify-center avatar'>
              <div className='w-24 rounded-full'>
                <img src={user?.picture} />
              </div>
            </div>
            <h3 className='text-center text-gray-600 menu-title'>
              {userInfo?.firstName + " " + userInfo?.lastName || "User"}
            </h3>
            <li>
              <h2 className='menu-title'>Account</h2>
              <ul>
                <li>
                  <NavLink
                    to=''
                    end
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Info
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='addresses'
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Addresses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='password-form'
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Change password
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <h2 className='menu-title'>Orders</h2>
              <ul>
                <li>
                  <NavLink
                    to='orders'
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Order history
                  </NavLink>
                </li>
              </ul>
            </li>
          </div>
        </ul>
        <div className='px-4 pt-1 mt-4'>
          <Routes>
            <Route path='/' element={<UserDetails />} /> */
            <Route path='/addresses' element={<Address />} />
            <Route path='/password-form' element={<Change_password />} />
            <Route path='/orders' element={<History_Order />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
