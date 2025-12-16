import api from '@/axios';

export interface Boat {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface BoatsResponse {
    page: number;
    limit: number;
    total: number;
    has_more: boolean;
    data: Boat[];
}

export const ListBoatQueryOption = (page: number, limit: number) => {
    return {
        queryKey: ['boats', page, limit],
        queryFn: () => fetchBoats(page, limit),
    }
}

const fetchBoats = async (page: number, limit: number): Promise<BoatsResponse> => {
    const response = await api.get(`/admin/boats`, {
        params: {
            page,
            limit,
        }
    });

    return response.data.data;
}

// all boats
export const allBoatQueryOption = () => {
    return {
        queryKey: ['all_boats'],
        queryFn: () => fetchAllBoats(),
    }
}

const fetchAllBoats = async (): Promise<Boat[]> => {
    const response = await api.get(`/admin/all/boats`);

    return response.data.data.data;
}