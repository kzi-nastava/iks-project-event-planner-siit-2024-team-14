export interface EventModel {
  id: number;
  organizerFirstName: string;
  organizerLastName: string;
  organizerId: number;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  organizerProfilePicture: string;
  maxParticipants: number;
}
