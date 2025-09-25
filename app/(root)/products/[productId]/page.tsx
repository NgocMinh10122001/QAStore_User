import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";
import React from "react";
import ProductDetails from "./_components/ProductDetails";

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;

  const [
    productDetails,
    // relatedProducts
  ] = await Promise.all([
    getProductDetails(productId),
    // getRelatedProducts(productId),
  ]);

  return (
    <ProductDetails
      productDetails={productDetails}
      // relatedProducts={relatedProducts}
    />
  );
};

export default page;
