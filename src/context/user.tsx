import React, {createContext, useEffect, useState} from 'react';
import { MAddress } from '../models/MAddress';
import { AdressService } from '../services/AdressService';

export const UserContext = createContext<{addresses: MAddress[], getAddresses():void}>({
    addresses:[],
    getAddresses:()=>{}
});

export function UserProvider({children}: any){

    const adrService = new AdressService();
    const [addresses, setAdresses] = useState<MAddress[]>([])

    const getAddresses = () => {
        adrService.GetAll()
        .then(data => {
            setAdresses(data);
        })
    }

    return(
        <UserContext.Provider value={{
            addresses,
            getAddresses
        }}>
            {children}
        </UserContext.Provider>
    )
}