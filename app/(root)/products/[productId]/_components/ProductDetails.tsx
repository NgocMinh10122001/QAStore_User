import Gallery from "@/components/common/Gallery";
import ProductCard from "@/components/common/ProductCard";
import ProductInfo from "@/components/common/ProductInfo";

interface IProductDetailsProps {
  productDetails: ProductType;
  relatedProducts?: ProductType[];
}

const ProductDetails: React.FC<IProductDetailsProps> = async ({
  productDetails,
  relatedProducts,
}) => {
  return (
    <>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productMedia={productDetails.media} />
        <ProductInfo productInfo={productDetails} />
      </div>

      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="text-heading3-bold">Related Products</p>
        <div className="flex flex-wrap gap-16 mx-auto mt-8">
          {relatedProducts &&
            relatedProducts.length > 0 &&
            relatedProducts?.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default ProductDetails;
