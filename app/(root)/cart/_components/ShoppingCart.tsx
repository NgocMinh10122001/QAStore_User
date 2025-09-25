"use client";


import Cart from "@/components/common/Cart";
import useCart from "@/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ShoppingCart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

//   const total = cart.cartItems.reduce(
//     (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
//     0
//   );
//   const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

//   const handleCheckout = async () => {
//     try {
//       if (!user) {
//         router.push("sign-in");
//       } else {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
//           method: "POST",
//           body: JSON.stringify({ cartItems: cart.cartItems, customer }),
//         });
//         const data = await res.json();
//         window.location.href = data.url;
//         console.log(data);
//       }
//     } catch (err) {
//       console.log("[checkout_POST]", err);
//     }
//   };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <Cart key={cartItem.item._id} cartItem = {cartItem}/>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-black rounded-lg px-4 py-5">
        <p className="text-heading4-bold text-white pb-4">
          Summary{" "}
          <span>{`(${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>
        <div className="flex justify-between text-body-semibold text-white">
          <span>Total Amount</span>
          <span>$ 
            {/* {totalRounded} */}
            </span>
        </div>
        <button
          className="border rounded-lg text-body-bold bg-black py-3 w-full hover:bg-white text-white hover:text-black"
        //   onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;