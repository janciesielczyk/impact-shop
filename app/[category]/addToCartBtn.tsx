'use client';
import { Product } from "../types/fakestoreapi";
import { useCart } from "../context/CartContext";

export function AddToCartBtn({ product }: { product: Product }) {
    const { addToCart } = useCart();
    return <button type="submit" onClick={() => addToCart(product)} className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Add to bag
    </button>
}
