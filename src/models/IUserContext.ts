import { Dispatch, SetStateAction } from "react"
import { MAddress } from "../models/MAddress"
import { MOrder } from "../models/MOrder"
import { MUser } from "../models/MUser"
import { User } from "@auth0/auth0-react"

export interface IUserContext {
    userInfo: MUser,
    getUserInfo(mail:string, user: User):void,
    editUserInfo(us:MUser):void,
    addresses: MAddress[],
    getAddresses(): void,
    tokenUser:string
    newAddress(ad: MAddress): Promise<boolean>,
    deleteAddress(ad: MAddress): Promise<boolean>,
    orders: MOrder[],
    setOrders: Dispatch<SetStateAction<MOrder[]>>,
    getOrders(): Promise<MOrder[]>
}