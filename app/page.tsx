import Link from "next/link";

export default async function Home() {
  const data = await fetch('https://fakestoreapi.com/products/categories');
  const categories: string[] = await data.json()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">

      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>

            <div className="mt-6 sm:grid sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
              {categories.map((category) => (
                <div key={category} className="group relative mb-6">
                  <div className="relative h-40 md:h-60 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64 flex justify-center items-center">
                  <h3 className="text-lg text-gray-90 capitalize">
                    <Link href={category}>
                      <span className="absolute inset-0" />
                      {category}
                    </Link>
                  </h3> 
                  </div>

                </div>
              ))}
            </div>
        </div>
      </div>


    </main>
  );
}
