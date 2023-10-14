// React
import { createContext, useEffect, useState } from 'react'

// Types
import { MProduct } from '../models/MProduct';
import { ICartContext, MCart } from '../models/ICartContext';
import { IContextProviderProps } from '../models/IContextProviderProps';

export const CartContext = createContext<ICartContext>({
    cart: [{ product: {
        id: 0,
        name: "",
        active: false,
        price: 0,
        cookingTime: 0,
        image: "",
        subcategory: { id: 0, name: "", parentCategory: null},
        cost: 0,
        ingredients: [{ id: 0, ingredient: { id: 0, name: "", cost: 0, stock: 0, stockMin: 0, measure: { id: 0, measure: ""}}, cant: 0}],
    }, quantity: 0 }],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    setCart: () => {},
  });

export function CartProvider({ children } : IContextProviderProps) {
    // Cart State. LocalStorage Cart or Set Empty Cart
    const [cart, setCart] = useState<MCart[]>(() => {
        const storedCart = window.localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : clearCart();
    });

    // Cada vez que cambia el estado de Cart se setea en el LocalStorage
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Agregar al Carrito. Se le pasa el producto a agregar, un boolean que indica si se agrega o quita del carrito
    // y qty que por defecto es 1, sino se le pasa la cantidad a agregar
    const addToCart = (product: MProduct, addQty: boolean = true, qty: number = 1) => {
        if(cart[0].quantity === 0) setCart([]);

        // Se busca si el producto ya está agregado en el carrito
        const productInCartIndex: number = cart.findIndex((item : MCart) => item.product.id === product.id)

        // Si existe el producto en el carrito y addQty es true se agrega la qty deseada del producto al carrito
        if(productInCartIndex >= 0 && addQty) {
            const newCart: MCart[] = structuredClone(cart);
            newCart[productInCartIndex].quantity += qty;
            return setCart(newCart)
        } // Si existe el producto en el carrito y addQty es false se quita la qty deseada del producto al carrito
        else if(productInCartIndex >= 0 && !addQty) {
            const newCart: MCart[] = structuredClone(cart);
            newCart[productInCartIndex].quantity -= qty
            // Si el quantity del producto es 0 se lo remueve del carrito
            if(newCart[productInCartIndex].quantity == 0) return removeFromCart(newCart[productInCartIndex].product);
            else return setCart(newCart);
        }

        // Si el producto no existe en el carrito se lo agrega al mismo
        setCart((prevState) => ([
            ...prevState,
            {
                product: { ...product },
                quantity: qty
            }
        ]))
    }

    // Remueve un producto del carrito
    const removeFromCart = (p: MProduct) => {
        if(cart.length >= 2) setCart(prevState => prevState.filter((item : MCart) => item.product.id !== p.id));
        else clearCart();
        
    }

    // Vacía el carrito
    const clearCart = () => {
        setCart([{ product: {
            id: 0,
            name: "",
            active: false,
            price: 0,
            cookingTime: 0,
            image: "",
            subcategory: { id: 0, name: "", parentCategory: null},
            cost: 0,
            ingredients: [{ id: 0, ingredient: { id: 0, name: "", cost: 0, stock: 0, stockMin: 0, measure: { id: 0, measure: ""}}, cant: 0}],
        }, quantity: 0}]);
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