import { createContext, useEffect, useState } from "react";
import myOrders from '../mocks/orders.json'

export const OrdersContext = createContext([]);

export function OrdersProvider({ children }: any) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrdersFetch = async () => {
            const responseOrders = await fetch("https://buen-sabor-backend-production.up.railway.app/api/orders/getAll");
            const dataOrders = await responseOrders.json();
            setOrders(dataOrders);
        }

        getOrdersFetch();
    }, [])

    return (
        <OrdersContext.Provider value={{
            orders,
            setOrders
        }}>
            {children}
        </OrdersContext.Provider>
    )
}