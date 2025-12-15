import api from "@/axios";
import type { FormPier, Pier } from "./piers";

export interface PiersResponse {
    page: number;
    limit: number;
    total: number;
    has_more: boolean;
    data: Pier[];
}

export const listing = async (page: number, limit: number): Promise<PiersResponse> => {
    const response = await api.get(`/admin/piers`, {
        params: {
            page,
            limit,
        }
    });

    return response.data.data;
}

export const create = async (newPier: FormPier) => {
    const response = await api.post(`/admin/piers`, newPier);
    return response.data;
};

export const destroy = async (pierId: number) => {
    const response = await api.delete(`/admin/piers/${pierId}`);
    return response.data;
};

export const show = async (pierId: number): Promise<Pier> => {
    const response = await api.get(`/admin/piers/${pierId}`);
    return response.data.data.pier;
};

export const update = async (pierId: number, data: FormPier) => {
    const response = await api.put(`/admin/piers/${pierId}`, data);
    return response.data;
};

export const fetchAll = async (): Promise<Pier[]> => {
    const response = await api.get(`/admin/all/piers`);
    return response.data.data.data;
}