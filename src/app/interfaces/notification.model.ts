export interface NotificationModel {
  id: number;
  message: string;
  date: string;
  isRead: boolean;
  userId: number;
  commentId: number | null;
  eventId: number | null;
}
