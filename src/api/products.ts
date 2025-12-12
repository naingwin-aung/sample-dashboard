import api from '@/axios';

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

const fetchProducts = async (page: number, limit: number): Promise<ProductsResponse> => {
    // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    const response = await api.get(`/admin/products`, {
        params: {
            page,
            limit,
        }
    });

    return response.data.data;
}