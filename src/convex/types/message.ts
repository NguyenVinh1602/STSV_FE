export type Role = "user" | "you";

export interface Message {
  id: number;
  content: string;
  role: Role;
}
