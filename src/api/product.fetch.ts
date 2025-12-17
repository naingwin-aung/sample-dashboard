import api from "@/axios";
import type { ProductsResponse } from "./products";
import type { FormProduct } from "@/types/product";
import { appendNestedFormData } from "@/lib/helpers";

export const fetchProducts = async (
  page: number,
  limit: number
): Promise<ProductsResponse> => {
  const response = await api.get(`/admin/products`, {
    params: {
      page,
      limit,
    },
  });

  return response.data.data;
};

export const create = async (newProduct: FormProduct) => {
  const formData = new FormData();

  formData.append("name", newProduct.name || "");
  formData.append("description", newProduct.description || "");

  if (newProduct.piers?.length) {
    newProduct.piers.forEach((pier, index) => {
      formData.append(`piers[${index}][id]`, String(pier));
    });
  }

  if (newProduct.images?.length) {
    newProduct.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images[]", image);
      }
    });
  }

  if (newProduct.boats?.length) {
    appendNestedFormData(formData, newProduct.boats, "boats");
  }

  const response = await api.post(`/admin/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const show = async (productId: number): Promise<FormProduct> => {
  const response = await api.get(`/admin/products/${productId}`);
  return response.data.data.product;
}

export const update = async (productId: number, data: FormProduct) => {
  const formData = new FormData();

  formData.append("_method", "PUT");
  formData.append("name", data.name || "");
  formData.append("description", data.description || "");

  if (data.piers?.length) {
    data.piers.forEach((pier, index) => {
      formData.append(`piers[${index}][id]`, String(pier));
    });
  }

  if (data.images?.length) {
    data.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images[]", image);
      }
    });
  }

  if (data.boats?.length) {
    appendNestedFormData(formData, data.boats, "boats");
  }

  const response = await api.post(`/admin/products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};