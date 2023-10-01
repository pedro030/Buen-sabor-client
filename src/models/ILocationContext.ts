import { MLocation } from "./MLocation";

export interface ILocationsContext {
    locations: MLocation[],
    getLocations(): void,
}