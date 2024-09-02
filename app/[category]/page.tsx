import { Product } from "../types/fakestoreapi";
import { AddToCartBtn } from "./addToCartBtn";

export async function generateStaticParams() {
  const data = await fetch('https://fakestoreapi.com/products/categories');
  const categories: string[] = await data.json();
  return categories;
}

export default async function Page({ params }: { params: { category: string } }) {
  const productsData = await fetch(`https://fakestoreapi.com/products/category/${params.category}`)
  const products: Product[] = await productsData.json();
  return <main className="flex min-h-screen flex-col items-center justify-between p-8">
    <div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={product.title}
                  src={product.image}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700 whitespace-nowrap text-ellipsis max-w-full overflow-hidden">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              <AddToCartBtn product={product}></AddToCartBtn>
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
}

export const dynamicParams = false