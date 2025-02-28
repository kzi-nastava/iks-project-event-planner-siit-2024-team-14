export interface BookingServiceRequestModel{
  id: number
  bookingDate: string;
  confirmed: string;
  startTime: string;
  duration: number;
  service: number;
  event: number;
}
