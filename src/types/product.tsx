export type BoatOption = {
  id: string | number;
  name: string;
  selling_price: number;
  net_price: number;
};

export type Ticket = {
  id: string | number;
  name: string;
  short_description: string;
  prices: BoatOption[];
};

export type ScheduleTime = {
  id: string | number;
  start_time: string;
  end_time: string;
};

export type Boat = {
  id: string | number;
  boat_id: string | number;
  start_date: string;
  end_date: string;
  schedule_times: ScheduleTime[]; // Updated to use the nested array
  tickets: Ticket[];
};

export type FormProduct = {
  name: string;
  on_board_piers: string[] | number[];
  description: string;
  boats: Boat[];
  images: File[];
};