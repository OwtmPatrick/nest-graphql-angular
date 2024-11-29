export type Property = {
  id: string;
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
};

export type FilterPropertyInput = Pick<Property, 'wifi'> & { search: string };
