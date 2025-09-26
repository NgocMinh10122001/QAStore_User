import toast from 'react-hot-toast'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CartItem {
    item : ProductType,
    quantity : number,
    color?: string,
    size?: string
}

interface CartStore {
    cartItems : CartItem[],
    addItem : (item : CartItem) => void,
    removeItem : (_id : string) => void,
    increaseQuantity: (_id : string) => void,
    decreaseQuantity: (_id : string) => void,
    clearCart : () => void
}


const useCart = create(persist<CartStore>((set, get) => ({
    cartItems : [],
    addItem : (data : CartItem) => {
        const {item, quantity, color, size} = data
        const currentItem = get().cartItems
        const existingItem = currentItem.find((cartItem) => cartItem.item._id === item._id)
        if(existingItem){
            return toast.error("Item already in cart")
        }
        set({cartItems : [...currentItem, {item, quantity, color, size}]})
        toast.success("Item added to cart",{ icon: "🛒" })
    },
    removeItem : (_id) => {
        const currentItem = get().cartItems
        const newCartItems = currentItem.filter((cartItem) => cartItem.item._id !== _id)
        set({cartItems : [...newCartItems]})
        toast.success("Item removed from cart",{ icon: "🛒" })
    },
    increaseQuantity : (_id) => {
        const newCartItems = get().cartItems.map((cartItem) => 
            {
                if(cartItem.item._id === _id) return {...cartItem, quantity: cartItem.quantity + 1 }
                return cartItem
            })
        
        set({cartItems : [...newCartItems]})
    },
    decreaseQuantity : (_id) => {
        const newCartItems = get().cartItems.map((cartItem) => 
            {
                if(cartItem.item._id === _id) return {...cartItem, quantity:cartItem.quantity <= 1 ? cartItem.quantity : cartItem.quantity - 1 }
                return cartItem
            })
        
        set({cartItems : [...newCartItems]})
    },
    clearCart : () => set({ cartItems: [] })
}),{
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}))

export default useCart
