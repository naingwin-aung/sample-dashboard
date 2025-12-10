import api from '@/axios';

export const ListPierQueryOption = (page: number, limit: number) => {
    return {
        queryKey: ['piers', page, limit],
        queryFn: () => fetchPiers(page, limit),
    }
}

const fetchPiers = async (page: number, limit: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    const response = await api.get(`/admin/piers`, {
        params: {
            page,
            limit,
        }
    });

    return response.data.data;
}