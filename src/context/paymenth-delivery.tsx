import { createContext, useState } from "react";

export const PaymenthDeliveryContext = createContext([]);

export function PaymenthDeliveryProvider({ children }: any) {
    const [deliveryTakeAway, setDeliveryTakeAway] = useState(true);
    const [mp, setMp] = useState(true);

    return (
        <PaymenthDeliveryContext.Provider value={{
            deliveryTakeAway,
            mp,
            setDeliveryTakeAway,
            setMp
        }}>
            {children}
        </PaymenthDeliveryContext.Provider>
    )
}