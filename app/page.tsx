import { convertCategoryToRoutePath } from "@/app/helpers/category-to-route";
import Link from "next/link";

export default async function Home() {
  const data = await fetch('https://fakestoreapi.com/products/categories');
  const categories: string[] = await data.json()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      <ul>
        {categories.map((category) => (
          <li key={category}><Link href={`/${convertCategoryToRoutePath(category)}`}>{category}</Link></li>
        ))}
      </ul>
      </div>
    </main>
  );
}
