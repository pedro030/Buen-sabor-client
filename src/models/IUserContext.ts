import { Dispatch, SetStateAction } from "react"
import { MAddress } from "../models/MAddress"
import { MOrder } from "../models/MOrder"
import { MUser } from "../models/MUser"

export interface IUserContext {
    userInfo: MUser,
    getUserInfo(mail:string):void,
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