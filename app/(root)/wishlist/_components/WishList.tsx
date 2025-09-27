"use client";

import ProductCard from "@/components/common/ProductCard";
import LoaderCustom from "@/components/custom-ui/LoaderCustom";
import { getFavoriteProducts, getUser } from "@/lib/actions/actions";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

   const getWishlistProducts = async (data: UserType) => {
    if (data && data.wishlist.length > 0) {
      const wishlistProducts = await getFavoriteProducts(`${data?.wishlist}`);
      setWishlist(wishlistProducts);
      setLoading(false);
    }
  };

  const { data } = useSWR([`/api/users`], getUser,{revalidateOnFocus:false});

  useEffect(() => {
    if(data && data.wishlist && data.wishlist.length > 0){
      getWishlistProducts(data)
    }
    else {
      setLoading(false)
      setWishlist([])
    }
  },[data])

 
  return loading ? (
    <LoaderCustom />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10 text-center">Your Wishlist</p>
      {wishlist.length === 0 && <p className="text-center">No items in your wishlist</p>}

      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Wishlist;
