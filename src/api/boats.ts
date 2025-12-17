import { create, destroy, fetchAllBoats, fetchBoats, show, update } from "./boat.fetch";

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

// listing
export const ListBoatQueryOption = (page: number, limit: number) => {
  return {
    queryKey: ["boats", page, limit],
    queryFn: () => fetchBoats(page, limit),
  };
};

// create
export const createBoatQueryOption = () => {
  return {
    mutationFn: (newBoat: { name: string }) => create(newBoat),
  };
};

// update
export const updateBoatQueryOption = () => {
    return {
    mutationFn: ({ boatId, data }: { boatId: number; data: { name: string } }) => update(boatId, data),
  };
}

// delete
export const deleteBoatQueryOption = () => {
  return {
    mutationFn: (boatId: number) => destroy(boatId),
  };
}

// show
export const showBoatQueryOption = (boatId: number) => {
  return {
    queryKey: ["boats", boatId],
    queryFn: () => show(boatId),
  };
}

// all boats
export const allBoatQueryOption = () => {
  return {
    queryKey: ["all_boats"],
    queryFn: () => fetchAllBoats(),
  };
};
