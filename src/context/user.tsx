import React, {createContext, useEffect, useState} from 'react';
import { MAddress } from '../models/MAddress';
import { AdressService } from '../services/AdressService';
import { MLocation } from '../models/MLocation';
import { LocationService } from '../services/LocationService';
import { MUser } from '../models/MUser';
import { UserService } from '../services/UserService';

interface IUserContext {
    userInfo: MUser,
    getUserInfo(mail:string):void,
    editUserInfo(us:MUser):void,
    addresses: MAddress[],
    getAddresses(): void,
    newAddress(ad: MAddress): Promise<boolean>
    deleteAddress(ad: MAddress): Promise<boolean>
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
    editUserInfo(){}
});

export function UserProvider({children}: any){

    const adrService = new AdressService();
    const userService = new UserService();
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
        userService.GetAll()
        .then(data => {
            const sessionUser = data.find(u => u.mail === mail)
            if(sessionUser) {
                console.log(sessionUser);
                setUserInfo(sessionUser);
                console.log(userInfo);
                if(sessionUser.addresses)setAdresses(sessionUser.addresses);
            };
        })
    }

    const editUserInfo = (u: MUser) => {
        console.log("Edit User Info");
        console.log(u);
        userService.Update(u)
        .then(data => {
            if(data){getUserInfo(u.mail)}
        })
    }

    // addresses
    const getAddresses = () => {
        // TODO cambiar llamada a getUserAddresses
        adrService.GetAll()
        .then(data => {
            const userAddresses = data.filter(a => a.user?.id == userInfo?.id)
            setAdresses(userAddresses);
        })
    }

    const newAddress = (ad: MAddress) => {
        ad.user = userInfo
        return adrService.Create(ad).then(data => {
            getAddresses()
            return data
        })
    }

    const deleteAddress = (ad: MAddress) => {
        return adrService.Delete(ad.id)
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
            deleteAddress
        }}>
            {children}
        </UserContext.Provider>
    )
}