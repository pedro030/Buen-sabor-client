import { createContext, useState } from "react";
import myOrders from '../mocks/orders.json'

export const OrdersContext = createContext([]);

export function OrdersProvider({ children }: any) {
    const [orders, setOrders] = useState(myOrders.orders);

    const deleteOrder = (id: number) => {
        setOrders(prevState => prevState.filter((order: any) => order.idOrder !== id));
    }

    return (
        <OrdersContext.Provider value={{
            orders,
            setOrders,
            deleteOrder
        }}>
            {children}
        </OrdersContext.Provider>
    )
}