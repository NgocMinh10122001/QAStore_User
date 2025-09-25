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

const Cart = ({cartItem}:{cartItem :CartItem} ) => {
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
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                    <p className="text-small-medium">${cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    // onClick={() => cart.changeQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    // onClick={() => cart.changeQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-red-1 cursor-pointer"
                //   onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
  )
}

export default Cart
