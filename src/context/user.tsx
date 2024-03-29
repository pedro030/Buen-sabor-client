// React
import { createContext, useEffect, useState } from 'react';

// Auth0
import { User, useAuth0 } from '@auth0/auth0-react';

// Services
import { UserService } from '../services/UserService';
import { AdressService } from '../services/AdressService';

// Types
import { IUserContext } from '../models/IUserContext';
import { MUser } from '../models/MUser';
import { MOrder } from '../models/MOrder';
import { MAddress } from '../models/MAddress';
import { IContextProviderProps } from '../models/IContextProviderProps';

// Sweet Alert
import swal from 'sweetalert';
import Swal2 from 'sweetalert2';

export const UserContext = createContext<IUserContext>({
    userInfo: {
        id: 0,
        mail: "",
        firstName: "",
        lastName: "",
        blacklist: "",
        telephone: 0,
        orders: [],
    },
    getUserInfo(mail:string,user: User) { },
    addresses: [],
    getAddresses: () => { },
    newAddress: () => { return new Promise<boolean>(() => true) },
    deleteAddress: () => { return new Promise<boolean>(() => true) },
    editUserInfo() { },
    tokenUser: "",
    orders: [],
    setOrders: () => { },
    getOrders: () => { return new Promise<MOrder[]>(() => []) }
});

export function UserProvider({ children }: IContextProviderProps) {
    // Services
    const adrService = new AdressService();
    const userService = new UserService();

    // Auth0
    const { getAccessTokenSilently } = useAuth0();

    // User States: Token, Addresses, Orders, UserInfo
    const [tokenUser, setTokenUser] = useState("")
    const [addresses, setAdresses] = useState<MAddress[]>([])
    const [orders, setOrders] = useState<MOrder[]>([])
    const [userInfo, setUserInfo] = useState<MUser>({
        id: 0,
        mail: "",
        firstName: "",
        lastName: "",
        blacklist: "",
        telephone: 0,
        orders: []
    })

    // Get User Info
    const getUserInfo = (mail:string,user: User|undefined = undefined) => {
        userService.getUserByMail(mail, tokenUser)
            .then(sessionUser => {
                if (sessionUser) {
                    setUserInfo(sessionUser);
                    if (sessionUser.blacklist !== "Enabled") swal("This user is not enabled to place orders\nFor more information contact the administrator", { dangerMode: true });
                    if (sessionUser.addresses) setAdresses(sessionUser.addresses);
                    if (sessionUser.orders) setOrders(sessionUser.orders)
                } else {
                    signUpUser(mail, user?.given_name ?? "", user?.family_name ?? "")
                }
            })
    }

    // Register User
    const signUpUser = (mail: string, firstName = "", lastName = "") => {
        const newUser: MUser = {
            id: 0,
            mail: mail,
            firstName: firstName,
            lastName: lastName,
            password: "",
            telephone: 0,
            blacklist: "Enabled",
            rol: { id: 6, rol: "Client" },
            addresses: [],
            orders: []
        }
        userService.Create(newUser, tokenUser)
            .then(() => {
                userService.getUserByMail(mail, tokenUser)
                    .then(user => setUserInfo(user))
            })
    }

    // Edit User Info
    const editUserInfo = (u: MUser) => {
        Swal2.fire({
            title: 'Updating...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
            didOpen: () => {
                Swal2.showLoading();
            },
        })
        userService.Update(u, tokenUser)
            .then(data => {
                if (data) { 
                    getUserInfo(u.mail)
                    Swal2.fire({
                        icon: 'success',
                        title: `The update was successful`,
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showCancelButton: false,
                        confirmButtonColor: '#E73636'
                    })
                }
            })
            .catch(() => { Swal2.fire({ title: 'There was an error', icon: 'error', confirmButtonColor: '#E73636' })})
    }

    // Al cargar el context obtener el token del mismo
    useEffect(() => {
        getAccessTokenSilently({
            authorizationParams: {
                audience: import.meta.env.VITE_REACT_APP_AUDIENCE,
            },
        })
            .then(token => {
                setTokenUser(token);
            })
            .catch(err => {
                console.log(err)
            })
    }, [getAccessTokenSilently])

    // Get User Addresses
    const getAddresses = () => {
        userService.getUserByMail(userInfo.mail, tokenUser)
            .then(sessionUser => {
                if (sessionUser.addresses) setAdresses(sessionUser.addresses);
            })
    }

    // Add Address to User Addresses
    const newAddress = (ad: MAddress) => {
        ad.user = userInfo
        return adrService.Create(ad, tokenUser).then(data => {
            getAddresses();
            return data;
        })
    }

    // Delete Address
    const deleteAddress = (ad: MAddress) => {
        return adrService.Delete(ad.id, tokenUser)
            .then(data => {
                getAddresses();
                return data;
            })
    }

    // Get All User Addresses
    const getOrders = (): Promise<MOrder[]> => {
        return userService.getOrdersByUser(userInfo.id, tokenUser)
            .then((res) => {
                return res;
            })
    }

    return (
        <UserContext.Provider value={{
            userInfo,
            getUserInfo,
            editUserInfo,
            addresses,
            getAddresses,
            newAddress,
            deleteAddress,
            tokenUser,
            orders,
            setOrders,
            getOrders
        }}>
            {children}
        </UserContext.Provider>
    )
}