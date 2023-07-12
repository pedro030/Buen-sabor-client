import { MLocation } from "./MLocation";

export interface MAddress{
    id: number;
    street: string;
    number: number;
    location: MLocation;
}