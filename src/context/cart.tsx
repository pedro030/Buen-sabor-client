import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext([]);

export function CartProvider({ children } : any) {
    const [cart, setCart] = useState(() => {
        const storedCart = window.localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [{ product: {}, quantity: 0 }];
    });
    
    /*useState([{
        product: {},
        quantity: 0
    }]);*/

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (p : any, addQty = true, qty = 1) => {  
        if(cart[0].quantity === 0) setCart([]);

        const productInCartIndex = cart.findIndex((item : any) => item.id === p.id)

        if(productInCartIndex >= 0 && addQty) {
            const newCart = structuredClone(cart);
            newCart[productInCartIndex].quantity += qty
            return setCart(newCart)
        }
        else if(productInCartIndex >= 0 && !addQty) {
            const newCart = structuredClone(cart);
            newCart[productInCartIndex].quantity -= qty
            if(newCart[productInCartIndex].quantity == 0) return removeFromCart(newCart[productInCartIndex]);
            else return setCart(newCart);
        }

        setCart(prevState => ([
            ...prevState,
            {
                ...p,
                quantity: qty
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