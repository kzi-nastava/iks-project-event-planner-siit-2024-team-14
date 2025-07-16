export interface NotificationModel {
  id: number;
  message: string;
  date: string;
  read: boolean;
  userId: number;
  commentId: number | null;
  eventId: number | null;
}
