import { MAddress } from "./MAddress";
import { MOrder } from "./MOrder";
import { MRol } from "./MRol";

export interface MUser {
    id: number,
    firstName: string,
    lastName: string,
    telephone: number,
    mail: string,
    blacklist: string,
    addresses?: MAddress[];
    rol?: MRol
    password?: string
    orders: MOrder[]
}