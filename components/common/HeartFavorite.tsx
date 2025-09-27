"use client"

import { getUser } from "@/lib/actions/actions";
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

  const { data, mutate } = useSWR([`/api/users`], getUser);

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
       const res = await fetch(`/api/users/wishlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product._id }),
        });
        const data = res.json()
        mutate(data)
    } catch (error) {
      console.log("get user in client failed, try again", error);
    }
  };
  

  return (
    <div onClick={() => {
         if (!user) {
        router.push("/sign-in");
        return;
      } else {
            setIsLiked(!isLiked)
        }
    }}>
        <button onClick={handleLike} className="cursor-pointer">
      <Heart fill={`${isLiked ? "red" : "white"}`} />
    </button>
    </div>
  );
};

export default HeartFavorite;