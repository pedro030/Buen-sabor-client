import { Dispatch, SetStateAction } from 'react'
import { MProduct } from "./MProduct";

export interface ICartContext {
    cart: MCart[];
    addToCart: (product: MProduct, addQty?: boolean, qty?: number) => void;
    removeFromCart: (product: MProduct) => void;
    clearCart: () => void;
    setCart: Dispatch<SetStateAction<MCart[]>>;
}

export interface MCart {
    product: MProduct,
    quantity: number
}