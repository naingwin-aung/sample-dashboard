import api from "@/axios";
import type { ProductsResponse } from "./products";
import type { FormProduct } from "@/types/product";

export const fetchProducts = async (page: number, limit: number): Promise<ProductsResponse> => {
    const response = await api.get(`/admin/products`, {
        params: {
            page,
            limit,
        }
    });

    return response.data.data;
}

export const create = async (newProduct: FormProduct) => {
    const response = await api.post(`/admin/products`, newProduct);
    return response.data;
};