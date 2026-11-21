export interface Earthquake {
  id?: string | null;
  time: string | null;
  place: string | null;
  mag: number | null;
  depth: number | null;
  latitude: number | null;
  longitude: number | null;
  status: string | null;
  [key: string]: unknown;
}
export interface DateRange { start: string; end: string }
export interface MagnitudeRange { min: number; max: number }
export interface ChartPoint { label: string; value: number }
