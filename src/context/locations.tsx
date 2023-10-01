// React
import { createContext, useContext, useEffect, useState } from 'react';

// Services
import { LocationService } from '../services/LocationService';

// Context
import { UserContext } from './user';

// Types
import { MLocation } from '../models/MLocation';
import { IContextProviderProps } from '../models/IContextProviderProps';
import { ILocationsContext } from '../models/ILocationContext';
import { IUserContext } from '../models/IUserContext';

export const LocationsContext = createContext<ILocationsContext>({
    locations: [],
    getLocations: () => { },
});

export function LocationsProvider({ children }: IContextProviderProps) {
    const { tokenUser } : IUserContext = useContext(UserContext);

    const locService = new LocationService();
    const [locations, setLocations] = useState<MLocation[]>([])

    // addresses
    const getLocations = () => {
        if(tokenUser){
            locService.GetAll(tokenUser)
                .then(data => {
                    setLocations(data);
                })
        }
    }
    useEffect(()=>{
        getLocations()
    },[tokenUser])

    return (
        <LocationsContext.Provider value={{
            locations,
            getLocations
        }}>
            {children}
        </LocationsContext.Provider>
    )
}