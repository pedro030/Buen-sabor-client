import { createContext, useContext, useEffect, useState } from 'react';
import { MLocation } from '../models/MLocation';
import { LocationService } from '../services/LocationService';
import { UserContext } from './user';

interface ILocationsContext {
    locations: MLocation[],
    getLocations(): void,
}

export const LocationsContext = createContext<ILocationsContext>({
    locations: [],
    getLocations: () => { },
});

export function LocationsProvider({ children }: any) {
    const {tokenUser} = useContext(UserContext);

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