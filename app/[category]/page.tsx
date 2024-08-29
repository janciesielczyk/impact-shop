import { convertCategoryToRoutePath } from "@/app/helpers/category-to-route";
import { Product } from "../types/fakestoreapi";
import Image from 'next/image'
import Link from "next/link";

export async function generateStaticParams() {
  const data = await fetch('https://fakestoreapi.com/products/categories');
  const categories: string[] = await data.json();
  return categories.map((category) => ({
    category: convertCategoryToRoutePath(category),
  }))
}

export default async function Page({ params }: { params: { category: string } }) {
  const productsData = await fetch('https://fakestoreapi.com/products/category/jewelery')
  const products: Product[] = await productsData.json();

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Link href={`/`}>Home</Link>
    <Link href={`/cart`}>Cart</Link>
    <div>Category: {params.category}</div>
    <div>
      {products.map((product) => 
        <div key={product.id}>
          <span>{product.title}</span>
          <Image src={product.image} width={250} height={250} alt={product.title}/>
          <span>{product.price}</span>
        </div>
      )}
    </div>
  </main>
}

export const dynamicParams = false