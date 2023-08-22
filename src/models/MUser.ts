import { MAddress } from "./MAddress";

export interface MUser {
    id: number,
    firstName: string,
    lastName: string,
    telephone: number,
    mail: string,
    blacklist: string,
    addresses?: MAddress[];
}