export interface Notification {
  isRead: boolean;
  message: string;
  date: Date;

  [p: string]: any;
}
