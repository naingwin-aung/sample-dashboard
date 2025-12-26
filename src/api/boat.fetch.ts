import api from "@/axios";
import type { BoatsResponse } from "./boats";
import { appendNestedFormData } from "@/lib/helpers";
import { data } from "react-router-dom";

export const fetchBoats = async (
  page: number,
  limit: number
): Promise<BoatsResponse> => {
  const response = await api.get(`/admin/boats`, {
    params: {
      page,
      limit,
    },
  });

  return response.data.data;
};

export const fetchAllBoats = async () => {
  const response = await api.get(`/admin/all/boats`);

  return response.data.data.data;
};

export const create = async (newBoat: any) => {
  const formData = new FormData();
  formData.append("name", newBoat.name || "");
  formData.append("description", newBoat.description || "");
  formData.append(`boat_type[id]`, (newBoat.boat_type_id || ""));
  formData.append('capacity', (newBoat.capacity || ''));


  if (newBoat.images?.length) {
    newBoat.images.forEach((image: any) => {
      if (image instanceof File) {
        formData.append("images[]", image);
      }
    });
  }

  if (newBoat.zones?.length) {
    appendNestedFormData(formData, newBoat.zones, "zones");
  }

  const response = await api.post(`/admin/boats`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const update = async (boatId: number, data: any) => {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("name", data.name || "");
  formData.append("description", data.description || "");
  formData.append(`boat_type[id]`, (data.boat_type_id || ""));
  formData.append('capacity', (data.capacity || ''));

  if (data.images?.length) {
    data.images.forEach((image: any) => {
      if (image instanceof File) {
        formData.append("images[]", image);
      }
    });
  }

  if (data.zones?.length) {
    appendNestedFormData(formData, data.zones, "zones");
  }

  const response = await api.post(`/admin/boats/${boatId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const destroy = async (boatId: number) => {
  const response = await api.delete(`/admin/boats/${boatId}`);
  return response.data.data;
};

export const show = async (boatId: number) => {
  const response = await api.get(`/admin/boats/${boatId}`);
  return response.data.data.boat;
};
