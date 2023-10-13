// React
import { createContext, useEffect, useState } from 'react';

// Auth0
import { useAuth0 } from '@auth0/auth0-react';

// Services
import { UserService } from '../services/UserService';
import { AdressService } from '../services/AdressService';

// Types
import { IUserContext } from '../models/IUserContext';
import { MUser } from '../models/MUser';
import { MOrder } from '../models/MOrder';
import { MAddress } from '../models/MAddress';
import { IContextProviderProps } from '../models/IContextProviderProps';

// External
import swal from 'sweetalert';


export const UserContext = createContext<IUserContext>({
    userInfo:{
        id: 0,
        mail: "",
        firstName: "",
        lastName: "",
        blacklist: "",
        telephone: 0,
        orders: [],
    },
    getUserInfo(mail: string) {},
    addresses: [],
    getAddresses: () => {},
    newAddress: () => { return new Promise<boolean>(()=>true) }, 
    deleteAddress: () => { return new Promise<boolean>(() => true) },
    editUserInfo() {},
    tokenUser: "",
    orders: [],
    setOrders: () => {}
});

export function UserProvider({children}: IContextProviderProps){
    const adrService = new AdressService();
    const userService = new UserService();
    const {getAccessTokenSilently} = useAuth0();
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

    //user info
    const getUserInfo = (mail: string) => {
        // cambiar por llamada a getUserByEmail
        userService.getUserByMail(mail, tokenUser)
        .then(sessionUser => {
            if(sessionUser) {
                setUserInfo(sessionUser);
                if(sessionUser.blacklist !== "Enabled")swal("This user is not enabled to place orders\nFor more information contact the administrator", {dangerMode: true});
                if(sessionUser.addresses)setAdresses(sessionUser.addresses);
                if(sessionUser.orders) setOrders(sessionUser.orders)
            }else{
                signUpUser(mail)
            }
        })
    }

    const signUpUser = (mail:string) => {
        const newUser: MUser = {
            id: 0,
            mail: mail,
            firstName: "",
            lastName: "",
            password: "",
            telephone: 0,
            blacklist: "Enabled",
            rol: {id: 6, rol:"Client"},
            addresses:[],
            orders:[]
        }
        userService.Create(newUser, tokenUser)
        .then(() => {
            userService.getUserByMail(mail,tokenUser)
            .then(user => setUserInfo(user))
        })
    }

    const editUserInfo = (u: MUser) => {
        userService.Update(u, tokenUser)
        .then(data => {
            if(data){getUserInfo(u.mail)}
        })
    }
    useEffect(()=>{
        getAccessTokenSilently({
            authorizationParams: {
                audience: import.meta.env.VITE_REACT_APP_AUDIENCE,
            },
        }).then(token => {
            setTokenUser(token);
        })
        .catch(err => {
            console.log(err)
        })
    },[getAccessTokenSilently])

    // addresses
    const getAddresses = () => {
        // TODO cambiar llamada a getUserAddresses
        adrService.GetAll(tokenUser)
        .then(data => {
            const userAddresses = data.filter(a => a.user?.id == userInfo?.id)
            setAdresses(userAddresses);
        })
    }

    const newAddress = (ad: MAddress) => {
        ad.user = userInfo
        return adrService.Create(ad, tokenUser).then(data => {
            getAddresses();
            return data;
        })
    }

    const deleteAddress = (ad: MAddress) => {
        return adrService.Delete(ad.id, tokenUser)
            .then(data => {
                getAddresses();
                return data;
            })
    }

    return(
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
            setOrders
        }}>
            {children}
        </UserContext.Provider>
    )
}