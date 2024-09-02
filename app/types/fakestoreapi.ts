export interface Product {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}

export interface CartData {
    id: number;
    userId: number;
    date: string,
    products: { productId: number, quantity: number }[]
}
