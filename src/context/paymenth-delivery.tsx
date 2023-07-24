import { createContext, useState } from "react";
import { MAddress } from "../models/MAddress";

export const PaymenthDeliveryContext = createContext([]);

export function PaymenthDeliveryProvider({ children }: any) {
    const [deliveryTakeAway, setDeliveryTakeAway] = useState(true);
    const [mp, setMp] = useState(true);
    const [deliveryAddress, setDeliveryAddress] = useState<MAddress>();

    return (
        <PaymenthDeliveryContext.Provider value={{
            deliveryTakeAway,
            mp,
            setDeliveryTakeAway,
            setMp,
            deliveryAddress,
            setDeliveryAddress
        }}>
            {children}
        </PaymenthDeliveryContext.Provider>
    )
}