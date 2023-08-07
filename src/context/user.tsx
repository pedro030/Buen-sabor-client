import React, {createContext, useEffect, useState} from 'react';
import { MAddress } from '../models/MAddress';
import { AdressService } from '../services/AdressService';
import { MLocation } from '../models/MLocation';
import { LocationService } from '../services/LocationService';
import { MUser } from '../models/MUser';

interface IUserContext {
    userInfo?: MUser,
    addresses: MAddress[],
    getAddresses(): void,
    newAddress(ad: MAddress): Promise<boolean>
    deleteAddress(ad: MAddress): Promise<boolean>
}

export const UserContext = createContext<IUserContext>({
    addresses:[],
    getAddresses:()=>{},
    newAddress: () => {return new Promise<boolean>(()=>true)}, 
    deleteAddress: () => { return new Promise<boolean>(() => true) }
});

export function UserProvider({children}: any){

    const adrService = new AdressService();
    const [addresses, setAdresses] = useState<MAddress[]>([])
    const [userInfo, setUserInfo] = useState<MUser>({
        id: 1,
        firstName: "Rodrigo",
        lastName: "Vargas",
        telephone: 2615711981,
        mail: "rodrigo@gmail.com",
        blacklist: "Enabled",
    })

    // addresses
    const getAddresses = () => {
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
            addresses,
            getAddresses,
            newAddress,
            deleteAddress
        }}>
            {children}
        </UserContext.Provider>
    )
}