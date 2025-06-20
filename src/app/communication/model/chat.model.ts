import { Message } from "./message.model";

export interface Chat {
  id: number;
  sender: any;
  recipient: any;
  messages: Message[];
}
