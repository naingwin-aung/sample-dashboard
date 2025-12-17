import api from "@/axios";
import type { BoatsResponse } from "./boats";

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

export const create = async (newBoat: { name: string }) => {
  const response = await api.post(`/admin/boats`, newBoat);
  return response.data.data;
};

export const update = async (boatId: number, data: { name: string }) => {
  const response = await api.put(`/admin/boats/${boatId}`, data);
  return response.data.data;
}

export const destroy = async (boatId: number) => {
  const response = await api.delete(`/admin/boats/${boatId}`);
  return response.data.data;
}

export const show = async (boatId: number) => {
  const response = await api.get(`/admin/boats/${boatId}`);
  return response.data.data.boat;
}