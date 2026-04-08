export type MessageRole = 'ai' | 'user';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  cards?: {
    title: string;
    status: string;
  }[];
}
