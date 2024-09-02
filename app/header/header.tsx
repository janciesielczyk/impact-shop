'use client'
import './header.scss';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartProduct, useCart } from '../context/CartContext';

export function Header() {
    const pathname = usePathname()
    const { cart } = useCart();

    const getCartProductsNumber = (c: CartProduct[]) => {
        return cart.reduce((acc, curr) => {
            return acc + curr.quantity;
        }, 0);
    }

    return <div className="flex flex-row justify-between p-4 bg-sky-800 text-white">
        <div className="text-center"><Link href={`/`}><h1 className="text-lg">Impact Shop</h1></Link></div>
        <nav className="flex items-center justify-around">
            <Link className={`link mr-4 ${pathname === '/' ? 'active' : ''}`} href={`/`}>Home</Link>
            <div className="font-sans inline-block mt-0 align-middle text-white hover:text-gray-200">
                <Link href="/cart" role="button" className="relative flex">
                    <svg className="flex-1 w-8 h-6 fill-current" viewBox="0 0 24 24" >
                        <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                    </svg>
                    <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{getCartProductsNumber(cart)}
                    </span>
                </Link>
            </div>
        </nav>
    </div>
}
