import api from '@/axios';

export interface BoatType {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface BoatTypesResponse {
    page: number;
    limit: number;
    total: number;
    has_more: boolean;
    data: BoatType[];
}

export const ListBoatTypeQueryOption = (page: number, limit: number) => {
    return {
        queryKey: ['boat-types', page, limit],
        queryFn: () => fetchBoatTypes(page, limit),
    }
}

const fetchBoatTypes = async (page: number, limit: number): Promise<BoatTypesResponse> => {
    const response = await api.get(`/admin/boat-types`, {
        params: {
            page,
            limit,
        }
    });

    return response.data.data;
}

// delete
export const deleteBoatTypeQueryOption = () => {
    return {
        mutationFn: (boatTypeId : number) => deleteBoatType(boatTypeId),
    }
}

const deleteBoatType = async (boatTypeId: number) => {
    const response = await api.delete(`/admin/boat-types/${boatTypeId}`);
    return response.data;
};