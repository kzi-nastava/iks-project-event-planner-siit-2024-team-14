export interface BookingServiceRequestModel{
  id: number;
  service: String;
  event: String;
  bookingDate: string;
  confirmed: string;
  startTime: string;
  duration: number;
}
