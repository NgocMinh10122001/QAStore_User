import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";

import Image from "next/image";

const page = async () => {
  const { userId } = await auth();
  console.log("check userId", userId);
  
  const orders = await getOrders(userId as string);

  console.log(orders);

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3-bold my-10">Your Orders</p>
      {!orders ||
        (orders.length === 0 && (
          <p className=" my-5 text-center">You have no orders yet.</p>
        ))}

      <div className="flex flex-col gap-10">
        
        {orders?.map((order: OrderType) => (
          <div key={order._id} className="flex flex-col gap-8 p-4 bg-white rounded-lg custom-shadown">
            <div className="flex gap-20 max-md:flex-col max-md:gap-3">
              <p className="text-base-bold">Order ID: {order._id}</p>
              <p className="text-base-bold">
                Total Amount: ${order.totalAmount}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {order.products && order.products.length > 0 && order.products.map((orderItem: OrderItemType) => (
                <div key={orderItem._id} className="flex gap-4">
                  <Image
                    src={orderItem.product.media[0]}
                    alt={orderItem.product.title}
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-small-medium">
                      Title:{" "}
                      <span className="text-small-bold">
                        {orderItem.product.title}
                      </span>
                    </p>
                    {orderItem.color && (
                      <p className="text-small-medium">
                        Color:{" "}
                        <span className="text-small-bold">
                          {orderItem.color}
                        </span>
                      </p>
                    )}
                    {orderItem.size && (
                      <p className="text-small-medium">
                        Size:{" "}
                        <span className="text-small-bold">
                          {orderItem.size}
                        </span>
                      </p>
                    )}
                    <p className="text-small-medium">
                      Unit price:{" "}
                      <span className="text-small-bold">{orderItem.product.price}</span>
                    </p>
                    <p className="text-small-medium">
                      Quantity:{" "}
                      <span className="text-small-bold">{orderItem.quantity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;

export const dynamic = "force-dynamic";