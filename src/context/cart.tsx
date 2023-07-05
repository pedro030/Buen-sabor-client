import { createContext, useState } from 'react'

export const CartContext = createContext([]);

export function CartProvider({ children } : any) {
    const [cart, setCart] = useState([{
        product: {},
        quantity: 0
    }]);

    const addToCart = (p : any, addQty = true) => {  
        if(cart[0].quantity === 0) setCart([]);

        const productInCartIndex = cart.findIndex((item : any) => item.id === p.id)

        if(productInCartIndex >= 0 && addQty) {
            const newCart = structuredClone(cart);
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }
        else if(productInCartIndex >= 0 && !addQty) {
            const newCart = structuredClone(cart);
            newCart[productInCartIndex].quantity -= 1
            if(newCart[productInCartIndex].quantity == 0) return removeFromCart(newCart[productInCartIndex]);
            else return setCart(newCart);
        }

        setCart(prevState => ([
            ...prevState,
            {
                ...p,
                quantity: 1
            }
        ]))
    }

    const removeFromCart = (p:any) => {
        if(cart.length >= 2) setCart(prevState => prevState.filter((item : any) => item.id !== p.id));
        else clearCart();
        
    }

    const clearCart = () => {
        setCart([{
            product: {},
            quantity: 0
        }]);
    }

    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            setCart
        }}>
            {children}
        </CartContext.Provider>
    )
}