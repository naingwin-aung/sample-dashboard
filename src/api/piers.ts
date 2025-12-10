import api from '@/axios';

export interface Pier {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface PiersResponse {
    page: number;
    limit: number;
    total: number;
    has_more: boolean;
    data: Pier[];
}

export const ListPierQueryOption = (page: number, limit: number) => {
    return {
        queryKey: ['piers', page, limit],
        queryFn: () => fetchPiers(page, limit),
    }
}

const fetchPiers = async (page: number, limit: number): Promise<PiersResponse> => {
    // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    const response = await api.get(`/admin/piers`, {
        params: {
            page,
            limit,
        }
    });

    return response.data.data;
}