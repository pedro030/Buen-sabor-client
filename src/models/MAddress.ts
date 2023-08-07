import { MLocation } from "./MLocation";
import { MUser } from "./MUser";

export interface MAddress{
    id: number;
    street: string;
    number: number;
    location: MLocation;
    user?: MUser;
}