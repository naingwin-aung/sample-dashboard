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
    const formData = new FormData();

    formData.append('name', newProduct.name || '');
    formData.append('description', newProduct.description || '');

    if (newProduct.on_board_piers?.length) {
        newProduct.on_board_piers.forEach((pier, index) => {
            formData.append(`on_board_piers[${index}][id]`, String(pier));
        });
    }

    if (newProduct.images?.length) {
        newProduct.images.forEach((image) => {
            if (image instanceof File) {
                formData.append('images[]', image);
            }
        });
    }

    if (newProduct.boats?.length) {
        newProduct.boats.forEach((boat, index) => {
            formData.append(`boats[${index}]`, String(boat));
        });
    }

    const response = await api.post(`/admin/products`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};