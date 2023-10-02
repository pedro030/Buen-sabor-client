import { MProduct } from "./MProduct"
import { MUser } from "./MUser"

export interface MOrder {
    id: number,
    creationDate: string,
    totalCookingTime: number | null,
    withdrawalMode: string,
    totalPrice: number,
    paymode: { id: number, paymode: string },
    address: string,
    user: MUser,
    statusOrder: { id: number, statusType: string },
    products: MOrderProducts[]
}

export interface MOrderProducts {
    id: number,
    product: MProduct,
    cant: number
}