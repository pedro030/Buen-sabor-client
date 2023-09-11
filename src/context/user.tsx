import React, {createContext, useEffect, useState} from 'react';
import { MAddress } from '../models/MAddress';
import { AdressService } from '../services/AdressService';
import { MLocation } from '../models/MLocation';
import { LocationService } from '../services/LocationService';
import { MUser } from '../models/MUser';
import { UserService } from '../services/UserService';
import { useAuth0 } from '@auth0/auth0-react';

interface IUserContext {
    userInfo: MUser,
    getUserInfo(mail:string):void,
    editUserInfo(us:MUser):void,
    addresses: MAddress[],
    getAddresses(): void,
    newAddress(ad: MAddress): Promise<boolean>
    deleteAddress(ad: MAddress): Promise<boolean>
    tokenUser:string
}

export const UserContext = createContext<IUserContext>({
    userInfo:{
        id:0,
        mail:"",
        firstName:"",
        lastName:"",
        blacklist:"",
        telephone:0,
    },
    getUserInfo(mail) {},
    addresses:[],
    getAddresses:()=>{},
    newAddress: () => {return new Promise<boolean>(()=>true)}, 
    deleteAddress: () => { return new Promise<boolean>(() => true) },
    editUserInfo(){},
    tokenUser:""
});

export function UserProvider({children}: any){

    const adrService = new AdressService();
    const userService = new UserService();
    const {getAccessTokenSilently} = useAuth0();
    const [tokenUser, setTokenUser] = useState("")
    const [addresses, setAdresses] = useState<MAddress[]>([])
    const [userInfo, setUserInfo] = useState<MUser>({
        id: 0,
        mail: "",
        firstName: "",
        lastName: "",
        blacklist: "",
        telephone: 0,
    })

    //user info
    const getUserInfo = (mail: string) => {
        // cambiar por llamada a getUserByEmail
        userService.getUserByMail(mail, tokenUser)
        .then(user => {
            if(user) {
                setUserInfo(user);
                if(user.addresses)setAdresses(user.addresses);
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
            getAddresses()
            return data
        })
    }

    const deleteAddress = (ad: MAddress) => {
        return adrService.Delete(ad.id, tokenUser)
            .then(data => {
                getAddresses()
                return data
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
            tokenUser
        }}>
            {children}
        </UserContext.Provider>
    )
}