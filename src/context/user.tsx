import React, {createContext, useEffect, useState} from 'react';
import { MAddress } from '../models/MAddress';

export const UserContext = createContext({
    addresses: [{
        id: 1, 
        street: "Calle1",
        number: 331,
        location: {
            id:1,
            location: "Mendoza"
        }
    }]
});

export function UserProvider({children}: any){
    const [addresses, setAdresses] = useState<MAddress[]>([])

    return(
        <UserContext.Provider value={{
            addresses,
        }}>
            {children}
        </UserContext.Provider>
    )
}