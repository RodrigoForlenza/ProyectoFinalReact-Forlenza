import { createContext, useState } from "react"
import { useNotification } from "../notification/NotificationService"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const { setNotification } = useNotification()

    const addItem = (productToAdd) => {
        if(!isInCart(productToAdd.id)) {
            setCart(prev => [...prev, productToAdd])
        } else {
            const updatedCart = cart.map(prod => {
                if(prod.id === productToAdd.id) {
                    let newQuantity = prod.quantity + productToAdd.quantity
                    if(newQuantity > prod.stock) {
                        newQuantity = prod.stock
                        setNotification('error', `El stock disponible es de ${prod.stock}`, 1)
                    } else {
                        setNotification('success', `Se agrego correctamente ${productToAdd.quantity} ${productToAdd.name}`, 1)
                    }

                    return { ...prod, quantity: newQuantity }

                } else {
                    return prod
                }
            })

            setCart(updatedCart)
        }
    }

    const removeItem = (id) => {
        const cartUpdated =  cart.filter(prod => prod.id !== id)
        setCart(cartUpdated)
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const getTotalQuantity = () => {
        let totalQuantity = 0
        cart.forEach(prod => {
            totalQuantity += prod.quantity
        })
        return totalQuantity
    }

    const totalQuantity = getTotalQuantity()

    const getTotal = () => {
        let total = 0
        cart.forEach(prod => {
            total += prod.quantity * prod.price
        })
        return total
    }

    const total = getTotal()

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{cart, addItem, removeItem, totalQuantity, total, clearCart}}>
        { children }
        </CartContext.Provider>
    )
}