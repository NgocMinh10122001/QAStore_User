import ProductCard from "../common/ProductCard";

interface IProductProps {
  products: ProductType[];
}

const ProductList:React.FC<IProductProps> = async ({products}) => {

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Products</p>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">No products found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;