import { create, destroy, fetchAll, listing, show, update } from './pier.fetch';

export interface Pier {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface FormPier {
    name: string;
}

// listing
export const ListPierQueryOption = (page: number, limit: number) => {
    return {
        queryKey: ['piers', page, limit],
        queryFn: () => listing(page, limit),
    }
}

// create
export const createPierQueryOption = () => {
    return {
        mutationFn: (newPier : FormPier) => create(newPier),
    }
}

// delete
export const deletePierQueryOption = () => {
    return {
        mutationFn: (pierId : number) => destroy(pierId),
    }
}

// show
export const showPierQueryOption = (pierId: number) => {
    return {
        queryKey: ['piers', pierId],
        queryFn: () => show(pierId),
        enabled: !!pierId,
    }
}

// update
export const updatePierQueryOption = () => {
    return {
        mutationFn: ({ pierId, data }: { pierId: number; data: FormPier }) => update(pierId, data),
    }
}

// all piers
export const allPiersQueryOption = () => {
    return {
        queryKey: ['all_piers'],
        queryFn: () => fetchAll(),
    }
}