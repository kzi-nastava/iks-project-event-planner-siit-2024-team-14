export interface FilterParams {
  provider?: number;

  price?: number;
  minPrice?: number;
  maxPrice?: number;

  type?: 'service' | 'product';
  status?: 'available' | 'unavailable';

  category?: number | number[];
  eventType?: number | number[];

  location?: string;
}
