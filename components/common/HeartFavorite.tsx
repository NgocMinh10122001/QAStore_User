"use client"

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface HeartFavoriteProps {
  product: ProductType;
}

const HeartFavorite = ({ product }: HeartFavoriteProps) => {
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

  const { data } = useSWR([`/api/users`], getUser,{dedupingInterval:3600,});

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
    <button onClick={handleLike} className="cursor-pointer">
      <Heart fill={`${isLiked ? "red" : "white"}`} />
    </button>
  );
};

export default HeartFavorite;