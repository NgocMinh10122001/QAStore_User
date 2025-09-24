export const getCollections = async () => {
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`,
    { method: "GET", next: { revalidate: 60 } }
  );
  return await collections.json();
};

export const getCollectionDetails = async (collectionId: string) => {
  const collection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`,
    { method: "GET", next: { revalidate: 60 } }
  );
  return await collection.json();
};

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "GET",
    next: { revalidate: 60 },
  });
  return await products.json();
};

export const getProductDetails = async (productId: string) => {
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    { method: "GET", next: { revalidate: 60 } }
  );
  return await product.json();
};

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/${query}`,
    { method: "GET", next: { revalidate: 60 } }
  );
  return await searchedProducts.json();
};

export const getOrders = async (customerId: string) => {
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`,
    { method: "GET", next: { revalidate: 60 } }
  );
  return await orders.json();
};

export const getRelatedProducts = async (productId: string) => {
  const relatedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`,
    { method: "GET", next: { revalidate: 60 } }
  );
  return await relatedProducts.json();
};
