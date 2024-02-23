import { UserItemType } from "./user";

export interface ChatRoomItemType {
  id: string;
  userId: string;
  banner: string;
  title: string;
  description: string;
  access: string;
  isDeleted: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ChatRoomMemberList {
  chatroomid: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  isDeleted: string | null;
  isbanned: boolean;
  ismoderator: boolean;
  member: string;
  status: string;
  updatedAt: string;
  user: UserItemType
}
