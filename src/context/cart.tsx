import { createContext, useState } from 'react'

export const CartContext = createContext([]);

export function CartProvider({ children } : any) {
    const [cart, setCart] = useState([{
        product: {},
        quantity: 0
    }]);

    const addToCart = (p : any) => {  
        if(cart[0].quantity === 0) setCart([]);
        const productInCartIndex = cart.findIndex((item : any) => item.id === p.id)

        if(productInCartIndex >= 0) {
            const newCart = structuredClone(cart);
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }

        setCart(prevState => ([
            ...prevState,
            {
                ...p,
                quantity: 1
            }
        ]))
    }

    const clearCart = () => {
        setCart([]);
    }

    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart,
            setCart
        }}>
            {children}
        </CartContext.Provider>
    )
}