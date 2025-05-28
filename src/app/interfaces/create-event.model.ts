export interface CreateEvent {
  name: string;
  description: string;
  categories: string[];
  guestNumber: string;
  type: string;
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  eventType: string;
  organizer: string; //id
  photo: File | null; // File input for the photo (image)
}
