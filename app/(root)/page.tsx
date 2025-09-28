import Collections from "@/components/home/Collections";
import ProductList from "@/components/home/ProductList";
import { getProducts } from "@/lib/actions/actions";
import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";

export default async function Home() {

    const [collections,products] = await Promise.all([
      getCollections(),
      getProducts(),
    ])
    
  return (
    <div>
        <Image
        src="/images/home/banner.jpg"
        alt="banner"
        className="mx-auto my-10 rounded-lg w-screen max-sm:h-52 max-sm:object-cover"
        width={2000}
        height={1000}
      />
      <Collections collections={collections}/>
      <ProductList products = {products}/>
    </div>
  );
}
