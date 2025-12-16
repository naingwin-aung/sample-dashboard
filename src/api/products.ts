import { create, fetchProducts } from './product.fetch';
import type { FormProduct } from '@/types/product';

export interface Product {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface ProductsResponse {
    page: number;
    limit: number;
    total: number;
    has_more: boolean;
    data: Product[];
}

export const ListProductQueryOption = (page: number, limit: number) => {
    return {
        queryKey: ['products', page, limit],
        queryFn: () => fetchProducts(page, limit),
    }
}

// create
export const createProductQueryOption = () => {
    return {
        mutationFn: (newProduct: FormProduct) => create(newProduct),
    }
}