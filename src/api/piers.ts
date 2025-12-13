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

export interface FormPier {
    name: string;
}

// listing
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

// create
export const createPierQueryOption = () => {
    return {
        mutationFn: (newPier : FormPier) => createPier(newPier),
    }
}

const createPier = async (newPier: FormPier) => {
    const response = await api.post(`/admin/piers`, newPier);
    return response.data;
};

// delete
export const deletePierQueryOption = () => {
    return {
        mutationFn: (pierId : number) => deletePier(pierId),
    }
}

const deletePier = async (pierId: number) => {
    const response = await api.delete(`/admin/piers/${pierId}`);
    return response.data;
};

// show
export const showPierQueryOption = (pierId: number) => {
    return {
        queryKey: ['piers', pierId],
        queryFn: () => fetchPier(pierId),
        enabled: !!pierId,
    }
}

const fetchPier = async (pierId: number): Promise<Pier> => {
    const response = await api.get(`/admin/piers/${pierId}`);
    return response.data.data.pier;
};

// update
export const updatePierQueryOption = () => {
    return {
        mutationFn: ({ pierId, data }: { pierId: number; data: FormPier }) => updatePier(pierId, data),
    }
}

const updatePier = async (pierId: number, data: FormPier) => {
    const response = await api.put(`/admin/piers/${pierId}`, data);
    return response.data;
};