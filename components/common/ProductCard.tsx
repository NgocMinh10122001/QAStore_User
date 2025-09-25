"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
// import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);

  const { user } = useUser();

  const getUser = async () => {
    try {
      const res = await fetch(`/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await res.json();
    } catch (error) {
      console.log("get user in client failed, try again", error);
    }
  };

  const { data,mutate } = useSWR([`/api/users`], getUser,{dedupingInterval:3600,});

  useEffect(() => {
    if (data) {
      setIsLiked(data.wishlist.includes(product._id));
    }
  }, [data]);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        const res = await fetch(`/api/users/wishlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product._id }),
        });

        const data = await res.json();

        setIsLiked(data.wishlist.includes(product._id));
      }
    } catch (error) {
      console.log("get user in client failed, try again", error);
    }
  };

  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-1">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <button className="cursor-pointer " onClick={(e) => handleLike(e)}>
          <Heart fill={`${isLiked ? "red" : "white"}`} />
        </button>
        {/* <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} /> */}
      </div>
    </Link>
  );
};

export default ProductCard;
