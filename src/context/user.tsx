import React, {createContext, useEffect, useState} from 'react';
import { MAddress } from '../models/MAddress';
import { AdressService } from '../services/AdressService';
import { MLocation } from '../models/MLocation';
import { LocationService } from '../services/LocationService';

interface IUserContext {
    addresses: MAddress[],
    locations: MLocation[],
    getAddresses(): void,
    newAddress(ad: MAddress): Promise<boolean>
}

export const UserContext = createContext<IUserContext>({
    addresses:[],
    locations:[],
    getAddresses:()=>{},
    newAddress: () => {return new Promise<boolean>(()=>true)} 
});

export function UserProvider({children}: any){

    const adrService = new AdressService();
    const locService = new LocationService();
    const [addresses, setAdresses] = useState<MAddress[]>([])
    const [locations, setLocations] = useState<MLocation[]>([])

    const getAddresses = () => {
        // adrService.GetAll()
        // .then(data => {
        //     setAdresses(data);
        // })
        // locService.GetAll()
        // .then(data => {
        //     setLocations(data)
        // })
        setLocations(mockLocations);
        setAdresses(mockAdress);
    }

    const newAddress = (ad: MAddress) => {
        return adrService.Create(ad).then(data => {
            getAddresses()
            return data
        })
    }

    return(
        <UserContext.Provider value={{
            addresses,
            locations,
            getAddresses,
            newAddress
        }}>
            {children}
        </UserContext.Provider>
    )
}


const mockAdress: MAddress[] = [
    {
        id: 1,
        street: "Av. Las Heras",
        number: 699,
        location: {
            id: 1,
            location: "Ciudad"
        }
    },
    {
        id: 2,
        street: "Las Loicas",
        number: 699,
        location: {
            id: 1,
            location: "Ciudad"
        }
    },
    {
        id: 3,
        street: "Av. San Martin",
        number: 699,
        location: {
            id: 1,
            location: "Ciudad"
        }
    },
    {
        id: 4,
        street: "Av. Belgrano",
        number: 699,
        location: {
            id: 1,
            location: "Ciudad"
        }
    },
    {
        id: 5,
        street: "Av. Pedro Luro",
        number: 699,
        location: {
            id: 1,
            location: "Ciudad"
        }
    },
    {
        id: 6,
        street: "Av. Colon",
        number: 699,
        location: {
            id: 1,
            location: "Ciudad"
        }
    }
]

const mockLocations: MLocation[]=[
    {
        id: 1,
        location: "Ciudad"
    },
    {
        id: 2,
        location: "Godoy Cruz"
    },
    {
        id: 3,
        location: "Maipú"
    },
]