"use client"
import React from 'react'
import Image from "next/image";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";


interface CartItem {
    item : ProductType,
    quantity : number,
    color?: string,
    size?: string
}

interface ICartProps {
    cartItem : CartItem,
    increaseQuantity : (_id : string) => void,
    decreaseQuantity : (_id : string) => void,
    removeItem : (_id : string) => void,
}

const Cart:React.FC<ICartProps> = ({cartItem,increaseQuantity, decreaseQuantity,removeItem} ) => {
  return (
    <div className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-gray-100 px-4 py-3 items-center max-sm:items-start justify-between">
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium"><strong>color:</strong> {cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium"><strong>size:</strong> {cartItem.size}</p>
                    )}
                    <p className="text-small-medium"><strong>price:</strong> ${cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className={`hover:text-red-1 ${cartItem.quantity <=1 ? "cursor-not-allowed":"cursor-pointer"}`}
                    onClick={() => decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => removeItem(cartItem.item._id)}
                />
              </div>
  )
}

export default Cart
