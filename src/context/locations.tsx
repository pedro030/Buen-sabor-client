import { createContext, useEffect, useState } from 'react';
import { MLocation } from '../models/MLocation';
import { LocationService } from '../services/LocationService';

interface ILocationsContext {
    locations: MLocation[],
    getLocations(): void,
}

export const LocationsContext = createContext<ILocationsContext>({
    locations: [],
    getLocations: () => { },
});

export function LocationsProvider({ children }: any) {

    const locService = new LocationService();
    const [locations, setLocations] = useState<MLocation[]>([])

    // addresses
    const getLocations = () => {
        locService.GetAll()
            .then(data => {
                setLocations(data);
            })
    }
    useEffect(()=>{
        getLocations()
    },[])

    return (
        <LocationsContext.Provider value={{
            locations,
            getLocations
        }}>
            {children}
        </LocationsContext.Provider>
    )
}