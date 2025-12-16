import { create, fetchProducts, show, update } from './product.fetch';
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

export const updateProductQueryOption = () => {
    return {
        mutationFn: ({ productId, data }: { productId: number; data: FormProduct }) => update(productId, data),
    }
}

export const showProductQueryOption = (productId: number) => {
    return {
        queryKey: ['product', productId],
        queryFn: () => show(productId),
    }
}