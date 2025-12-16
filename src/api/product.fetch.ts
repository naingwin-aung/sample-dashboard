import api from "@/axios";
import type { ProductsResponse } from "./products";
import type { FormProduct } from "@/types/product";

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

const appendNestedFormData = (
  formData: FormData,
  data: any,
  keyPrefix: string = ''
) => {
  if (data === null || data === undefined) {
    return;
  }

  if (data instanceof File) {
    formData.append(keyPrefix, data);
    return;
  }

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const newPrefix = `${keyPrefix}[${index}]`;
      appendNestedFormData(formData, item, newPrefix);
    });
    return;
  }

  if (typeof data === "object") {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const newPrefix = keyPrefix ? `${keyPrefix}[${key}]` : key;
      appendNestedFormData(formData, value, newPrefix);
    });
    return;
  }

  formData.append(keyPrefix, String(data));
};


export const show = async (productId: number): Promise<FormProduct> => {
  const response = await api.get(`/admin/products/${productId}`);
  return response.data.data.product;
}